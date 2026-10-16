import { createContext, useEffect, useState, useContext } from "react";
import * as productoService from '../services/productoService'

const ProductosContext = createContext(null)


export function ProductosProvider(props) {
    const [productos, setProductos] = useState(() => productoService.obtenerProductos())

    useEffect(() => {
        productoService.guardarProductos(productos)
    }, [productos])

    function obtenerProducto(id) {
        return productos.find((producto) => producto.id === id)
    }

    function agregarProducto(nuevo) {
        setProductos((actuales) => productoService.agregar(actuales, nuevo))
    }

    function actualizarProducto(idOriginal, cambios) {
        setProductos((actuales) => productoService.actualizarProducto(actuales, idOriginal, cambios))
    }

    function eliminarProducto(id) {
        setProductos((actuales) => productoService.eliminar(actuales, id))
    }

    const valor = { productos, obtenerProducto, agregarProducto, actualizarProducto, eliminarProducto }

    return <ProductosContext.Provider value={valor}>{props.children}</ProductosContext.Provider>
}


export function useProductos() {
    const contexto = useContext(ProductosContext)
    if (!contexto) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider')
    }
    return contexto
}