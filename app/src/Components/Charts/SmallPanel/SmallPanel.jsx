import classNames from "classnames";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import CustomAreaChart from "../AreaChart";

const GRAPH_OPTIONS = {
  data: [],
  color: "#45ff45",
  accessor: "uv",
  showTooltip: false,
  XAxis: {
    showXAxis: false,
    XAxisAccessor: "name",
  },
  YAxis: {
    showYAxis: false,
  },
};
const SmallPanel = ({
  title,
  amount,
  showGraph,
  graphOptions = { ...GRAPH_OPTIONS },
  onClick,
  color,
}) => {
  const mainContentClassName = classNames(
    "d-flex flex-column justify-content-center align-items-center w-100 p-2",
    { "mb-5": showGraph }
  );

  return (
    <PanelLayout onClick={onClick} className="px-0 position-relative pointer">
      {color && (
        <div
          className="position-absolute"
          style={{
            background: color,
            height: 10,
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <div className={mainContentClassName}>
        <h5 className="text-muted mb-0">{title}</h5>
        <p className="display-4 fw-bold mb-0" >{amount}</p>
      </div>
      {showGraph && (
        <div
          className="position-absolute"
          style={{ top: 88, bottom: -5, right: -5, left: -5 }}
        >
          <CustomAreaChart
            options={{
              showTooltip: graphOptions.showTooltip,
              height: 100,
              width: "101%",
            }}
            data={graphOptions.data}
            accessor={graphOptions.accessor}
            strokeColor={graphOptions.color}
            fillColor={`${graphOptions.color}99`}
          />
        </div>
      )}
    </PanelLayout>
  );
};
export default SmallPanel;
