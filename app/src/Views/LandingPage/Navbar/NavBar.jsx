import { useState } from "react";
import logo from "../../../Assets/images/Logo/logo-maximised-user.png"

const NavBar = ({ }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <nav style={{ height: "80px", zIndex: 999}} className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow py-0 px-5 w-100 position-fixed">
            <span className="navbar-brand">
                <img src={logo} alt="logo" width="200px" />
            </span>

            {/*boton amburgesa*/}
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-controls="navbarSupportedContent"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/*collapse*/}
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
                <ul className="d-flex flex-row justify-content-around navbar-nav ms-auto gap-2 gap-lg-4 align-items-lg-center m-4">
                    <li className="nav-item">
                        <a href="#home" className="btn1 nav-link text-reset">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#feature" className="btn1 nav-link text-reset">Feature</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="btn1 nav-link text-reset">Products</a>
                    </li>
                    <li className="nav-item">
                        <a href="/my-user/login" className="btn btn-outline-primary rounded-pill">Sign In</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;