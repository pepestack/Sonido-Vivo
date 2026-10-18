import { Card, ListGroup } from "react-bootstrap";
import { Insignia } from "../../atoms/Insignia/Insignia";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { BarraAcciones } from "../../molecules/BarraAcciones/BarraAcciones";
import { iniciales, nombreCompleto } from "../../../utils/formato";

export function PerfilUsuario({ usuario, onVolver, onEditar, onEliminar }) {
  const nombre = nombreCompleto(usuario);
  const esAdmin = usuario.rol === "Administrador";

  return (
    <Card as="article" className="shadow-sm border-0">
      <Card.Header as="header" className="bg-dark text-white text-center py-4">
        <Titulo nivel={2} className="h4 mb-0">Perfil de usuario</Titulo>
      </Card.Header>
      <Card.Body className="p-4 p-md-5">
        <figure className="text-center mb-4">
          <span className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold perfil">
            {iniciales(nombre)}
          </span>
          <figcaption>
            <Titulo nivel={3} className="h5 mt-3 mb-0">{nombre}</Titulo>
            <Texto className="text-muted">{usuario.rol}</Texto>
          </figcaption>
        </figure>

        <ListGroup variant="flush" className="mb-5">
          <ListGroup.Item className="d-flex justify-content-between px-0 py-3">
            <b className="text-muted">ID de empleado</b>
            <span>{usuario.id}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0 py-3">
            <b className="text-muted">Correo electrónico</b>
            <span>{usuario.correo}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0 py-3">
            <b className="text-muted">Comuna</b>
            <span>{usuario.comuna}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 py-3">
            <b className="text-muted">Rol</b>
            <Insignia color={esAdmin ? "danger" : "dark"} className="px-3 py-2">{usuario.rol}</Insignia>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between px-0 py-3">
            <b className="text-muted">Estado de la cuenta</b>
            <span className={`fw-bold ${usuario.activo ? "text-success" : "text-danger"}`}>
              {usuario.activo ? "Activo" : "Inactivo"}
            </span>
          </ListGroup.Item>
        </ListGroup>

        {/* sin onEliminar la barra no muestra el botón: el administrador no se puede eliminar */}
        <BarraAcciones
          className=""
          onVolver={onVolver}
          onEditar={onEditar}
          onEliminar={esAdmin ? undefined : onEliminar}
        />
      </Card.Body>
    </Card>
  );
}
