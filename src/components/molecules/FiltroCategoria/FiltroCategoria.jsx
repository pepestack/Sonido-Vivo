import { Etiqueta } from "../../atoms/Etiqueta/Etiqueta";
import { Selector } from "../../atoms/Selector/Selector";

// valor 'todos' = sin filtro
export function FiltroCategoria({ valor, onCambiar, categorias }) {
  const opciones = [
    { valor: "todos", texto: "Todas las categorias" },
    ...categorias,
  ];

  return (
    <div className="d-flex align-items-center justify-content-md-end">
      <Etiqueta htmlFor="filtro-categoria" className="me-2 mb-0">
        Filtrar:
      </Etiqueta>
      <Selector
        id="filtro-categoria"
        valor={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        opciones={opciones}
        className="w-auto"
      />
    </div>
  );
}
