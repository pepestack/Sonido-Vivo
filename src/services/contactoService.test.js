import { describe, it, expect, beforeEach } from 'vitest'
import { guardarMensaje, listarMensajes } from './contactoService'

describe('guardarMensaje', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('agrega el mensaje sin espacios sobrantes a los ya guardados', () => {
    guardarMensaje({ nombre: ' Ana ', correo: '', contenido: 'Hola' })
    guardarMensaje({ nombre: 'Luis', correo: 'luis@gmail.com', contenido: ' ¿Tienen bajos? ' })

    const mensajes = listarMensajes()
    expect(mensajes).toHaveLength(2)
    expect(mensajes[0]).toMatchObject({ nombre: 'Ana', correo: '', contenido: 'Hola' })
    expect(mensajes[1]).toMatchObject({ nombre: 'Luis', correo: 'luis@gmail.com', contenido: '¿Tienen bajos?' })
  })
})
