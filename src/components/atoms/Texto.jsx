export default function Texto({ children, como = 'p', className = ''}){
    const Etiqueta = como
    return <Etiqueta className={className}>{children}</Etiqueta>
}