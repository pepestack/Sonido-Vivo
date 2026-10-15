import { useState } from "react"
import { Boton } from "../../atoms/Boton/Boton"
import { Entrada } from "../../atoms/Entrada/Entrada"
import { Icono } from "../../atoms/Icono/Icono"
import { Form } from "react-bootstrap"

export function Buscador(props) {
    const [texto, setTexto] = useState('')

    function buscar(evento) {
        evento.preventDefault()
        if (texto.trim() !== '') {
            props.onBuscar(texto.trim())
        }
    }

    return (
        <Form className={`d-flex ${props.className ?? ''}`.trim()} role="search" onSubmit={buscar}>
            <Entrada
                id={props.id}
                tipo="search"
                valor={texto}
                onChange={(evento) => setTexto(evento.target.value)}
                placeholder={props.placeholder}
                etiquetaAccesible={props.etiquetaAccesible}
                className="me-2"
            />
            <Boton variante="naranja" tipo="submit">
                <Icono icono="bi bi-search" />
            </Boton>
        </Form>
    )
}