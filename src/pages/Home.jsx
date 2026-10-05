import SeccionPresentacion from "../components/organisms/SeccionPresentacion";

export default function Home(){
    return(
        <>
            <SeccionPresentacion
                titulo="Sonido Vivo"
                texto="Visítanos en nuestra tienda en Viña del Mar o explora nuestro catálogo con más de 300 productos. Hacemos envíos y entregas a todo el país para que tu sonido no se detenga."
                imagen={imgTienda}
                alt="Interior de tienda física Sonido Vivo"
                textoBoton="Ver más"
                rutaBoton="/catalogo"
            />
        </>
    )
}