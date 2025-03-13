import axios from "axios";
import { useHistory } from "react-router-dom";
import { getOrganisationGuid, getToken } from "../Config/GeneralFunctions";
import { Configuration } from "../Config/app.config";
import { Paths } from "../Constants/paths.constants";
import { Views } from "../Constants/views.constants";
import CustomError from "../Utils/CustomError";

const useRequest = () => {
  const { replace, goBack } = useHistory();

  return async function (
    type,
    url,
    obj = {},
    useToken = true,
    loginRedirect = true
  ) {
    let headers = {
      "X-Api-Key": Configuration.API_KEY,
      "Content-type": "application/json",
    };

    if (useToken) {
      let token = getToken();
      // if (token) headers = { ...headers, Authorization: `Bearer ${token}` };
      if (token) headers = { ...headers, Authorization: token };
    }

    const payload = {
      ...obj,
    };

    const checkResponse = (res) => {
      if (res.status === 200) {
        const { data } = res;
        if (data.status) {
          delete data.status;
          if (data) return data;
        } else {
          switch (data.code) {
            case 401:
              if (loginRedirect) {
                localStorage.clear();
                replace(Paths[Views.login].path);
              }
              break;
            case 403:
              goBack() || replace(Paths[Views.default].path);
              break;
          }
          throw new CustomError(data.message, data.code);
        }
      } else throw new CustomError(res.message, res.status);
    };

    const checkError = (res) => {
      throw new CustomError(res.message, res.code);
    };

    switch (type.toLowerCase()) {
      case "post":
        return await axios
          .post(url, payload, {
            headers: {
              ...headers,
              // "Content-type": "application/x-www-form-urlencoded", //Avoid to do the OPTION request
            },
          })
          .then(checkResponse)
          .catch(checkError);
      case "file":
        //Split obj with file and values
        const fileKey = obj.accessor;
        const files = obj[fileKey];
        delete obj[fileKey];
        delete obj.accessor;

        //Create formdata
        var formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append("file[]", file);
        }

        const remainingKeys = Object.keys(obj);
        for (let i = 0; i < remainingKeys.length; i++) {
          const key = remainingKeys[i];
          const value = obj[key];
          formData.append(key, value);
        }
        return await axios
          .post(url, formData, {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(checkResponse)
          .catch(checkError);
      case "get":
        let finalUrl = `${url}?`;
        let keys = Object.keys(payload);
        keys.forEach((key, index) => {
          let element = payload[key];
          if (element) finalUrl += `${key}=${element}&`;
        });
        return await axios
          .get(finalUrl, { headers })
          .then(checkResponse)
          .catch(checkError);
      default:
        throw new CustomError("No method selected in useRequest() hook");
    }
  };
};

export default useRequest;
