import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Precio } from './Precio'

describe('Precio', () => {
  it('muestra el monto con el símbolo $ y el separador de miles', () => {
    render(<Precio monto={129990} />)

    expect(screen.getByText('$129.990')).toBeInTheDocument()
  })
})
