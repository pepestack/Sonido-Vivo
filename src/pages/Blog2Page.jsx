import { Card } from "react-bootstrap";
import { Imagen } from "../components/atoms/Imagen/Imagen";
import { Texto } from "../components/atoms/Texto/Texto";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { SeccionComentarios } from "../components/organisms/SeccionComentarios/SeccionComentarios";
import { blog2 } from "../data/blog2";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function Blog2Page() {
  useTituloPagina(blog2.titulo);

  return (
    <PlantillaPublica>
      <Card
        as="article"
        className="shadow-sm border-0 bg-light p-4 mb-5"
      >
        <div className="text-center mb-4">
          <Imagen
            src={blog2.imagen}
            alt={blog2.alt}
            className="img-fluid rounded border w-100 shadow-sm blog-img-articulo blog-img-centro-30"
          />
        </div>

        <Titulo nivel={2} className="fw-bold mb-3">
          {blog2.titulo}
        </Titulo>

        <div className="text-muted lh-lg">
          {blog2.contenido.map((parrafo) => (
            <Texto key={parrafo.id} className="mb-3">
              {parrafo.texto}
            </Texto>
          ))}
        </div>
      </Card>

      <SeccionComentarios comentarios={blog2.comentarios} />
    </PlantillaPublica>
  );
}