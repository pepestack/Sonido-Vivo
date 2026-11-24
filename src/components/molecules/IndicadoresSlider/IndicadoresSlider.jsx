import { Boton } from "../../atoms/Boton/Boton"

// Puntos indicadores de la diapositiva activa
export function IndicadoresSlider(props){
    return (
        <div className="morph-slider-indicators" role="tablist" aria-label="Diapositivas">
            {Array.from({ length: props.total }, (_, i) => (
                <Boton
                    key={i}
                    variante="link"
                    rol="tab"
                    seleccionado={i === props.activo}
                    etiquetaAccesible={`Ir a la diapositiva ${i + 1}`}
                    className={`morph-slider-dot ${i === props.activo ? 'is-active' : ''}`}
                    onClick={() => props.onSeleccionar(i)}
                />
            ))}
        </div>
    )
}
