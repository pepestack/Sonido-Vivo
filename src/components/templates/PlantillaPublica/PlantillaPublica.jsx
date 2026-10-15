import { useLocation, useNavigate } from "react-router-dom";
import { NavbarPrincipal } from "../../organisms/NavbarPrincipal/NavbarPrincipal";
import { Footer } from "../../organisms/Footer/Footer";
import { useCarrito } from "../../../context/CarritoContext"

export function PlantillaPublica(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const carrito = useCarrito()

  return(
    <div className="d-flex flex-column min-vh-100">
      <NavbarPrincipal
        rutaActual={location.pathname}
        totalItems={carrito.totalItems}
        onNavegar={navigate}
        onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
        />
        <main className="main-custom-margin container py-4 mb-5 flex-grow-1">{props.children}</main>
        <Footer onNavegar={navigate}/>
    </div>
  )
}

