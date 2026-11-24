import { describe, it, expect, vi } from 'vitest'
import { api } from './api'
import { listarUsuarios } from './usuarioService'

// se reemplaza la instancia de Axios: la prueba no llama a la API real
vi.mock('./api', () => ({
  api: { get: vi.fn() },
}))

describe('listarUsuarios', () => {
  it('pide GET /usuarios y adapta cada fila de la API', async () => {
    api.get.mockResolvedValue({
      data: [
        {
          id: 7,
          rut: '12345678K',
          nombre: 'Ana',
          apellido: 'Rojas',
          fecha_nacimiento: '1999-05-20T00:00:00.000Z',
          correo: 'ana@duocuc.cl',
          region: null,
          comuna: null,
          direccion: null,
          rol: 'Vendedor',
          activo: false,
          creado_en: '2026-11-20T10:00:00.000Z',
        },
      ],
    })

    const usuarios = await listarUsuarios()

    expect(api.get).toHaveBeenCalledWith('/usuarios')
    expect(usuarios).toEqual([
      {
        id: 7,
        rut: '12345678K',
        nombre: 'Ana',
        apellido: 'Rojas',
        fechaNacimiento: '1999-05-20',
        correo: 'ana@duocuc.cl',
        region: '',
        comuna: '',
        direccion: '',
        rol: 'Vendedor',
        activo: false,
        creadoEn: '2026-11-20T10:00:00.000Z',
      },
    ])
  })
})
