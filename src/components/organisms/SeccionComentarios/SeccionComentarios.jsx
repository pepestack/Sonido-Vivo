import { CajaComentarios } from "../../molecules/CajaComentarios/CajaComentarios";
import { FormularioComentario } from "../../molecules/FormularioComentario/FormularioComentario";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function SeccionComentarios({ comentarios, onNavegar }) {
  return (
    <section className="card shadow-sm border-0 p-4 bg-white">

      <Titulo nivel={3} className="fw-bold mb-4 fs-4 border-bottom pb-2">
        Comentarios ({comentarios.length})
      </Titulo>

      <FormularioComentario onNavegar={onNavegar} />

      {comentarios.map((comentario) => (
        <CajaComentarios
          key={comentario.id}
          comentario={comentario}
        />
      ))}

      {comentarios.length === 0 && (
        <Texto className="text-muted text-center py-4">
          No hay comentarios para mostrar.
        </Texto>
      )}

    </section>
  );
}