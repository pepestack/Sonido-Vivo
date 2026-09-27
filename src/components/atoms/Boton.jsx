function Boton({variante = "primary", texto, onClick}){

    return(
        <button className={`btn btn-${variante}`} onClick={onClick}>
            {texto}
        </button>
    )
}

export default Boton;