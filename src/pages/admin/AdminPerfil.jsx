import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";

// Perfil de quien tiene la sesión iniciada en el panel (PlantillaPrivada ya exige la sesión)
export default function AdminPerfil() {
  const navigate = useNavigate();
  const sesion = useSesion();
  useTituloPagina("Mi perfil");

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {/* sin onEliminar: desde el perfil propio no se puede borrar la cuenta */}
          <PerfilUsuario
            usuario={sesion.usuario}
            onVolver={() => navigate("/admin")}
            onEditar={() => navigate(`/admin/usuarios/${sesion.usuario.id}/editar`)}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  );
}
