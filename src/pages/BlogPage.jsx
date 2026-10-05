import Titulo from "../components/atoms/Titulo";
import ListaBlogs from "../components/organisms/ListaBlogs";
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