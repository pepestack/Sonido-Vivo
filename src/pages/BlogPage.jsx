import { Titulo } from "../components/atoms/Titulo/Titulo";
import { ListaBlogs } from "../components/organisms/ListaBlogs/ListaBlogs";
import { blogs } from "../data/blogs";

export default function BlogPage() {
  return (
    <>
      <Titulo nivel={2} className="text-center fw-bold mb-5 text-uppercase">
        Noticias Importantes
      </Titulo>

      <ListaBlogs blogs={blogs} />
    </>
  );
}