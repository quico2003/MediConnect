import { useContext, useEffect, useState, forwardRef } from "react";
import { Form, FormControl } from "react-bootstrap";

const Searcher = forwardRef(({ onChange, borderless, label, autoFocus, placeholder }, ref) => {
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    if (autoFocus && ref && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus, ref]);

  const handleInput = (e) => {
    const { value } = e.target;
    setCurrentValue(value);
    onChange && onChange(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl
        id="inputRead"
        ref={ref}
        autoFocus={autoFocus}
        showMaxLength={false}
        formGroupProps={{ className: "mb-0 w-100" }}
        title={label}
        onChange={handleInput}
        value={currentValue}
        placeholder={placeholder}
        className={`mb-0 ${borderless ? "border-0 shadow-none" : ""}`}
      />
    </Form>
  );
});

export default Searcher;
