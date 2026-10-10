import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { Image } from "react-bootstrap";
import '../../../App.css';

export function Logo() {
    return(
        <Link 
            to="/"
            className="navbar-brand d-flex align-items-center text-decoration-none">
                <Image
                    src={logo}
                    className="logo"
                    alt="Sonido Vivo"
                />

                <span className="sv-logo-title">
                    <span className="sonido">Sonido</span>
                    <span className="vivo">Vivo</span>
                </span>
        </Link>
    );
}

