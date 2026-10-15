export function esRutaActiva(rutaActual, ruta, exacto = false){
    if(exacto) return rutaActual === ruta
    return rutaActual === ruta || rutaActual.startsWith(`${ruta}/`)
}