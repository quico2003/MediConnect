import { getColumnValue } from "../../../../Config/GeneralFunctions";
import moment from "moment";
import { StringsContext } from "../../../../Context/strings.context";
import { useContext } from "react";

export const HistoryColumns = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Students.studentHistory;

  const getCopyState = (state) => {
    let stateElement;
    switch (state) {
      case 0:
        stateElement = (
          <span>
            <b>{ViewStrings.state.usless}</b>
          </span>
        );
        break;
      case 1:
        stateElement = (
          <span>
            <b>{ViewStrings.state.bad}</b>
          </span>
        );
        break;
      case 2:
        stateElement = (
          <span>
            <b>{ViewStrings.state.good}</b>
          </span>
        );
        break;
      case 3:
        stateElement = (
          <span>
            <b>{ViewStrings.state.veryGood}</b>
          </span>
        );
        break;
      case 4:
        stateElement = (
          <span>
            <b>{ViewStrings.state.new}</b>
          </span>
        );
        break;
      default:
        stateElement = (
          <span className="bg-info-subtle p-2 rounded-5 ">
            <b>{ViewStrings.state.inUse}</b>
          </span>
        );
        break;
    }
    return <p className="mb-0">{stateElement}</p>;
  };

  const columns = [
    {
      Header: ViewStrings.columns.book,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.book_name} </p>
        )),
      width: 125,
    },
    {
      Header: ViewStrings.columns.code,
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid} </p>),
      width: 100,
    },
    {
      Header: ViewStrings.columns.initialState,
      Cell: (row) =>
        getColumnValue(row, (item) => getCopyState(item.initialstate)),
      width: 100,
    },
    {
      Header: ViewStrings.columns.finalState,
      Cell: (row) =>
        getColumnValue(row, (item) => getCopyState(item.finalstate)),
      width: 100,
    },
    {
      Header: ViewStrings.columns.initialDate,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">
            {moment(item.initialdate, "YYYY-MM-DD HH:mm:SS").format(
              "DD-MM-YYYY"
            )}
          </p>
        )),
      width: 100,
    },
    {
      Header: ViewStrings.columns.finalDate,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">
            {item.finaldate != null ? (
              <span>
                {moment(item.finaldate, "YYYY-MM-DD HH:mm:SS").format(
                  "DD-MM-YYYY"
                )}
              </span>
            ) : (
              <span className="bg-info-subtle p-2 rounded-5 ">
                <b>{ViewStrings.state.inUse}</b>
              </span>
            )}
          </p>
        )),
      width: 100,
    },
  ];
  return columns;
};
