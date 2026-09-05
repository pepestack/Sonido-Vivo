const ubicaciones = {
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio"],
    "Región Metropolitana": ["Santiago", "San Bernardo", "Puente Alto", "Maipú", "Providencia"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"]
};

const selectRegion = document.getElementById('region');
const selectComuna = document.getElementById('comuna');

Object.keys(ubicaciones).forEach(region => {
    const opcion = document.createElement('option');
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
});

selectRegion.addEventListener('change', (e) => {
    const comunas = ubicaciones[e.target.value];
    selectComuna.innerHTML = '<option value="" selected disabled>Seleccione una comuna...</option>';
    selectComuna.disabled = false;
    comunas.forEach(comuna => {
        const opcion = document.createElement('option');
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });
});

function validarRut(run) {
    if (!/^[0-9]+[0-9kK]$/.test(run) || run.length < 7 || run.length > 9) return false;
    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1).toUpperCase();
    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += cuerpo[i] * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dvCalculado === dvIngresado;
}

const obligatorios = document.querySelectorAll("[required]");
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const correo = document.querySelector("#correo");
const rut = document.querySelector("#rut");
const formulario = document.querySelector("#form-crearusuario");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    let flag = true;

    obligatorios.forEach(function(a) {
        if (a.value.trim() === "") {
            a.classList.add("campo-error");
            flag = false;
        } else {
            a.classList.remove("campo-error");
        }
    });

    const dominios = ["gmail.com"];
    const dominioIngresado = correo.value.trim().split("@")[1];

    if (!patronCorreo.test(correo.value.trim()) || !dominios.includes(dominioIngresado)) {
        correo.classList.add("campo-error");
        flag = false;
    }

    if (!validarRut(rut.value.trim())) {
        rut.classList.add("campo-error");
        flag = false;
    }

    if (flag) {
        window.location.href = "admin-usuario.html";
    }
});