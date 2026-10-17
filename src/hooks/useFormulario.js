import { useState } from 'react'

// Hook propio para formularios controlados: guarda los valores y los errores de validación.
// Cada campo debe tener un atributo `name` igual a su clave en `valores`.
export function useFormulario(valoresIniciales) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  function manejarCambio(evento) {
    const campo = evento.target.name
    const valor = evento.target.value
    setValores((actuales) => ({ ...actuales, [campo]: valor }))
    // al corregir un campo se borra su mensaje de error
    setErrores((actuales) => ({ ...actuales, [campo]: '' }))
  }

  function reiniciar() {
    setValores(valoresIniciales)
    setErrores({})
  }

  return { valores, setValores, errores, setErrores, manejarCambio, reiniciar }
}