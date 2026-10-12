
// =====================================
// EL UNIVERSO DE ESTRELLA
// =====================================


// FRASE SECRETA

const palabras = [
    "Eres",
    "una",
    "estrellita",
    "en",
    "mi",
    "cosmos",
    "muy",
    "brillante",
    "y",
    "hermosa"
];


// ELEMENTOS DEL HTML

const estrellas = document.querySelectorAll(".estrella");

const mensaje = document.getElementById("mensaje");

const cielo = document.getElementById("cielo-estrellado");

const particulas = document.getElementById("particulas");

const escenaFinal = document.getElementById("escena-final");

const reiniciar = document.getElementById("reiniciar");


// VARIABLES

let contador = 0;


// =====================================
// 1. GENERAR ESTRELLAS DE FONDO
// =====================================

function generarEstrellas(cantidad) {

    for (let i = 0; i < cantidad; i++) {

        const estrella = document.createElement("span");

        estrella.classList.add("punto-estrella");

        // Posiciones aleatorias
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamaños diferentes
        const tamaño = 1 + Math.random() * 2.5;

        estrella.style.left = x + "%";
        estrella.style.top = y + "%";

        estrella.style.width = tamaño + "px";
        estrella.style.height = tamaño + "px";

        // Cada estrella parpadea a su ritmo
        estrella.style.animationDuration =
            (2 + Math.random() * 5) + "s";

        estrella.style.animationDelay =
            (-Math.random() * 6) + "s";

        cielo.appendChild(estrella);
    }
}


// =====================================
// 2. EXPLOSIONES COSMICAS
// =====================================

function crearExplosion(x, y, cantidad) {

    const colores = [
        "#ffffff",
        "#ffd6fa",
        "#a5f3fc",
        "#fde68a",
        "#c4b5fd"
    ];

    for (let i = 0; i < cantidad; i++) {

        // Crear una partícula
        const particula = document.createElement("span");

        particula.classList.add("particula");

        // Ángulo y distancia aleatorios
        const angulo = Math.random() * Math.PI * 2;

        const distancia = 40 + Math.random() * 110;

        // Calcular dirección
        const dx = Math.cos(angulo) * distancia;
        const dy = Math.sin(angulo) * distancia;

        // Posición inicial
        particula.style.left = x + "px";
        particula.style.top = y + "px";

        // Movimiento final
        particula.style.setProperty(
            "--dx",
            dx + "px"
        );

        particula.style.setProperty(
            "--dy",
            dy + "px"
        );

        // Color aleatorio
        const indice = Math.floor(
            Math.random() * colores.length
        );

        particula.style.backgroundColor = colores[indice];
        particula.style.color = colores[indice];

        // Añadir partícula a la pantalla
        particulas.appendChild(particula);

        // Eliminar cuando termina la animación
        particula.addEventListener(
            "animationend",
            function() {
                particula.remove();
            },
            { once: true }
        );
    }
}


// =====================================
// 3. INTERACCION CON ESTRELLAS
// =====================================

estrellas.forEach(function(estrella) {

    estrella.addEventListener("click", function() {

        // Evitar tocar dos veces la misma estrella
        if (estrella.disabled) {
            return;
        }

        estrella.disabled = true;

        // Obtener la posición de la estrella
        const rect = estrella.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Explotar
        crearExplosion(x, y, 30);

        // Ejecutar animación CSS
        estrella.classList.add("explotando");

        // Descubrir una palabra
        contador++;

        mensaje.textContent = palabras
            .slice(0, contador)
            .join(" ");

        // Si todas las estrellas fueron descubiertas
        if (contador === palabras.length) {

            mensaje.textContent += " ❤️";

            setTimeout(function() {
                mostrarFinal();
            }, 1200);
        }
    });
});


// =====================================
// 4. MOSTRAR FINAL CON COMETA
// =====================================

function mostrarFinal() {

    // Abrir escena final
    escenaFinal.classList.remove("oculto");

    // Lluvia de luz
    for (let i = 0; i < 8; i++) {

        setTimeout(function() {

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            crearExplosion(x, y, 20);

        }, i * 180);
    }
}


// =====================================
// 5. VOLVER A COMENZAR
// =====================================

reiniciar.addEventListener("click", function() {

    // Recargar para reiniciar las animaciones
    window.location.reload();
});


// =====================================
// 6. INICIAR NUESTRO UNIVERSO
// =====================================

generarEstrellas(150);
