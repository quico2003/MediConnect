import { useEffect } from "react";

const ItemPrivacyPolicy = ({ num, title, description, items }) => {

    return (
        <div className="p-4">
            <h2>{num}. {title}</h2>
            <div className="px-3 " style={{ borderLeft: "2px solid black", }}>
                {description}
                {items && items.length > 0 && (
                    <ul>
                        {items.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
export default ItemPrivacyPolicy;