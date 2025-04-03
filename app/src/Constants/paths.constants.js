import { Views } from "./views.constants";

const getPath = (path, title = null, icon = null) => ({
  path,
  title,
  icon,
});

export const Paths = {

  //#region Administrator
  [Views.loginAdmin]: getPath(`/my-admin`),
  [Views.homeAdmin]: getPath(`/my-admin/home`, "SideBarHome", "e88a"),

  [Views.categories]: getPath(`/my-admin/categories`, "SideBarCategories", "e574"),
  [Views.new_category]: getPath(`/my-admin/categories/new`),
  [Views.edit_category]: getPath(`/my-admin/categories/edit/:category_guid`),
  
  [Views.products]: getPath(`/my-admin/products`, "SideBarProducts", "f05b"),
  [Views.new_product]: getPath(`/my-admin/products/new`),
  [Views.edit_product]: getPath(`/my-admin/products/edit/:product_guid`),
  
  [Views.users]: getPath(`/my-admin/users`, "SideBarUsers", "f109"),
  [Views.new_user]: getPath(`/my-admin/users/new`),
  [Views.edit_user]: getPath(`/my-admin/users/edit/:user_guid`),

  [Views.profileView]: getPath(`/my-admin/profile`),
  [Views.accountView]: getPath(`/my-admin/account`),

  [Views.privacyPolicy]: getPath("/my-admin/privacy-Policy"),

  //#region General
  [Views.default]: getPath(`/`),
  [Views.notFound]: getPath("*"),
  [Views.inMaintenance]: getPath("/in-maintenance"),
  //#endregion

  //#region Auth
  [Views.login]: getPath(`/login`),
  [Views.signUp]: getPath(`/sign-up`),
  [Views.forgotPassword]: getPath(`/forgot-password`),
  [Views.resetPassword]: getPath(`/reset-password/:recoverycode`),
  //#endregion

  //#region Dashboard
  [Views.home]: getPath("/home", "SideBarHome", "e88a"),
  //#endregion

};

export const HomePath = Paths[Views.home];

export const replacePaths = (path, params, search = [], getObject = false) => {
  let newPath = path.path || path;
  let keys, key, value;
  params.map((obj) => {
    keys = Object.keys(obj);
    key = keys[0];
    value = obj[key];
    newPath = newPath.replace(`:${key}`, value);
  });

  if (search.length) newPath = `${newPath}?`;
  search.map((query) => {
    keys = Object.keys(query);
    key = keys[0];
    value = query[key];
    newPath = `${newPath}${key}=${value}&`;
  });

  if (getObject) {
    if (path.path) {
      path.path = newPath;
      return path;
    } else return newPath;
  }
  return newPath;
};
