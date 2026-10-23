import { Card } from 'react-bootstrap'
import { Imagen } from '../../atoms/Imagen/Imagen'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Artículo completo del blog. blog: { titulo, imagen, alt, claseImagen, contenido: [{ id, texto }] }
export function ArticuloBlog(props) {
  const blog = props.blog

  return (
    <Card as="article" className="shadow-sm border-0 bg-light p-4 mb-5">
      <div className="text-center mb-4">
        <Imagen
          src={blog.imagen}
          alt={blog.alt}
          className={`img-fluid rounded border w-100 shadow-sm blog-img-articulo ${blog.claseImagen ?? ''}`.trim()}
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
  )
}
