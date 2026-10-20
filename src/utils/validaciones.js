const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const patronSku = /^[A-Z]{2}\d{3}$/
export const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']
export const LARGO_MAXIMO_CORREO = 100
export const LARGO_MINIMO_CLAVE = 4
export const LARGO_MAXIMO_CLAVE = 10

function estaVacio(valor) {
  return String(valor ?? '').trim() === ''
}

// errores: { campo: mensaje }. El formulario es válido si todos los mensajes están vacíos.
export function sinErrores(errores) {
  return Object.values(errores).every((mensaje) => mensaje === '')
}

export function validarObligatorio(valor, mensaje = 'Este campo es obligatorio') {
  return estaVacio(valor) ? mensaje : ''
}

export function validarLargoMaximo(valor, maximo) {
  return String(valor ?? '').trim().length > maximo ? `Máximo ${maximo} caracteres` : ''
}

export function validarEmail(valor) {
  return patronCorreo.test(String(valor ?? '').trim()) ? '' : 'Ingresa un correo válido'
}

// Requerida, entre 4 y 10 caracteres
export function validarClave(valor) {
  const requerida = validarObligatorio(valor, 'La contraseña es requerida')
  if (requerida !== '') return requerida
  const largo = String(valor).length
  if (largo < LARGO_MINIMO_CLAVE || largo > LARGO_MAXIMO_CLAVE) {
    return `La contraseña debe tener entre ${LARGO_MINIMO_CLAVE} y ${LARGO_MAXIMO_CLAVE} caracteres`
  }
  return ''
}

// Máximo 100 caracteres y solo los dominios de dominiosPermitidos
export function validarCorreoPermitido(valor) {
  const correo = String(valor ?? '').trim()
  if (correo.length > LARGO_MAXIMO_CORREO) return `Máximo ${LARGO_MAXIMO_CORREO} caracteres`
  const dominio = correo.split('@')[1]
  const permitido = validarEmail(correo) === '' && dominiosPermitidos.includes(dominio)
  return permitido ? '' : `Solo se permiten correos @${dominiosPermitidos.join(', @')}`
}

// Para campos donde el correo es opcional: vacío es válido, si viene debe cumplir validarCorreoPermitido
export function validarCorreoOpcional(valor) {
  return estaVacio(valor) ? '' : validarCorreoPermitido(valor)
}

function rutEsValido(run) {
  if (!/^[0-9]+[0-9kK]$/.test(run) || run.length < 7 || run.length > 9) return false
  const cuerpo = run.slice(0, -1)
  const dvIngresado = run.slice(-1).toUpperCase()
  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += cuerpo[i] * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const dvEsperado = 11 - (suma % 11)
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString()
  return dvCalculado === dvIngresado
}

export function validarRut(valor) {
  return rutEsValido(String(valor ?? '').trim()) ? '' : 'RUN inválido, ingrese sin puntos ni guion'
}

// skuEnUso: función que indica si el SKU ya pertenece a otro producto
export function validarSku(valor, skuEnUso = () => false) {
  const sku = String(valor ?? '').trim()
  if (!patronSku.test(sku)) return 'Formato: 2 letras mayúsculas y 3 números (AB000)'
  if (skuEnUso(sku)) return 'Ya existe un producto con este SKU'
  return ''
}

export function validarPrecio(valor) {
  const precio = Number(valor)
  return estaVacio(valor) || Number.isNaN(precio) || precio < 0 ? 'Ingresa un precio válido (0 o más)' : ''
}

export function validarStock(valor) {
  const stock = Number(valor)
  return estaVacio(valor) || !Number.isInteger(stock) || stock < 0 ? 'Ingresa un stock entero (0 o más)' : ''
}

// Opcional; si viene debe ser un entero (0 o más). Es un umbral de alerta,
// así que puede ser mayor o igual al stock actual.
export function validarStockCritico(valor) {
  if (estaVacio(valor)) return ''
  const critico = Number(valor)
  return Number.isInteger(critico) && critico >= 0 ? '' : 'Ingresa un número entero (0 o más)'
}

// Reglas del formulario de usuario (crear/editar en el admin y registro público).
// rutEnUso(rut): indica si el RUN ya pertenece a otro usuario; ocultarRol omite la validación del rol
export function validarUsuario(valores, opciones = {}) {
  const rutEnUso = opciones.rutEnUso ?? (() => false)
  const rut = String(valores.rut ?? '').trim()
  return {
    rut: validarRut(rut) || (rutEnUso(rut) ? 'Ya existe un usuario con este RUN' : ''),
    nombre: validarObligatorio(valores.nombre, 'El nombre es requerido') || validarLargoMaximo(valores.nombre, 50),
    apellido: validarObligatorio(valores.apellido, 'El apellido es requerido') || validarLargoMaximo(valores.apellido, 100),
    correo: validarCorreoPermitido(valores.correo),
    contrasena: validarClave(valores.contrasena),
    region: validarObligatorio(valores.region, 'Selecciona una región'),
    comuna: validarObligatorio(valores.comuna, 'Selecciona una comuna'),
    direccion: validarObligatorio(valores.direccion, 'La dirección es requerida') || validarLargoMaximo(valores.direccion, 300),
    rol: opciones.ocultarRol ? '' : validarObligatorio(valores.rol, 'Selecciona un rol'),
  }
}
