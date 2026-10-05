import { Link } from 'react-router-dom'

export default function Enlace({ to, children, className = '', onClick }) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
