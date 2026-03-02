const navbar_container = document.getElementById("navbar_container")
const navbar_container_index = document.getElementById("navbar_container_index")


if(navbar_container_index){
    navbar_container_index.innerHTML= `<div class="container-fluid" id="navbar_container">
            <div class="row">
                <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <div class="container-fluid ">
                        <a class="navbar-brand" href="#inicio">
                            <img src="./media/logo.png" alt="" class="nav-icon">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link" aria-current="page" href="#inicio">Inicio</a>
                                <a class="nav-link" href="#skills">Habilidades</a>
                                <a class="nav-link" href="#projects">Proyectos</a>
                                <a class="nav-link" href="#">Cursos</a>
                                <a class="nav-link" href="#">Contacto</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>`;
}


/* =========================================
   FONDO INTERACTIVO DE ESTRELLAS (CANVAS)
   ========================================= */

const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

// Ajustar el canvas al tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Variables de interacción con el ratón
let mouse = {
    x: null,
    y: null,
    radius: 120 // Área de interacción del mouse
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Clase Estrella (Partícula)
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5; // Tamaño entre 0.5 y 2
        this.vx = (Math.random() - 0.5) * 0.8; // Velocidad X
        this.vy = (Math.random() - 0.5) * 0.8; // Velocidad Y
    }

    // Dibujar la estrella
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }

    // Actualizar posición e interacción
    update() {
        // Rebote en los bordes de la pantalla
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        // Interacción: alejarse del mouse
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                // Mueve la estrella en dirección opuesta al mouse
                this.x -= forceDirectionX * force * 3;
                this.y -= forceDirectionY * force * 3;
            }
        }

        // Mover la estrella
        this.x += this.vx;
        this.y += this.vy;

        this.draw();
    }
}

// Crear el arreglo de estrellas
let stars = [];
const numStars = 120; // Cantidad de estrellas (ajusta según prefieras)

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

// Conectar estrellas con líneas si están cerca (Efecto Constelación)
function connectStars() {
    let opacityValue = 1;
    for (let a = 0; a < stars.length; a++) {
        for (let b = a; b < stars.length; b++) {
            let distance = ((stars[a].x - stars[b].x) * (stars[a].x - stars[b].x)) + 
                           ((stars[a].y - stars[b].y) * (stars[a].y - stars[b].y));
            
            // Si la distancia es corta, dibujar línea
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacityValue = 1 - (distance / 15000);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(stars[a].x, stars[a].y);
                ctx.lineTo(stars[b].x, stars[b].y);
                ctx.stroke();
            }
        }
    }
}

// Bucle de animación
function animateStars() {
    requestAnimationFrame(animateStars);
    // Limpiar el canvas en cada fotograma
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }
    connectStars();
}

// Iniciar
initStars();
animateStars();