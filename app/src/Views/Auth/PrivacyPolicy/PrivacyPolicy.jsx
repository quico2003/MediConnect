import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";

const PrivacyPolicy = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.PrivacyPolicy;

    return (
        <GeneralLayout>
            <PanelLayout container className="p-4 d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <h1>Política de Privacidad</h1>
                </div>
                <br />
                <div className="p-4">
                    <h2>1. Introducción</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Bienvenido a MediConnect. En esta política de privacidad, te informamos sobre cómo recopilamos, usamos, compartimos y protegemos tus datos personales cuando usas nuestro sitio web/aplicación.
                    </div>
                </div>
                <div className="p-4">
                    <h2>2. Datos que recopilamos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Recopilamos información personal de los usuarios de las siguientes maneras:
                        <ul>
                            <li>Información proporcionada por el usuario: Cuando te registras, inicias sesión, o completas formularios en el sitio, podemos recoger información como tu nombre, correo electrónico, dirección, teléfono, etc.</li>
                            <li>Información de uso: Recopilamos automáticamente información sobre cómo interactúas con nuestro sitio, como tu dirección IP, navegador, tipo de dispositivo, y páginas visitadas.</li>
                            <li>Cookies y tecnologías similares: Usamos cookies y tecnologías de seguimiento para mejorar la experiencia de usuario y personalizar el contenido y anuncios.</li>
                        </ul>
                    </div>
                </div>
                <div className="p-4">
                    <h2>3. Cómo usamos tus datos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Usamos la información recopilada para:
                        Proporcionarte los servicios que has solicitado.
                        Mejorar la funcionalidad de nuestro sitio web y garantizar su seguridad.
                        Enviar comunicaciones sobre actualizaciones, noticias, o cambios en el servicio (si has dado tu consentimiento).
                        Personalizar tu experiencia y mostrarte contenido relevante.
                        Cumplir con obligaciones legales y resolver disputas.
                    </div>
                </div>

                <div className="p-4">
                    <h2>4. Compartir tus datos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        No vendemos ni alquilamos tu información personal. Sin embargo, podemos compartir tus datos con:
                        Proveedores de servicios: Empresas que nos ayudan a operar nuestro sitio o proporcionar servicios (por ejemplo, servicios de alojamiento web, análisis de datos).
                        Obligaciones legales: Si es necesario para cumplir con la ley o una solicitud legal, como una orden judicial.
                    </div>
                </div>
                <div className="p-4">
                    <h2> 5. Protección de tus datos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Implementamos medidas de seguridad adecuadas para proteger tus datos personales. Sin embargo, ten en cuenta que ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar la seguridad absoluta.
                    </div>
                </div>
                <div className="p-4">
                    <h2>6. Tus derechos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Dependiendo de tu ubicación, puedes tener ciertos derechos en relación con tus datos personales, incluyendo el derecho a:
                        Acceder, corregir o eliminar tu información personal.
                        Oponerte o restringir el tratamiento de tus datos.
                        Solicitar una copia de tus datos en un formato estructurado y comúnmente utilizado.
                        Si deseas ejercer cualquiera de estos derechos, contáctanos a través de info@mediconnect.com.
                    </div>
                </div>
                <div className="p-4">
                    <h2>7. Retención de datos</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Conservaremos tu información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
                    </div>
                </div>
                <div className="p-4">
                    <h2>8. Enlaces a otros sitios</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Nuestro sitio web puede contener enlaces a otros sitios web. No somos responsables de las prácticas de privacidad de esos sitios, y te recomendamos leer sus políticas de privacidad antes de proporcionar cualquier información personal.
                    </div>
                </div>
                <div className="p-4">
                    <h2>9. Cambios en esta política</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio publicando la nueva política de privacidad en esta página. La fecha de la última actualización estará al final de esta página.
                    </div>
                </div>
                <div className="p-4">
                    <h2>10. Contacto</h2>
                    <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                        Si tienes alguna pregunta sobre esta política de privacidad o sobre el tratamiento de tus datos, no dudes en ponerte en contacto con nosotros a través de info@mediconnect.com.
                    </div>
                </div>
                <div className="d-flex justify-content-center p-5">
                    <h5>MediConnect©</h5>
                </div>


            </PanelLayout>
        </GeneralLayout>
    )

}
export default PrivacyPolicy;