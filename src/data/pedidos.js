// Datos iniciales (seed) de los pedidos. El estado real vive en PedidosContext.
// Forma de un pedido:
// { id, fecha (ISO), usuarioId (null si compró sin cuenta), cliente: { nombre, apellido, correo },
//   entrega: { tipo: 'despacho', region, comuna, direccion } | { tipo: 'retiro' },
//   items: [{ id, nombre, precio, cantidad }], subtotal, despacho, total, estado, tarjeta }
// De la tarjeta solo se guardan los últimos 4 dígitos

export const ESTADOS_PEDIDO = ['En preparación', 'Despachado', 'Entregado']
export const ESTADO_INICIAL = ESTADOS_PEDIDO[0]

export const tiposEntrega = [
  { valor: 'despacho', texto: 'Despacho a domicilio' },
  { valor: 'retiro', texto: 'Retiro en tienda (Viña del Mar)' },
]

// Punto de partida del formulario de checkout; con sesión se completa con los datos del usuario
export const checkoutVacio = {
  nombre: '',
  apellido: '',
  correo: '',
  tipoEntrega: 'despacho',
  region: '',
  comuna: '',
  direccion: '',
  numeroTarjeta: '',
  vencimiento: '',
  cvv: '',
}

// Pago simulado: esta tarjeta de prueba siempre es rechazada, para mostrar la pantalla de error
export const TARJETA_RECHAZADA = '4000000000000002'

export const pedidosIniciales = [
  {
    id: 1,
    fecha: '2026-10-05T15:20:00.000Z',
    usuarioId: 5,
    cliente: { nombre: 'Camila', apellido: 'Rojas', correo: 'cliente@gmail.com' },
    entrega: { tipo: 'despacho', region: 'Región de Valparaíso', comuna: 'Concón', direccion: 'Av. Borgoño 1234' },
    items: [
      { id: 'GE001', nombre: 'Guitarra Eléctrica Stratocaster Squier Affinity Strat', precio: 249990, cantidad: 1 },
      { id: 'AC001', nombre: 'Cuerdas Guitarra Eléctrica 09-42 Ernie Ball Super Slinky', precio: 8990, cantidad: 2 },
    ],
    subtotal: 267970,
    despacho: 6767,
    total: 274737,
    estado: 'Entregado',
    tarjeta: '•••• 4242',
  },
  {
    id: 2,
    fecha: '2026-10-12T19:45:00.000Z',
    usuarioId: null,
    cliente: { nombre: 'Matías', apellido: 'Soto', correo: 'matias.soto@gmail.com' },
    entrega: { tipo: 'retiro' },
    items: [
      { id: 'MI001', nombre: 'Micrófono Dinámico Cardioide Shure SM58', precio: 149990, cantidad: 1 },
    ],
    subtotal: 149990,
    despacho: 0,
    total: 149990,
    estado: 'Entregado',
    tarjeta: '•••• 1881',
  },
  {
    id: 3,
    fecha: '2026-10-19T13:10:00.000Z',
    usuarioId: 5,
    cliente: { nombre: 'Camila', apellido: 'Rojas', correo: 'cliente@gmail.com' },
    entrega: { tipo: 'despacho', region: 'Región de Valparaíso', comuna: 'Concón', direccion: 'Av. Borgoño 1234' },
    items: [
      { id: 'GA001', nombre: 'Guitarra Acústica Folk Yamaha F310', precio: 129990, cantidad: 1 },
    ],
    subtotal: 129990,
    despacho: 6767,
    total: 136757,
    estado: 'En preparación',
    tarjeta: '•••• 4242',
  },
]
