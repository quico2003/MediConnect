import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import Tabs from "../../../../Components/Tabs/Tabs";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

export const StudentTabs = () => {
  const { student_guid } = useParams();
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Students.AllStudents;

  const tabs = [
    {
      id: "student_info",
      title: ViewStrings.tabs.student_info,
      path: replacePaths(Paths[Views.edit_student].path, [{ student_guid }]),
    },
    {
      id: "student_history",
      title: ViewStrings.tabs.student_history,
      path: replacePaths(Paths[Views.student_history].path, [{ student_guid }]),
    },
  ];

  return Tabs({ tabs });
};
