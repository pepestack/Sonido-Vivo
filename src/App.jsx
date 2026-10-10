import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import { PlantillaPublica } from "./components/templates/PlantillaPublica/PlantillaPublica";
import Catalogo from "./pages/Catalogo";
import AdminHome from "./pages/admin/AdminHome";
import BlogPage from "./pages/BlogPage";
import Home from "./pages/Home";
import Blog1Page from "./pages/Blog1Page";
import Blog2Page from "./pages/Blog2Page";
import { PlantillaPrivada } from "./components/templates/PlantillaPrivada/PlantillaPrivada";
import NosotrosPage from "./pages/NosotrosPage";

function App() {
  return (
    <Routes>
      <Route element={<PlantillaPublica />}>
        <Route path="/" element={<Home />} />
        {/* aca tiene que ir el page del home*/}
        <Route path="/home" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog1" element={<Blog1Page />} />
        <Route path="/blog2" element={<Blog2Page />} />
        

        <Route path="/nosotros" element={<NosotrosPage />} />

      </Route>

      <Route>
        <Route element={<PlantillaPrivada />}>
          <Route path="/admin" element={<AdminHome />} />

        </Route>
        
      </Route>
    </Routes>
    
  );
}

export default App;
