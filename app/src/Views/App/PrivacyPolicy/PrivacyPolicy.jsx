import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import ItemPrivacyPolicy from "../../../Components/ItemPrivacyPolicy/ItemPrivacyPolicy";

const PrivacyPolicy = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.PrivacyPolicy;

    return (
        <GeneralLayout>
            <PanelLayout container className="p-4 d-flex flex-column">
                <div className="d-flex my-4 justify-content-center">
                    <h1>{ViewStrings.title}</h1>
                </div>
                <ItemPrivacyPolicy
                    num="1"
                    title={ViewStrings.item1.title}
                    description={ViewStrings.item1.description}
                />
                <ItemPrivacyPolicy
                    num="2"
                    title={ViewStrings.item2.title}
                    description={ViewStrings.item2.description}
                    items={[ViewStrings.item2.item1, ViewStrings.item2.item2, ViewStrings.item2.item3]}
                />
                <ItemPrivacyPolicy
                    num="3"
                    title={ViewStrings.item3.title}
                    description={ViewStrings.item3.description}
                    items={[ViewStrings.item3.item1, ViewStrings.item3.item2, ViewStrings.item3.item3, ViewStrings.item3.item4, ViewStrings.item3.item5]}
                />
                <ItemPrivacyPolicy
                    num="4"
                    title={ViewStrings.item4.title}
                    description={ViewStrings.item4.description}
                />
                <ItemPrivacyPolicy
                    num="5"
                    title={ViewStrings.item5.title}
                    description={ViewStrings.item5.description}
                />
                <ItemPrivacyPolicy
                    num="6"
                    title={ViewStrings.item6.title}
                    description={ViewStrings.item6.description}
                    items={[ViewStrings.item6.item1, ViewStrings.item6.item2, ViewStrings.item6.item3, ViewStrings.item6.item4]}
                />
                <ItemPrivacyPolicy
                    num="7"
                    title={ViewStrings.item7.title}
                    description={ViewStrings.item7.description}
                />
                <ItemPrivacyPolicy
                    num="8"
                    title={ViewStrings.item8.title}
                    description={ViewStrings.item8.description}
                />
                <ItemPrivacyPolicy
                    num="9"
                    title={ViewStrings.item9.title}
                    description={ViewStrings.item9.description}
                />
                <ItemPrivacyPolicy
                    num="10"
                    title={ViewStrings.item10.title}
                    description={ViewStrings.item10.description}
                />
                <div className="d-flex justify-content-center p-5">
                    <h5>MediConnect©</h5>
                </div>


            </PanelLayout>
        </GeneralLayout>
    )

}
export default PrivacyPolicy;