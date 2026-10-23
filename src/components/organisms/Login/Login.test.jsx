import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Login } from './Login'

function llenar(correo, contrasena) {
  fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: correo } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: contrasena } })
  fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
}

describe('Login', () => {
  it('envía el correo y la contraseña cuando los campos son válidos', () => {
    const onEnviar = vi.fn()
    render(<Login onEnviar={onEnviar} onNavegar={vi.fn()} />)

    llenar(' cliente@gmail.com ', '1234')

    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith({ email: 'cliente@gmail.com', contrasena: '1234' })
  })

  it('no envía y muestra errores cuando los campos son inválidos', () => {
    const onEnviar = vi.fn()
    render(<Login onEnviar={onEnviar} onNavegar={vi.fn()} />)

    llenar('correo@hotmail.com', '12')

    expect(onEnviar).not.toHaveBeenCalled()
    expect(screen.getByText(/Solo se permiten correos/)).toBeInTheDocument()
    expect(screen.getByText(/entre 4 y 10 caracteres/)).toBeInTheDocument()
  })
})
