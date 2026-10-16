import { Card, Table } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Insignia } from "../../atoms/Insignia/Insignia";
import { nombreCompleto } from "../../../utils/formato";

export function TablaUsuarios({ usuarios, onVer, onEliminar }) {
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
            {usuarios.map((usuario) => {
              const esAdmin = usuario.rol === "Administrador";
              return (
                <tr key={usuario.id}>
                  <td className="ps-4 fw-bold">{usuario.id}</td>
                  <td>{nombreCompleto(usuario)}</td>
                  <td>{usuario.correo}</td>
                  <td>
                    <Insignia color={esAdmin ? "danger" : "dark"}>{usuario.rol}</Insignia>
                  </td>
                  <td className="text-end pe-4">
                    <Boton variante="outline-primary" tamano="sm" onClick={() => onVer(usuario.id)}>
                      Ver usuario
                    </Boton>
                    {/* el administrador no se puede eliminar (igual que en la versión HTML) */}
                    {!esAdmin && (
                      <Boton variante="outline-danger" tamano="sm" className="ms-1" onClick={() => onEliminar(usuario.id)}>
                        Eliminar
                      </Boton>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
