import { Tooltip } from "react-tooltip";

const HtmlContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const CardProduct = ({ product }) => {
    const tooltipId = `tooltip-${product.id}`;

    return (
        <>
            <div
                className="card text-center border-0 rounded-4 overflow-hidden my-tooltip"
                data-tooltip-id={tooltipId}
                style={{
                    background:
                        "linear-gradient(90deg, rgb(212, 234, 255) 0%, rgb(177, 204, 255) 100%)",
                    height: "24rem",
                }}
            >
                <div className="mt-n3">
                    <img
                        src={product.urlimage}
                        className="mx-auto d-block h-100 object-fit-cover"
                        style={{ width: "16rem" }}
                        alt={product.name}
                    />
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <div className="fs-1 fw-semibold text-black lh-1 mt-2">
                        {product.name}
                    </div>
                    <br />
                    <div className="fs-3 fw-semibold text-black lh-1 mt-2">
                        {product.brand}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardProduct;
