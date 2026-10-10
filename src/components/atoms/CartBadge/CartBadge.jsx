import { Badge } from "react-bootstrap";

export function CartBadge({ children, color = 'dark', redondeada = false, className = '' }){
    return (
        <Badge bg={color} pill={redondeada} className={className}>
            {children}
        </Badge>
    );
}