import { useNavigate } from 'react-router-dom'
import { AvisoVacio } from '../components/molecules/AvisoVacio/AvisoVacio'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'

// Se dibuja con la ruta path="*", que coincide con cualquier dirección sin otra Route (ver App.jsx)
export default function NoEncontrado() {
  const navigate = useNavigate()
  useTituloPagina('Página no encontrada')

  return (
    <PlantillaPublica>
      <AvisoVacio
        titulo="Página no encontrada"
        texto="La página que buscas no existe."
        textoBoton="Volver al inicio"
        onAccion={() => navigate('/')}
      />
    </PlantillaPublica>
  )
}