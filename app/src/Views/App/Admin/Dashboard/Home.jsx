import { useState } from "react";
import ProductsWithoutCategory from "./getAll/ProductsWithoutCategory";
import CategoriesChart from "./usersChart/UsersChart";

const HomeAdmin = () => {
    const [needUpdate, setNeedUpdate] = useState(false);

    return (
        <>
            <div>
                <div>
                    <ProductsWithoutCategory setNeedUpdate={setNeedUpdate} />
                </div>
                <div>
                    <CategoriesChart needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} />
                </div>
            </div>

        </>
    )


}

export default HomeAdmin;