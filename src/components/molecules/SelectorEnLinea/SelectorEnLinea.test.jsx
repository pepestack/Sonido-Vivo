import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SelectorEnLinea } from './SelectorEnLinea'

describe('SelectorEnLinea', () => {
  it('avisa con el valor elegido', () => {
    const onCambiar = vi.fn()
    const opciones = [
      { valor: 'todos', texto: 'Todos los estados' },
      { valor: 'Despachado', texto: 'Despachado' },
    ]
    render(<SelectorEnLinea id="filtro" etiqueta="Estado:" valor="todos" opciones={opciones} onCambiar={onCambiar} />)

    fireEvent.change(screen.getByLabelText('Estado:'), { target: { value: 'Despachado' } })

    expect(onCambiar).toHaveBeenCalledWith('Despachado')
  })
})
