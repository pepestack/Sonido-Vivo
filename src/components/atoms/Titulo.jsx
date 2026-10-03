export default function Titulo({ nivel = 2, children, className = ''}){
    const Etiqueta = `h${nivel}`
    return <Etiqueta className={className}>{children}</Etiqueta>
}