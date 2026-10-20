import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ListaBlogs } from './ListaBlogs'

describe('ListaBlogs', () => {
  it('muestra un mensaje cuando no hay publicaciones', () => {
    render(<ListaBlogs blogs={[]} />)

    expect(
      screen.getByText('No hay publicaciones para mostrar.')
    ).toBeInTheDocument()
  })
})
