import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactoPage from "./pages/ContactoPage";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <Routes>
      <Route element={<PlantillaPublica />}>
        <Route path="/" element={<RegisterPage />} />{" "}
        {/* aca tiene que ir el page del home*/}
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
