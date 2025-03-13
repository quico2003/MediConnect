import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  FormCheck as BFormCheck,
  Col,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

const FormSwitch = ({
  vertical = true,
  title,
  controlId,
  onChange,
  value = "",
  required,
  inputClassname,
  formGroupProps = { className: "mb-2 w-100" },
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleValue = (e) => {
    const { checked } = e.target;
    onChange(e);
  };

  const renderInput = () => {
    const inputClassName = classNames(
      "w-100 rounded-3 d-flex ",
      inputClassname
    );

    const inputEditorClassName = classNames("border-0", props.className);

    return (
      <div className={inputClassName}>
        <BFormCheck
          {...props}
          className={inputEditorClassName}
          style={{
            ...props.style,
          }}
          checked={value != "" ? value : currentValue}
          onChange={handleValue}
        />
      </div>
    );
  };

  const renderHorizontalLayout = () => (
    <FormGroup
      controlId={controlId}
      className={formGroupProps?.className || "mb-2 w-100"}
    >
      <Row>
        <Col
          sm={12}
          lg={4}
          className="d-flex justify-content-start align-items-start pt-2"
        >
          {title && (
            <FormLabel className="mb-0">
              {title} {required && <span className="text-danger">*</span>}
            </FormLabel>
          )}
        </Col>
        <Col
          sm={12}
          lg={8}
          className="d-flex justify-content-start align-items-center"
        >
          {renderInput()}
        </Col>
      </Row>
    </FormGroup>
  );
  const renderVerticalLayout = () => (
    <FormGroup
      controlId={controlId}
      className={formGroupProps?.className || "mb-2 w-100"}
    >
      {title && (
        <FormLabel className="mb-0">
          {title} {required && <span className="text-danger">*</span>}
        </FormLabel>
      )}
      {renderInput()}
    </FormGroup>
  );

  return vertical ? renderVerticalLayout() : renderHorizontalLayout();
};

export default FormSwitch;
