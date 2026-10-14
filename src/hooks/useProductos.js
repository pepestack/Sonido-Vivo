import { useContext } from "react";
import { ProductoContext } from "../context/contextos";

export function useProductos(){
    const contexto = useContext(ProductoContext)
    if(!contexto){
        throw new Error('useProductos debe usarse dentro de un ProductoProvider')
    }
    return contexto
}