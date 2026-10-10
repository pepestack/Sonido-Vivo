import placeholder from '../../../assets/images/placeholder-producto.svg'

// Si no hay src se muestra una imagen genérica "Sin imagen"
export function Imagen(props){
  return <img src={props.src || placeholder} alt={props.alt} className={props.className ?? ''} />
}
