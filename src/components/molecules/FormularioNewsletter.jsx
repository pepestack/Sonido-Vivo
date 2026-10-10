import { Form, InputGroup } from "react-bootstrap"
import Entrada from "../atoms/Entrada"
import { Boton } from "../atoms/Boton/Boton"
import MensajeEstado from "../atoms/MensajeEstado"
import { useState } from "react"

export default function FormularioNewsletter(){
    const [correo, setCorreo] = useState('')
    const [mensaje, setMensaje] = useState('')

    return (
        <Form className='mb-4' noValidate>
            <InputGroup>
                <Entrada
                    id="newsletter-correo"
                    tipo="email"
                    valor={correo}
                    onChange={(evento) => setCorreo(evento.target.value)}
                    placeholder="Escribe tu mail"
                    aria-label="Correo para el newsletter"
                />
                <Boton variante="naranja" tipo="submit">
                    Suscribirme
                </Boton>
            </InputGroup>
            <MensajeEstado tipo="neutro" className="mt-2 text-white">{mensaje}</MensajeEstado>
        </Form>
    )
}