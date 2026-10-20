import { Carousel } from "react-bootstrap"
import { Imagen } from "../../atoms/Imagen/Imagen"

export function CarruselHero(props){
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