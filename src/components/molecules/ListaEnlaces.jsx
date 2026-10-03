import { Nav } from "react-bootstrap";
import Titulo from "../atoms/Titulo";
import { Link } from "react-router-dom";


export default function ListaEnlaces({ titulo, enlaces }) {
    return (
        <nav>
            <Titulo nivel={3}>{titulo}</Titulo>
            <ul className="list-unstyled">
                {enlaces.map((enlace) => (
                    <li key={enlace.texto} className="nav-item">
                        {enlace.disabled ? (
                            <Nav.Link disabled className="px-0">
                                {enlace.texto}
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to={enlace.ruta} className="px-0">
                                {enlace.texto}
                            </Nav.Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}