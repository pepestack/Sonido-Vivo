import { useState } from "react";
import { CampoInput } from "../../molecules/CampoInput/CampoInput";
import {Form} from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";

export function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [exito, setExito] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    const correoValido = patronCorreo.test(email.trim());
    setErrorEmail(!correoValido);

    const passwordValid = contraseña.trim() !== "";
    setErrorPassword(!passwordValid);

    setExito(correoValido && passwordValid);
  }

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <CampoInput
        id="email"
        texto="Ingrese su correo electronico"
        type="email"
        placeholder="Sebastian@Gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        validar={errorEmail}
        required
      />

      <CampoInput
        id="password"
        texto="Ingrese su contraseña"
        type="password"
        placeholder="*********"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        validar={errorPassword}
        required
      />
      <div className="text-center mt-1">
        <Boton tipo="submit">Ingresar</Boton>
      </div>
      <div className="text-center mt-3">
        {exito ? (
          <strong className="text-center">Iniciando sesión...</strong>
        ) : (
          ""
        )}
        {errorEmail || errorPassword ? (
          <strong>Correo o contraseña inválida..</strong>
        ) : (
          ""
        )}
      </div>
    </Form>
  );
}

