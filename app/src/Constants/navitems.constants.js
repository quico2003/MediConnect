import { useContext } from "react";
import { StringsContext } from "../Context/strings.context";
import { Paths } from "./paths.constants";
import { Views } from "./views.constants";

/**
 * Item structure will contains:
 * @string id: mandatory and unique
 * @string title: mandatory
 * @array items: Mandatory when no children key exist in the object
 * @array children: Mandatory when no items key exist in the object. Will must contains object og "item" type
 */

export const NavItems = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.navBar;

  const items = [
    {
      id: "dashboard_section",
      title: ViewStrings.Dashboard,
      items: [Paths[Views.homeAdmin]],
    },
    {
      id: "category_section",
      title: "categorias",
      items: [Paths[Views.categories]],
    },
    {
      id: "administration_section",
      title: ViewStrings.Assignment,
      items: [Paths[Views.assign_book], Paths[Views.unassign_book]],
    },
    {
      id: "administration_section",
      title: ViewStrings.Administration,
      items: [
        Paths[Views.courses],
        Paths[Views.subjects],
        Paths[Views.books],
        Paths[Views.students],
      ],
    },
  ];
  return items;
};
