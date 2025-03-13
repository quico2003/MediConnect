import { useContext } from "react";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../../Context/strings.context";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import ReactTable from "../../../../Components/Table/Table";

const Categories = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Subjects.AllSubjects;

    return(
        <GeneralLayout>

            <PanelLayout>
                

            </PanelLayout>

        </GeneralLayout>
    )

}
export default Categories;