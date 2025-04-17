import classNames from "classnames";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import IconButton from "../../Components/Buttons/IconButton";

const ModalLayout = ({
  show,
  onHide,
  onShow,
  header,
  customHeader,
  closeButton,
  size,
  title,
  children,
  footer,
  modalClass,
  headerClass,
  bodyClass,
  footerClass,
}) => {
  const mainModalClass = classNames("rounded-lg", "shadow-lg", modalClass);

  return (
    <Modal
      contentClassName={mainModalClass}
      show={show}
      onHide={onHide}
      onShow={onShow}
      size={size}
    >
      {header && (
        <Modal.Header className={headerClass}>
          {customHeader || (
            <div className="d-flex align-items-center justify-content-between w-100">
              <Modal.Title className="mb-0">{title}</Modal.Title>
              <div>
                {closeButton && (
                  <IconButton
                    size={24}
                    onClick={onHide}
                    Icon={MdOutlineClose}
                  />
                )}
              </div>
            </div>
          )}
        </Modal.Header>
      )}
      <Modal.Body className={bodyClass}>{children}</Modal.Body>
      {footer && <Modal.Footer className={footerClass}>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default ModalLayout;
