import placeholder from '../../assets/images/placeholder-producto.svg'

// Si no hay src se muestra una imagen genérica "Sin imagen"
export default function Imagen({ src, alt, className = '' }) {
  return <img src={src || placeholder} alt={alt} className={className} />
}
