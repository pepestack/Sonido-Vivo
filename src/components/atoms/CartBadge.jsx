import { Badge } from "react-bootstrap";

export default function CartBadge({count = 0}){
    return (
        <Badge bg="dark" pill className="ms-1">
            {count}
        </Badge>
    );
}