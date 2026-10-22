import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import CarritoPage from "./pages/CarritoPage";
import OfertasPage from "./pages/OfertasPage";
import CheckoutPage from "./pages/CheckoutPage";
import CompraExitosaPage from "./pages/CompraExitosaPage";
import CompraErrorPage from "./pages/CompraErrorPage";
import MisPedidosPage from "./pages/MisPedidosPage";
import MiPedidoPage from "./pages/MiPedidoPage";
import AdminHome from "./pages/admin/AdminHome";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import VerUsuario from "./pages/admin/VerUsuario";
import BlogPage from "./pages/BlogPage";
import DetalleBlogPage from "./pages/DetalleBlogPage";
import Home from "./pages/Home";
import NosotrosPage from "./pages/NosotrosPage";
import { ProductosProvider } from "./context/ProductosContext";
import { CategoriasProvider } from "./context/CategoriasContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { CarritoProvider } from "./context/CarritoContext";
import { SesionProvider } from "./context/SesionContext";
import { PedidosProvider } from "./context/PedidosContext";
import NoEncontrado from "./pages/NoEncontrado";
import AdminVerProducto from "./pages/admin/AdminVerProducto";
import AdminNuevoProducto from "./pages/admin/AdminNuevoProducto";
import AdminEditarProducto from "./pages/admin/AdminEditarProducto";
import AdminNuevoUsuario from "./pages/admin/AdminNuevoUsuario";
import AdminEditarUsuario from "./pages/admin/AdminEditarUsuario";
import AdminCriticos from "./pages/admin/AdminCriticos";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminNuevaCategoria from "./pages/admin/AdminNuevaCategoria";
import AdminEditarCategoria from "./pages/admin/AdminEditarCategoria";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminVerPedido from "./pages/admin/AdminVerPedido";
import AdminReportes from "./pages/admin/AdminReportes";
import AdminPerfil from "./pages/admin/AdminPerfil";

export default function App() {
  return (
    <ProductosProvider>
      <CategoriasProvider>
        <UsuariosProvider>
          <SesionProvider>
            <CarritoProvider>
              <PedidosProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Publico */}
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/categoria/:nombre" element={<Catalogo />} />
                    <Route path="/buscar/:texto" element={<Catalogo />} />
                    <Route path="/producto/:id" element={<DetalleProducto />} />
                    <Route path="/ofertas" element={<OfertasPage />} />
                    <Route path="/carrito" element={<CarritoPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/compra/exito/:id" element={<CompraExitosaPage />} />
                    <Route path="/compra/error" element={<CompraErrorPage />} />
                    <Route path="/mis-pedidos" element={<MisPedidosPage />} />
                    <Route path="/mis-pedidos/:id" element={<MiPedidoPage />} />
                    <Route path="/contacto" element={<ContactoPage />} />
                    <Route path="/nosotros" element={<NosotrosPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<DetalleBlogPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registro" element={<RegisterPage />} />

                    {/* Panel de administración */}
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/productos" element={<AdminProductos />} />
                    <Route path="/admin/productos/:id" element={<AdminVerProducto />} />
                    <Route path="/admin/productos/nuevo" element={<AdminNuevoProducto />} />
                    <Route path="/admin/productos/:id/editar" element={<AdminEditarProducto />} />
                    <Route path="/admin/criticos" element={<AdminCriticos />} />
                    <Route path="/admin/categorias" element={<AdminCategorias />} />
                    <Route path="/admin/categorias/nueva" element={<AdminNuevaCategoria />} />
                    <Route path="/admin/categorias/:valor/editar" element={<AdminEditarCategoria />} />
                    <Route path="/admin/pedidos" element={<AdminPedidos />} />
                    <Route path="/admin/pedidos/:id" element={<AdminVerPedido />} />
                    <Route path="/admin/reportes" element={<AdminReportes />} />
                    <Route path="/admin/perfil" element={<AdminPerfil />} />
                    <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                    <Route path="/admin/usuarios/:id" element={<VerUsuario />} />
                    <Route path="/admin/usuarios/nuevo" element={<AdminNuevoUsuario />} />
                    <Route path="/admin/usuarios/:id/editar" element={<AdminEditarUsuario />} />
                    <Route path="*" element={<NoEncontrado />} />
                  </Routes>
                </BrowserRouter>
              </PedidosProvider>
            </CarritoProvider>
          </SesionProvider>
        </UsuariosProvider>
      </CategoriasProvider>
    </ProductosProvider>
  )
}
