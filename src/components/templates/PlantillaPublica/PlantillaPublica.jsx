import { useLocation, useNavigate } from "react-router-dom";
import { NavbarPrincipal } from "../../organisms/NavbarPrincipal/NavbarPrincipal";
import { Footer } from "../../organisms/Footer/Footer";
import { useCarrito } from "../../../context/CarritoContext"
import { useSesion } from "../../../context/SesionContext"
import { esCliente } from "../../../services/sesionService"
import { footerCuenta, footerInfo, menuCuenta, navTienda } from "../../../data/navegacion"

export function PlantillaPublica(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const carrito = useCarrito()
  const sesion = useSesion()

  function cerrarSesion() {
    sesion.cerrarSesion()
    navigate('/')
  }

  // con sesión: saludo, acceso al panel solo para el personal y cerrar sesión
  const opcionesCuenta = sesion.usuario
    ? [
        { encabezado: true, texto: `Hola, ${sesion.usuario.nombre}` },
        ...(esCliente(sesion.usuario) ? [] : [{ texto: 'Panel de administración', ruta: '/admin' }]),
        { separador: true },
        { texto: 'Cerrar sesión', accion: cerrarSesion },
      ]
    : menuCuenta

  return(
    <div className="d-flex flex-column min-vh-100">
      <NavbarPrincipal
        enlaces={navTienda}
        menuCuenta={opcionesCuenta}
        rutaActual={location.pathname}
        totalItems={carrito.totalItems}
        onNavegar={navigate}
        onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
        />
        <main className="main-custom-margin container py-4 mb-5 flex-grow-1">{props.children}</main>
        <Footer
          enlacesInfo={footerInfo}
          enlacesCuenta={footerCuenta}
          rutaActual={location.pathname}
          onNavegar={navigate}
        />
    </div>
  )
}

