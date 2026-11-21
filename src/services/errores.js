export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    if (datos && typeof datos.error === 'string') return datos.error
    return `La API respondió con un error (${error.response.status}).`
  }
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado en responder. Inténtalo nuevamente.'
  return 'No fue posible contactar la API. Revisa la conexión, su dirección y CORS.'
}

// { campo: mensaje } cuando la API rechaza datos de un formulario (400); si no, objeto vacío
export function obtenerErroresCampos(error) {
  const detalles = error.response?.data?.detalles
  return detalles && typeof detalles === 'object' && !Array.isArray(detalles) ? detalles : {}
}
