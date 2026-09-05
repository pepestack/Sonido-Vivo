const form = document.querySelector("#form-crearproducto")
const forms = document.querySelectorAll('#form-crearproducto input, #form-crearproducto select, #form-crearproducto textarea');


form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formularioValido = true;
    forms.forEach(function (field) {

        let campoInvalido = false;

        if (field.id === "sku" && field.value.trim().length < 3) {
            campoInvalido = true;
        }

        if (field.id === "descripcion" && field.value.trim().length > 500) {
            campoInvalido = true;
        }

        if (field.id === "nombre" && (field.value.trim() === '' || field.value.trim().length > 100)) {
            campoInvalido = true;
        }


        if (field.id === "precio" && (isNaN(field.valueAsNumber) || field.valueAsNumber < 0)) {
            campoInvalido = true;
        }

        if (field.id === "stock" && (!Number.isInteger(field.valueAsNumber) || field.valueAsNumber < 0)) {
            campoInvalido = true;
        }

        if (field.id === "stock-crit" && field.value.trim() !== "") {
            const stockVal = document.querySelector("#stock").valueAsNumber;

            if (field.valueAsNumber < 0 || !Number.isInteger(field.valueAsNumber)) {
                campoInvalido = true;
            }

            if (!isNaN(stockVal) && field.valueAsNumber >= stockVal) {
                campoInvalido = true;
                document.querySelector("#stock-crit-error").textContent =
                    "El stock crítico no puede ser mayor o igual al stock";
            }
        }

        if (campoInvalido) {
            formularioValido = false;
            field.classList.add("campo-error");
        } else {
            field.classList.remove("campo-error");
        }
    });

    if (formularioValido) {
        document.querySelector("#mensaje-exito").textContent = 'Operación realizada con éxito';
        document.querySelector("#stock-crit-error").textContent = '';
    } else {
        document.querySelector("#mensaje-exito").textContent = '';
    }
});