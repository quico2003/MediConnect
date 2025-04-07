import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useRequest from "../../../../../Hooks/useRequest";
import useNotification from "../../../../../Hooks/useNotification";
import { useContext, useEffect, useState } from "react";
import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import { Button } from "react-bootstrap";
import FormControlPassword from "../../../../../Components/Form/FormControl/FormControlPassword";
import { validateDataCreateUser } from "../../../../../Config/GeneralFunctions";
import { EmailRegex } from "../../../../../Utils/Regex";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";
import { StringsContext } from "../../../../../Context/strings.context";

const EditUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.user;

    const request = useRequest();
    const { push } = useHistory();

    const { user_guid } = useParams();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});
    const [initialData, setInitialData] = useState({});

    const [loaded, setLoded] = useState(false);

    useEffect(() => {
        fetchData();
    }, [user_guid]);

    const fetchData = async () => {
        request("get", getEndpoint(EndpointsAdmin.Users.get), { guid: user_guid })
            .then((res) => {
                setData(res.data);
                setInitialData(res.data);
            })
            .catch(() => errorNotification(ViewStrings.errors.userNotFound))
            .finally(() => setLoded(true))
    }

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(EndpointsAdmin.Users.update), { ...data })
                .then(() => {
                    push(Paths[Views.users].path);
                    successNotification(ViewStrings.edit.userUpdated);
                })
                .catch((err) => errorNotification(err.message));
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const checkForm = () => {
        const { firstName, secondName, specialty, email, password } = data;
        return validateDataCreateUser([firstName, secondName, specialty, email, password])
            && JSON.stringify(data) !== JSON.stringify(initialData);
    }

    return (
        <GeneralLayout showBackButton title={ViewStrings.edit.title}>
            <PanelLayout loaded={loaded}>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="firstName"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.edit.firstName}
                        value={data.firstName}
                        onChange={handleInput}
                        placeholder={ViewStrings.edit.placeholderFirstName}
                    />
                    <FormControl
                        required
                        controlId="secondName"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.edit.lastName}
                        value={data.secondName}
                        onChange={handleInput}
                        placeholder={ViewStrings.edit.placeholderLastName}
                    />
                    <FormControl
                        required
                        controlId="specialty"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.edit.specialty}
                        value={data.specialty}
                        onChange={handleInput}
                        placeholder={ViewStrings.edit.placeholderSpecialty}
                    />
                    <FormControl
                        required
                        controlId="email"
                        showMaxLength={true}
                        vertical={false}
                        title={ViewStrings.edit.email}
                        value={data.email}
                        onChange={handleInput}
                        placeholder={ViewStrings.edit.placeholderEmail}
                        isInvalid={data.email && !EmailRegex.test(data.email)}
                    />
                    <FormControlPassword
                        required
                        controlId="password"
                        vertical={true}
                        title={ViewStrings.edit.password}
                        value={data.password}
                        onChange={handleInput}
                        type={"password"}
                        placeholder={ViewStrings.edit.placeholderPassword}
                        isInvalid={data.password && data.password.length < 6}
                    />
                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        {ViewStrings.buttonUpdate}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    )

}
export default EditUser;