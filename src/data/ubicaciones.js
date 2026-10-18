// Comunas disponibles por región (mismas que la versión HTML)
export const ubicaciones = {
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón', 'San Antonio'],
  'Región Metropolitana': ['Santiago', 'San Bernardo', 'Puente Alto', 'Maipú', 'Providencia'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz'],
}

// Opciones { valor, texto } para el Selector de región
export const regiones = Object.keys(ubicaciones).map((region) => ({ valor: region, texto: region }))

// Opciones para el Selector de comuna; sin región elegida no hay comunas
export function comunasDe(region) {
  return (ubicaciones[region] ?? []).map((comuna) => ({ valor: comuna, texto: comuna }))
}
