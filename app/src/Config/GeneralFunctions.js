import moment from "moment";
import { StorageKeys } from "../Constants/storekeys.constants";
import { EmailRegex } from "../Utils/Regex";
import { Configuration, isDev } from "./app.config";

export const getToken = () => {
  return localStorage.getItem(StorageKeys.TOKEN);
};

export const changeTitle = () => {
  const { APP_NAME } = Configuration;
  const title = isDev ? `Development - ${APP_NAME}` : APP_NAME;
  var titleEl = document.getElementsByTagName("title")[0];
  titleEl.innerHTML = title;
};

export const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
export const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export const getEncryptedPassword = (password) => {
  const newPassword = encodeBase64(password);
  return newPassword.substring(1, newPassword.length)?.replaceAll("=", "");
};

export const createGuid = () => {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};

export const capitalize = (string) => {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(
    1,
    string.length
  )}`.replace("_", " ");
};

export const getColumnValue = ({ row: { original } }, element) =>
  element(original);

export const replaceBreadcrumbTitle = (path, title) => {
  path.title = title || "";
  return path;
};

export const validateData = (params) => {
  for (let i = 0; i < params.length; i++) {

    const item = params[i];

    if (
      item === undefined ||
      item === null ||
      (typeof item === 'string' && item.trim() === '') ||
      (Array.isArray(item) && item.length === 0)
    )
      return false;
  }
  return true;
};

//Format the date of YYYY-MM-DD hh:mm:ss to the YYYY/MM/DD
export const dataFormater = (date, format = "YYYY/MM/DD HH:mm ") => {
  return moment(date).format(format);
}

export const validateDataCreateUser = (params) => {
  for (let i = 0; i < params.length; i++) {
    const item = params[i];

    if (
      item === undefined ||
      item === null ||
      item === '' ||
      (typeof item === 'string' && item.trim() === '') ||
      (Array.isArray(item) && item.length === 0)
    )
      return false;
  }

  const email = params[3];
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const password = params[4];
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  }

  return true;
};


export const validateLogin = (email, password) => {

  if (email && EmailRegex.test(email)) {
    if (password && password.length >= 6) {
      return true;
    }
    return false;
  }
  return false;
}
