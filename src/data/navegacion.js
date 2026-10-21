export const footerInfo = [
    {texto: 'Términos y Condiciones', ruta: "#", deshabilitado: true},
    {texto: 'Política de Privacidad', ruta: "#", deshabilitado: true},
    {texto: 'Políticas de Garantía', ruta: "#", deshabilitado: true}
]

export const footerCuenta=[
    {texto: "Iniciar sesión", ruta: '/login'},
    {texto: "Registrarse", ruta: '/registro'}
]

export const sidebarPrincipal = [
  { texto: 'Dashboard', ruta: '/admin', icono: 'bi bi-grid-fill', exacto: true },
  { texto: 'Pedidos', ruta: '/admin/pedidos', icono: 'bi bi-receipt' },
  { texto: 'Inventario', ruta: '/admin/productos', icono: 'bi bi-box-seam' },
  { texto: 'Stock crítico', ruta: '/admin/criticos', icono: 'bi bi-exclamation-triangle' },
  { texto: 'Reportes', ruta: '/admin/reportes', icono: 'bi bi-bar-chart' },
  { texto: 'Usuarios', ruta: '/admin/usuarios', icono: 'bi bi-people' },
]

export const sidebarSecundario = [
  { texto: 'Configuración', ruta: '#', icono: 'bi bi-gear', deshabilitado: true },
  { texto: 'Perfil', ruta: '/admin/perfil', icono: 'bi bi-person-circle' },
  { texto: 'Buscar', ruta: '#', icono: 'bi bi-search', deshabilitado: true },
  { texto: 'Ayuda', ruta: '#', icono: 'bi bi-question-circle', deshabilitado: true },
]


export const navTienda = [
  { texto: 'Home', ruta: '/' },
  { texto: 'Productos', ruta: '/catalogo' },
  { texto: 'Nosotros', ruta: '/nosotros' },
  { texto: 'Blogs', ruta: '/blog' },
  { texto: 'Contacto', ruta: '/contacto' },
]

// Menú de cuenta sin sesión; con sesión PlantillaPublica arma uno con el nombre del usuario
export const menuCuenta = [
  { texto: 'Iniciar sesión', ruta: '/login' },
  { texto: 'Registrarse', ruta: '/registro' },
]