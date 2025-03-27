import { Redirect } from "react-router-dom";
import { getToken } from "../../Config/GeneralFunctions";
import { NotFound } from "../../Views/404";
import ForgotPassword from "../../Views/Auth/ForgotPassword/ForgotPassword";
import Login from "../../Views/Auth/Login/Login";
import ResetPassword from "../../Views/Auth/ResetPassword/ResetPassword";
import InMaintenance from "../../Views/InMaintenance";
import { HomePath, Paths } from "../paths.constants";
import { Views } from "../views.constants";

import LoginAdmin from "../../Views/Auth/Admin/Login/Login";
import HomeAdmin from "../../Views/App/Admin/Dashboard/Home";
import Categories from "../../Views/App/Admin/Categories/AllCategories/Categories";
import NewCategory from "../../Views/App/Admin/Categories/NewCategory/NewCategory";
import EditCategory from "../../Views/App/Admin/Categories/EditCategory/EditCategory";
import Profile from "../../Views/App/Admin/Profile/Profile";
import Account from "../../Views/App/Admin/Account/Account";
import Products from "../../Views/App/Admin/Products/AllProducts/Products";
import NewProduct from "../../Views/App/Admin/Products/NewProduct/NewProduct";
import EditProduct from "../../Views/App/Admin/Products/EditProduct/EditProduct";


const getRoute = (path, component, exact = true) => ({
  path,
  component,
  exact,
});

export const AuthRoutes = [
  getRoute(Paths[Views.login].path, Login),
  getRoute(Paths[Views.signUp].path, Login),
  getRoute(Paths[Views.forgotPassword].path, ForgotPassword),
  getRoute(Paths[Views.resetPassword].path, ResetPassword),
];



export const AuthAdminRoutes = [
  getRoute(Paths[Views.loginAdmin].path, LoginAdmin),
];



export const AppAdminRoutes = [
  getRoute(Paths[Views.homeAdmin].path, HomeAdmin),

  getRoute(Paths[Views.categories].path, Categories),
  getRoute(Paths[Views.new_category].path, NewCategory),
  getRoute(Paths[Views.edit_category].path, EditCategory),
  
  getRoute(Paths[Views.products].path, Products),
  getRoute(Paths[Views.new_product].path, NewProduct),
  getRoute(Paths[Views.edit_product].path, EditProduct),
  
  getRoute(Paths[Views.profileView].path, Profile),
  getRoute(Paths[Views.accountView].path, Account),

];



export const AppRoutes = [


];

export const OtherRoutes = [
  //Special Routes
  getRoute(Paths[Views.inMaintenance].path, InMaintenance),

  //Default route must be before from NotFound route
  getRoute(
    Paths[Views.default].path,
    () => {
      const token = getToken();
      if (token) return <Redirect to={HomePath.path} />;
      else return <Redirect to={Paths[Views.login].path} />;
    },
    true
  ),
  //NotFound Route must to be the last one
  getRoute(Paths[Views.notFound].path, NotFound, false),
];
