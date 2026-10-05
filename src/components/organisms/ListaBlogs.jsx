import Texto from "../atoms/Texto";
import TarjetaBlog from "../molecules/TarjetaBlog";

export default function ListaBlogs({ blogs, className = "" }) {
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