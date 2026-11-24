import { describe, it, expect } from 'vitest'
import { obtenerMensajeError } from './errores'

describe('obtenerMensajeError', () => {
  it('elige el mensaje según el tipo de error de Axios', () => {
    const conMensaje = { response: { status: 409, data: { error: 'El correo ya está registrado' } } }

    expect(obtenerMensajeError(conMensaje)).toBe('El correo ya está registrado')
    expect(obtenerMensajeError({ response: { status: 500, data: '' } })).toBe('La API respondió con un error (500).')
    expect(obtenerMensajeError({ code: 'ECONNABORTED' })).toBe('La API tardó demasiado en responder. Inténtalo nuevamente.')
    expect(obtenerMensajeError({ code: 'ERR_NETWORK' })).toBe('No fue posible contactar la API. Revisa la conexión, su dirección y CORS.')
  })
})
