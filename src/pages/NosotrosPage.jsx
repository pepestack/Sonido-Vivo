import { Texto } from "../components/atoms/Texto/Texto";
import { SeccionPresentacion } from "../components/organisms/SeccionPresentacion/SeccionPresentacion";
import { GrillaDestacados } from "../components/organisms/GrillaDestacados/GrillaDestacados";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { nosotros } from "../data/nosotros";

export default function NosotrosPage() {
  useTituloPagina('Nosotros')

  return (
    <PlantillaPublica>
      <SeccionPresentacion
        titulo={nosotros.titulo}
        texto={nosotros.subtitulo}
        imagen={nosotros.imagen}
        alt={nosotros.alt}
        className="p-4 p-md-5 my-4 rounded-3 custom-lb-container shadow-sm"
        claseTitulo="display-5 fw-bold mb-3"
        claseImagen="img-fluid rounded shadow-lg w-75 d-block mx-auto"
        anchoImagen={6}
      >
        {nosotros.historia.map((parrafo) => (
          <Texto key={parrafo.id}>{parrafo.texto}</Texto>
        ))}
      </SeccionPresentacion>

      <GrillaDestacados destacados={nosotros.destacados} className="mt-2 mb-5" />
    </PlantillaPublica>
  );
}
