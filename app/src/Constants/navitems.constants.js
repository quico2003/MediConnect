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
      id: "product_section",
      title: ViewStrings.ControlPanelProducts,
      items: [
      Paths[Views.categories],
      Paths[Views.products]
    ],
    },
    {
      id: "doctors_section",
      title: ViewStrings.ControlPanelDoctors,
      items: [
        Paths[Views.doctors]
      ],
    },
  ];
  return items;
};
