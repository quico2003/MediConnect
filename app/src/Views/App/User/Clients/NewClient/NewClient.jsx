import { useContext, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { validateData } from "../../../../../Config/GeneralFunctions";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";

const NewClient = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.add;

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleSubmit = () => {
        console.log(data);
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const checkForm = () => {
        const { firstName, lastName, email, phone } = data;
        return validateData([ firstName, lastName, email, phone]);
    }

    return(
        <GeneralLayout showBackButton title={ViewStrings.title}>
        </GeneralLayout>
    )

}
export default NewClient;