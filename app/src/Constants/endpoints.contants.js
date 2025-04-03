import { Configuration } from "../Config/app.config";

const BASE_URL = `${Configuration.API_URL}/endpoints`;

export const Endpoints = {
  Auth: {

    loginAdmin: "/auth/admin/login",
    get: "/auth/admin/get",
    changeImage: "/auth/admin/changeImageProfile",
    logout: "/auth/admin/logout",
    checkAdmin: "/auth/admin/checkAdmin",
    updateAdminProfile: "/auth/admin/updateAdminProfile",
    updateAdminEmail: "/auth/admin/updateAdminEmail",
    updateAdminPassword: "/auth/admin/updateAdminPassword",

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
    getAllWithoutCategory: "/product/getAllWithoutCategory",
    assignCategory: "/product/assignCategory"
  },
  
  Users: {
    getAll: "/user/getAll",
    get: "/user/get",
    create: "/user/register",
    update: "/user/update",
    delete: "/user/delete",
  },

  Dashboard: {
    countProductsForCategory: "/dashboard/countProductsForCategory"
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
