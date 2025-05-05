import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../../Context/strings.context";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Button, FormLabel, Spinner } from "react-bootstrap";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { EmailRegex, PhoneRegexSimple } from "../../../../../Utils/Regex";
import ReactQuill from "react-quill";
import RequiredField from "../../../../../Components/Form/RequiredField/RequiredField";


const EditClient = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.edit;

    const request = useRequest();
    const { push } = useHistory();

    const { client_guid } = useParams();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});
    const [initialData, setInitialData] = useState({});

    const [submiting, setSubmiting] = useState(false);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, [client_guid])

    const fetchData = async () => {
        request("get", getEndpoint(EndpointsUser.Clients.get), { guid: client_guid })
            .then((res) => {
                setData(res.data);
                setInitialData(res.data);
            })
            .catch((err) => errorNotification(err.message))
            .finally(() => setLoaded(true))
    }

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("post", getEndpoint(EndpointsUser.Clients.update), { ...data })
                .then(() => {
                    push(Paths[Views.clients].path);
                    successNotification(ViewStrings.messageSuccess);
                })
                .catch((err) => errorNotification(err.message))
                .finally(() => setSubmiting(false))
        }
    }

    const handleInputDescription = (e) => {
        setData({ ...data, "anotations":e});
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const checkForm = () => {
        const { first_name, last_name, email, phone, anotations } = data;
        return validateData([first_name, last_name, email, phone, anotations])
            && EmailRegex.test(email)
            && PhoneRegexSimple.test(phone)
            && JSON.stringify(data) !== JSON.stringify(initialData);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.title} >
            <PanelLayout loaded={loaded}>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="first_name"
                        maxLength={50}
                        vertical={false}
                        value={data.first_name}
                        title={ViewStrings.firstName}
                        onChange={handleInput}
                        placeholder={ViewStrings.pFirstName}
                    />
                    <FormControl
                        required
                        controlId="last_name"
                        maxLength={50}
                        vertical={false}
                        value={data.last_name}
                        title={ViewStrings.lastName}
                        onChange={handleInput}
                        placeholder={ViewStrings.pLastName}
                    />
                    <FormControl
                        required
                        controlId="email"
                        maxLength={50}
                        vertical={false}
                        value={data.email}
                        title={ViewStrings.email}
                        onChange={handleInput}
                        placeholder={ViewStrings.pEmail}
                    />
                    <FormControl
                        required
                        controlId="phone"
                        maxLength={50}
                        vertical={false}
                        value={data.phone}
                        title={ViewStrings.phone}
                        onChange={handleInput}
                        placeholder={ViewStrings.pPhone}
                    />
                    <FormLabel className="mb-0">{ViewStrings.anotations}<RequiredField /></FormLabel>
                    <ReactQuill
                        id="anotations"
                        theme="snow"
                        onChange={handleInputDescription}
                        value={data.anotations}
                    />
                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm() || submiting} onClick={handleSubmit}>
                        {submiting ? <Spinner size="sm" /> : ViewStrings.update}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    )

}
export default EditClient;