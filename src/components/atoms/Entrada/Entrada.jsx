import { Form } from "react-bootstrap";

export function Entrada({
    id,
    nombre,
    tipo = 'text',
    valor,
    onChange,
    placeholder,
    invalido = false,
    disabled = false,
    tamano,
    className = '',
    ...resto
}){
    return (
        <Form.Control
            id={id}
            name={nombre ?? id}
            type={tipo}
            value={tipo === 'file' ? undefined : valor ?? ''}
            onChange={onChange}
            placeholder={placeholder}
            isInvalid={invalido}
            disabled={disabled}
            size={tamano}
            className={className}
            {...resto}
        />
    )
}