export const footerInfo = [
    {texto: 'Términos y Condiciones', ruta: "#", disabled: true},
    {texto: 'Política de Privacidad', ruta: "#", disabled: true},
    {texto: 'Políticas de Garantía', ruta: "#", disabled: true}
]

export const footerCuenta=[
    {texto: "Iniciar sesión", ruta: '/login'},
    {texto: "Registrarse", ruta: '/registro'}
]

export const sidebarPrincipal = [
  { texto: 'Dashboard', ruta: '/admin', icono: 'bi bi-grid-fill', exacto: true },
  { texto: 'Pedidos', ruta: '#', icono: 'bi bi-receipt', deshabilitado: true },
  { texto: 'Inventario', ruta: '/admin/productos', icono: 'bi bi-box-seam' },
  { texto: 'Reportes', ruta: '#', icono: 'bi bi-bar-chart', deshabilitado: true },
  { texto: 'Usuarios', ruta: '/admin/usuarios', icono: 'bi bi-people' },
]

export const sidebarSecundario = [
  { texto: 'Configuración', ruta: '#', icono: 'bi bi-gear', deshabilitado: true },
  { texto: 'Perfil', ruta: '#', icono: 'bi bi-person-plus', deshabilitado: true },
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

export const menuCuenta = [
  { texto: 'Mi Cuenta', ruta: '/admin' },
  { separador: true },
  { texto: 'Iniciar sesión', ruta: '/login' },
  { texto: 'Registrarse', ruta: '/registro' },
]