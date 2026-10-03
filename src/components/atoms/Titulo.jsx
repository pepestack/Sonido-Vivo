export default function Titulo({ nivel = 2, contenido, className = ''}){
    const Etiqueta = `h${nivel}`
    return <Etiqueta className={className}>{contenido}</Etiqueta>
}