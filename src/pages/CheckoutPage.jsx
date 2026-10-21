import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Enlace } from "../components/atoms/Enlace/Enlace";
import { Texto } from "../components/atoms/Texto/Texto";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { Encabezado } from "../components/molecules/Encabezado/Encabezado";
import { FormularioCheckout } from "../components/organisms/FormularioCheckout/FormularioCheckout";
import { ResumenOrden } from "../components/organisms/ResumenOrden/ResumenOrden";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useCarrito } from "../context/CarritoContext";
import { usePedidos } from "../context/PedidosContext";
import { useSesion } from "../context/SesionContext";
import { tiposEntrega } from "../data/pedidos";
import { comunasDe, regiones } from "../data/ubicaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { calcularTotales } from "../services/carritoService";

// Con sesión iniciada el formulario parte con los datos del usuario
function datosDeUsuario(usuario) {
  if (!usuario) return {};
  return {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    region: usuario.region,
    comuna: usuario.comuna,
    direccion: usuario.direccion,
  };
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const carrito = useCarrito();
  const sesion = useSesion();
  const pedidosCtx = usePedidos();
  // el tipo de entrega vive en la página porque cambia el total del resumen
  const [tipoEntrega, setTipoEntrega] = useState("despacho");
  useTituloPagina("Finalizar compra");

  if (carrito.items.length === 0) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="No hay nada que pagar"
          texto="Tu carrito está vacío. Agrega productos desde el catálogo."
          textoBoton="Ir al catálogo"
          onAccion={() => navigate("/catalogo")}
        />
      </PlantillaPublica>
    );
  }

  const totales = calcularTotales(carrito.items, tipoEntrega);

  function pagar(datos, numeroTarjeta) {
    const resultado = pedidosCtx.confirmarCompra({ ...datos, usuarioId: sesion.usuario?.id ?? null }, numeroTarjeta);
    if (resultado.ok) {
      navigate(`/compra/exito/${resultado.pedido.id}`, { replace: true });
    } else {
      navigate("/compra/error", { state: { motivo: resultado.motivo } });
    }
  }

  return (
    <PlantillaPublica>
      <Encabezado titulo="Finalizar compra" subtitulo="Revisa tus datos y confirma el pago." />
      {sesion.usuario ? (
        <Texto className="text-success">
          Completamos el formulario con los datos de tu cuenta. Puedes cambiarlos antes de pagar.
        </Texto>
      ) : (
        <Texto>
          ¿Tienes cuenta?{" "}
          <Enlace ruta="/login" onNavegar={(ruta) => navigate(ruta, { state: { desde: "/checkout" } })}>
            Inicia sesión
          </Enlace>{" "}
          para completar tus datos automáticamente.
        </Texto>
      )}
      <Row>
        {/* en pantallas chicas el resumen va primero para ver el total antes del formulario */}
        <Col xs={12} lg={4} className="order-first order-lg-last mb-4">
          <ResumenOrden
            items={carrito.items}
            subtotal={totales.subtotal}
            despacho={totales.despacho}
            total={totales.total}
          />
        </Col>
        <Col xs={12} lg={8} className="mb-4">
          <FormularioCheckout
            valoresIniciales={datosDeUsuario(sesion.usuario)}
            regiones={regiones}
            comunasDe={comunasDe}
            tiposEntrega={tiposEntrega}
            total={totales.total}
            onCambiarEntrega={setTipoEntrega}
            onEnviar={pagar}
          />
        </Col>
      </Row>
    </PlantillaPublica>
  );
}
