import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioProducto } from './FormularioProducto'
import { categorias } from '../../../data/categorias'

describe('FormularioProducto', () => {
  // jsdom no tiene URL.createObjectURL, que el formulario usa para la vista previa de la imagen
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:vista-previa')
  })

  it('muestra un error y no guarda si la imagen no existe en public/images/productos', async () => {
    const user = userEvent.setup()
    const onEnviar = vi.fn()
    render(
      <FormularioProducto
        categorias={categorias}
        imagenesDisponibles={['guitarra-ac-f310.jpg', 'mic-d-sm58.jpg']}
        onEnviar={onEnviar}
        onCancelar={() => {}}
      />,
    )

    await user.type(screen.getByLabelText(/SKU/), 'GA999')
    await user.type(screen.getByLabelText(/Nombre de Producto/), 'Guitarra de prueba')
    await user.type(screen.getByLabelText(/Precio/), '100000')
    await user.type(screen.getByLabelText(/^Stock\*?$/), '5')
    await user.selectOptions(screen.getByLabelText(/Categoría/), categorias[0].valor)
    await user.upload(screen.getByLabelText(/Subir Imagen/), new File([''], 'foto-que-no-existe.jpg', { type: 'image/jpeg' }))
    await user.click(screen.getByRole('button', { name: /guardar producto/i }))

    expect(screen.getByText('La imagen no existe en public/images/productos')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })
})
