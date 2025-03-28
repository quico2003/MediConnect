
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import FormControlPassword from "../../../../../Components/Form/FormControl/FormControlPassword";
import { useState } from "react";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { Button } from "react-bootstrap";
import useRequest from "../../../../../Hooks/useRequest";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useNotification from "../../../../../Hooks/useNotification";
import { validateDataCreateUser } from "../../../../../Config/GeneralFunctions";
import { EmailRegex } from "../../../../../Utils/Regex";
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";

const NewDoctor = () => {

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleSubmit = () => {
        if(checkForm){
            request("post", getEndpoint(Endpoints.Doctors.create), {...data})
            .then((res) => {
                successNotification("Doctor exit created.");
                push(Paths[Views.doctors].path);
            })
            .catch(() => errorNotification("Error created doctor."));
        }

    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
        console.log(data);
    }

    const checkForm = () => {

        const { firstName, lastName, specialty, email, password} = data;
        return validateDataCreateUser([firstName, lastName, specialty, email, password]);

    }

    return (
        <GeneralLayout showBackButton title="New Doctor">
            <PanelLayout>
                <SectionLayout>

                    <FormControl
                        required
                        controlId="firstName"
                        showMaxLength={true}
                        vertical={false}
                        title="First name"
                        value={data.firstName}
                        onChange={handleInput}
                        placeholder="First name of the doctor"
                    />

                    <FormControl
                        required
                        controlId="lastName"
                        showMaxLength={true}
                        vertical={false}
                        title="Last name"
                        value={data.lastName}
                        onChange={handleInput}
                        placeholder="Last name of the doctor"
                    />

                    <FormControl
                        required
                        controlId="specialty"
                        showMaxLength={true}
                        vertical={false}
                        title="Specialty"
                        value={data.specialty}
                        onChange={handleInput}
                        placeholder="Specialty of the doctor"
                    />

                    <FormControl
                        required
                        controlId="email"
                        showMaxLength={true}
                        vertical={false}
                        title="email"
                        value={data.email}
                        onChange={handleInput}
                        placeholder="Email of the doctor"
                        isInvalid={data.email && !EmailRegex.test(data.email)}
                    />

                    <FormControlPassword
                        required
                        controlId="password"
                        vertical={true}
                        title="Password"
                        value={data.password}
                        onChange={handleInput}
                        type={"password"}
                        placeholder="Ex: UsEr@1423"
                        isInvalid={data.password && data.password.length < 6}
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
export default NewDoctor;