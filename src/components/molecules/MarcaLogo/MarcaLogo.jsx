import { Enlace } from "../../atoms/Enlace/Enlace";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Texto } from "../../atoms/Texto/Texto";
import logo from "../../../assets/images/logo.png";
import logoBlanco from "../../../assets/images/logo-blanco.png";

// para no repetirla tanto
const claseEnlace = 'navbar-brand d-flex align-items-center text-decoration-none'

export function MarcaLogo(props){
  const ruta = props.ruta ?? '/'

  if (props.variante === 'admin'){
    return(
      <Enlace ruta={ruta} onNavegar={props.onNavegar} className={claseEnlace}>
        <Imagen src={logoBlanco} alt="Sonido Vivo" className="logo-sm"/>
        <Texto como="span" className="ms-2 fw-bold text-white">
          Sonido Vivo{' '}
          <span className="d-none d-md-inline">
            <span className="text-warning">Panel Administrador</span>
          </span>
        </Texto>
      </Enlace>
    )
  }

  return(
    <Enlace ruta={ruta} onNavegar={props.onNavegar} className={claseEnlace}>
      <Imagen src={logo} alt="Sonido Vivo" className="logo"/>
      <Texto como="span" classNamae="sv-logo-title">
        <span className="sonido">Sonido </span>
        <span className="vivo">Vivo</span>
      </Texto>
    </Enlace>
  )
}