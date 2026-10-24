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
