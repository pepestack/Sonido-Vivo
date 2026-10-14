import { useState } from "react";
import { BarraCatalogo } from "../components/organisms/BarraCatalogo/BarraCatalogo";
import { GrillaProductos } from "../components/organisms/GrillaProductos/GrillaProductos";
import { useCarrito } from "../hooks/useCarrito"
import { useProductos } from "../hooks/useProductos"
import { categorias } from "../data/categorias";

export default function Catalogo() {
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [categoria, setCategoria] = useState("todos");

  const filtrados =
    categoria === "todos"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  return (
    <>
      <BarraCatalogo
        categoria={categoria}
        categorias={categorias}
        onCambiarCategoria={setCategoria}
      />
      <GrillaProductos
        productos={filtrados}
        onAgregar={agregarAlCarrito}
        mostrarDescripcion
      />
    </>
  );
}
