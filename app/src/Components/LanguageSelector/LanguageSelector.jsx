import { useContext, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

import "flag-icons/css/flag-icons.css";
import { StorageKeys } from "../../Constants/storekeys.constants";
import { LanguageContext } from "../../Context/language.context";
import { getAvailableLanguages } from "../../Translations";

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const [languages, setLanguages] = useState([]);

  //Get options for dropdown
  useEffect(() => {
    getAvailableLanguages().then(setLanguages);
  }, []);

  const handleLanguage = (key) => {
    localStorage.setItem(StorageKeys.LANGUAGE_SELECTED, key);
    setLanguage(key);
  };

  const langSelected = languages.find((lang) => lang.key === language);
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        className="border-0 rounded-sm w-100 d-flex align-items-center justify-content-between "
        id="language-dropdown"
        align="start"
      >
        <span
          style={{ minWidth: 24 }}
          className={`me-2 fi fi-${langSelected?.flag}`}
        ></span>
        <span className="me-2 d-none d-lg-flex">{langSelected?.label}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="m-3 w-100 border-0 shadow rounded-sm overflow-hidden"
        style={{ minWidth: 130 }}
      >
        {languages.map((lang, idx) => (
          <Dropdown.Item
            key={idx}
            onClick={() => handleLanguage(lang.key)}
            as={Button}
            variant="light"
            className="d-flex align-items-center justify-content-start py-2 px-3 m-0"
          >
            <span
              style={{ minWidth: 24 }}
              className={`me-2 fi fi-${lang.flag}`}
            ></span>
            <span>{lang.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
