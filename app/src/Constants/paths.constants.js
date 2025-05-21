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

  [Views.privacyPolicy]: getPath("/my-admin/privacy-policy"),
  //#endregion
  
  

  //#region User
  [Views.login]: getPath(`/my-user/login`),
  [Views.completeUser]: getPath(`/my-user/complete-user/:user_guid`),
  [Views.homeUser]: getPath(`/my-user/home`, "SideBarHome", "e88a"),
  
  [Views.clients]: getPath(`/my-user/clients`, "SideBarClients", "e9ed"),
  [Views.new_client]: getPath(`/my-user/client/new`),
  [Views.edit_client]: getPath(`/my-user/client/edit/:client_guid`),
  [Views.allInformation_client]: getPath(`/my-user/client/allInformation_client/:client_guid`),
  
  [Views.schedule]: getPath(`/my-user/schedule`, "SideBarSchedule", "ebcc"),
  [Views.new_appointment]: getPath(`/my-user/appointment/new`),
  
  [Views.accountViewUser]: getPath(`/my-user/profile`),
  [Views.profileViewUser]: getPath(`/my-user/account`),

  [Views.privacyPolicyUser]: getPath("/my-user/privacy-policy"),
  //#endregion



  //#region General
  [Views.landing]: getPath(`/`),
  [Views.notFound]: getPath("*"),
  [Views.inMaintenance]: getPath("/in-maintenance"),
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
