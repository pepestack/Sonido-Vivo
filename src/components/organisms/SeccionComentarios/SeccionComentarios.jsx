import { Card } from "react-bootstrap";
import { CajaComentarios } from "../../molecules/CajaComentarios/CajaComentarios";
import { FormularioComentario } from "../../molecules/FormularioComentario/FormularioComentario";
import { AvisoVacio } from "../../molecules/AvisoVacio/AvisoVacio";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function SeccionComentarios(props) {
  const comentarios = props.comentarios;

  return (
    <Card as="section" className="shadow-sm border-0 p-4 bg-white">

      <Titulo nivel={3} className="fw-bold mb-4 fs-4 border-bottom pb-2">
        Comentarios ({comentarios.length})
      </Titulo>

      <FormularioComentario onNavegar={props.onNavegar} />

      {comentarios.map((comentario) => (
        <CajaComentarios
          key={comentario.id}
          comentario={comentario}
        />
      ))}

      {comentarios.length === 0 && <AvisoVacio texto="No hay comentarios para mostrar." />}

    </Card>
  );
}