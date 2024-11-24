// Función para calcular los valores
async function calcular() {
    const retiroFecha = document.querySelector("[name='fechaRetiro']").value;
    const devolucionFecha = document.querySelector("[name='fechadevolucion']").value;
    const vehiculoTipo = document.getElementById("tipoVehiculo").value;
    const seguroTipo = document.getElementById("seguro").value;
    const codigoNacionalidad = document.getElementById("nacionalidad").value;

    const diasInput = document.querySelector("[name='dias']");
    const tarifaInput = document.querySelector("[name='td']");
    const totalInput = document.querySelector("[name='totalPagar']");

    // Validar fechas
    if (!retiroFecha || !devolucionFecha) {
        alert("Por favor, seleccione las fechas de retiro y devolución.");
        return;
    }

    const fechaInicio = new Date(retiroFecha);
    const fechaFin = new Date(devolucionFecha);
    const diasTotales = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

    if (diasTotales < 3 || diasTotales > 365) {
        alert("La cantidad de días debe estar entre 3 y 365.");
        diasInput.value = "";
        return;
    }

    diasInput.value = diasTotales;

    // Calcular tarifa diaria
    let tarifaPorDia = parseFloat(vehiculoTipo) + parseFloat(seguroTipo);

    if (diasTotales > 30 && diasTotales <= 120) {
        tarifaPorDia *= 0.85; // 15% de descuento
    } else if (diasTotales > 120) {
        tarifaPorDia *= 0.75; // 25% de descuento
    }

    tarifaInput.value = tarifaPorDia.toFixed(2);

    // Obtener región del país
    let descuentoPorRegion = 0;
    try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codigoNacionalidad}`);
        const datosPais = await respuesta.json();
        const region = datosPais[0].region;

        if (region === "Americas" || region === "Europe") {
            descuentoPorRegion = 0.10;
        } else if (region === "Africa") {
            descuentoPorRegion = 0.05;
        }
    } catch (error) {
        console.error("Error al obtener la región:", error);
        alert("No se pudo obtener la región del país para calcular el descuento.");
    }

    // Calcular total a pagar
    const subtotal = tarifaPorDia * diasTotales;
    const descuento = subtotal * descuentoPorRegion;
    const totalAPagar = subtotal - descuento;

    totalInput.value = totalAPagar.toFixed(2);

    alert(`
        Detalles de la Cotización:
        - Días: ${diasTotales}
        - Tarifa Diaria: $${tarifaPorDia.toFixed(2)}
        - Subtotal: $${subtotal.toFixed(2)}
        - Descuento por Región: $${descuento.toFixed(2)}
        - Total a Pagar: $${totalAPagar.toFixed(2)}
    `);
}

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => {
    const botonCalcular = document.querySelector(".botones[value='Calcular']");
    botonCalcular.addEventListener("click", calcular);
});

// Función para guardar la cotización en LocalStorage
function guardarCotizacion() {
    const diasTotales = document.querySelector("[name='dias']").value;
    const tarifaPorDia = document.querySelector("[name='td']").value;
    const totalAPagar = document.querySelector("[name='totalPagar']").value;
    const codigoNacionalidad = document.getElementById("nacionalidad").value;
    const textoVehiculo = document.getElementById("tipoVehiculo").selectedOptions[0].text;
    const textoSeguro = document.getElementById("seguro").selectedOptions[0].text;

    // Validar que todos los datos estén completos
    if (!diasTotales || !tarifaPorDia || !totalAPagar) {
        alert("Debe calcular antes de guardar la cotización.");
        return;
    }

    // Crear un objeto con los datos de la cotización
    const datosCotizacion = {
        diasTotales,
        tarifaPorDia,
        totalAPagar,
        codigoNacionalidad,
        textoVehiculo,
        textoSeguro,
        fechaCotizacion: new Date().toLocaleString(), // Agregar fecha y hora actual
    };

    // Guardar en LocalStorage
    localStorage.setItem("ultimaCotizacion", JSON.stringify(datosCotizacion));
    alert("Cotización guardada correctamente.");
}

// Función para mostrar la última cotización al cargar la página
function mostrarUltimaCotizacion() {
    const datosCotizacion = JSON.parse(localStorage.getItem("ultimaCotizacion"));

    if (!datosCotizacion) {
        console.log("No hay cotización guardada.");
        return;
    }

    // Mostrar los datos en los campos correspondientes
    document.querySelector("[name='dias']").value = datosCotizacion.diasTotales;
    document.querySelector("[name='td']").value = datosCotizacion.tarifaPorDia;
    document.querySelector("[name='totalPagar']").value = datosCotizacion.totalAPagar;

    alert(`
        Última Cotización:
        - Días: ${datosCotizacion.diasTotales}
        - Tarifa Diaria: $${datosCotizacion.tarifaPorDia}
        - Total a Pagar: $${datosCotizacion.totalAPagar}
        - Nacionalidad: ${datosCotizacion.codigoNacionalidad}
        - Tipo Vehículo: ${datosCotizacion.textoVehiculo}
        - Tipo Seguro: ${datosCotizacion.textoSeguro}
        - Fecha: ${datosCotizacion.fechaCotizacion}
    `);
}

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar última cotización al cargar la página
    mostrarUltimaCotizacion();

    // Asociar el evento al botón "Guardar"
    const botonGuardar = document.querySelector(".botones[value='Guardar']");
    botonGuardar.addEventListener("click", guardarCotizacion);
});
