import NavItem from "../atoms/NavItem";

function NavList() {
  const links = [
    { to: "/home", texto: "Home" },
    { to: "/catalogo", texto: "Catálogos" },
    { to: "/nosotros", texto: "Nosotros" },
    { to: "/blog", texto: "Blog" },
    { to: "/contacto", texto: "Contacto" },
  ];



  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 fw-bold fs-5">
        {links.map((link, index) => (
            <NavItem key={index} to={link.to} texto={link.texto} />
        ))}
    </ul>
  )




}

export default NavList;
