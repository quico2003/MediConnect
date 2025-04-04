import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  FormControl as BFormControl,
  Col,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

const FormControl = ({
  vertical = true,
  title,
  controlId,
  maxLength = 50,
  showMaxLength = true,
  onChange,
  value = "",
  required,
  inputClassname,
  formGroupProps = { className: "mb-2 w-100" },
  autoFocus,
  ref,
  ...props
}) => {

  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleValue = (e) => {
    const { value } = e.target;
    if (maxLength !== undefined && value.length <= maxLength) {
      // setCurrentValue(value);
      onChange(e);
    }
  };

  const renderInput = () => {
    const inputClassName = classNames(
      "w-100 border rounded-3 d-flex ",
      {
        "align-items-center": props.as !== "textarea",
        "align-items-end": props.as === "textarea",
      },
      inputClassname
    );

    const inputEditorClassName = classNames(props.className);

    return (
      <div className={inputClassName}>
        <BFormControl
          {...props}
          ref={ref}
          className={inputEditorClassName}
          style={{
            ...props.style,
            resize: props.as === "textarea" ? "none" : "vertical",
          }}
          value={value || currentValue}
          onChange={handleValue}
          autoFocus={autoFocus || false}
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

export default FormControl;
