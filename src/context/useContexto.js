import { useContext } from "react";
import { CarritoContext } from "./contextos";

export const useCarrito = () => useContext(CarritoContext)