import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GrillaDestacados } from './GrillaDestacados'

describe('GrillaDestacados', () => {
  it('muestra los destacados recibidos mediante props', () => {
    const destacados = [
      {
        id: 1,
        titulo: '+11 Años',
        descripcion: 'Trayectoria de la tienda'
      },
      {
        id: 2,
        titulo: '+300 Productos',
        descripcion: 'Variedad de instrumentos'
      }
    ]

    render(<GrillaDestacados destacados={destacados} />)

    expect(screen.getByText('+11 Años')).toBeInTheDocument()
    expect(screen.getByText('Trayectoria de la tienda')).toBeInTheDocument()
    expect(screen.getByText('+300 Productos')).toBeInTheDocument()
    expect(screen.getByText('Variedad de instrumentos')).toBeInTheDocument()
  })
})
