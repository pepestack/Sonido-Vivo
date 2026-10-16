import { Titulo } from "../components/atoms/Titulo/Titulo";
import { ListaBlogs } from "../components/organisms/ListaBlogs/ListaBlogs";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { blogs } from "../data/blogs";

export default function BlogPage() {
  return (
    <PlantillaPublica>
      <>
        <Titulo nivel={2} className="text-center fw-bold mb-5 text-uppercase">
          Noticias Importantes
        </Titulo>

        <ListaBlogs blogs={blogs} />
      </>
    </PlantillaPublica>
  );
}