import NavItem from "../atoms/NavItem";


function NavList() {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 fw-bold fs-5">
        <NavItem to={"/home"}>home</NavItem>
        <NavItem to={"/catalogo"}>Catalogos</NavItem>
        <NavItem to={"/nosotros"}>Nosotros</NavItem>
        <NavItem to={"/blog"}>Blog</NavItem>
        <NavItem to={"/contacto"}>contacto</NavItem>
    </ul>
  );
}

export default NavList;
