import { Spinner } from "react-bootstrap";

const Loader = ({
  color = "secondary",
  animation = "border",
  showText = true,
  text = "Loading...",
  size = 18,
}) => {
  return (
    <div className="py-5 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
      <Spinner variant={color} animation={animation} className="my-2" />
      {showText && (
        <p className="mb-0" style={{ fontSize: size }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
