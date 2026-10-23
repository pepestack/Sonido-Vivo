import { Titulo } from "../../atoms/Titulo/Titulo";
import { NavItem } from "../NavItem/NavItem";

// enlaces: [{ texto, ruta, deshabilitado? }]
export function ListaEnlaces(props){
    return (
        <nav>
            <Titulo nivel={3}>{props.titulo}</Titulo>
            <ul className="list-unstyled">
                {props.enlaces.map((enlace) => (
                    <NavItem
                        key={enlace.texto}
                        texto={enlace.texto}
                        ruta={enlace.ruta}
                        deshabilitado={enlace.deshabilitado}
                        className="px-0"
                        onNavegar={props.onNavegar}
                    />
                ))}
            </ul>
        </nav>
    )
}
