import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TarjetaBlog } from './TarjetaBlog'

describe('TarjetaBlog', () => {
  it('navega al detalle del blog al presionar el botón', () => {
    const blog = {
      id: 1,
      titulo: 'Noticia de prueba',
      descripcion: 'Descripción de prueba',
      ruta: '/blog/1',
      imagen: '',
      alt: 'Imagen del blog',
      claseImagen: '',
    }

    const onNavegar = vi.fn()

    render(<TarjetaBlog blog={blog} onNavegar={onNavegar} />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Ver caso completo' })
    )

    expect(onNavegar).toHaveBeenCalledWith('/blog/1')
  })
})
