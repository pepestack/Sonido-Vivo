import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";

// Perfil de quien tiene la sesión iniciada en el panel
export default function AdminPerfil() {
  const navigate = useNavigate();
  const sesion = useSesion();
  useTituloPagina("Mi perfil");

  return (
    <PlantillaPrivada>
      {sesion.usuario ? (
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
      ) : (
        <AvisoVacio
          titulo="No hay una sesión iniciada"
          texto="Inicia sesión para ver tu perfil."
          textoBoton="Iniciar sesión"
          onAccion={() => navigate("/login", { state: { desde: "/admin/perfil" } })}
        />
      )}
    </PlantillaPrivada>
  );
}
