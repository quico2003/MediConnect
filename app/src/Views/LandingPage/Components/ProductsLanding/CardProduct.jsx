const HtmlContent = ({ html }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
};

const CardProduct = ({ product }) => {
    return (
        <div className="card shadow-sm rounded-4 overflow-hidden" style={{ width: "100%", maxWidth: "600px" }}>
            <img
                src={product.urlimage}
                className="card-img-top object-fit-cover"
                style={{ height: "250px", objectFit: "cover" }}
                alt={product.name}
            />

            <div className="card-body">
                <h5 className="card-title text-primary">{product.name}</h5>
                <HtmlContent html={product.description} />

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <div>
                        <strong>Marca:</strong> {product.brand}
                    </div>
                    <div className="text-success fw-bold">
                        ${product.price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;