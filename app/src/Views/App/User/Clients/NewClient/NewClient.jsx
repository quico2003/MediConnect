import { useContext, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { validateData } from "../../../../../Config/GeneralFunctions";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Button } from "react-bootstrap";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Views } from "../../../../../Constants/views.constants";
import { Paths } from "../../../../../Constants/paths.constants";

const NewClient = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.add;

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(EndpointsUser.Clients.create), { ...data })
            .then(() => {
                successNotification(ViewStrings.messageSuccess);
                push(Paths[Views.clients].path);
            })
            .catch((err) => errorNotification(err.message));
        }
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
            <PanelLayout>
                <SectionLayout>
                    <FormControl
                    required
                    controlId="firstName"
                    showMaxLength
                    vertical={false}
                    title={ViewStrings.firstName}
                    value={data.firstName}
                    onChange={handleInput}
                    placeholder={ViewStrings.pFirstName}
                    />
                    <FormControl
                        required
                        controlId="lastName"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.lastName}
                        value={data.lastName}
                        onChange={handleInput}
                        placeholder={ViewStrings.pLastName}
                    />
                    <FormControl
                        required
                        controlId="email"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.email}
                        value={data.email}
                        onChange={handleInput}
                        placeholder={ViewStrings.pEmail}
                    />
                    <FormControl
                        required
                        controlId="phone"
                        showMaxLength
                        vertical={false}
                        title={ViewStrings.phone}
                        value={data.phone}
                        onChange={handleInput}
                        placeholder={ViewStrings.pPhone}
                    />

                </SectionLayout>

                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    )

}
export default NewClient;