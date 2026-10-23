import { AccionesFila } from '../AccionesFila/AccionesFila'

// categoria: { valor, texto, cantidad }
// solo se puede eliminar si no tiene productos (si no, esos productos quedarían sin categoría)
export function FilaCategoriaAdmin(props) {
  const categoria = props.categoria
  const puedeEliminar = categoria.cantidad === 0

  return (
    <tr>
      <td className="ps-4 fw-bold">{categoria.texto}</td>
      <td className="text-muted">/categoria/{categoria.valor}</td>
      <td>{categoria.cantidad}</td>
      <AccionesFila
        onEditar={() => props.onEditar(categoria)}
        onEliminar={puedeEliminar ? () => props.onEliminar(categoria) : undefined}
      />
    </tr>
  )
}
