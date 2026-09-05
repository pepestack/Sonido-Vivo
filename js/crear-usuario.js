const obligatorios = document.querySelectorAll("[required]")
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const correo = document.querySelector("#correo");
const formulario = document.querySelector("#form-crearusuario");

formulario.addEventListener("submit", function(e){
    e.preventDefault()

    let flag = true;

    obligatorios.forEach(function (a){
        if(a.value.trim() === ""){
            a.classList.add("campo-error")
            flag =false;
        }else{
            a.classList.remove("campo-error")
        }
    })

    if(!patronCorreo.test(correo.value.trim())){
        correo.classList.add("campo-error")
        flag = false
    }

    if(flag){
        document.querySelector("#register").textContent = "Registrado!"
    }

})