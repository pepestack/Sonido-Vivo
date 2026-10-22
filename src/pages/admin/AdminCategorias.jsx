import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { TablaCategorias } from "../../components/organisms/TablaCategorias/TablaCategorias";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { conCantidades } from "../../services/categoriaService";

export default function AdminCategorias() {
  const navigate = useNavigate();
  const categoriasCtx = useCategorias();
  const productosCtx = useProductos();
  useTituloPagina("Gestión de categorías");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  // se calcula en cada render: si cambia un producto, la cantidad se actualiza sola
  const categorias = conCantidades(categoriasCtx.categorias, productosCtx.productos);

  function pedirConfirmacion(categoria) {
    setPendiente(categoria);
    setConfirmando(true);
  }

  function eliminar() {
    categoriasCtx.eliminarCategoria(pendiente.valor);
    setConfirmando(false);
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de categorías"
        subtitulo="Solo se pueden eliminar las categorías sin productos"
        textoBoton="Añadir Categoría"
        onAccion={() => navigate("/admin/categorias/nueva")}
      />
      <TablaCategorias
        categorias={categorias}
        onEditar={(categoria) => navigate(`/admin/categorias/${categoria.valor}/editar`)}
        onEliminar={pedirConfirmacion}
      />
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar eliminación"
        textoConfirmar="Eliminar"
        variante="danger"
        mensaje={pendiente && `¿Eliminar la categoría "${pendiente.texto}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  );
}
