import { Configuration } from "../Config/app.config";
import Products from "../Views/App/Admin/Products/AllProducts/Products";
import LoginAdmin from "../Views/Auth/Admin/Login/Login";

const BASE_URL = `${Configuration.API_URL}/endpoints`;

export const Endpoints = {
  Auth: {

    loginAdmin: "/auth/admin/login",
    get: "/auth/admin/get",
    changeImage: "/auth/admin/changeImageProfile",
    logout: "/auth/admin/logout",
    checkAdmin: "/auth/admin/checkAdmin",

    login: "/auth/login",
    forgotPassword: "/auth/forgotpassword",
    resetPassword: "/auth/resetpassword",
    resetPasswordFinal: "/auth/resetpasswordStep2",
    checkUser: "/auth/checkUser",
  },

  Categories: {
    getAll: "/category/getAll",
    getList: "/category/getList",
    get: "/category/get",
    create: "/category/create",
    update: "/category/update",
    delete: "/category/delete",
  },
  Products: {
    getAll: "/category/getAll",
    get: "/category/get",
    create: "/product/create",
    update: "/category/update",
    delete: "/category/delete",
  }
};

export const getEndpoint = (path, params = null, isCustom = false) => {
  let url = `${BASE_URL}${path}.php`;
  if (isCustom) url = path;

  if (params) {
    params.map((param) => {
      url = `${url}/${param}`;
    });
  }

  return url;
};
