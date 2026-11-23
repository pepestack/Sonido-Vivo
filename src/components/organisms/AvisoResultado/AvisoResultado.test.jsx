import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AvisoResultado } from './AvisoResultado'

describe('AvisoResultado', () => {
  it('muestra el título y cada botón llama a su propia acción', async () => {
    const user = userEvent.setup()
    const onAccion = vi.fn()
    const onSecundario = vi.fn()
    render(
      <AvisoResultado
        titulo="No pudimos completar tu compra"
        texto="La tarjeta fue rechazada."
        textoBoton="Reintentar"
        onAccion={onAccion}
        textoSecundario="Volver al carrito"
        onSecundario={onSecundario}
      />,
    )

    expect(screen.getByRole('heading', { name: 'No pudimos completar tu compra' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(onAccion).toHaveBeenCalledTimes(1)
    expect(onSecundario).not.toHaveBeenCalled()
  })
})
