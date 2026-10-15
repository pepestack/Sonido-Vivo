import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import Catalogo from "./pages/Catalogo";
import AdminHome from "./pages/admin/AdminHome";
import BlogPage from "./pages/BlogPage";
import Home from "./pages/Home";
import NosotrosPage from "./pages/NosotrosPage";
import { ProductosProvider } from "./context/ProductosContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { CarritoProvider } from "./context/CarritoContext";
import NoEncontrado from "./pages/NoEncontrado";

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
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              {/* Panel de administración */}
              <Route path="/admin" element={<AdminHome />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </BrowserRouter>
        </CarritoProvider>
      </UsuariosProvider>
    </ProductosProvider>
  )
}