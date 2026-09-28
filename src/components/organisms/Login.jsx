import { useState } from "react";
import CampoInput from "../molecules/CampoInput";
import { Container, Form } from "react-bootstrap";
import Boton from "../atoms/Boton";
function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  function manejarEnvio(e) {

    e.preventDefault();

    console.log(email, contraseña);
    
  }

  return (
    <Container>
      <Form onSubmit={manejarEnvio} noValidate>
        <CampoInput
          id="email"
          texto="Ingrese su correo electronico"
          type="email"
          placeholder="Sebastian@Gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <CampoInput
          id="password"
          texto="Ingrese su contraseña"
          type="password"
          placeholder="*********"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        <Boton texto={"Ingresar"} />
      </Form>
    </Container>
  );
}

export default Login;
