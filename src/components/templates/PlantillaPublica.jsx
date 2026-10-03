import { Outlet } from "react-router-dom";
import NavbarPrincipal from "../organisms/NavbarPrincipal";

function PlantillaPublica() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarPrincipal />
      <main className="main-custom-margin container py-4 mb-5 flex-grow-1">
        <Outlet/>
      </main>
    </div>
  );
}

export default PlantillaPublica;