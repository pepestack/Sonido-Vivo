

import { CartBadge } from "../../atoms/CartBadge/CartBadge";
import { BotonLink } from "../../atoms/BotonLink/BotonLink";
import { Icono } from "../../atoms/Icono/Icono";
export function BotonCarrito({cantidad}){

    return(
        <BotonLink  className="orange-btn"to={"/carrito"}>
            <Icono clase={"bi-cart-fill"} className="me-1" />
            Carrito
            <CartBadge color="dark" redondeada className="text-white ms-1">
                {cantidad}</CartBadge>
        </BotonLink>
    )
}

