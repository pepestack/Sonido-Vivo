import NavbarPrincipal from "../organisms/NavbarPrincipal";

function PlantillaPublica({ children }) {
  return (
    <>
      <NavbarPrincipal />
      <main className="container my-5 pt-5 mt-5 flex-grow-1">
        {children}
      </main>
    </>
  );
}

export default PlantillaPublica;