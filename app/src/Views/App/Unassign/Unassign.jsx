import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../Context/strings.context";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import FormToCheckStudent from "./Components/FormToCheckStudent";
import CopyList from "./Components/CopyList";

const Unassign = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Unassign;

  const [step, setStep] = useState(1);

  const [data, setData] = useState({});

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <FormToCheckStudent data={data} setData={setData} setStep={setStep} />
        );
      case 2:
        return <CopyList data={data} setData={setData} setStep={setStep} />;
    }
  };

  return (
    <GeneralLayout
      title={ViewStrings.title}
      rightSection={
        data.name && (
          <h4>
            {ViewStrings.studentName} {data.name} {data.surnames}
          </h4>
        )
      }
    >
      <PanelLayout>{renderContent()}</PanelLayout>
    </GeneralLayout>
  );
};

export default Unassign;
