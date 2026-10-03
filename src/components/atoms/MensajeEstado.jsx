const colores = { exito: 'text-success', error: 'text-danger', neutro: ''}


export default function MensajeEstado({ contenido, tipo ='exito', className= 'mt-3 text-center'}){
    if (!contenido) return null
    const color = colores[tipo] ?? colores.neutro
    return <p className={`fw-bold mb-0 ${color} ${className}`}>{contenido}</p>
}