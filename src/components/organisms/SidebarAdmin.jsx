import { Nav } from 'react-bootstrap'
import NavItem from '../molecules/NavItem'
import { sidebarPrincipal, sidebarSecundario } from '../../data/navegacion'

const claseItem = 'text-body d-flex align-items-center gap-2'


export default function SidebarAdmin({ abierto, onNavegar }) {
  const renderizarItems = (items) =>
    items.map((item) => (
      <NavItem
        key={item.texto}
        texto={item.texto}
        to={item.ruta}
        icono={item.icono}
        deshabilitado={item.deshabilitado}
        exacto={item.exacto}
        className={claseItem}
        onClick={onNavegar}
      />
    ))

  return (
    <aside id="sidebar" className={`sidebar p-3 border-end ${abierto ? 'abierto' : ''}`}>
      <nav className="d-flex flex-column flex-grow-1 justify-content-between">
        <Nav as="ul" variant="pills" className="flex-column gap-1 mb-auto">
          {renderizarItems(sidebarPrincipal)}
        </Nav>
        <Nav as="ul" variant="pills" className="flex-column gap-1 my-3">
          {renderizarItems(sidebarSecundario)}
        </Nav>
      </nav>
    </aside>
  )
}
