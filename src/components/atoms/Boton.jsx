import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Boton({
    variante = "primary", 
    children, 
    onClick,
    tamano,
    tipo = "button",
    to,
    disabled=false,
    className = ''
}){

    const esNaranja = variante === 'naranja'
    const props= {
        variant: esNaranja ? '' : variante,
        size: tamano,
        disabled: disabled,
        className: `${esNaranja ? 'orange-btn':''} ${className}`.trim()
    }

    if(to){
        return(
            <Button as={Link} to={to} onClick={onClick} {...props}>
                {children}
            </Button>
        )
    }

    return(
        <Button type={tipo} onClick={onClick} {...props}>
            {children}
        </Button>
    )
}

export default Boton;