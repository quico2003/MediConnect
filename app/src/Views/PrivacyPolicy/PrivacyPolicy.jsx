import { useContext } from "react";
import { StringsContext } from "../../Context/strings.context";
import GeneralLayout from "../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../Layouts/PanelLayout/PanelLayout";

const PrivacyPolicy = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.privacyPolicy;
  return (
    <GeneralLayout>
      <PanelLayout container>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          {ViewStrings.titles.privacyPolicy}
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <h6>{ViewStrings.titles.date} 07/05/2024</h6>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.description}</h4>
          <p>{ViewStrings.paragraphs.description}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.informationWeCollect}</h4>
          <p>{ViewStrings.paragraphs.informationWeCollect}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.howWeUseInformation}</h4>
          <p>{ViewStrings.paragraphs.howWeUseInformation}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.informationDisclosure}</h4>
          <p>{ViewStrings.paragraphs.informationDisclosure}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.informationSecurity}</h4>
          <p>{ViewStrings.paragraphs.informationSecurity}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>{ViewStrings.titles.changesPrivacyPolicy}</h4>
          <p>{ViewStrings.paragraphs.changesPrivacyPolicy}</p>
        </div>
        <div>
          <h4>{ViewStrings.titles.contact}</h4>
          <p>
            {ViewStrings.paragraphs.contactP1}
            <b>ecobook@gmail.com</b>
            {ViewStrings.paragraphs.contactP2}
          </p>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default PrivacyPolicy;
