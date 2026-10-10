const colores = { exito: 'text-success', error: 'text-danger', neutro: ''}


export function MensajeEstado(props){
    const tipo = props.tipo ?? 'exito'
    const className= props.className ?? 'mt-3 text-center'

    if(!props.children) return null
    return <p className={`fw-bold mb-0 ${colores[tipo]} ${className}`}>{props.children}</p>
}