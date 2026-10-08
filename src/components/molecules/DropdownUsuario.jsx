import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icono from '../atoms/Icono'
function DropdownUsuario() {
  return (
    <Dropdown className="nav-item my-2">
      <Dropdown.Toggle className="btn orange-btn" id="dropdown-usuario">
        <Icono clase="fa-solid fa-user" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="custom-lb-container">
        <Dropdown.Item as={Link} to="/admin">Mi Cuenta</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/login">Iniciar sesión</Dropdown.Item>
        <Dropdown.Item as={Link} to="/registro">Registrarse</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUsuario;