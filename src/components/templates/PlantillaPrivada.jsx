import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../organisms/NavbarAdmin'
import SidebarAdmin from '../organisms/SidebarAdmin'

export default function PlantillaAdmin() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdmin menuAbierto={menuAbierto} onAlternarMenu={() => setMenuAbierto((abierto) => !abierto)} />
      <div className="d-flex flex-grow-1 position-relative">
        <SidebarAdmin abierto={menuAbierto} onNavegar={() => setMenuAbierto(false)} />
        <main className="container my-5 pt-2 pt-lg-4 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
