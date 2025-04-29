const SectionDefault = ({ title, text, routeImg, format = "right", className }) => {

    const isHorizontal = format === "left" || format === "right";
    const isReverse = format === "left" || format === "top";

    const containerStyle = {
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        flexDirection: isReverse
            ? (isHorizontal ? 'row-reverse' : 'column-reverse')
            : (isHorizontal ? 'row' : 'column'),
        alignItems: 'center',
        gap: '20px',
    };

    const imageStyle = {
        width: '250px',
        height: 'auto',
        objectFit: 'contain',
    };

    return (
        <div style={{ padding: '2rem' }} className={className}>
            <div>
                <h2>{title}</h2>
            </div>
            <div style={containerStyle}>
                <img src={routeImg} alt="section" style={imageStyle} />
                <div style={{ maxWidth: '500px' }}>{text}</div>
            </div>
        </div>
    );
};

export default SectionDefault;