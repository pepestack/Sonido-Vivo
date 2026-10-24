import { Card, ListGroup } from "react-bootstrap";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { FilaDetalle } from "../../atoms/FilaDetalle/FilaDetalle";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { BarraAcciones } from "../../molecules/BarraAcciones/BarraAcciones";
import { InsigniaRol } from "../../molecules/InsigniaRol/InsigniaRol";
import { iniciales, nombreCompleto } from "../../../utils/formato";
import { esAdministrador } from "../../../utils/roles";

export function PerfilUsuario(props) {
  const usuario = props.usuario;
  const nombre = nombreCompleto(usuario);
  const esAdmin = esAdministrador(usuario);

  return (
    <Card as="article" className="shadow-sm border-0">
      <Card.Header as="header" className="bg-dark text-white text-center py-4">
        <Titulo nivel={1} className="h4 mb-0">Perfil de usuario</Titulo>
      </Card.Header>
      <Card.Body className="p-4 p-md-5">
        <figure className="text-center mb-4">
          <Avatar tamano="lg">{iniciales(nombre)}</Avatar>
          <figcaption>
            <Titulo nivel={2} className="h5 mt-3 mb-0">{nombre}</Titulo>
            <Texto className="text-muted">{usuario.rol}</Texto>
          </figcaption>
        </figure>

        <ListGroup variant="flush" className="mb-5">
          <FilaDetalle etiqueta="ID de empleado">{usuario.id}</FilaDetalle>
          <FilaDetalle etiqueta="Correo electrónico">{usuario.correo}</FilaDetalle>
          <FilaDetalle etiqueta="Comuna">{usuario.comuna}</FilaDetalle>
          <FilaDetalle etiqueta="Rol">
            <InsigniaRol rol={usuario.rol} className="px-3 py-2" />
          </FilaDetalle>
          <FilaDetalle etiqueta="Estado de la cuenta">
            <Texto como="span" className={`fw-bold ${usuario.activo ? "text-success" : "text-danger"}`}>
              {usuario.activo ? "Activo" : "Inactivo"}
            </Texto>
          </FilaDetalle>
        </ListGroup>

        {/* sin onEliminar la barra no muestra el botón: el administrador no se puede eliminar */}
        <BarraAcciones
          className=""
          onVolver={props.onVolver}
          onEditar={props.onEditar}
          onEliminar={esAdmin ? undefined : props.onEliminar}
        />
      </Card.Body>
    </Card>
  );
}
