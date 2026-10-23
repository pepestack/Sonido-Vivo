// Círculo con las iniciales de una persona. tamano: 'sm' (comentarios) o 'lg' (perfil)
export function Avatar(props) {
  const tamano = props.tamano ?? 'sm'
  return (
    <span className={`bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold avatar-${tamano}`}>
      {props.children}
    </span>
  )
}
