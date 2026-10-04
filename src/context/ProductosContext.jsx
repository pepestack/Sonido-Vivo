import { useEffect, useState } from "react";
import * as productoService from '../services/productoService'
import { ProductoContext } from "./contextos";


export default function ProductosProvider({children}){

    const [productos, setProductos] = useState(() => productoService.obtenerProducto())

    useEffect(() => {
        productoService.obtenerProducto(productos)
    },[productos])


    const obtenerProducto = (id) => productos.filter((producto) => producto.id === id)


    const agregarProducto = (nuevo) => {
        setProductos((actuales) => productoService.agregar(actuales, nuevo))
    }

    const actualizarProducto = (id, cambios) =>{
        setProductos((actuales) => productoService.actualizarProducto(actuales, id, cambios))
    }

    const eliminarProducto = (id) => {
        setProductos((actuales) => productoService.eliminarProducto(actuales !== id)) 
    }

    const valor = {productos, obtenerProducto, agregarProducto, actualizarProducto, eliminarProducto}

    return <ProductoContext.Provider value={valor}>{children}</ProductoContext.Provider>
}