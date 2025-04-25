import { useContext, useEffect, useState } from "react";
import { StringsContext } from "../../../../Context/strings.context";
import useRequest from "../../../../Hooks/useRequest";
import useLoaded from "../../../../Hooks/useLoaded";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { IoMdImages } from "react-icons/io";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { Button } from "react-bootstrap";
import { Colors } from "../../../../Utils/Colors";
import { validateData } from "../../../../Config/GeneralFunctions";
import { EndpointsUser, getEndpoint } from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import FormControl from "../../../../Components/Form/FormControl/FormControl";

const ProfileUser = () => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.profile;
    const GeneralStrings = strings.General.App;

    const request = useRequest();

    const { showNotification: successNotification } = useNotification("success");
    const { showNotification: errorNotification } = useNotification();


    const { startFetching, finishFetching, loaded } = useLoaded();

    const [profile, setProfile] = useState([]);
    const [initialProfile, setInitialProfile] = useState([]);

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        startFetching();

        return await request("get", getEndpoint(EndpointsUser.Auth.get))
            .then((res) => {
                setProfile(res.data);
                setInitialProfile(res.data);
            })
            .catch(errorNotification)
            .finally(() => finishFetching());
    };

    const handleSubmit = () => {
        if (checkForm()) {
          request("post", getEndpoint(EndpointsUser.Auth.updateUserProfile), { ...profile })
            .then(() => {
              successNotification(GeneralStrings.messages.profileUpdated)
              window.location.reload();
            })
            .catch((err) => errorNotification(err.message))
        }
    };

    const handleSubmitImage = (e) => {
        const file = e.target.files[0];
        request("file", getEndpoint(EndpointsUser.Auth.changeImage), {
            accessor: "image",
            image: [file],
        })
            .then((res) => {
                //reload page
                window.location.reload();
            })
            .catch((err) => {
                switch (err.code) {
                    case 415:
                        errorNotification(ViewStrings.messages.errorImageType);
                        break;
                    default:
                        errorNotification(ViewStrings.messages.errorCode);
                        break;
                }
            });
    };

    const handleInput = (e) => {
        const { id, value } = e.target;
        setProfile({ ...profile, [id]: value });
    };

    const checkForm = () => {
        const { firstName, lastName, specialty } = profile;
        return validateData([firstName, lastName, specialty]) && JSON.stringify(profile) !== JSON.stringify(initialProfile);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };


    return (
        <>
            <GeneralLayout title={ViewStrings.title}>
                <PanelLayout>
                    <h5>{ViewStrings.sections.profileImage}</h5>
                    <div className="d-flex justify-content-center ">
                        <div
                            className="bg-dark image-container d-flex justify-content-center position-relative rounded-circle "
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                className="rounded-circle"
                                src={
                                    profile.avatar ||
                                    `https://www.gravatar.com/avatar/${profile.name}?d=identicon`
                                }
                                alt="Profile"
                                style={{
                                    minHeight: "50px",
                                    width: "125px",
                                    maxWidth: "150px",
                                    height: "125px",
                                }}
                            />
                            {hovered && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        minHeight: "50px",
                                        width: "125px",
                                        maxWidth: "150px",
                                        height: "125px",
                                        backgroundColor: "#000000AA",
                                    }}
                                    className="overlay overflow-hidden  rounded-circle d-flex justify-content-center align-content-center align-items-center "
                                >
                                    <div
                                        className="position-absolute top-0 px-5 py-1 rounded-circle "
                                        style={{
                                            backgroundColor: "#A35EBF",
                                        }}
                                    >
                                        <IoMdImages color={Colors.white1} size={25} />
                                    </div>
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept="image/*"
                                        onChange={handleSubmitImage}
                                        name="ImageStyle"
                                        style={{
                                            padding: "200px",
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "18px",
                                            opacity: "0",
                                            overflow: "hidden",
                                            position: "absolute",
                                            cursor: "pointer",
                                        }}
                                        className="text-light text-center"
                                    />
                                    <div
                                        className="position-absolute bottom-0 px-5 py-1 rounded-circle"
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: "#A35EBF",
                                        }}
                                    >
                                        <p className="text-light fs-6">
                                            {ViewStrings.buttonChangeImage}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <SectionLayout title={ViewStrings.sections.basicSection}>
                        <FormControl
                            controlId="firstName"
                            maxLength={50}
                            showMaxLength
                            vertical={false}
                            value={profile.firstName}
                            title={ViewStrings.inputs.firstName.title}
                            placeholder={ViewStrings.inputs.firstName.placeholder}
                            onChange={handleInput}
                        />
                        <FormControl
                            controlId="lastName"
                            maxLength={50}
                            showMaxLength
                            vertical={false}
                            value={profile.lastName}
                            title={ViewStrings.inputs.lastName.title}
                            placeholder={ViewStrings.inputs.lastName.placeholder}
                            onChange={handleInput}
                        />
                        <FormControl
                            controlId="specialty"
                            maxLength={50}
                            showMaxLength
                            vertical={false}
                            value={profile.specialty}
                            title={ViewStrings.inputs.specialty.title}
                            placeholder={ViewStrings.inputs.specialty.placeholder}
                            onChange={handleInput}
                        />

                    </SectionLayout>

                    <div className="d-flex justify-content-end w-100 align-items-center">
                        <Button disabled={!checkForm()} onClick={handleSubmit}>
                            {GeneralStrings.update}
                        </Button>
                    </div>
                </PanelLayout>
            </GeneralLayout>
        </>
    )

}
export default ProfileUser;