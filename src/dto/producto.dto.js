import { productosIniciales } from '../data/listaProductos'
import { generarValor, nombreCategoria } from '../utils/formato'

function extrasLocales(codigo) {
  return productosIniciales.find((producto) => producto.id === codigo) ?? {}
}

export function productoDesdeRespuesta(api) {
  const extras = extrasLocales(api.codigo)
  return {
    id: api.codigo,
    idApi: api.id,
    nombre: api.nombre,
    marca: api.marca,
    modelo: api.modelo,
    descripcion: api.descripcion ?? '',
    categoria: generarValor(api.categoria),
    precio: api.precio,
    precioPromocional: api.precioPromocional ?? null,
    precioFinal: api.precioFinal ?? api.precioPromocional ?? api.precio,
    stock: api.stock,
    stockCritico: extras.stockCritico ?? 0,
    imagen: api.imagen ?? extras.imagen ?? null,
    galeria: extras.galeria ?? [],
    // versión del producto: el PUT la exige para no pisar otra edición o una venta
    actualizadoEn: api.actualizadoEn ?? null,
  }
}

function numeroOpcional(valor) {
  return valor === '' || valor === null || valor === undefined ? null : Number(valor)
}

export function productoRequestDto(producto) {
  return {
    codigo: producto.id.trim().toUpperCase(),
    nombre: producto.nombre.trim(),
    marca: producto.marca.trim(),
    modelo: producto.modelo.trim(),
    descripcion: producto.descripcion?.trim() || null,
    categoria: nombreCategoria(producto.categoria),
    precio: Number(producto.precio),
    // el PUT reemplaza todo: si no se envía, la promoción existente se borra
    precioPromocional: numeroOpcional(producto.precioPromocional),
    stock: Number(producto.stock),
    imagen: producto.imagen || null,
    ...(producto.actualizadoEn && { actualizadoEn: producto.actualizadoEn }),
  }
}

export function erroresProductoDesdeApi(detalles) {
  const { codigo, ...resto } = detalles
  return codigo ? { ...resto, id: codigo } : resto
}
