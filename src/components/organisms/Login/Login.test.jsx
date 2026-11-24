import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Login } from './Login'

describe('Login', () => {
  it('no envía y muestra errores cuando los campos son inválidos', () => {
    const onEnviar = vi.fn()
    render(<Login onEnviar={onEnviar} onNavegar={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'correo@hotmail.com' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '12' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onEnviar).not.toHaveBeenCalled()
    expect(screen.getByText(/Solo se permiten correos/)).toBeInTheDocument()
    expect(screen.getByText(/entre 4 y 10 caracteres/)).toBeInTheDocument()
  })
})
