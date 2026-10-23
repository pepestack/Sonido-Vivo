import { Dropdown } from "react-bootstrap"
import { Icono } from "../../atoms/Icono/Icono"

// opciones: [{ texto, ruta } | { texto, accion } | { encabezado: true, texto } | { separador: true }]
// accion: función que se ejecuta en vez de navegar (ej. cerrar sesión)
export function DropdownUsuario(props){
    function elegir(evento, opcion){
        evento.preventDefault()
        if (opcion.accion) opcion.accion()
        else props.onNavegar(opcion.ruta)
    }

    function renderizarOpcion(opcion, indice){
        if (opcion.separador) return <Dropdown.Divider key={`separador-${indice}`} />
        if (opcion.encabezado) return <Dropdown.Header key={`encabezado-${indice}`}>{opcion.texto}</Dropdown.Header>
        return (
            <Dropdown.Item key={opcion.texto} href={opcion.ruta ?? '#'} onClick={(evento) => elegir(evento, opcion)}>
              {opcion.texto}
            </Dropdown.Item>
        )
    }

    return (
    <Dropdown>
      <Dropdown.Toggle variant="" className="orange-btn" id="menu-usuario" aria-label="Menú de usuario">
        <Icono icono="fa-solid fa-user" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="menu-usuario shadow">
        {props.opciones.map(renderizarOpcion)}
      </Dropdown.Menu>
    </Dropdown>
  )
}
