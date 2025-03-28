import { Configuration } from "../Config/app.config";

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
    getAll: "/product/getAll",
    get: "/product/get",
    getForUpdate: "/product/getForUpdate",
    create: "/product/create",
    update: "/product/update",
    delete: "/product/delete",
  },
  
  Doctors: {
    getAll: "/doctor/getAll",
    get: "/doctor/get",
    getForUpdate: "/doctor/getForUpdate",
    create: "/doctor/create",
    update: "/doctor/update",
    delete: "/doctor/delete",
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
