import { useEffect, useState } from "react";
import { createGuid, getObjectFromObjectKey } from "src/GeneralFunctions";
import Loader from "../Loader/Loader";

const CustomTable = ({
    loading,
    data: propsData,
    columns = [],
}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const cols = [];
        for (let i = 0; i < columns.length; i++) {
            const element = columns[i];
            if (cols.length === 0) cols.push(element.accessor);
            else {
                if (cols.some(el => el === element)) cols.push(createGuid());
                else cols.push(element.accessor || createGuid());
            }
        }

        const dataX = [...getObjectFromObjectKey(propsData, cols)];
        setData([...dataX]);
    }, [propsData])

    const renderDataset = (d, index) => {
        const dataCopy = { ...d };
        const fullData = { ...dataCopy };
        delete dataCopy.original;
        return (
            Object.keys(dataCopy).map((key, colIndex) => (
                <div
                    key={colIndex}
                    className={` w-100 px-2 py-3 ${index % 2 === 0 ? 'bg-white' : 'bg-light'} ${columns[colIndex].dataClass || ''}`}
                    style={{ height: 60, ...columns[colIndex].styles, ...columns[colIndex].dataStyles }}>
                    {columns[colIndex].cell ? columns[colIndex].cell(fullData) : dataCopy[key] || '---'}
                </div>
            ))
        )
    }

    return (
        <div className="overflow-auto w-100 bg-white border rounded">
            <div className="d-flex align-items-center w-100">
                {columns.map((c, index) => (
                    <div
                        key={index}
                        className={` w-100 font-weight-bold p-2 border-bottom ${c.name ? "text-dark" : 'text-white'} ${c.titleClass || ''}`}
                        style={{ ...c.styles, ...c.titleStyles, userSelect: 'none' }}>
                        {c.name || 'button'}
                    </div>
                ))}
            </div>
            {loading ?
                <div className="p-5">
                    <Loader size={14} />
                </div>
                :
                data.length > 0 ?
                    data.map((d, index) => (
                        <div
                            key={index}
                            className={` w-100 d-flex align-items-center`}>
                            {renderDataset(d, index)}
                        </div>
                    ))
                    :
                    <div className="d-flex justify-content-center align-items-center p-5">
                        <p className="mb-0 text-muted">No data to show</p>
                    </div>
            }
        </div >
    )
}

export default CustomTable;