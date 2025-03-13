import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { replacePaths } from "../../Constants/paths.constants";
import useQuery from "../../Hooks/useQuery";
import FormControl from "../Form/FormControl/FormControl";
import { StringsContext } from "../../Context/strings.context";

const Searcher = ({ onChange, borderless, label, autoFocus, placeholder }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.General.App;

  const searchParams = useQuery();

  const { push } = useHistory();
  const { pathname } = useLocation();

  const { isMobileView } = useSelector((state) => state.Config);

  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    const searchValue = searchParams.get("search");
    if (searchValue) setCurrentValue(searchValue);
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setCurrentValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    push(replacePaths(pathname, [], [{ search: currentValue }]));
    onChange && onChange(currentValue);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ width: isMobileView ? "100%" : "auto" }}
    >
      <FormControl
        autoFocus={autoFocus}
        showMaxLength={false}
        formGroupProps={{ className: "mb-0 w-100" }}
        title={label}
        onChange={handleInput}
        value={currentValue}
        placeholder={placeholder || ViewStrings.search}
        className={`mb-0 ${borderless ? "border-0 shadow-none" : ""}`}
      />
    </Form>
  );
};

export default Searcher;
