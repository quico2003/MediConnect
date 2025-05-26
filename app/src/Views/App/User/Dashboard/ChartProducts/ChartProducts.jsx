import { useContext, useEffect, useMemo, useState } from "react";
import useRequest from "../../../../../Hooks/useRequest";
import useLoaded from "../../../../../Hooks/useLoaded";
import useNotification from "../../../../../Hooks/useNotification";
import { EndpointsUser, getEndpoint } from "../../../../../Constants/endpoints.contants";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { StringsContext } from "../../../../../Context/strings.context";

const ChartProducts = ({ needUpdate, setNeedUpdate }) => {

    const request = useRequest();
    const [data, setData] = useState([]);

    const { strings } = useContext(StringsContext);
    const ViewStrings = strings.User.dashboard;

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
        request("get", getEndpoint(EndpointsUser.Dashboard.getCountProductsByChart))
            .then((res) => setData(res.products))
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

 


    const cells = useMemo(() => {
        return data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
        ));
    }, [data]);

    return (
        <PanelLayout loaded={loaded}>
            {data.length !== 0 ? (

                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <Bar dataKey="value" fill="#8884d8" label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getRandomColor()} />
                            ))}
                        </Bar>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className='d-flex justify-content-center align-items-center'>
                    <p>{ViewStrings.noProducts}</p>
                </div>
            )}
        </PanelLayout>
    )

}
export default ChartProducts;