import { generarValor } from './formato'

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const patronSku = /^[A-Z]{2}\d{3}$/
const patronTarjeta = /^\d{16}$/
const patronVencimiento = /^(0[1-9]|1[0-2])\/(\d{2})$/
const patronCvv = /^\d{3}$/
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
// rutEnUso(rut) y correoEnUso(correo): indican si el RUN o el correo ya pertenecen a otro usuario;
// ocultarRol omite la validación del rol
export function validarUsuario(valores, opciones = {}) {
  const rutEnUso = opciones.rutEnUso ?? (() => false)
  const correoEnUso = opciones.correoEnUso ?? (() => false)
  const rut = String(valores.rut ?? '').trim()
  const correo = String(valores.correo ?? '').trim()
  return {
    rut: validarRut(rut) || (rutEnUso(rut) ? 'Ya existe un usuario con este RUN' : ''),
    nombre: validarObligatorio(valores.nombre, 'El nombre es requerido') || validarLargoMaximo(valores.nombre, 50),
    apellido: validarObligatorio(valores.apellido, 'El apellido es requerido') || validarLargoMaximo(valores.apellido, 100),
    correo: validarCorreoPermitido(correo) || (correoEnUso(correo) ? 'Ya existe una cuenta con este correo' : ''),
    contrasena: validarClave(valores.contrasena),
    region: validarObligatorio(valores.region, 'Selecciona una región'),
    comuna: validarObligatorio(valores.comuna, 'Selecciona una comuna'),
    direccion: validarObligatorio(valores.direccion, 'La dirección es requerida') || validarLargoMaximo(valores.direccion, 300),
    rol: opciones.ocultarRol ? '' : validarObligatorio(valores.rol, 'Selecciona un rol'),
  }
}

// El número de tarjeta se puede escribir con espacios ("4111 1111 1111 1111")
export function sinEspacios(valor) {
  return String(valor ?? '').replace(/\s/g, '')
}

export function validarTarjeta(valor) {
  return patronTarjeta.test(sinEspacios(valor)) ? '' : 'Ingresa los 16 dígitos de la tarjeta'
}

// Formato MM/AA; la tarjeta vale hasta el último día de su mes. hoy se recibe para poder probarla
export function validarVencimiento(valor, hoy = new Date()) {
  const partes = patronVencimiento.exec(String(valor ?? '').trim())
  if (!partes) return 'Usa el formato MM/AA'
  const mes = Number(partes[1])
  const anio = 2000 + Number(partes[2])
  const vencida = anio < hoy.getFullYear() || (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1)
  return vencida ? 'La tarjeta está vencida' : ''
}

export function validarCvv(valor) {
  return patronCvv.test(String(valor ?? '').trim()) ? '' : 'El CVV tiene 3 dígitos'
}

// Reglas del checkout. Con retiro en tienda no se pide dirección.
// El correo puede ser de cualquier dominio: quien compra no necesita cuenta
export function validarCheckout(valores) {
  const conDespacho = valores.tipoEntrega !== 'retiro'
  return {
    nombre: validarObligatorio(valores.nombre, 'El nombre es requerido') || validarLargoMaximo(valores.nombre, 50),
    apellido: validarObligatorio(valores.apellido, 'El apellido es requerido') || validarLargoMaximo(valores.apellido, 100),
    correo:
      validarObligatorio(valores.correo, 'El correo es requerido') ||
      validarLargoMaximo(valores.correo, LARGO_MAXIMO_CORREO) ||
      validarEmail(valores.correo),
    tipoEntrega: validarObligatorio(valores.tipoEntrega, 'Elige cómo recibir tu compra'),
    region: conDespacho ? validarObligatorio(valores.region, 'Selecciona una región') : '',
    comuna: conDespacho ? validarObligatorio(valores.comuna, 'Selecciona una comuna') : '',
    direccion: conDespacho
      ? validarObligatorio(valores.direccion, 'La dirección es requerida') || validarLargoMaximo(valores.direccion, 300)
      : '',
    numeroTarjeta: validarTarjeta(valores.numeroTarjeta),
    vencimiento: validarVencimiento(valores.vencimiento),
    cvv: validarCvv(valores.cvv),
  }
}

export const LARGO_MAXIMO_CATEGORIA = 50

// Nombre de una categoría: requerido, máximo 50 caracteres, con al menos una letra o número
// (para poder armar su URL) y que su valor no lo use otra categoría.
// valorEnUso(valor): indica si ese valor ya pertenece a otra categoría
export function validarCategoria(texto, valorEnUso = () => false) {
  const requerido = validarObligatorio(texto, 'El nombre es requerido') || validarLargoMaximo(texto, LARGO_MAXIMO_CATEGORIA)
  if (requerido !== '') return requerido
  const valor = generarValor(texto)
  if (valor === '') return 'Usa al menos una letra o un número'
  return valorEnUso(valor) ? 'Ya existe una categoría con ese nombre' : ''
}
