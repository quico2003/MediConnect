import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  FormSelect as BFormSelect,
  Col,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { MdClose } from "react-icons/md";
import IconButton from "../../Buttons/IconButton";

const FormSelect = ({
  vertical = true,
  disabled,
  title,
  onClean,
  controlId,
  hideDefaultOption,
  onChange,
  value,
  required,
  options,
  placeholder,
  formGroupProps = { className: "mb-2 w-100" },
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    setCurrentValue(value || "default");
  }, [value]);

  const handleValue = (e) => {
    onChange(e);
  };

  const handleOnClean = () => {
    setCurrentValue("default");
    onClean && onClean();
  };

  const renderInput = () => {
    const inputClassName = classNames("w-100 border rounded-3 d-flex ", {
      "align-items-center": props.as !== "textarea",
      "align-items-end": props.as === "textarea",
      "hide-select-chevron pe-2": onClean,
    });

    return (
      <div className={inputClassName}>
        <BFormSelect
          {...props}
          className={`border-0 shadow-none ${props.className}`}
          style={{
            ...props.style,
            resize: props.as === "textarea" ? "none" : "vertical",
          }}
          value={value || currentValue || null}
          disabled={disabled}
     
          onChange={handleValue}
        >
          {!hideDefaultOption && (
            <option value="default" disabled>
              {placeholder || "Select..."}
            </option>
          )}
          {options?.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </BFormSelect>
        {onClean && (
          <div className="ps-2 border border-0 border-start">
            <IconButton onClick={handleOnClean} Icon={MdClose} />
          </div>
        )}
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

export default FormSelect;
