// Base de datos de vehículos y descripciones
const vehiculos = {
    Compacto: [
        { imagen: "Compacto1.png", descripcion: "KIA PICANTO, Año 2016" },
        { imagen: "Compacto2.png", descripcion: "FORD FIESTA ST, Año 2015" },
        { imagen: "Compacto3.png", descripcion: "PEUGEOT 308, Año 2018" }
    ],
    Mediano: [
        { imagen: "Mediano1.png", descripcion: "HONDA CITY CAR, Año 2017" },
        { imagen: "Mediano2.png", descripcion: "MERCEDES SLS, Año 2015" },
        { imagen: "Mediano3.png", descripcion: "FORD FIESTA ST, Año 2016" }
    ],
    "Todo Terreno": [
        { imagen: "TodoTerreno1.png", descripcion: "TOYOTA FJ CRUISER, Año 2016" },
        { imagen: "TodoTerreno2.png", descripcion: "TOYOTA Prado, Año 2018" },
        { imagen: "TodoTerreno3.png", descripcion: "NISSAN JUKE, Año 2017" }
    ],
    Familiar: [
        { imagen: "Familiar1.png", descripcion: "TOYOTA SIENNA, Año 2018" },
        { imagen: "Familiar2.png", descripcion: "DODGE GRAND CARAVANE, Año 2015" },
        { imagen: "Familiar3.png", descripcion: "HYUNDAI ELANTRA, Año 2016" }
    ]
};

// Función para cargar imágenes y descripciones según el tipo de vehículo
function mostrarTodo(opcionSeleccionada = 1) {
    const tipoVehiculoSelect = document.getElementById("tipoVehiculo");
    const tipoSeleccionado = tipoVehiculoSelect.options[tipoVehiculoSelect.selectedIndex].innerText.trim();
    const listaVehiculos = vehiculos[tipoSeleccionado];

    // Actualizar imagen principal
    const imgVista = document.getElementById("imgVista");
    imgVista.src = `images/${listaVehiculos[opcionSeleccionada - 1].imagen}`;

    // Actualizar descripción
    const infoCar = document.getElementById("infTCar");
    infoCar.textContent = listaVehiculos[opcionSeleccionada - 1].descripcion;

    // Actualizar miniaturas
    document.getElementById("img1").src = `images/${listaVehiculos[0].imagen}`;
    document.getElementById("img2").src = `images/${listaVehiculos[1].imagen}`;
    document.getElementById("img3").src = `images/${listaVehiculos[2].imagen}`;
}

// Función para mostrar una imagen específica al hacer clic en una miniatura
function mostrarImagen(indice) {
    const tipoVehiculoSelect = document.getElementById("tipoVehiculo");
    const tipoSeleccionado = tipoVehiculoSelect.options[tipoVehiculoSelect.selectedIndex].innerText.trim();
    const listaVehiculos = vehiculos[tipoSeleccionado];

    // Actualizar imagen principal
    const imgVista = document.getElementById("imgVista");
    imgVista.src = `images/${listaVehiculos[indice - 1].imagen}`;

    // Actualizar descripción
    const infoCar = document.getElementById("infTCar");
    infoCar.textContent = listaVehiculos[indice - 1].descripcion;
}

// Inicializar la página con el tipo de vehículo "Compacto" seleccionado por defecto
document.addEventListener("DOMContentLoaded", () => {
    mostrarTodo();
});
