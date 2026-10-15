import { Dropdown } from "react-bootstrap"
import { Icono } from "../../atoms/Icono/Icono"

export function DropdownUsuario(props){
    function ir(evento,ruta){
        evento.preventDefault()
        props.onNavegar(ruta)
    }

    return (
    <Dropdown>
      <Dropdown.Toggle variant="" className="orange-btn" id="menu-usuario" aria-label="Menú de usuario">
        <Icono icono="fa-solid fa-user" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="menu-usuario">
        {props.opciones.map((opcion, indice) =>
          opcion.separador ? (
            <Dropdown.Divider key={`separador-${indice}`} />
          ) : (
            <Dropdown.Item key={opcion.ruta} href={opcion.ruta} onClick={(evento) => ir(evento, opcion.ruta)}>
              {opcion.texto}
            </Dropdown.Item>
          ),
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}