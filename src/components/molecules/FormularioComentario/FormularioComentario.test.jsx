import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormularioComentario } from './FormularioComentario'

describe('FormularioComentario', () => {
  it('navega al login al presionar Iniciar sesión', () => {
    const onNavegar = vi.fn()

    render(<FormularioComentario onNavegar={onNavegar} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    )

    expect(onNavegar).toHaveBeenCalledWith('/login')
  })

  it('navega al registro al presionar Registrarse', () => {
    const onNavegar = vi.fn()

    render(<FormularioComentario onNavegar={onNavegar} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Registrarse' })
    )

    expect(onNavegar).toHaveBeenCalledWith('/registro')
  })
})
