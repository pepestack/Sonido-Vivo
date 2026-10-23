import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AvisoVacio } from './AvisoVacio'

describe('AvisoVacio', () => {
  it('sin onAccion muestra solo el texto, sin botón', () => {
    render(<AvisoVacio texto="No hay productos para mostrar." />)

    expect(screen.getByText('No hay productos para mostrar.')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('con onAccion muestra el botón y lo llama al presionarlo', () => {
    const onAccion = vi.fn()
    render(<AvisoVacio titulo="Carrito vacío" textoBoton="Ir al catálogo" onAccion={onAccion} />)

    fireEvent.click(screen.getByRole('button', { name: 'Ir al catálogo' }))

    expect(onAccion).toHaveBeenCalledTimes(1)
  })
})
