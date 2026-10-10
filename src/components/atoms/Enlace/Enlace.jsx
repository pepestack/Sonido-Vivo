export function Enlace(props){
  function ir(evento){
    evento.preventDefault()
    props.onNavegar(props.ruta)
  }

  return(
    <a href={props.ruta} className={props.className ?? ''} onClick={ir}>
      {props.children}
    </a>
  )
}
