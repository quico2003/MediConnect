import { useEffect } from "react";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";

const MenuAppointmentsModal = ({ show, onClose, data }) => {

    useEffect(() => {
        console.log(data);
        console.log(onClose);

    }, [show])

    const hideModal = () => {
        onClose(true);
    }

    return (
        <ModalLayout
            show={show}
            onHide={hideModal}
            size="md"
            header={true}
            customHeader={
                <div>
                    Menu
                </div>
            }
            footer={
                <div>
                    {data?.id}
                </div>
            }
        ></ModalLayout>
    )


}
export default MenuAppointmentsModal;