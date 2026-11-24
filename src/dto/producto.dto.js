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
    stock: api.stock,
    stockCritico: extras.stockCritico ?? 0,
    imagen: api.imagen ?? extras.imagen ?? null,
    galeria: extras.galeria ?? [],
    ...(extras.precioOferta !== undefined && { precioOferta: extras.precioOferta }),
  }
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
    stock: Number(producto.stock),
    imagen: producto.imagen || null,
  }
}

export function erroresProductoDesdeApi(detalles) {
  const { codigo, ...resto } = detalles
  return codigo ? { ...resto, id: codigo } : resto
}
