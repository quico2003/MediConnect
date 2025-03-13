import {
  FaFaceDizzy,
  FaFaceFrown,
  FaFaceMeh,
  FaFaceSmile,
  FaFaceGrinStars,
} from "react-icons/fa6";
import IconButton from "../../../../Components/Buttons/IconButton";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

const StateByFacesComponent = ({ data, setData }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.Modal;
  const handleState = (state) => {
    setData({ ...data, state });
  };

  return (
    <>
      <div className>
        <h5 className="m-1">{ViewStrings.state}</h5>
        <div className="border border-gray rounded-3 ">
          <div className="d-flex justify-content-around bg-light p-2">
            <div>
              <IconButton
                active={data.state === 0}
                size={40}
                Icon={FaFaceDizzy}
                onClick={() => handleState(0)}
              />
            </div>
            <div>
              <IconButton
                active={data.state === 1}
                size={40}
                Icon={FaFaceFrown}
                onClick={() => handleState(1)}
              />
            </div>
            <div>
              <IconButton
                active={data.state === 2}
                size={40}
                Icon={FaFaceMeh}
                onClick={() => handleState(2)}
              />
            </div>
            <div>
              <IconButton
                active={data.state === 3}
                size={40}
                Icon={FaFaceSmile}
                onClick={() => handleState(3)}
              />
            </div>
            <div>
              <IconButton
                active={data.state === 4}
                size={40}
                Icon={FaFaceGrinStars}
                onClick={() => handleState(4)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateByFacesComponent;
