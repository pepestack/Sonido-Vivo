import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { SesionProvider, useSesion } from './SesionContext'
import * as sesionService from '../services/sesionService'

describe('SesionContext', () => {
  // vi.spyOn cambia la función real solo durante la prueba; restoreAllMocks la devuelve
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('al iniciar sesión guarda el token y deja disponible al usuario', async () => {
    const espiaLogin = vi
      .spyOn(sesionService, 'iniciarSesion')
      .mockResolvedValue({ accessToken: 'jwt-123', usuario: { id: 5, nombre: 'Ana', rol: 'Cliente' } })
    const espiaGuardar = vi.spyOn(sesionService, 'guardarSesion')
    const { result } = renderHook(() => useSesion(), { wrapper: SesionProvider })

    await act(() => result.current.iniciarSesion('ana@gmail.com', '1234'))

    expect(espiaLogin).toHaveBeenCalledWith('ana@gmail.com', '1234')
    expect(espiaGuardar).toHaveBeenCalledWith({
      token: 'jwt-123',
      usuario: { id: 5, nombre: 'Ana', rol: 'Cliente', activo: true },
    })
    expect(result.current.usuario).toEqual({ id: 5, nombre: 'Ana', rol: 'Cliente', activo: true })
  })
})
