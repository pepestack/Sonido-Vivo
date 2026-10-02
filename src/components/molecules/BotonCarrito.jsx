
import { Link } from "react-router-dom";
import CartBadge from "../atoms/CartBadge";
function BotonCarrito(){

    return(
        <Link className="btn btn-primary" to={"/carrito"}>
            Carrito
            <i className="bi-cart-fill me-1"></i>
            <CartBadge count={1}></CartBadge>
        </Link>
    )
}

export default BotonCarrito;