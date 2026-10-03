import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function DropdownUsuario() {
  return (
    <Dropdown className="nav-item my-2">
      <Dropdown.Toggle className="btn orange-btn" id="dropdown-usuario">
        <i className="fa-solid fa-user"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/cuenta">Mi Cuenta</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/login">Iniciar sesión</Dropdown.Item>
        <Dropdown.Item as={Link} to="/registro">Registrarse</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUsuario;