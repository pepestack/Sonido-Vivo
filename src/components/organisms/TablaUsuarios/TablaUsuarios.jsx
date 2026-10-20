import { Card, Table } from "react-bootstrap";
import { FilaUsuarioAdmin } from "../../molecules/FilaUsuarioAdmin/FilaUsuarioAdmin";

// onVer, onEditar y onEliminar reciben el usuario completo
export function TablaUsuarios(props) {
  return (
    <Card as="section" className="shadow-sm border-0">
      <Card.Body className="p-0">
        <Table responsive hover striped className="text-nowrap mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">ID</th>
              <th scope="col">Nombre completo</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Rol/Cargo</th>
              <th scope="col" className="text-end pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* el administrador no se puede eliminar (igual que en la versión HTML) */}
            {props.usuarios.map((usuario) => (
              <FilaUsuarioAdmin
                key={usuario.id}
                usuario={usuario}
                puedeEliminar={usuario.rol !== "Administrador"}
                onVer={props.onVer}
                onEditar={props.onEditar}
                onEliminar={props.onEliminar}
              />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
