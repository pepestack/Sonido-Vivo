import { AvisoVacio } from "../../molecules/AvisoVacio/AvisoVacio";
import { TarjetaBlog } from "../../molecules/TarjetaBlog/TarjetaBlog";

export function ListaBlogs(props) {
  return (
    <section className={props.className ?? ""}>
      {props.blogs.map((blog) => (
        <TarjetaBlog
          key={blog.id}
          blog={blog}
          onNavegar={props.onNavegar}
        />
      ))}

      {props.blogs.length === 0 && <AvisoVacio texto="No hay publicaciones para mostrar." />}
    </section>
  );
}
