import { useEffect, useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import { changeTitle, getToken } from "./Config/GeneralFunctions";
import {
  AppAdminRoutes,
  AppRoutes,
  AuthAdminRoutes,
  AuthRoutes,
  OtherRoutes,
} from "./Constants/Routes/routes.constants";
import { LanguageContext } from "./Context/language.context";
import { StringsContext } from "./Context/strings.context";
import { TemplateContext } from "./Context/template.context";
import { UserContext } from "./Context/user.context";
import useWindowSize from "./Hooks/useWindowSize";
import AuthLayout from "./Template/AuthLayout/AuthLayout";
import DefaultTemplate from "./Template/DefaultTemplate/DefaultTemplate";
import { getLanguageSelected } from "./Utils/Translations";
import InMaintenance from "./Views/InMaintenance";
import { AdminContext } from "./Context/admin.context";

const App = () => {
  //This will manage the mobile width
  useWindowSize();

  //User Context
  const [user, setUser] = useState({ token: "", email: "" });
  const userContext = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Language Context
  const [language, setLanguage] = useState("");
  const languageContext = useMemo(
    () => ({ language, setLanguage }),
    [language]
  );

  const [strings, setStrings] = useState({});
  const stringsContext = useMemo(() => ({ strings, setStrings }), [strings]);

  const [template, setTemplate] = useState({
    menuMode: "maximised",
    menuOpen: false,
  });
  const templateContext = useMemo(
    () => ({ template, setTemplate }),
    [template, setTemplate]
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    changeTitle();
  }, []);

  //On change language
  useEffect(() => {
    const getLanguageSheet = async () => {
      return await fetch(`/Translations/${language}.json`).then((res) =>
        res.json()
      );
    };

    if (language)
      getLanguageSheet()
        .then(setStrings)
        .then(() => setLoaded(true));
    else getLanguageSelected().then(setLanguage);
  }, [language]);

  const renderRoutes = (routes, layoutType = null) =>
    routes.map((route, idx) => (
      <Route key={idx} path={route.path} exact={route.exact}>
        {layoutType === "auth" && (
          <AuthLayout>{renderContent(route)}</AuthLayout>
        )}
        {layoutType === "app" && (
          <DefaultTemplate>{renderContent(route)}</DefaultTemplate>
        )}
        {layoutType === "adminApp" && (
          <DefaultTemplate>{renderContent(route)}</DefaultTemplate>
        )}
        {layoutType === null && renderContent(route)}
      </Route>
    ));

  const renderContent = (route) =>
    route.component ? <route.component /> : <InMaintenance />;

  if (!loaded) return <Loader />;
  return (
    <LanguageContext.Provider value={languageContext}>
      <StringsContext.Provider value={stringsContext}>
        <TemplateContext.Provider value={templateContext}>
          <UserContext.Provider value={userContext}>
              <Switch>
                {renderRoutes(AuthAdminRoutes, "auth")}
                {renderRoutes(AppAdminRoutes, "adminApp")}
                {renderRoutes(AuthRoutes, "auth")}
                {renderRoutes(AppRoutes, "app")}
                {renderRoutes(OtherRoutes, getToken() && "app")}
              </Switch>
          </UserContext.Provider>
        </TemplateContext.Provider>
      </StringsContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
