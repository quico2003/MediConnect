import ProductsWithoutCategory from "./getAll/ProductsWithoutCategory";
import CategoriesChart from "./usersChart/UsersChart";

const HomeAdmin = () => {

    return (
        <>
            <div>
                <div>
                    <ProductsWithoutCategory />
                </div>
                <div>
                    <CategoriesChart />
                </div>
            </div>

        </>
    )


}

export default HomeAdmin;