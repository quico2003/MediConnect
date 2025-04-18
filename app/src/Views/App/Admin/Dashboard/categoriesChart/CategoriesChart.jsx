import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Cell, Pie } from 'recharts';
import { EndpointsAdmin, getEndpoint } from '../../../../../Constants/endpoints.contants';
import useRequest from '../../../../../Hooks/useRequest';
import useLoaded from '../../../../../Hooks/useLoaded';
import PanelLayout from '../../../../../Layouts/PanelLayout/PanelLayout';
import useNotification from '../../../../../Hooks/useNotification';

const CategoriesChart = ({ needUpdate, setNeedUpdate }) => {

    const request = useRequest();
    const [data, setData] = useState([])

    const { startFetching, finishFetching, loaded } = useLoaded();
    const { showNotification: errorNotification } = useNotification();

    useEffect(() => {
        if (needUpdate) {
            fetchData();
            setNeedUpdate(!needUpdate)
        }
    }, [needUpdate])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        startFetching();
        await request("get", getEndpoint(EndpointsAdmin.Dashboard.countProductsForCategory))
            .then((res) => setData(res.categories))
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    };

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
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

    return (
        <PanelLayout loaded={loaded}>
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
        </PanelLayout>
    );
};

export default CategoriesChart;