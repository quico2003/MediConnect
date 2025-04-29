const NavBar = ({}) => {

    return (
        <nav className="shadow border-bottom sticky-top d-flex flex-sm-column 
        justify-content-center flex-lg-row w-100 px-5 navbar navbar-expand-lg 
        navbar-light bg-white">
            <span>
                <img src="../../Assets/f1.png" alt="" srcset="" />
            </span>

            <div className="d-flex align-items-lg-center align-items-start gap-1 mt-2 mt-lg-0 gap-lg-4 navbar-nav">
                <a href="#home" className="text-reset nav-link">Home</a>
                <a href="#feature" className="text-reset nav-link">Feature</a>
                <a href="#products" className="text-reset nav-link">Products</a>
                <a href="/my-user/login" className="rounded-pill btn btn-outline-primary">Sign In</a>
            </div>

        </nav>
    )
}
export default NavBar;