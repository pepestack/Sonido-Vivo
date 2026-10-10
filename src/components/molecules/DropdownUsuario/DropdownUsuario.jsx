import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icono } from '../../atoms/Icono/Icono'
export function DropdownUsuario({opciones}) {
  return (
    <Dropdown className="nav-item my-2">
      <Dropdown.Toggle className="btn orange-btn" id="dropdown-usuario">
        <Icono clase="fa-solid fa-user" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="custom-lb-container">
        {opciones.map((opcion, indice) =>
          opcion.separador ? (
            <Dropdown.Divider key={`separador-${indice}`} />
          ) : (
            <Dropdown.Item key={opcion.ruta} as={Link} to={opcion.ruta}>
              {opcion.texto}
            </Dropdown.Item>
          ),
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

