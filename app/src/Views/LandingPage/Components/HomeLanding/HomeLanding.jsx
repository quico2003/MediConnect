const HomeLanding = ({ title, text }) => {

    return (
        <div id="home" className="container1 p-5 d-flex flex-column align-items-center justify-content-center text-center">
            <div style={{ maxWidth: '800px' }} className="mb-3">
                <h1>{title}</h1>
            </div>
            <div>
                <h6 style={{ maxWidth: '800px' }}>{text}</h6>
            </div>

        </div>
    );
};

export default HomeLanding;