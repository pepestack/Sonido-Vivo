export const categorias = [
  { valor: 'guitarras-acusticas', texto: 'Guitarras Acústicas' },
  { valor: 'guitarras-electricas', texto: 'Guitarras Eléctricas' },
  { valor: 'bajos-electricos', texto: 'Bajos Eléctricos' },
  { valor: 'baterias', texto: 'Baterías' },
  { valor: 'teclados-y-pianos', texto: 'Teclados y Pianos' },
  { valor: 'amplificadores', texto: 'Amplificadores' },
  { valor: 'microfonos', texto: 'Micrófonos' },
  { valor: 'pedales-de-efectos', texto: 'Pedales de Efectos' },
  { valor: 'accesorios', texto: 'Accesorios' },
  { valor: 'estudio-y-grabacion', texto: 'Estudio y Grabación' },
]

// Ícono de cada categoría en el Home. Las categorías nuevas (creadas en el admin) usan el ícono por defecto
export const iconosCategoria = {
  'guitarras-acusticas': 'fa-solid fa-guitar',
  'guitarras-electricas': 'fa-solid fa-plug',
  'bajos-electricos': 'fa-solid fa-wave-square',
  baterias: 'fa-solid fa-drum',
  'teclados-y-pianos': 'fa-solid fa-keyboard',
  amplificadores: 'bi bi-speaker',
  microfonos: 'fa-solid fa-microphone-lines',
  'pedales-de-efectos': 'bi bi-sliders',
  accesorios: 'bi bi-music-note-beamed',
  'estudio-y-grabacion': 'bi bi-headphones',
}

export function iconoCategoria(valor) {
  return iconosCategoria[valor] ?? 'fa-solid fa-music'
}
