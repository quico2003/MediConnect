import { useContext } from "react";
import Searcher from "../../../Components/Searcher/Searcher";
import { StringsContext } from "../../../Context/strings.context";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import OrganisationPanel from "./Panels/OrganisationPanel";
import PlayersPanel from "./Panels/PlayersPanel";
import UsersPanel from "./Panels/UsersPanel";

const Search = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Search.GeneralView;

  return (
    <GeneralLayout
      title={ViewStrings.title}
      rightSection={<Searcher placeholder={ViewStrings.searchPlaceholder} />}
    >
      <PanelLayout>
        <OrganisationPanel />
        <UsersPanel />
        <PlayersPanel />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Search;
