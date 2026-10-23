import { ImageZoom } from '@animate-ui/react/primitives/effects/image-zoom'
import placeholder from '../../../assets/images/placeholder-producto.svg'

// Si no hay src se muestra una imagen genérica "Sin imagen"
// zoom: acerca la imagen al pasar el mouse o al tocarla (no aplica al placeholder)
export function Imagen(props){
  const imagen = <img src={props.src || placeholder} alt={props.alt} className={props.className ?? ''} />
  if (!props.zoom || !props.src) return imagen
  return (
    <ImageZoom zoomScale={2} height="auto" aria-label={props.alt}>
      {imagen}
    </ImageZoom>
  )
}
