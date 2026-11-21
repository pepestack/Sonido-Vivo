import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useUsuario } from "../../hooks/useUsuario";

// Perfil de quien tiene la sesión iniciada en el panel (PlantillaPrivada ya exige la sesión).
// Los datos completos vienen de la API; si no se pueden leer (ej. un vendedor no tiene permiso),
// se muestran los que llegaron al iniciar sesión
export default function AdminPerfil() {
  const navigate = useNavigate();
  const sesion = useSesion();
  const consulta = useUsuario(sesion.usuario?.id);
  useTituloPagina("Mi perfil");

  const usuario = consulta.usuario ?? sesion.usuario;

  return (
    <PlantillaPrivada>
      {usuario && (
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* sin onEliminar: desde el perfil propio no se puede borrar la cuenta */}
            <PerfilUsuario
              usuario={usuario}
              onVolver={() => navigate("/admin")}
              onEditar={() => navigate(`/admin/usuarios/${usuario.id}/editar`)}
            />
          </Col>
        </Row>
      )}
    </PlantillaPrivada>
  );
}
