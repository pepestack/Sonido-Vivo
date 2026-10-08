import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Catalogo from "./pages/Catalogo";
import AdminHome from "./pages/admin/AdminHome";
import BlogPage from "./pages/BlogPage";
import Home from "./pages/Home";

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
        
      </Route>

      <Route>
        <Route path="/admin" element={<AdminHome />} />
      </Route>
    </Routes>
    
  );
}

export default App;
