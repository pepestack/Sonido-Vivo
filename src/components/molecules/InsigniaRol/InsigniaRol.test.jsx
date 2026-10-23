import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InsigniaRol } from './InsigniaRol'

describe('InsigniaRol', () => {
  it('usa el color del rol: un Cliente se ve gris en el perfil y en las tablas', () => {
    render(<InsigniaRol rol="Cliente" />)

    expect(screen.getByText('Cliente')).toHaveClass('bg-secondary')
  })

  it('el Administrador se ve en rojo', () => {
    render(<InsigniaRol rol="Administrador" />)

    expect(screen.getByText('Administrador')).toHaveClass('bg-danger')
  })
})
