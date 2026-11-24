import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as productoService from '../services/productoService'
import { obtenerMensajeError } from '../services/errores'

const ProductosContext = createContext(null)

export function ProductosProvider(props) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    const recargar = useCallback(async () => {
        setCargando(true)
        setError('')
        try {
            setProductos(await productoService.listarProductos())
        } catch (error) {
            setError(obtenerMensajeError(error))
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        recargar()
    }, [recargar])

    function obtenerProducto(id) {
        return productos.find((producto) => producto.id === id)
    }

    async function agregarProducto(nuevo) {
        const creado = await productoService.crearProducto(nuevo)
        setProductos((actuales) => productoService.agregar(actuales, creado))
        return creado
    }

    async function actualizarProducto(idOriginal, cambios) {
        const original = obtenerProducto(idOriginal)
        const actualizado = await productoService.modificarProducto(original.idApi, cambios)
        setProductos((actuales) => productoService.reemplazar(actuales, idOriginal, actualizado))
        return actualizado
    }

    async function eliminarProducto(id) {
        const producto = obtenerProducto(id)
        await productoService.eliminarProducto(producto.idApi)
        setProductos((actuales) => productoService.eliminar(actuales, id))
    }

    function descontarStock(items) {
        setProductos((actuales) => productoService.descontarStock(actuales, items))
    }

    const valor = {
        productos,
        cargando,
        error,
        recargar,
        obtenerProducto,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        descontarStock,
    }

    return <ProductosContext.Provider value={valor}>{props.children}</ProductosContext.Provider>
}


export function useProductos() {
    const contexto = useContext(ProductosContext)
    if (!contexto) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider')
    }
    return contexto
}
