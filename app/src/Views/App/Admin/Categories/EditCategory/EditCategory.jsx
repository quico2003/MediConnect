
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import useRequest from "../../../../../Hooks/useRequest";
import GeneralLayout from "../../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../../Layouts/SectionLayout/SectionLayout";
import useNotification from "../../../../../Hooks/useNotification";
import { useContext, useEffect, useState } from "react";

import { Endpoints, getEndpoint } from "../../../../../Constants/endpoints.contants";
import { Button } from "react-bootstrap";
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
        request("get", getEndpoint(Endpoints.Categories.get), { guid: category_guid })
            .then(res => {
                setData(res.data);
                setInitialData(res.data);
            })
            .catch(err => errorNotification("Categoria no encontrada."))
            .finally(() => setLoded(true))
    }

    const handleSubmit = () => {
        if (checkForm()) {
            request("post", getEndpoint(Endpoints.Categories.update), { ...data })
                .then((res) => {
                    push(Paths[Views.categories].path);
                    successNotification("Category updated", true);
                })
                .catch(() => errorNotification("Error updated category", true));
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
                    <Button disabled={!checkForm()} onClick={handleSubmit}>
                        Update
                    </Button>
                </div>
            </PanelLayout>
        </GeneralLayout>
    );

}
export default EditCategory;