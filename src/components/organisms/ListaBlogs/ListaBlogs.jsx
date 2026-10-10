import { Texto } from "../../atoms/Texto/Texto";
import { TarjetaBlog } from "../../molecules/TarjetaBlog/TarjetaBlog";

export function ListaBlogs({ blogs, className = "" }) {
  return (
    <section className={className}>
      {blogs.map((blog) => (
        <TarjetaBlog
          key={blog.id}
          blog={blog}
        />
      ))}

      {blogs.length === 0 && (
        <Texto className="text-muted text-center py-5">
          No hay publicaciones para mostrar.
        </Texto>
      )}
    </section>
  );
}