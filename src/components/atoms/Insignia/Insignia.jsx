import { Badge } from 'react-bootstrap'

export function Insignia(props) {
  return (
    <Badge bg={props.color ?? 'dark'} pill={props.redondeada ?? false} className={props.className ?? ''}>
      {props.children}
    </Badge>
  )
}