
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import useRequest from "../../../../../Hooks/useRequest";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import useNotification from "../../../../../Hooks/useNotification";
import { useContext, useEffect, useState } from "react";

import { EndpointsAdmin, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Button, Spinner } from "react-bootstrap";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { Views } from "../../../../../Constants/views.constants";
import { Paths } from "../../../../../Constants/paths.constants";
import { StringsContext } from "../../../../../Context/strings.context";

const EditCategory = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.Categories.edit;

    //Hacer peticiones y redirigir a otra pagina
    const request = useRequest();
    const { push } = useHistory();

    //recoger paramet como el guid de la ruta
    const { category_guid } = useParams();

    //notificaciones de errores o de success
    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();

    //Datos que recogera la consulta
    const [data, setData] = useState({});
    const [initialData, setInitialData] = useState({});

    const [submiting, setSubmiting] = useState(false);

    //Rueda de cargado
    const [loaded, setLoded] = useState(false);

    //Hook que se inicia cada vez que se actualiza dependiendo el array de debajo
    // useEffect(() => {
    // fechData();
    // }, [loaded, data, ...]);
    useEffect(() => {
        fechData();
    }, [category_guid]);

    const fechData = async () => {
        request("get", getEndpoint(EndpointsAdmin.Categories.get), { guid: category_guid })
            .then((res) => {
                setData(res.data);
                setInitialData(res.data);
            })
            .catch(() => errorNotification(ViewStrings.categoryNotFound))
            .finally(() => setLoded(true))
    }

    const handleSubmit = () => {
        if (checkForm()) {
            setSubmiting(true);
            request("post", getEndpoint(EndpointsAdmin.Categories.update), { ...data })
                .then(() => {
                    push(Paths[Views.categories].path);
                    successNotification(ViewStrings.categoryUpdated, true);
                })
                .catch(() => errorNotification(ViewStrings.categoryError, true))
                .finally(() => setSubmiting(false))
        }
    }

    const handleInput = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }


    const checkForm = () => {
        const { name, description } = data;
        return validateData([name, description]) && JSON.stringify(data) !== JSON.stringify(initialData);
    }

    return (

        <GeneralLayout showBackButton title={ViewStrings.editCategory}>
            <PanelLayout loaded={loaded}>
                <SectionLayout>
                    <FormControl
                        required
                        controlId="name"
                        maxLength={50}
                        vertical={false}
                        value={data.name}
                        title={ViewStrings.name}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderName}
                    />
                    <FormControl
                        style={{ minHeight: "100px" }}
                        required
                        as="textarea"
                        controlId="description"
                        maxLength={500}
                        vertical={false}
                        value={data.description}
                        title={ViewStrings.description}
                        onChange={handleInput}
                        placeholder={ViewStrings.placeholderDescription}
                    />
                </SectionLayout>
                <div className="d-flex justify-content-end align-items-center">
                    <Button disabled={!checkForm() || submiting} onClick={handleSubmit}>
                        {submiting ? <Spinner size="sm" /> : ViewStrings.buttonUpdate}
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    );

}
export default EditCategory;