import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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

const CustomPieChart = ({
  data,
  accessor,
  fillColor,
  options = { ...FINAL_OPTIONS },
}) => {
  return (
    <div
      style={{
        borderTop: `${+options.borderTop}px solid ${options.borderColor}`,
        borderLeft: `${+options.borderLeft}px solid ${options.borderColor}`,
        borderRight: `${+options.borderRight}px solid ${options.borderColor}`,
        borderBottom: `${+options.borderBottom}px solid ${options.borderColor}`,
      }}
    >
      <ResponsiveContainer width={options.width} height={options.height}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={"test"}
            outerRadius={80}
            fill={fillColor}
            dataKey={accessor}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
