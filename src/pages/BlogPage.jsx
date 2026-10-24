import { useNavigate } from "react-router-dom";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { ListaBlogs } from "../components/organisms/ListaBlogs/ListaBlogs";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { blogs } from "../data/blogs";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function BlogPage() {
  const navigate = useNavigate();
  useTituloPagina("Blogs");

  return (
    <PlantillaPublica>
      <Titulo nivel={1} className="h2 text-center fw-bold mb-5 text-uppercase">
        Noticias Importantes
      </Titulo>

      <ListaBlogs blogs={blogs} onNavegar={navigate} />
    </PlantillaPublica>
  );
}
