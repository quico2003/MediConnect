import classNames from "classnames";
import { useEffect, useState } from "react";
import {
    FormControl as BFormControl,
    Button,
    Col,
    Form,
    FormGroup,
    FormLabel,
    InputGroup,
    Row,
} from "react-bootstrap";

const FormControlPassword = ({
    vertical = true,
    title,
    controlId,
    maxLength = 50,
    showMaxLength = true,
    onChange,
    value = "",
    required,
    show = false,
    inputClassname,
    formGroupProps = { className: "mb-2 w-100" },
    autoFocus,
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(show);

    const [currentValue, setCurrentValue] = useState(value || "");

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleValue = (e) => {
        const { value } = e.target;
        if (maxLength !== undefined && value.length <= maxLength) {
            // setCurrentValue(value);
            onChange(e);
        }
    };

    const renderInput = () => {
        return (
            <InputGroup className="mb-3">
                <Form.Control
                    {...props}
                    value={value}
                    onChange={handleValue}
                    type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text className="p-0">
                    <Button
                        variant="white"
                        className="bg-transparent rounded-0 d-flex justify-content-center align-items-center"
                        onClick={handleShowPassword}
                    >
                        {showPassword ? (
                            <i className="material-icons">&#xe8f5;</i>
                        ) : (
                            <i className="material-icons">&#xe8f4;</i>
                        )}
                    </Button>
                </InputGroup.Text>
            </InputGroup>
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
        <Form.Group
            controlId={controlId}
            className={formGroupProps?.className || "mb-2 w-100"}
        >
            <InputGroup>
                {title && (
                    <Form.Label className="mb-0">
                        {title} {required && <span className="text-danger">*</span>}
                    </Form.Label>
                )}
                {renderInput()}
            </InputGroup>

        </Form.Group>
    );

    return vertical ? renderVerticalLayout() : renderHorizontalLayout();
};

export default FormControlPassword;
