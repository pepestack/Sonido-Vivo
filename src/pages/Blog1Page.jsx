import { Card } from "react-bootstrap";
import Imagen from "../components/atoms/Imagen";
import Texto from "../components/atoms/Texto";
import Titulo from "../components/atoms/Titulo";
import SeccionComentarios from "../components/organisms/SeccionComentarios";
import { blog1 } from "../data/blog1";

export default function Blog1Page() {
  return (
    <>
      <Card
        as="article"
        className="shadow-sm border-0 bg-light p-4 mb-5"
      >
        <div className="text-center mb-4">
          <Imagen
            src={blog1.imagen}
            alt={blog1.alt}
            className="img-fluid rounded border w-100 shadow-sm blog-img-articulo"
          />
        </div>

        <Titulo nivel={2} className="fw-bold mb-3">
          {blog1.titulo}
        </Titulo>

        <div className="text-muted lh-lg">
          {blog1.contenido.map((parrafo) => (
            <Texto key={parrafo.id} className="mb-3">
              {parrafo.texto}
            </Texto>
          ))}
        </div>
      </Card>

      <SeccionComentarios comentarios={blog1.comentarios} />
    </>
  );
}