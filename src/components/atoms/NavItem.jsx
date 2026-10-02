import { Link } from "react-router-dom";

function NavItem({to, texto}){
    return(
        <li className="nav-item">
            <Link className="nav-link" to={to}>{texto}</Link>
        </li>
    )
}

export default NavItem;