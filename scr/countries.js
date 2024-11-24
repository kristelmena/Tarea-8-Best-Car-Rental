// Función para cargar los países desde la API
async function cargarPaises() {
    const apiUrl = "https://restcountries.com/v3.1/all";
    const selectNacionalidad = document.getElementById("nacionalidad");

    try {
        // Fetch de la API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al cargar los países: ${response.status}`);
        }
        const paises = await response.json();

        // Ordenar los países alfabéticamente por nombre
        paises.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Obtener país previamente seleccionado o asignar un valor predeterminado
        const paisSeleccionado = localStorage.getItem("paisSeleccionado") || "CRI";

        // Crear las opciones del select
        const fragment = document.createDocumentFragment();
        paises.forEach(pais => {
            const opcion = document.createElement("option");
            opcion.value = pais.cca3; // Código del país (ISO 3166-1 alpha-3)
            opcion.textContent = pais.name.common; // Nombre común del país
            if (pais.cca3 === paisSeleccionado) {
                opcion.selected = true;
            }
            fragment.appendChild(opcion);
        });

        // Añadir las opciones al select
        selectNacionalidad.appendChild(fragment);
    } catch (error) {
        console.error("Error al cargar los países:", error);
        alert("No se pudo cargar el listado de países. Por favor, inténtelo más tarde.");
    }
}

// Función para guardar el país seleccionado en LocalStorage
function guardarPaisSeleccionado() {
    const selectNacionalidad = document.getElementById("nacionalidad");
    const paisSeleccionado = selectNacionalidad.value;

    localStorage.setItem("paisSeleccionado", paisSeleccionado);
    alert(`El país seleccionado (${paisSeleccionado}) ha sido guardado.`);
}

// Inicializar el evento de carga de países y escucha de cambios en el select
document.addEventListener("DOMContentLoaded", () => {
    cargarPaises();

    // Asociar evento al select para guardar automáticamente el país seleccionado
    document.getElementById("nacionalidad").addEventListener("change", guardarPaisSeleccionado);
});
