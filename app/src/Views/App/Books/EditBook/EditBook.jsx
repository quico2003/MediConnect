import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../../Config/GeneralFunctions";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { IsbnRegex } from "../../../../Utils/Regex";

const EditBook = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Books.EditBook;

  const request = useRequest();
  const { push } = useHistory();

  const { book_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Books.allBooks.edit), {
      guid: book_guid,
    })
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Books.editBook.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.bookUpdated);
          push(Paths[Views.books].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification(ViewStrings.messages.inputsError);
  };

  const checkForm = () => {
    const { name, isbn, stock } = data;
    return validateData([name, isbn, stock]) && IsbnRegex.test(isbn);
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <FormControl
          controlId="name"
          maxLength={50}
          showMaxLength
          vertical={false}
          value={data.name}
          title={ViewStrings.inputs.nameInput.title}
          placeholder={ViewStrings.inputs.nameInput.placeholder}
          onChange={handleInput}
        />
        <FormControl
          controlId="isbn"
          maxLength={13}
          showMaxLength
          vertical={false}
          value={data.isbn}
          title={ViewStrings.inputs.isbnInput.title}
          placeholder={ViewStrings.inputs.isbnInput.placeholder}
          onChange={handleInput}
        />
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} onClick={handleSubmit}>
            {GeneralStrings.Update}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default EditBook;
