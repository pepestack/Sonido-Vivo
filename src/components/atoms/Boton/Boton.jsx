import { Button } from "react-bootstrap";

export function Boton(props){
    const variante = props.variante ?? 'primary'
    const tipo = props.tipo ?? 'button'
    const disabled = props.disabled ?? false
    const className = props.className ?? ''
    const esNaranja = variante === 'naranja'

    return(
        <Button
            type={tipo}
            variant={esNaranja ? '' : variante}
            size={props.tamano}
            disabled={disabled}
            className={`${esNaranja ? 'orange-btn' : ''} ${className}`.trim()}
            onClick={props.onClick}
            aria-controls={props.controla}
            aria-expanded={props.expandido}
        >
            {props.children}
        </Button>
    )
}

