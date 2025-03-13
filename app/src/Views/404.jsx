import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../Constants/paths.constants";
import { StorageKeys } from "../Constants/storekeys.constants";
import { Views } from "../Constants/views.constants";
import NotFoundComponent from "../Components/NotFoundComponent";

export const NotFound = () => {
  const { pathname } = useLocation();
  const { isMobileView } = useSelector((state) => state.Config);

  const [textToShow, setTextToShow] = useState({
    text: "404",
    description: (
      <span>
        This page does not exist.
        <br />
        Please press following button to be redirected to Home page
      </span>
    ),
  });

  useEffect(() => {
    if (pathname.includes("Y2hldHV1MTY=")) {
      setTextToShow({
        text: "😎🤘",
        description: (
          <span>
            You found the easter egg!
            <br />
            Are you on working hours? 🤨
          </span>
        ),
      });
    }
  }, [pathname]);

  const settings = {
    elasticity: 6, // 0 - 10
    zoom: isMobileView ? 2 : 4,
  };

  const [homePath, setHomePath] = useState("");

  useEffect(() => {
    document.addEventListener("mousemove", controller);
    return () => document.removeEventListener("mousemove", controller);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let token = localStorage.getItem(StorageKeys.TOKEN);
    if (token) setHomePath(Paths[Views.dashboard].path);
    else setHomePath(Paths[Views.login].path);
  }, []);

  const controller = (e) => {
    let elasticity = settings.elasticity;
    if (elasticity > 10) elasticity = 10;
    if (elasticity < 0) elasticity = 0;

    let image1 = document.getElementById("image-layer1");
    let image2 = document.getElementById("image-layer2");
    let image3 = document.getElementById("image-layer3");

    let x = window.innerWidth / 2 - e.clientX;
    let y = window.innerHeight / 2 - e.clientY;

    if (image1) {
      let { width, height } = image1.getBoundingClientRect();

      let xFinal1 = x / (10 - elasticity) / 10 - width / 2 + "px";
      let yFinal1 = y / (10 - elasticity) / 10 - height / 2 + "px";

      image1.style.top = yFinal1;
      image1.style.left = xFinal1;
    }

    if (image2) {
      let { width, height } = image2.getBoundingClientRect();

      let xFinal2 = x / (10 - elasticity) / 8 - width / 2 + "px";
      let yFinal2 = y / (10 - elasticity) / 8 - height / 2 + "px";

      image2.style.top = yFinal2;
      image2.style.left = xFinal2;
    }

    if (image3) {
      let { width, height } = image3.getBoundingClientRect();

      let xFinal3 = x / (10 - elasticity) / 6 - width / 2 + "px";
      let yFinal3 = y / (10 - elasticity) / 6 - height / 2 + "px";

      image3.style.top = yFinal3;
      image3.style.left = xFinal3;
    }
  };

  const Number = ({ id, color, text = "404" }) => (
    <b
      id={id}
      className="position-absolute text-nowrap"
      style={{ fontSize: `${5 * settings.zoom}rem`, color }}
    >
      {text}
    </b>
  );

  return (
    // <div
    //   className="d-flex justify-content-center flex-column align-items-center p-5"
    //   style={{ userSelect: "none" }}
    // >
    //   <div
    //     className="position-relative d-flex justify-content-center w-100"
    //     style={{ height: "50vh" }}
    //   >
    //     <div className="position-relative d-flex justify-content-center align-items-center m-auto">
    //       <Number id="image-layer1" color="#777" text={textToShow.text} />
    //       <Number id="image-layer2" color="#999" text={textToShow.text} />
    //       <Number id="image-layer3" color="#aaa" text={textToShow.text} />
    //     </div>
    //   </div>
    //   <div className="mb-2 d-flex flex-column justify-content-center align-items-center">
    //     <p className="mb-0 text-center">{textToShow.description}</p>
    //     <Link replace to={homePath}>
    //       Go Home 🚀
    //     </Link>
    //   </div>
    // </div>
    <NotFoundComponent
      buttonText="Go Home 🚀"
      description={textToShow.description}
      text={textToShow.text}
      to={homePath}
    />
  );
};
