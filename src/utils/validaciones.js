const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const patronSku = /^[A-Z]{2}\d{3}$/
export const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'sonidovivo.cl']

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

export function validarClave(valor) {
  return validarObligatorio(valor, 'La contraseña es requerida')
}

export function validarCorreoPermitido(valor) {
  const correo = String(valor ?? '').trim()
  const dominio = correo.split('@')[1]
  const permitido = validarEmail(correo) === '' && dominiosPermitidos.includes(dominio)
  return permitido ? '' : `Solo se permiten correos @${dominiosPermitidos.join(', @')}`
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
