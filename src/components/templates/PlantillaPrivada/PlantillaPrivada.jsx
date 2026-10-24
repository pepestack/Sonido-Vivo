import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { NavbarAdmin } from '../../organisms/NavbarAdmin/NavbarAdmin'
import { SidebarAdmin } from '../../organisms/SidebarAdmin/SidebarAdmin'
import { Footer } from '../../organisms/Footer/Footer'
import { ModalConfirmacion } from '../../molecules/ModalConfirmacion/ModalConfirmacion'
import { sidebarPrincipal, sidebarSecundario } from '../../../data/navegacion'
import { useSesion } from '../../../context/SesionContext'
import { esCliente } from '../../../utils/roles'

export function PlantillaPrivada(props) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  // el botón "Cerrar Sesión" solo abre el modal; la sesión se cierra al confirmar
  const [confirmandoSalida, setConfirmandoSalida] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const sesion = useSesion()

  // cierra el sidebar en móvil al elegir una opción
  function navegar(ruta) {
    setMenuAbierto(false)
    navigate(ruta)
  }

  // no se navega aquí: al quedar sin sesión, el control de acceso de abajo lleva a /login
  function cerrarSesion() {
    setConfirmandoSalida(false)
    sesion.cerrarSesion()
  }

  // Control de acceso: todas las páginas del panel usan esta plantilla.
  // Sin sesión se va al login (y vuelve aquí al ingresar); un cliente no tiene acceso al panel
  if (!sesion.usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }
  if (esCliente(sesion.usuario)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* d-print-none: al imprimir (ej. una boleta) solo sale el contenido principal */}
      <div className="d-print-none">
        <NavbarAdmin
          menuAbierto={menuAbierto}
          onAlternarMenu={() => setMenuAbierto((abierto) => !abierto)}
          onNavegar={navegar}
          onCerrarSesion={() => setConfirmandoSalida(true)}
        />
      </div>
      <div className="d-flex flex-grow-1 position-relative">
        <SidebarAdmin
          abierto={menuAbierto}
          itemsPrincipales={sidebarPrincipal}
          itemsSecundarios={sidebarSecundario}
          rutaActual={location.pathname}
          onNavegar={navegar}
          onCerrar={() => setMenuAbierto(false)}
        />
        <main className="container my-5 pt-2 pt-lg-4 overflow-hidden">{props.children}</main>
      </div>
      <div className="d-print-none">
        <Footer compacto />
      </div>
      <ModalConfirmacion
        visible={confirmandoSalida}
        titulo="Cerrar sesión"
        mensaje="¿Seguro que quieres cerrar tu sesión?"
        textoConfirmar="Cerrar sesión"
        variante="danger"
        onConfirmar={cerrarSesion}
        onCancelar={() => setConfirmandoSalida(false)}
      />
    </div>
  )
}
