import { Form } from 'react-bootstrap'
import { Etiqueta } from '../../atoms/Etiqueta/Etiqueta'
import { Entrada } from '../../atoms/Entrada/Entrada'
import { AreaTexto } from '../../atoms/AreaTexto/AreaTexto'
import { Selector } from '../../atoms/Selector/Selector'

export function CampoFormulario(props){
    const tipo= props.tipo ?? 'text'
    const error= props.error ?? ''
    const invalido = error !== ''
    const deshabilitado = props.deshabilitado ?? false

    let campo
    if (tipo === 'textarea') {
        campo = (
        <AreaTexto
            id={props.id}
            valor={props.valor}
            onChange={props.onChange}
            placeholder={props.placeholder}
            filas={props.filas}
            maxLength={props.maxLength}
            invalido={invalido}
            deshabilitado={deshabilitado}
        />
        )
    } else if (tipo === 'select') {
        campo = (
        <Selector
            id={props.id}
            valor={props.valor}
            onChange={props.onChange}
            placeholder={props.placeholder}
            opciones={props.opciones}
            invalido={invalido}
            deshabilitado={deshabilitado}
        />
        )
    } else {
        campo = (
        <Entrada
            id={props.id}
            tipo={tipo}
            valor={props.valor}
            onChange={props.onChange}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            accept={props.accept}
            invalido={invalido}
            deshabilitado={deshabilitado}
        />
        )
    }

    return (
        <div className={props.className ?? 'mb-3'}>
        <Etiqueta htmlFor={props.id} requerido={props.requerido} className={props.claseEtiqueta}>
            {props.etiqueta}
        </Etiqueta>
        {campo}
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </div>
    )
}