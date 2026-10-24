import { useNavigate, useParams } from "react-router-dom";

import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { ArticuloBlog } from "../components/organisms/ArticuloBlog/ArticuloBlog";
import { SeccionComentarios } from "../components/organisms/SeccionComentarios/SeccionComentarios";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { blogs } from "../data/blogs";

export default function DetalleBlogPage() {
  const navigate = useNavigate();
  const params = useParams();

  const blog = blogs.find((articulo) => articulo.id === Number(params.id));

  useTituloPagina(blog?.titulo ?? "Artículo no encontrado");

  if (!blog) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Artículo no encontrado"
          texto={`No existe un artículo con el ID "${params.id}".`}
          textoBoton="Volver al blog"
          onAccion={() => navigate("/blog")}
        />
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <ArticuloBlog blog={blog} />

      <SeccionComentarios
        comentarios={blog.comentarios}
        onNavegar={navigate}
      />
    </PlantillaPublica>
  );
}
