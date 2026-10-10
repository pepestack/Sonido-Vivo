export function Texto(props){
    const Etiqueta = props.como ?? 'p'
    return <Etiqueta className={props.className ?? ''}>{props.children}</Etiqueta>
}