document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".container-nav-mobile");
    const navItems = document.querySelectorAll(".container-nav-mobile a");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    });

    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            body.classList.remove("no-scroll");
        }
    });

    navItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = item.getAttribute("href");

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            body.classList.remove("no-scroll");

            setTimeout(() => {
                window.location.href = targetId;
            }, 200);
        });
    });
});

/* Intersection Observer de los servicios*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.10}s`;
    observer.observe(el);
});

document.addEventListener("DOMContentLoaded", function () {
    const paragraphs = document.querySelectorAll('.animate-observer');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    paragraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });
});

/* Animaciones Generales y Reusables */
class AnimationObserver {
    constructor(options = {}) {
        this.options = {
            threshold: 0.2,
            ...options
        };

        this.observer = new IntersectionObserver(this.handleIntersection, this.options);
        this.elements = new Map();
    }

    handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;

                setTimeout(() => {
                    element.classList.add('active');
                }, delay);

                this.observer.unobserve(element);
            }
        });
    }

    observe(element) {
        this.observer.observe(element);
    }

    observeAll(elements) {
        elements.forEach(element => this.observe(element));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const animationObserver = new AnimationObserver();

    const animatedElements = document.querySelectorAll('.animate');

    animationObserver.observeAll(animatedElements);
});

function addAnimation(element, animation = 'fade-up', delay = 0) {
    element.classList.add('animate');
    element.dataset.animation = animation;
    if (delay) element.dataset.delay = delay;

    const observer = new AnimationObserver();
    observer.observe(element);
}

let images = [
    "./img/img-cabañas-desde-afuera.webp",
    "./img/img-cabañas-vista-de-la-entrada-al-fondo.webp",
    "./img/img-cochera.webp",
    "./img/img-dormitorio-cama-dos-plazas.webp",
    "./img/img-dormitorio-tres-camas.webp",
    "./img/img-cocina.webp",
    "./img/img-comedor-cocina-con-tele.webp",
    "./img/img-pileta.webp"
];

let currentIndex = 0;
const mainImage = document.getElementById("mainImage");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

function updateImage() {
    mainImage.src = images[currentIndex];
}

function openModal() {
    modal.classList.remove("oculto");
    modalImg.src = images[currentIndex];
}

function closeModal() {
    modal.classList.add("oculto");
}

document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("oculto")) {
        if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "Escape") {
            closeModal();
        }
    }
});

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updateImage();
    modalImg.src = images[currentIndex];
}

modal.addEventListener("click", function (e) {
    if (e.target.id === "imageModal") {
        closeModal();
    }
});

updateImage();

emailjs.init('Esfk6SMNHFs8Za8x1');
const form = document.getElementById('reservaForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const fechaEntrada = document.getElementById('fechaEntrada').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const personas = document.getElementById('personas').value;
    const mensaje = document.getElementById('mensaje').value;

    function mostrarError(input, mensaje) {
        input.style.border = "2px solid red";

        let errorMensaje = input.nextElementSibling;
        if (!errorMensaje || !errorMensaje.classList.contains("error-mensaje")) {
            errorMensaje = document.createElement("p");
            errorMensaje.classList.add("error-mensaje");
            errorMensaje.style.color = "red";
            errorMensaje.style.fontSize = "14px";
            errorMensaje.style.marginTop = "5px";
            input.parentNode.appendChild(errorMensaje);
        }
        errorMensaje.textContent = mensaje;
    }

    function limpiarError(input) {
        input.style.border = "2px solid green";
        let errorMensaje = input.nextElementSibling;
        if (errorMensaje && errorMensaje.classList.contains("error-mensaje")) {
            errorMensaje.remove();
        }
    }

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                input.style.border = "2px solid green";
            } else {
                input.style.border = "";
            }
        });
    });

    const personasInput = document.getElementById("personas");
    if (personas < 1 || personas > 5) {
        mostrarError(personasInput, "La cantidad de personas debe ser entre 1 y 5.");
        return;
    } else {
        limpiarError(personasInput);
    }

    const emailInput = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        mostrarError(emailInput, "Por favor, ingrese un correo electrónico válido.");
        return;
    } else {
        limpiarError(emailInput);
    }

    const telefonoInput = document.getElementById("telefono");
    const telefonoRegex = /^\d{10}$/;
    if (telefonoInput.value && !telefonoRegex.test(telefonoInput.value)) {
        mostrarError(telefonoInput, "Por favor, ingrese un número de teléfono válido de 10 digitos, sin signos.");
        return;
    } else {
        limpiarError(telefonoInput);
    }

    const fechaEntradaInput = document.getElementById("fechaEntrada");
    const fechaSalidaInput = document.getElementById("fechaSalida");
    if (new Date(fechaEntradaInput.value) >= new Date(fechaSalidaInput.value)) {
        mostrarError(fechaSalidaInput, "La fecha de salida debe ser posterior a la fecha de entrada.");
        return;
    } else {
        limpiarError(fechaSalidaInput);
    }

    try {
        const button = document.querySelector("button[type='submit']");
        button.textContent = 'Reservando...';

        const templateParams = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida,
            personas: personas,
            mensaje: mensaje
        };
        const serviceID = 'service_ywbjn7q';
        const templateID = 'template_gwnkt1s';

        emailjs.send(serviceID, templateID, templateParams)
            .then(function (response) {
                Toastify({
                    text: "Reserva enviada con éxito. Revisa tu correo para la confirmación.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#28a745",
                    className: "custom-toast",
                    style: {
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "'Poppins', sans-serif"
                    }
                }).showToast();

                console.log('Correo enviado:', response);
            })
            .catch(function (error) {
                console.error('Error enviando el correo:', error);

                Toastify({
                    text: "La reserva se guardó, pero hubo un error al enviar el correo de confirmación.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#dc3545",
                    className: "custom-toast",
                    style: {
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "16px"
                    }
                }).showToast();
            })
            .finally(() => {
                button.textContent = 'Reservar';

                const inputs = document.querySelectorAll("input");
                inputs.forEach(input => {
                    input.style.border = "";
                    let errorMensaje = input.nextElementSibling;
                    if (errorMensaje && errorMensaje.classList.contains("error-mensaje")) {
                        errorMensaje.remove();
                    }
                });

                setTimeout(() => {
                    form.reset();
                }, 2000);
            });
    } catch (error) {
        button.textContent = 'Reservar Ahora';
        console.error("Error al enviar la reserva: ", error);
    }
});

