import { CLAVES, guardar, leer } from '../utils/almacenamiento'

// Mensajes del formulario de contacto. Mientras la API no tenga un endpoint para ellos,
// se guardan en localStorage para que el envío no se pierda.
export function listarMensajes() {
  return leer(CLAVES.mensajes, [])
}

export function guardarMensaje(valores) {
  const mensaje = {
    nombre: valores.nombre.trim(),
    correo: valores.correo.trim(),
    contenido: valores.contenido.trim(),
    fecha: new Date().toISOString(),
  }
  guardar(CLAVES.mensajes, [...listarMensajes(), mensaje])
  return mensaje
}
