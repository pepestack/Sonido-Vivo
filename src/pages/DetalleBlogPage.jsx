import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Imagen } from "../components/atoms/Imagen/Imagen";
import { Texto } from "../components/atoms/Texto/Texto";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { SeccionComentarios } from "../components/organisms/SeccionComentarios/SeccionComentarios";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { blogs } from "../data/blogs";

export default function DetalleBlogPage() {
  const { id } = useParams();

  const blog = blogs.find(
    (articulo) => articulo.id === Number(id)
  );

  useTituloPagina(blog?.titulo ?? "Artículo no encontrado");

  if (!blog) {
    return (
      <PlantillaPublica>
        <Titulo nivel={2}>Artículo no encontrado</Titulo>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Card
        as="article"
        className="shadow-sm border-0 bg-light p-4 mb-5"
      >
        <div className="text-center mb-4">
          <Imagen
            src={blog.imagen}
            alt={blog.alt}
            className={`img-fluid rounded border w-100 shadow-sm blog-img-articulo ${blog.claseImagen ?? ""}`.trim()}
          />
        </div>

        <Titulo nivel={2} className="fw-bold mb-3">
          {blog.titulo}
        </Titulo>

        <div className="text-muted lh-lg">
          {blog.contenido.map((parrafo) => (
            <Texto key={parrafo.id} className="mb-3">
              {parrafo.texto}
            </Texto>
          ))}
        </div>
      </Card>

      <SeccionComentarios comentarios={blog.comentarios} />
    </PlantillaPublica>
  );
}