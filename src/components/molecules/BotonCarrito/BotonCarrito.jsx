import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { Insignia } from "../../atoms/Insignia/Insignia";
import { Texto } from "../../atoms/Texto/Texto";
export function BotonCarrito(props){
    return (
        <Boton
            variante="naranja"
            onClick={props.onClick}
            etiquetaAccesible={`Carrito: ${props.cantidad} productos`}
            className={`text-nowrap ${props.className ?? ''}`.trim()}
        >
            <Icono icono="bi bi-cart-fill" className="me-1"/>
            <Texto como="span" className="d-none d-sm-inline">Carrito</Texto>
            <Insignia color="dark" redondeada className="text-white ms-1">
                {props.cantidad}
            </Insignia>
        </Boton>
    )


}
