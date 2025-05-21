import { Redirect } from "react-router-dom";
import { getToken } from "../../Config/GeneralFunctions";
import { NotFound } from "../../Views/404";
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
import NewUser from "../../Views/App/Admin/Users/NewUser/NewUser";
import Users from "../../Views/App/Admin/Users/AllUsers/Users";
import EditUser from "../../Views/App/Admin/Users/EditUsers/EditUser";
import LoginUser from "../../Views/Auth/User/Login/login";
import HomeUser from "../../Views/App/User/Dashboard/Home";
import PrivacyPolicy from "../../Views/App/PrivacyPolicy/PrivacyPolicy";
import CompleteUser from "../../Views/Auth/User/CompleteUser/CompleteUser";
import AccountUser from "../../Views/App/User/Account/AccountUser";
import ProfileUser from "../../Views/App/User/Profile/ProfileUser";
import Clients from "../../Views/App/User/Clients/AllClients/Clients";
import NewClient from "../../Views/App/User/Clients/NewClient/NewClient";
import EditClient from "../../Views/App/User/Clients/EditClient/EditClient";
import Schedule from "../../Views/App/User/Schedule/Schedule";
import NewAppointment from "../../Views/App/User/Schedule/NewAppointment/NewAppointment";
import LandingPage from "../../Views/LandingPage/LandingPage";
import AllInfoClients from "../../Views/App/User/Clients/AllInfoClients/AllInfoClients";

const getRoute = (path, component, exact = true) => ({
  path,
  component,
  exact,
});

// Region User

export const AuthRoutes = [
  getRoute(Paths[Views.login].path, LoginUser),
  getRoute(Paths[Views.completeUser].path, CompleteUser),
];

export const AppRoutes = [
  getRoute(Paths[Views.homeUser].path, HomeUser),

  getRoute(Paths[Views.clients].path, Clients),
  getRoute(Paths[Views.new_client].path, NewClient),
  getRoute(Paths[Views.edit_client].path, EditClient),
  getRoute(Paths[Views.allInformation_client].path, AllInfoClients),

  getRoute(Paths[Views.schedule].path, Schedule),
  getRoute(Paths[Views.new_appointment].path, NewAppointment),

  getRoute(Paths[Views.accountViewUser].path, AccountUser),
  getRoute(Paths[Views.profileViewUser].path, ProfileUser),

  getRoute(Paths[Views.privacyPolicyUser].path, PrivacyPolicy),
];

// Region Admin

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

  getRoute(Paths[Views.users].path, Users),
  getRoute(Paths[Views.new_user].path, NewUser),
  getRoute(Paths[Views.edit_user].path, EditUser),

  getRoute(Paths[Views.profileView].path, Profile),
  getRoute(Paths[Views.accountView].path, Account),

  getRoute(Paths[Views.privacyPolicy].path, PrivacyPolicy),
];

export const OtherRoutes = [
  //Special Routes
  getRoute(Paths[Views.inMaintenance].path, InMaintenance),
  //Default route must be before from NotFound route
  getRoute(
    Paths[Views.landing].path,
    () => {
      const token = getToken();
      if (token) return <Redirect to={HomePath.path} />;
      else return <Redirect to={Paths[Views.landing].path} />;
    },
    true
  ),
  //NotFound Route must to be the last one
  getRoute(Paths[Views.notFound].path, NotFound, false),
];

export const PublicRoutes = [
  getRoute(Paths[Views.landing].path, LandingPage, true),
]