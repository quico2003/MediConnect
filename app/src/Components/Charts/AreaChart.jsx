import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS_SETTINGS = {
  showXAxis: false,
  showYAxis: false,
  XAxisAccessor: "name",
};
const TOOLTIP_SETTINGS = { showTooltip: false };
const SIZES_SETTINGS = { width: 200, height: 50, responsive: false };
const CUSTOMIZATIONS_SETTINGS = {
  borderTop: false,
  borderBottom: false,
  borderRight: false,
  borderLeft: false,
  borderColor: "#222",
};

const FINAL_OPTIONS = {
  ...AXIS_SETTINGS,
  ...TOOLTIP_SETTINGS,
  ...SIZES_SETTINGS,
  ...CUSTOMIZATIONS_SETTINGS,
};

const CustomAreaChart = ({
  data,
  accessor,
  fillColor,
  strokeColor,
  options = { ...FINAL_OPTIONS },
}) => {
  const renderChart = () => (
    <div
      style={{
        borderTop: `${+options.borderTop}px solid ${options.borderColor}`,
        borderLeft: `${+options.borderLeft}px solid ${options.borderColor}`,
        borderRight: `${+options.borderRight}px solid ${options.borderColor}`,
        borderBottom: `${+options.borderBottom}px solid ${options.borderColor}`,
      }}
    >
      <ResponsiveContainer width={options.width} height={options.height}>
        <AreaChart
          width={300}
          height={50}
          data={data}
          style={{ left: -5, bottom: -5 }}
        >
          <Area
            type="monotone"
            dataKey={accessor}
            stroke={strokeColor}
            fill={fillColor}
          />
          {options.showXAxis && <XAxis dataKey={options.XAxisAccessor} />}
          {options.showYAxis && <YAxis />}
          {options.showTooltip && <Tooltip />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  if (options.responsive)
    return (
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    );
  else return renderChart();
};

export default CustomAreaChart;
