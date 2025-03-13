import { Redirect } from "react-router-dom";
import { getToken } from "../../Config/GeneralFunctions";
import { NotFound } from "../../Views/404";
import Dashboard from "../../Views/App/Dashboard/Dashboard";
import ForgotPassword from "../../Views/Auth/ForgotPassword/ForgotPassword";
import Login from "../../Views/Auth/Login/Login";
import ResetPassword from "../../Views/Auth/ResetPassword/ResetPassword";
import InMaintenance from "../../Views/InMaintenance";
import { HomePath, Paths } from "../paths.constants";
import { Views } from "../views.constants";
import EditBook from "../../Views/App/Books/EditBook/EditBook";
import Books from "../../Views/App/Books/AllBooks/Books";
import Students from "../../Views/App/Students/AllStudents/Students";
import EditStudent from "../../Views/App/Students/EditStudent/EditStudent";
import NewBook from "../../Views/App/Books/NewBook/NewBook";
import Copies from "../../Views/App/Copy/AllCopies/copies";
import NewCopy from "../../Views/App/Copy/NewCopy/NewCopy";
import NewStudent from "../../Views/App/Students/NewStudent/NewStudent";
import Courses from "../../Views/App/Courses/AllCourses/Courses";
import EditCourse from "../../Views/App/Courses/EditCourse/EditCourse";
import NewCourse from "../../Views/App/Courses/NewCourse/NewCourse";
import Subjects from "../../Views/App/Subjects/AllSubjects/Subjects";
import EditSubject from "../../Views/App/Subjects/EditSubject/EditSubject";
import NewSubject from "../../Views/App/Subjects/NewSubject/NewSubject";
import ProfilePage from "../../Views/App/Profile/Profile";
import Account from "../../Views/App/Account/Account";
import Assign from "../../Views/App/Assign/assign";
import Unassign from "../../Views/App/Unassign/Unassign";
import StudentHistory from "../../Views/App/Students/StudentHistory/StudentHistory";
import CopyHistory from "../../Views/App/Copy/CopyHistory/CopyHistory";
import CopyInfo from "../../Views/App/Copy/CopyInfo/CopyInfo";
import PrivacyPolicy from "../../Views/PrivacyPolicy/PrivacyPolicy";
import LoginAdmin from "../../Views/Auth/Admin/Login/Login";
import HomeAdmin from "../../Views/App/Admin/Dashboard/Home";
import Categories from "../../Views/App/Admin/Categories/Categories";

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
];



export const AppRoutes = [

  
  //#region Dashboard
  getRoute(Paths[Views.home].path, Dashboard),
  //#endregion

  //#region Dashboard
  getRoute(Paths[Views.assign_book].path, Assign),
  getRoute(Paths[Views.unassign_book].path, Unassign),
  //#endregion

  //#region Administration
  getRoute(Paths[Views.books].path, Books),
  getRoute(Paths[Views.students].path, Students),
  getRoute(Paths[Views.copies].path, Copies),
  getRoute(Paths[Views.courses].path, Courses),
  getRoute(Paths[Views.subjects].path, Subjects),
  //#endregion
  getRoute(Paths[Views.privacy_policy].path, PrivacyPolicy),

  //#region Profile
  getRoute(Paths[Views.profileView].path, ProfilePage),
  getRoute(Paths[Views.accountView].path, Account),
  //#endProfile

  //#region book
  getRoute(Paths[Views.new_book].path, NewBook),
  getRoute(Paths[Views.edit_book].path, EditBook),
  //#endregion

  //#region student
  getRoute(Paths[Views.new_student].path, NewStudent),
  getRoute(Paths[Views.edit_student].path, EditStudent),
  getRoute(Paths[Views.student_history].path, StudentHistory),
  //#endregion

  //#region copies
  getRoute(Paths[Views.copy_history].path, CopyHistory),
  getRoute(Paths[Views.copy_info].path, CopyInfo),
  getRoute(Paths[Views.new_copy].path, NewCopy),
  //#endregion

  //#region courses
  getRoute(Paths[Views.new_course].path, NewCourse),
  getRoute(Paths[Views.edit_course].path, EditCourse),
  //#endregion

  //#region courses
  getRoute(Paths[Views.new_subject].path, NewSubject),
  getRoute(Paths[Views.edit_subject].path, EditSubject),
  //#endregion
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
