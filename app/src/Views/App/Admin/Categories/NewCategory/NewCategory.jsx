
import { useState } from "react";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import useRequest from "../../../../../Hooks/useRequest";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import { Button } from "react-bootstrap";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useNotification from "../../../../../Hooks/useNotification";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Path } from "@react-pdf/renderer";
import { Paths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";

const NewCategory = () => {

    const request = useRequest();
    const { push } = useHistory();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    const [data, setData] = useState({});

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(Endpoints.Categories.create), {...data})
                .then((res) => {
                    push(Paths[Views.categories].path);
                    successNotification("Category created", true);
                })
                .catch(() => {
                    errorNotification("Error create category", true);
                })
        }


    }

    const checkForm = () => {
        const { name, description } = data;
        return validateData([name, description]);
    }

    return (
        <GeneralLayout showBackButton title="New Category">
            <PanelLayout>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="name"
                        maxLength={50}
                        showMaxLength={true}
                        vertical={false}
                        value={data.name}
                        title="Name:"
                        onChange={handleInput}
                        placeholder="Name of the category..."
                    />
                    <FormControl
                        required
                        as="textarea"
                        controlId="description"
                        maxLength={500}
                        showMaxLength={true}
                        vertical={false}
                        value={data.description}
                        title="Description:"
                        onChange={handleInput}
                        placeholder="Description of the category..."
                    />

                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </PanelLayout>

        </GeneralLayout>

    );
}
export default NewCategory;