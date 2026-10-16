import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { PanelAdmin } from "../../components/organisms/PanelAdmin/PanelAdmin";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";

const accesos = [
  {
    titulo: "Gestión de productos",
    texto:
      "Agrega nuevos instrumentos, edita precios, actualiza stock o elimina referencias del catálogo.",
    textoBoton: "Administrar Productos",
    ruta: "/admin/productos",
  },
  {
    titulo: "Gestión de usuarios",
    texto:
      "Administra las cuentas de tus vendedores, crea nuevos accesos o edita permisos del sistema.",
    textoBoton: "Administrar Usuarios",
    ruta: "/admin/usuarios",
  },
];

export default function Admin() {
  return (
    <PlantillaPrivada>
      <>
        <Encabezado
          titulo="Bienvenido"
          subtitulo="¿Qué deseas gestionar hoy?"
          claseTitulo="display-6 fw-bold"
        />
        <PanelAdmin accesos={accesos} />
      </>
    </PlantillaPrivada>
  );
}
