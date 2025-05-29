// Lista de iconos
const animales = ["🐯", "🐺", "🐱", "🦁", "🐮", "🦝", "🦊", "🐻"];
const frutas = ["🍇", "🍎", "🥝", "🥥", "🍉", "🥭", "🍒", "🍓"];
const vehiculos = ["🚒", "🛹", "🚕", "🛩", "🚁", "🛸", "🚀", "⛵"];

let cartasSeleccionadas = []; // Variable para almacenar las cartas seleccionadas
let categoriaSeleccionada = ""; // Variable para almacenar la categoría seleccionada

// Función para barajar las cartas
function barajar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Función para crear el tablero del juego
function crearTablero(tarjetas, categoria) {
  const tableroJuego = document.getElementById("tablero");
  tableroJuego.innerHTML = ""; // Limpiar el tablero
  barajar(tarjetas);
  tarjetas.forEach((icono) => {
    const elementoTarjeta = document.createElement("div");
    elementoTarjeta.classList.add(
      "card",
      "rounded-lg",
      "shadow-lg",
      "relative",
      "cursor-pointer",
      "card-inner"
    );
    let bgColor = "bg-blue-500"; // Color fondo iconos
    if (categoria === "frutas") {
      bgColor = "bg-purple-500";
      borderColor = "border-purple-500";
    } else if (categoria === "animales") {
      bgColor = "bg-cyan-500";
      borderColor = "border-cyan-500";
    } else if (categoria === "vehiculos") {
      bgColor = "bg-blue-500";
      borderColor = "border-blue-500";
    }
    elementoTarjeta.innerHTML = `
          <div class="card-front flex items-center justify-center ${bgColor} rounded-lg">
            ${icono}
          </div>
          <div class="card-back flex items-center justify-center bg-gray-600 border-2 ${borderColor} rounded-lg">
          </div>`;
    elementoTarjeta.addEventListener("click", girarCarta);
    tableroJuego.appendChild(elementoTarjeta);
  });
}

// Variables para el estado del juego
let cartaGirada = false;
let bloquearTablero = false;
let primeraCarta, segundaCarta;

// Función para voltear una carta
function girarCarta() {
  if (bloquearTablero) return;
  if (this === primeraCarta) return;

  this.classList.add("flipped");

  if (!cartaGirada) {
    // Primer clic
    cartaGirada = true;
    primeraCarta = this;
    return;
  }

  // Segundo clic
  segundaCarta = this;
  verificarCoincidencia();
}

// Función para verificar si las cartas coinciden
function verificarCoincidencia() {
  let esCoincidencia = primeraCarta.innerHTML === segundaCarta.innerHTML;
  esCoincidencia ? deshabilitarCartas() : devolverCartas();
}

// Función para deshabilitar las cartas si coinciden
function deshabilitarCartas() {
  // Agregar la animación de coincidencia
  primeraCarta.querySelector(".card-front").classList.add("coincidencia");
  segundaCarta.querySelector(".card-front").classList.add("coincidencia");

  // Remover la animación después de que termine
  setTimeout(() => {
    primeraCarta.querySelector(".card-front").classList.remove("coincidencia");
    segundaCarta.querySelector(".card-front").classList.remove("coincidencia");
  }, 600);

  primeraCarta.removeEventListener("click", girarCarta);
  segundaCarta.removeEventListener("click", girarCarta);
  reiniciarTablero();
}

// Función para voltear las cartas de nuevo si no coinciden
function devolverCartas() {
  bloquearTablero = true;
  setTimeout(() => {
    primeraCarta.classList.remove("flipped");
    segundaCarta.classList.remove("flipped");
    reiniciarTablero();
  }, 600);
}

// Función para reiniciar el estado del tablero
function reiniciarTablero() {
  [cartaGirada, bloquearTablero] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

// Función para activar el botón seleccionado con estilo hover
function activarBoton(botonId) {
  const botones = document.querySelectorAll(".btn");
  botones.forEach((boton) => {
    boton.classList.remove(
      "bg-transparent",
      "text-blue-500",
      "text-purple-500",
      "text-cyan-500"
    );
  });

  const boton = document.getElementById(botonId);
  const clases = {
    btnVehiculos: ["border-blue-500", "text-blue-500"],
    btnFrutas: ["border-purple-500", "text-purple-500"],
    btnAnimales: ["border-cyan-500", "text-cyan-500"],
  };

  if (clases[botonId]) {
    boton.classList.add("bg-transparent", "border-2", ...clases[botonId]);
  }
}

// Event listeners para los botones
document.getElementById("btnVehiculos").addEventListener("click", () => {
  categoriaSeleccionada = "vehiculos";
  cartasSeleccionadas = [...vehiculos, ...vehiculos];
  crearTablero(cartasSeleccionadas, categoriaSeleccionada);
  activarBoton("btnVehiculos");
});

document.getElementById("btnFrutas").addEventListener("click", () => {
  categoriaSeleccionada = "frutas";
  cartasSeleccionadas = [...frutas, ...frutas];
  crearTablero(cartasSeleccionadas, categoriaSeleccionada);
  activarBoton("btnFrutas");
});

document.getElementById("btnAnimales").addEventListener("click", () => {
  categoriaSeleccionada = "animales";
  cartasSeleccionadas = [...animales, ...animales];
  crearTablero(cartasSeleccionadas, categoriaSeleccionada);
  activarBoton("btnAnimales");
});

// Inicialmente cargar el tablero con iconos
categoriaSeleccionada = "animales";
cartasSeleccionadas = [...animales, ...animales];
crearTablero(cartasSeleccionadas, categoriaSeleccionada);
activarBoton("btnAnimales");
