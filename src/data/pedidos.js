export const ESTADOS_PEDIDO = ['En preparación', 'Confirmado', 'Despachado', 'Entregado', 'Cancelado']

export const tiposEntrega = [
  { valor: 'despacho', texto: 'Despacho a domicilio' },
  { valor: 'retiro', texto: 'Retiro en tienda (Viña del Mar)' },
]

// Punto de partida del formulario de checkout; con sesión se completa con los datos del usuario
export const checkoutVacio = {
  nombre: '',
  apellido: '',
  correo: '',
  region: '',
  comuna: '',
  direccion: '',
  numeroTarjeta: '',
  vencimiento: '',
  cvv: '',
}

// Pago simulado: esta tarjeta de prueba siempre es rechazada, para mostrar la pantalla de error
export const TARJETA_RECHAZADA = '4000000000000002'
