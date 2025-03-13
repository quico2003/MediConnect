import { GoStarFill } from "react-icons/go";

const StarsComponent = ({ state = 0 }) => {
  return (
    <div>
      {[...new Array(state + 1).keys()].map((index) => (
        <GoStarFill />
      ))}
    </div>
  );
};

export default StarsComponent;
