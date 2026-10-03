

import CartBadge from "../atoms/CartBadge";
import BotonLink from "../atoms/BotonLink";
import Icono from "../atoms/Icono";
function BotonCarrito({cantidad}){

    return(
        <BotonLink  className="orange-btn"to={"/carrito"}>
            <Icono clase={"bi-cart-fill"} className="me-1" />
            Carrito
            <CartBadge color="dark" redondeada className="text-white ms-1">
                {cantidad}</CartBadge>
        </BotonLink>
    )
}

export default BotonCarrito;