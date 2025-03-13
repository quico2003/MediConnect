import { Button } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import SectionLayout from "../../Layouts/SectionLayout/SectionLayout";
import InfoProps from "../../Views/App/Copy/CopyInfo/Components/InfoProp";
import StarsComponent from "../../Views/App/Copy/CopyInfo/Components/Stars";
import moment from "moment";
import { useContext } from "react";
import { StringsContext } from "../../Context/strings.context";

const CopyHistoryModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.CopyHistory;

  const hideModal = () => {
    onClose();
  };

  return (
    <ModalLayout show={show} onHide={hideModal} size="lg">
      <SectionLayout title={ViewStrings.General.title}>
        <InfoProps title={ViewStrings.General.Nia} data={data?.student_nia} />
        <InfoProps title={ViewStrings.General.Name} data={data?.student_name} />
        <InfoProps
          title={ViewStrings.General.Email}
          data={data?.student_email}
        />
        <InfoProps
          title={ViewStrings.General.phone}
          data={data?.student_phone}
        />
      </SectionLayout>
      <SectionLayout title={ViewStrings.CopyInfo.title}>
        <InfoProps title={ViewStrings.CopyInfo.Code} data={data?.uniqid} />
        <InfoProps
          title={ViewStrings.CopyInfo.BookName}
          data={data?.book_name}
        />
        <InfoProps title={ViewStrings.CopyInfo.ISBN} data={data?.book_isbn} />
        <InfoProps
          title={ViewStrings.CopyInfo.Course}
          data={data?.course_name}
        />
        <InfoProps
          title={ViewStrings.CopyInfo.Subject}
          data={data?.subject_name}
        />
      </SectionLayout>
      <SectionLayout title={ViewStrings.Delivery.title}>
        <InfoProps
          title={ViewStrings.Delivery.deliveryDate}
          data={moment(data?.initialdate, "YYYY-MM-DD HH:mm:SS").format(
            "DD-MM-YYYY"
          )}
        />
        <InfoProps
          title={ViewStrings.Delivery.state}
          data={<StarsComponent state={data?.initialstate} />}
        />
      </SectionLayout>
      <SectionLayout title={ViewStrings.Return.title}>
        <InfoProps
          title={ViewStrings.Return.returnDate}
          data={
            data?.finaldate ? (
              moment(data?.finaldate, "YYYY-MM-DD HH:mm:SS").format(
                "DD-MM-YYYY"
              )
            ) : (
              <span className="bg-info-subtle p-1 rounded-2 ">
                {ViewStrings.InUse}
              </span>
            )
          }
        />
        <InfoProps
          title={ViewStrings.Return.state}
          data={
            data?.finaldate ? (
              <StarsComponent state={data?.finalstate} />
            ) : (
              <span className="bg-info-subtle p-1 rounded-2 ">
                {ViewStrings.InUse}
              </span>
            )
          }
        />
        <InfoProps
          title={ViewStrings.Return.Observations}
          data={data?.observations}
        />
      </SectionLayout>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="danger" size="lm" onClick={hideModal}>
          {ViewStrings.Close}
        </Button>
      </div>
    </ModalLayout>
  );
};

export default CopyHistoryModal;
