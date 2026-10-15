import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { Insignia } from "../../atoms/Insignia/Insignia";
export function BotonCarrito(props){
    return (
        <Boton variante="naranja" onClick={props.onClick}>
            <Icono icono="bi bi-cart-fill" className="me-1"/>
            Carrito
            <Insignia color="dark" redondeada className="text-white ms-1">
                {props.cantidad}
            </Insignia>
        </Boton>
    )

    
}

