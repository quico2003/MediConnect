const HomeLanding = ({title, text}) => {

    return (
        <div id="home" className="container1 p-5 d-flex flex-column align-items-center justify-content-center">
            <div style={{ maxWidth: '800px' }} className="mb-3">
                <h2>{title}</h2>
            </div>
            <div>
                <div style={{ maxWidth: '900px' }}>{text}</div>
            </div>
            
        </div>
    );
};

export default HomeLanding;