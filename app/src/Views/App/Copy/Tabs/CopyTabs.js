import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import Tabs from "../../../../Components/Tabs/Tabs";
import { useContext } from "react";
import { StringsContext } from "../../../../Context/strings.context";

export const CopyTabs = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.tabs;
  const { copy_uniqid } = useParams();

  const tabs = [
    {
      id: "copy_info",
      title: ViewStrings.copy_info,
      path: replacePaths(Paths[Views.copy_info].path, [{ copy_uniqid }]),
    },
    {
      id: "copy_history",
      title: ViewStrings.copy_history,
      path: replacePaths(Paths[Views.copy_history].path, [{ copy_uniqid }]),
    },
  ];

  return Tabs({ tabs });
};
