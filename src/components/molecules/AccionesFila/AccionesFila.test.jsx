import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AccionesFila } from './AccionesFila'

function renderizar(props) {
  render(
    <table>
      <tbody>
        <tr>
          <AccionesFila {...props} />
        </tr>
      </tbody>
    </table>,
  )
}

describe('AccionesFila', () => {
  it('no muestra Eliminar si no recibe onEliminar', () => {
    renderizar({ onVer: vi.fn(), onEditar: vi.fn() })

    expect(screen.getByRole('button', { name: 'Ver detalle' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Eliminar' })).not.toBeInTheDocument()
  })

  it('llama a onVer al presionar el botón con el texto recibido', () => {
    const onVer = vi.fn()
    renderizar({ onVer, textoVer: 'Ver usuario' })

    fireEvent.click(screen.getByRole('button', { name: 'Ver usuario' }))

    expect(onVer).toHaveBeenCalledTimes(1)
  })
})
