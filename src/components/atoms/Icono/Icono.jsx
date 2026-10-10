export function Icono(props){
    const className = props.className ?? ''
    return <i className={`${props.icono} ${className}`.trim()} aria-hidden="true" />
}