const textarea = document.getElementById("mensaje");
const contador = document.getElementById("contador");

textarea.addEventListener("input", () => {
    const max = textarea.maxLength;
    const actual = textarea.value.length;
    contador.textContent = `${max - actual} caracteres restantes`;
});

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.classList.add('scroll-target');
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                setTimeout(() => {
                    targetElement.classList.remove('scroll-target');
                }, 1000);
            }
        }
    });
});

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

document.querySelectorAll('.scroll-link').forEach(btn => {
    btn.addEventListener('click', function () {
        const target = document.querySelector(this.getAttribute('data-target'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

let imagenTestimonio = [
    "./img/human-two.png"
]

const testimonios = [
    {
        nombre: "Sil Álvarez",
        estrellas: 5,
        comentario: "Un lugar hermoso. Fuimos en diciembre para recibir el Año Nuevo y quedamos encantados. Amé el entorno, las flores, las mariposas... Todo fue excelente. Sin duda, volveremos.",
        imagen: "./img/human-one.png"
    },
    {
        nombre: "Andres R",
        estrellas: 5,
        comentario: "Impecables y muy cómodas cabañas para alojarse y descansar, con un gusto excepcional e inmejorable trato de sus dueños. A pocos metros se encuentra el río con un bello paseo. Excelente relación precio-calidad.",
        imagen: imagenTestimonio
    },
    {
        nombre: "Laura Teresita Raimundo",
        estrellas: 4,
        comentario: "Muy agradable y funcional la cabaña. Con todos los servicios básicos, incluido cochera techada(importante si cae granizo). Graciela, quien nos recibió, muy amable!! Las fotos que están publicadas son exactas. Muestran tal cual son las cabañas.",
        imagen: "./img/human-three.png"
    }
];

let indice = 0;
const nombre = document.getElementById("nombre");
const estrellas = document.getElementById("estrellas");
const comentario = document.getElementById("comentario");
const imagen = document.querySelector(".testimonio img");

function mostrarTestimonio() {
    nombre.textContent = testimonios[indice].nombre;
    comentario.textContent = `"${testimonios[indice].comentario}"`;
    imagen.src = testimonios[indice].imagen;

    estrellas.innerHTML = "";
    for (let i = 0; i < testimonios[indice].estrellas; i++) {
        estrellas.innerHTML += "★";
    }
}

document.getElementById("prev").addEventListener("click", () => {
    indice = (indice - 1 + testimonios.length) % testimonios.length;
    mostrarTestimonio();
});

document.getElementById("next").addEventListener("click", () => {
    indice = (indice + 1) % testimonios.length;
    mostrarTestimonio();
});

mostrarTestimonio();

const setNavHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};

window.addEventListener('resize', setNavHeight);
window.addEventListener('load', setNavHeight);
setNavHeight();
