export function filtrarProductos(productos, filtros = {}) {
  const buscado = (filtros.texto || '').trim().toLowerCase()
  const categoria = filtros.categoria || ''

  return productos.filter((producto) => {
    const coincideTexto = buscado === '' || producto.nombre.toLowerCase().includes(buscado)
    const coincideCategoria = categoria === '' || producto.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}