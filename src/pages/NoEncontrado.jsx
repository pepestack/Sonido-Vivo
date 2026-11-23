import { useNavigate } from 'react-router-dom'
import { AvisoResultado } from '../components/organisms/AvisoResultado/AvisoResultado'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'

// Se dibuja con la ruta path="*", que coincide con cualquier dirección sin otra Route (ver App.jsx)
export default function NoEncontrado() {
  const navigate = useNavigate()
  useTituloPagina('Página no encontrada')

  return (
    <PlantillaPublica>
      <AvisoResultado
        icono="bi bi-question-circle"
        colorIcono="text-muted"
        titulo="Página no encontrada"
        texto="La página que buscas no existe."
        textoBoton="Volver al inicio"
        onAccion={() => navigate('/')}
      />
    </PlantillaPublica>
  )
}
