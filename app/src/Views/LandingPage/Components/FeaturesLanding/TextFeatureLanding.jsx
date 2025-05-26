import { FaArrowAltCircleRight } from "react-icons/fa";

const TextFeatureLanding = ({ title, subtitle, description, items }) => {

    return (
        <div style={{ minWidth: "50%", height: "100%" }} className="px-2 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
                {title && <h3> {title} </h3>}
                {subtitle && <h5> {subtitle} </h5>}
            </div>
            <p>{description}</p>
            <div className="d-flex flex-column w-100">
                {items && items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-start ps-5 align-items-start gap-2 mb-2">
                        <div><FaArrowAltCircleRight className="text-primary mt-1" /></div>
                        <div className="d-flex">
                            <span className="fw-bold d-block me-2">{item.title}:</span>
                            <span className="text-muted">{item.description}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}
export default TextFeatureLanding;