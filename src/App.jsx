import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import CarritoPage from "./pages/CarritoPage";
import AdminHome from "./pages/admin/AdminHome";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import VerUsuario from "./pages/admin/VerUsuario";
import BlogPage from "./pages/BlogPage";
import DetalleBlogPage from "./pages/DetalleBlogPage";
import Home from "./pages/Home";
import NosotrosPage from "./pages/NosotrosPage";
import { ProductosProvider } from "./context/ProductosContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { CarritoProvider } from "./context/CarritoContext";
import NoEncontrado from "./pages/NoEncontrado";
import AdminVerProducto from "./pages/admin/AdminVerProducto";

export default function App() {
  return (
    <ProductosProvider>
      <UsuariosProvider>
        <CarritoProvider>
          <BrowserRouter>
            <Routes>
              {/* Publico */}
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/categoria/:nombre" element={<Catalogo />} />
              <Route path="/buscar/:texto" element={<Catalogo />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<CarritoPage />} />
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
              <Route path="/admin/usuarios" element={<AdminUsuarios />} />
              <Route path="/admin/usuarios/:id" element={<VerUsuario />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </BrowserRouter>
        </CarritoProvider>
      </UsuariosProvider>
    </ProductosProvider>
  )
}
