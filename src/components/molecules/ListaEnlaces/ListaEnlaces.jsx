import { Nav } from "react-bootstrap";
import { Titulo } from "../../atoms/Titulo/Titulo";



export function ListaEnlaces(props){
    function ir(evento,ruta){
        evento.preventDefault()
        props.onNavegar(ruta)
    }
    
    return (
        <nav>
            <Titulo nivel={3}>{props.titulo}</Titulo>
            <ul className="list-unstyled">
                {props.enlaces.map((enlace) => (
                    <li key={enlace.texto} className="nav-item">
                        {enlace.deshabilitado ? (
                            <Nav.Link disabled className="px-0">
                                {enlace.texto}
                            </Nav.Link>
                        ) : (
                            <Nav.Link href={enlace.ruta} className="px-0" onClick={(evento) => ir(evento,enlace.ruta)}>
                                {enlace.texto}
                            </Nav.Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}