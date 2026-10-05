import { productosIniciales } from "../data/listaProductos";
import { CLAVES, guardar, leer } from "../utils/almacenamiento";

export function obtenerProducto() {
  return leer(CLAVES.productos, productosIniciales);
}

export function guardarProducto(productos) {
  return guardar(CLAVES.productos, productos);
}

export function agregar(productos, nuevo) {
  return guardar(...productos, nuevo);
}

export function actualizarProducto(productos, id, cambios) {
  return productos.map((producto) =>
    producto.id === id ? { ...producto, ...cambios } : producto,
  );
}

export function eliminarProducto(productos, id){
    return productos.filter((producto) => producto.id !== id)
}