import { useContext, useEffect, useMemo, useState } from "react";
import useRequest from "../../../../../Hooks/useRequest";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import useLoaded from "../../../../../Hooks/useLoaded";
import useNotification from "../../../../../Hooks/useNotification";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { StringsContext } from "../../../../../Context/strings.context";

const ChartAppointment = ({ needUpdate, setNeedUpdate }) => {

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.dashboard;

    const request = useRequest();
    const [data, setData] = useState([]);

    const { startFetching, finishFetching, loaded } = useLoaded();
    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        if (needUpdate) {
            fetchData();
            setNeedUpdate(!needUpdate)
        }
    }, [setNeedUpdate])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        startFetching();
        request("get", getEndpoint(EndpointsUser.Dashboard.getAppointmentsByChart))
            .then((res) => setData(res.appointments))
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {data[index].value}
            </text>
        );
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const cells = useMemo(() => {
        return data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
        ));
    }, [data]);

    const existData = () => {
        return data.some(element => element.value !== 0);
    };

    return (
        <PanelLayout loaded={loaded}>
            {existData() ? (

                <ResponsiveContainer width="100%" height={435}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {cells}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className='d-flex justify-content-center align-items-center'>
                    <p>{ViewStrings.noAppointments}</p>
                </div>
            )}
        </PanelLayout>
    );
}
export default ChartAppointment;