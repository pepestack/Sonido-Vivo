import { useMemo } from "react"
import { Carousel } from "react-bootstrap"
import { Imagen } from "../../atoms/Imagen/Imagen"
import MorphSlider from "../MorphSlider/MorphSlider"
import { useMediaQuery } from "../../../hooks/useMediaQuery"

// En pantallas md+ usa el slider WebGL; en móviles el Carousel de Bootstrap (más liviano)
export function CarruselHero(props){
    const esEscritorio = useMediaQuery('(min-width: 768px)')
    // useMemo: MorphSlider recrea el motor WebGL si cambia la referencia de items
    const items = useMemo(
        () => props.imagenes.map((i) => ({ image: i.imagen, caption: i.alt })),
        [props.imagenes]
    )

    if (!esEscritorio) {
        return (
            <Carousel className="rounded-3 overflow-hidden">
                {props.imagenes.map((i) => (
                    <Carousel.Item key={i.id}>
                        <Imagen src={i.imagen} alt={i.alt} className="d-block w-100"/>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }

    return (
        // aspect-ratio igual al de los banners (1024x307) para que no se recorten los bordes
        <div className="position-relative" style={{ aspectRatio: '1024 / 307' }}>
            <MorphSlider
                items={items}
                transition="ripple"
                intensity={0.55}
                aberration={0.35}
                drift={0.4}
                autoplay
                autoplayDelay={5}
                radius={12}
                showCaptions={false}
            />
        </div>
    )
}
