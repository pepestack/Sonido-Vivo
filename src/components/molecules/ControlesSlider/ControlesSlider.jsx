import { Boton } from "../../atoms/Boton/Boton"
import { Icono } from "../../atoms/Icono/Icono"

// Flechas anterior / siguiente para un slider
export function ControlesSlider(props){
    return (
        <div className="morph-slider-controls">
            <Boton variante="link" className="morph-slider-btn" etiquetaAccesible="Diapositiva anterior" onClick={props.onAnterior}>
                <Icono icono="bi bi-chevron-left" />
            </Boton>
            <Boton variante="link" className="morph-slider-btn" etiquetaAccesible="Siguiente diapositiva" onClick={props.onSiguiente}>
                <Icono icono="bi bi-chevron-right" />
            </Boton>
        </div>
    )
}
