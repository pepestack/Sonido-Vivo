export function Icono({clase, className = ''}){
    return <i className={`${clase} ${className}`.trim()} aria-hidden="true" />
}
