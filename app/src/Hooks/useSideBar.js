import { useContext } from "react";
import { TemplateContext } from "../Context/template.context";

const useSideBar = () => {
  const { template, setTemplate } = useContext(TemplateContext);

  const toggleSideBar = () => {
    setTemplate({
      ...template,
      menuMode: template.menuMode === "maximised" ? "minimised" : "maximised",
    });
  };

  const toggleMenuOpen = () => {
    setTemplate({
      ...template,
      menuOpen: !template.menuOpen,
    });
  };

  const setMenuOpen = (menuOpen) => {
    setTemplate({
      ...template,
      menuOpen,
    });
  };

  return {
    ...template,
    expanded: template.menuMode === "maximised",
    toggleSideBar,
    toggleMenuOpen,
    setMenuOpen,
  };
};
export default useSideBar;
