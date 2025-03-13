import IconButton from "../../../../Components/Buttons/IconButton";
import { BiSolidBook } from "react-icons/bi";

const CopyItem = ({ item, openUnassignModal }) => {
  return (
    <div className="d-flex justify-content-between">
      <p className="m-1">{item.book_name}</p>
      <IconButton Icon={BiSolidBook} onClick={openUnassignModal} />
    </div>
  );
};

export default CopyItem;
