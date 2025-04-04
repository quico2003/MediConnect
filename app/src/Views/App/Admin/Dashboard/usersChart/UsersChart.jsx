import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Endpoints, getEndpoint } from '../../../../../Constants/endpoints.contants';
import useRequest from '../../../../../Hooks/useRequest';
import useLoaded from '../../../../../Hooks/useLoaded';
import PanelLayout from '../../../../../Layouts/PanelLayout/PanelLayout';
import useNotification from '../../../../../Hooks/useNotification';

const CategoriesChart = ({ needUpdate, setNeedUpdate }) => {

    const request = useRequest();
    const [data, setData] = useState([])

    const { startFetching, finishFetching, fetching, loaded } = useLoaded();
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
        return await request("get", getEndpoint(Endpoints.Dashboard.countProductsForCategory))
            .then((res) => setData(res.categories))
            .catch((err) => errorNotification(err.message))
            .finally(() => finishFetching());
    };

    return (
        <PanelLayout loaded={loaded}>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="productsCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>


        </PanelLayout>

    );

}
export default CategoriesChart;