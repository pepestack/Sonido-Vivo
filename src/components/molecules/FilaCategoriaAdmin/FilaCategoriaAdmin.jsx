import { Boton } from '../../atoms/Boton/Boton'

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
      <td className="text-end pe-4">
        <Boton variante="outline-primary" tamano="sm" onClick={() => props.onEditar(categoria)}>
          Editar
        </Boton>
        {puedeEliminar && (
          <Boton variante="outline-danger" tamano="sm" className="ms-1" onClick={() => props.onEliminar(categoria)}>
            Eliminar
          </Boton>
        )}
      </td>
    </tr>
  )
}
