import { useContext, useEffect, useState } from "react";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import useLoaded from "../../../Hooks/useLoaded";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../Config/GeneralFunctions";
import { Button, Image, Row, Col } from "react-bootstrap";
import { PhoneRegexSpain } from "../../../Utils/Regex";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import { IoMdImages } from "react-icons/io";
import { Colors } from "../../../Utils/Colors";

const Profile = () => {
  const request = useRequest();

  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.User.Profile;
  const GeneralStrings = strings.General.App;

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, loaded } = useLoaded();

  const [profile, setProfile] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.user.profile.get))
      .then((res) => {
        setProfile(res.profile);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.user.editUser.update), {
        ...profile,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification(ViewStrings.messages.inputError);
  };

  const handleSubmitImage = (e) => {
    const file = e.target.files[0];
    request("file", getEndpoint(Endpoints.user.profile.changeImage), {
      accessor: "image",
      image: [file],
      user: profile.user_id,
    })
      .then((res) => {
        setProfile({ ...profile, avatar: res.file });
        successNotification(ViewStrings.messages.profileUpdated);
        window.location.reload();
      })
      .catch((err) => {
        switch (err.code) {
          case 415:
            errorNotification(ViewStrings.messages.errorImageType);
            break;
          default:
            errorNotification(err.code);
            break;
        }
      });
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const checkForm = () => {
    const { name, surnames, phone } = profile;
    return validateData([name, surnames, phone]) && PhoneRegexSpain.test(phone);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <GeneralLayout showBackButton={true} title={ViewStrings.title}>
        <PanelLayout loaded={loaded}>
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
              controlId="name"
              maxLength={50}
              showMaxLength
              vertical={false}
              value={profile.name}
              title={ViewStrings.inputs.nameInput.title}
              placeholder={ViewStrings.inputs.nameInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="surnames"
              maxLength={50}
              showMaxLength
              vertical={false}
              value={profile.surnames}
              title={ViewStrings.inputs.surnameInput.title}
              placeholder={ViewStrings.inputs.surnameInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="phone"
              maxLength={9}
              showMaxLength
              vertical={false}
              value={profile.phone}
              title={ViewStrings.inputs.phoneInput.title}
              placeholder={ViewStrings.inputs.phoneInput.placeholder}
              onChange={handleInput}
            />
          </SectionLayout>

          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button disabled={!checkForm()} onClick={handleSubmit}>
              {GeneralStrings.Update}
            </Button>
          </div>
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Profile;
