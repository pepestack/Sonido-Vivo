import { Col, Row } from "react-bootstrap";
import { Effect } from "@animate-ui/react/primitives/effects/effect";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { TarjetaCategoria } from "../../molecules/TarjetaCategoria/TarjetaCategoria";
import { iconoCategoria } from "../../../data/categorias";

// Accesos rápidos del Home a cada categoría del catálogo
// categorias: [{ valor, texto, cantidad }]; onNavegar(ruta) lleva a /categoria/:valor
// animado: las tarjetas aparecen una tras otra al entrar en pantalla
export function GrillaCategorias(props) {
  return (
    <section className={props.className ?? ""}>
      {props.titulo && (
        <Titulo nivel={2} className="mb-3">
          {props.titulo}
        </Titulo>
      )}
      {/* 5 por fila en escritorio: las 10 categorías quedan en 2 filas parejas */}
      <Row xs={2} md={3} lg={5} className="g-3">
        {props.categorias.map((categoria, indice) => {
          const tarjeta = (
            <TarjetaCategoria
              texto={categoria.texto}
              cantidad={categoria.cantidad}
              icono={iconoCategoria(categoria.valor)}
              onElegir={() => props.onNavegar(`/categoria/${categoria.valor}`)}
            />
          );
          // el Effect va dentro del Col para no romper la grilla de Bootstrap (Row > Col)
          return (
            <Col key={categoria.valor}>
              {props.animado ? (
                <Effect fade slide blur inView delay={indice * 80} className="h-100">
                  {tarjeta}
                </Effect>
              ) : (
                tarjeta
              )}
            </Col>
          );
        })}
      </Row>
    </section>
  );
}
