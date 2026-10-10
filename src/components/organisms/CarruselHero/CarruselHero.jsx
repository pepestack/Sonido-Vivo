import { Carousel } from "react-bootstrap"
import { Imagen } from "../../atoms/Imagen/Imagen"

export function CarruselHero({imagenes}){
    return (
        <Carousel>
            {imagenes.map((i) => (
                <Carousel.Item key={i.id}>
                    <Imagen src={i.imagen} alt={i.alt} className="d-block w-100"/>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}