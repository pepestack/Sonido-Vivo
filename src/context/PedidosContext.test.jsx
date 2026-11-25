import { act, renderHook } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import { PedidosProvider, usePedidos } from './PedidosContext'
import { api } from '../services/api'

const { vaciarCarrito, recargar } = vi.hoisted(() => ({
  vaciarCarrito: vi.fn(),
  recargar: vi.fn(),
}))

vi.mock('./SesionContext', () => ({
  useSesion: () => ({ usuario: null }),
}))
vi.mock('./CarritoContext', () => ({
  useCarrito: () => ({
    items: [{ id: 'GA001', precio: 200, stock: 4, cantidad: 2 }],
    vaciarCarrito,
  }),
}))
vi.mock('./ProductosContext', () => ({
  useProductos: () => ({ recargar }),
}))
vi.mock('../services/api', () => ({ api: { post: vi.fn() } }))

const datos = {
  cliente: { nombre: 'Camila', apellido: 'Rojas', correo: 'camila@example.com' },
  entrega: { tipo: 'retiro' },
}

beforeEach(() => vi.resetAllMocks())

it('envía solo los campos del contrato y espera la confirmación antes de vaciar el carrito', async () => {
  let resolver
  api.post.mockReturnValue(new Promise((resolve) => { resolver = resolve }))
  const { result } = renderHook(() => usePedidos(), { wrapper: PedidosProvider })
  let confirmacion

  act(() => { confirmacion = result.current.confirmarCompra(datos) })
  expect(result.current.comprando).toBe(true)
  expect(await result.current.confirmarCompra(datos)).toBeNull()
  expect(api.post).toHaveBeenCalledTimes(1)
  expect(api.post).toHaveBeenCalledWith('/pedidos', {
    ...datos,
    items: [{ codigo: 'GA001', cantidad: 2 }],
    pagoSimulado: 'aprobado',
  })
  expect(vaciarCarrito).not.toHaveBeenCalled()

  const pedido = { id: 42, total: 450 }
  await act(async () => {
    resolver({ status: 201, data: pedido })
    expect(await confirmacion).toEqual(pedido)
  })

  expect(result.current.comprobante).toEqual(pedido)
  expect(result.current.comprando).toBe(false)
  expect(vaciarCarrito).toHaveBeenCalledOnce()
  expect(recargar).toHaveBeenCalledOnce()
})

it.each([401, 409, 500])('conserva el carrito y no reintenta ante un error HTTP %s', async (status) => {
  const error = { response: { status } }
  api.post.mockRejectedValue(error)
  const { result } = renderHook(() => usePedidos(), { wrapper: PedidosProvider })

  await act(async () => {
    await expect(result.current.confirmarCompra(datos)).rejects.toBe(error)
  })

  expect(api.post).toHaveBeenCalledOnce()
  expect(result.current.comprobante).toBeNull()
  expect(result.current.comprando).toBe(false)
  expect(vaciarCarrito).not.toHaveBeenCalled()
  expect(recargar).not.toHaveBeenCalled()
})
