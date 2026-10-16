import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavbarAdmin } from '../../organisms/NavbarAdmin/NavbarAdmin'
import { SidebarAdmin } from '../../organisms/SidebarAdmin/SidebarAdmin'

export function PlantillaPrivada(props) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // cierra el sidebar en móvil al elegir una opción
  function navegar(ruta) {
    setMenuAbierto(false)
    navigate(ruta)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin
        menuAbierto={menuAbierto}
        onAlternarMenu={() => setMenuAbierto((abierto) => !abierto)}
        onNavegar={navegar}
      />
      <div className="d-flex flex-grow-1 position-relative">
        <SidebarAdmin
          abierto={menuAbierto}
          rutaActual={location.pathname}
          onNavegar={navegar}
          onCerrar={() => setMenuAbierto(false)}
        />
        <main className="container my-5 pt-2 pt-lg-4 overflow-hidden">{props.children}</main>
      </div>
    </div>
  )
}
