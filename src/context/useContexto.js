import { useContext } from "react";
import { CarritoContext, ProductoContext } from "./contextos";

export const useCarrito = () => useContext(CarritoContext)
export const useProducto = () => useContext(ProductoContext)