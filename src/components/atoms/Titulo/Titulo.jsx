export function Titulo(props){
    const Etiqueta = `h${props.nivel == 2}`
    return <Etiqueta className={props.className ?? ''}>{props.children}</Etiqueta>
}