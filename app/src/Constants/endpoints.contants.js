import { Configuration } from "../Config/app.config";

const BASE_URL_ADMIN = `${Configuration.API_URL}/endpoints/my-admin`;
const BASE_URL_USER = `${Configuration.API_URL}/endpoints/my-user`;
const BASE_URL_LANDINGPAGE = `${Configuration.API_URL}/endpoints/landing-page`;

export const EndpointsAdmin = {
  Auth: {
    loginAdmin: `${BASE_URL_ADMIN}/auth/login`,
    get: `${BASE_URL_ADMIN}/auth/get`,
    changeImage: `${BASE_URL_ADMIN}/auth/changeImageProfile`,
    logout: `${BASE_URL_ADMIN}/auth/logout`,
    checkAdmin: `${BASE_URL_ADMIN}/auth/checkAdmin`,
    updateAdminProfile: `${BASE_URL_ADMIN}/auth/updateAdminProfile`,
    updateAdminEmail: `${BASE_URL_ADMIN}/auth/updateAdminEmail`,
    updateAdminPassword: `${BASE_URL_ADMIN}/auth/updateAdminPassword`,
  },

  Categories: {
    getAll: `${BASE_URL_ADMIN}/category/getAll`,
    getList: `${BASE_URL_ADMIN}/category/getList`,
    get: `${BASE_URL_ADMIN}/category/get`,
    create: `${BASE_URL_ADMIN}/category/create`,
    update: `${BASE_URL_ADMIN}/category/update`,
    delete: `${BASE_URL_ADMIN}/category/delete`,
  },

  Products: {
    getAll: `${BASE_URL_ADMIN}/product/getAll`,
    get: `${BASE_URL_ADMIN}/product/get`,
    getForUpdate: `${BASE_URL_ADMIN}/product/getForUpdate`,
    create: `${BASE_URL_ADMIN}/product/create`,
    update: `${BASE_URL_ADMIN}/product/update`,
    delete: `${BASE_URL_ADMIN}/product/delete`,
    getAllWithoutCategory: `${BASE_URL_ADMIN}/product/getAllWithoutCategory`,
    assignCategory: `${BASE_URL_ADMIN}/product/assignCategory`
  },

  Users: {
    getAll: `${BASE_URL_ADMIN}/user/getAll`,
    get: `${BASE_URL_ADMIN}/user/get`,
    create: `${BASE_URL_ADMIN}/user/register`,
    update: `${BASE_URL_ADMIN}/user/update`,
    delete: `${BASE_URL_ADMIN}/user/delete`,
  },

  Dashboard: {
    countProductsForCategory: `${BASE_URL_ADMIN}/dashboard/countProductsForCategory`,
    countClientsForUsers: `${BASE_URL_ADMIN}/dashboard/countClientsForUsers`,
    typeCount: `${BASE_URL_ADMIN}/dashboard/typeCount`,
    getAllWithoutUser: `${BASE_URL_ADMIN}/dashboard/getAllWithoutUser`,
    deleteClient: `${BASE_URL_ADMIN}/dashboard/deleteClient`,
    getUsers: `${BASE_URL_ADMIN}/dashboard/getUsers`,
    assignNewUser: `${BASE_URL_ADMIN}/dashboard/assignNewUser`,
  }
};

export const EndpointsUser = {
  Auth: {
    loginUser: `${BASE_URL_USER}/auth/login`,
    get: `${BASE_URL_USER}/auth/get`,
    checkUser: `${BASE_URL_USER}/auth/checkUser`,
    completeUser: `${BASE_URL_USER}/auth/completeUser`,
    logout: `${BASE_URL_USER}/auth/logout`,
    changeImage: `${BASE_URL_USER}/auth/changeImageProfile`,
    updateUserProfile: `${BASE_URL_USER}/auth/updateUserProfile`,
    updateUserEmail: `${BASE_URL_USER}/auth/updateUserEmail`,
    updateUserPassword: `${BASE_URL_USER}/auth/updateUserPassword`,
  },

  Clients: {
    getAll: `${BASE_URL_USER}/client/getAll`,
    getAllWithoutPagination: `${BASE_URL_USER}/client/getAllWithoutPagination`,
    get: `${BASE_URL_USER}/client/get`,
    create: `${BASE_URL_USER}/client/register`,
    update: `${BASE_URL_USER}/client/update`,
    delete: `${BASE_URL_USER}/client/delete`,
    createPDF: `${BASE_URL_USER}/client/createPDF`,
    getProductsRecomendate: `${BASE_URL_USER}/client/getProductsRecomendate`,
  },

  Appointments: {
    getAll: `${BASE_URL_USER}/appointment/getAll`,
    getAllByClient: `${BASE_URL_USER}/appointment/getAllByClient`,
    get: `${BASE_URL_USER}/appointment/get`,
    getInfoAppointmentClient: `${BASE_URL_USER}/appointment/getInfoAppointmentClient`,
    getChosenHours: `${BASE_URL_USER}/appointment/getChosenHours`,
    create: `${BASE_URL_USER}/appointment/create`,
    update: `${BASE_URL_USER}/appointment/update`,
    delete: `${BASE_URL_USER}/appointment/delete`,
  },

  Recipes: {
    create: `${BASE_URL_USER}/recipe/create`,
    generatePDF: `${BASE_URL_USER}/recipe/generatePDF`,
    getProductsWithRecipe: `${BASE_URL_USER}/recipe/getProductsWithRecipe`
  },

  Dashboard: {
    getAllByDay: `${BASE_URL_USER}/dashboard/getAllByDay`,
    typeCount: `${BASE_URL_USER}/dashboard/typeCount`,
    getAppointmentsByChart: `${BASE_URL_USER}/dashboard/getAppointmentsByChart`,
    getCountProductsByChart: `${BASE_URL_USER}/dashboard/getCountProductsByChart`
  }
};

export const EndpointsLandingPage = {
  LandingPage: {
    getAll: `${BASE_URL_LANDINGPAGE}/product/getAll`,
    typeCount: `${BASE_URL_LANDINGPAGE}/landing/typeCount`
  }
};

export const getEndpoint = (path, params = null, isCustom = false) => {
  let url = `${path}.php`;
  if (isCustom) url = path;

  if (params) {
    params.map((param) => {
      url = `${url}/${param}`;
    });
  }

  return url;
};
