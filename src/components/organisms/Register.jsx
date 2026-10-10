import { useState } from "react";
import CampoInput from "../molecules/CampoInput";
import { Form } from "react-bootstrap";
import { Boton } from "../atoms/Boton/Boton";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [contraseña, setContraseña] = useState("");
  const [contraseñaRepetida, setContraseñaRepetida] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  
  const [errorUsername, setErrorUsername] = useState(false);
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [exito, setExito] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    const correoValido = patronCorreo.test(email.trim());
    setErrorEmail(!correoValido);

    const passwordValid = contraseña.trim() !== "" && contraseñaRepetida == contraseña;
    setErrorPassword(!passwordValid);

    const usernameValid = username.trim() !== "";
    setErrorUsername(!usernameValid);

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
        id="username"
        texto="Ingrese su nombre de usuario"
        type="text"
        placeholder="flamingo_star67"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        validar={errorUsername}
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

      <CampoInput
        id="passwordrepeat"
        texto="Ingrese su contraseña nuevamente"
        type="password"
        placeholder="*********"
        value={contraseñaRepetida}
        onChange={(e) => setContraseñaRepetida(e.target.value)}
        validar={errorPassword}
        required
      />
      <div className="text-center mt-1">
        <Boton tipo="submit">Crear Cuenta</Boton>
      </div>
      <div className="text-center mt-3">
        {exito ? (
          <strong className="text-center">Iniciando sesión...</strong>
        ) : (
          ""
        )}
        {errorEmail || errorPassword || errorUsername ? (
          <strong>Datos invalidos..</strong>
        ) : (
          ""
        )}
      </div>
    </Form>
  );
}

export default Register;
