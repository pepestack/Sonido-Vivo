import { productosIniciales } from "../data/listaProductos";
import { CLAVES, guardar, leer } from "../utils/almacenamiento";

export function obtenerProductos() {
  return leer(CLAVES.productos, productosIniciales);
}

export function guardarProductos(productos) {
  guardar(CLAVES.productos, productos);
}

export function agregar(productos, nuevo) {
  return [...productos, nuevo]
}

export function actualizarProducto(productos, id, cambios) {
  return productos.map((producto) =>
    producto.id === id ? { ...producto, ...cambios } : producto,
  );
}

export function eliminar(productos, id){
    return productos.filter((producto) => producto.id !== id)
}

// Productos que se están acabando: los que tienen el stock en su nivel crítico o por debajo
export function productosCriticos(productos) {
  return productos.filter((producto) => producto.stock <= producto.stockCritico)
}