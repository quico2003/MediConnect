import { useEffect, useState } from "react";

const InMaintenance = () => {

    const [currentDeg, setCurrentDeg] = useState(0);

    useEffect(() => {
        let deg = currentDeg;
        let interval = null;
        interval = setInterval(() => {
            deg += 45;
            setCurrentDeg(deg);
        }, 1000)
        return () => {
            clearInterval(interval);
            interval = null;
        }
    }, [currentDeg])

    return (
        <div className="flex-column d-flex w-100 justify-content-center align-items-center h-100" style={{ userSelect: 'none' }}>
            <div className="">
                <div className="my-4 d-flex justify-content-center align-items-center position-relative">
                    <i style={{ fontSize: '20rem', color: '#999', marginTop: 50 }} className="material-icons">&#xe320;</i>
                    <div className="position-absolute  d-flex justify-content-center align-items-center w-100">
                        <i style={{ marginRight: -8, fontSize: '5rem', color: '#999', transition: '1s', rotate: `${currentDeg}deg` }} className="material-icons">&#xe8b8;</i>
                        <i style={{ marginLeft: -8, fontSize: '5rem', color: '#999', transition: '1s', rotate: `${-currentDeg + 30}deg` }} className="material-icons">&#xe8b8;</i>
                    </div>
                </div>
                <h1 className="display-4 mb-0 text-center">Page in maintenance</h1>
            </div >
        </div >
    )
}

export default InMaintenance;