document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
        body.classList.toggle("no-scroll");
    });

    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            body.classList.remove("no-scroll");
        }
    });
});


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
    el.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
    const textos = document.querySelectorAll(".texto-fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    textos.forEach((texto) => {
        observer.observe(texto);
    });
});

const form = document.getElementById('reservaForm');

// Escucha el evento de envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtén los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const fechaEntrada = document.getElementById('fechaEntrada').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const personas = document.getElementById('personas').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    // Validación de teléfono
    const telefonoRegex = /^\d{10}$/;
    if (telefono && !telefonoRegex.test(telefono)) {
        alert("Por favor, ingrese un número de teléfono válido (10 dígitos).");
        return;
    }

    // Validación de fechas
    if (new Date(fechaEntrada) >= new Date(fechaSalida)) {
        alert("La fecha de salida debe ser posterior a la fecha de entrada.");
        return;
    }

    try {
        // Guarda los datos en Firestore
        await addDoc(collection(db, 'reservas'), {
            nombre: nombre,
            email: email,
            telefono: telefono,
            fechaEntrada: Timestamp.fromDate(new Date(fechaEntrada)),
            fechaSalida: Timestamp.fromDate(new Date(fechaSalida)),
            personas: personas,
            mensaje: mensaje,
            timestamp: Timestamp.now()
        });

        // Envía el correo electrónico usando EmailJS
        const templateParams = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida,
            personas: personas,
            mensaje: mensaje
        };

        emailjs.send('service_ywbjn7q', 'template_gwnkt1s', templateParams)
            .then(function (response) {
                alert("Reserva enviada con éxito. Revisa tu correo para la confirmación.");
                console.log('Correo enviado:', response);
            }, function (error) {
                console.error('Error enviando el correo:', error);
                alert("La reserva se guardó, pero hubo un error al enviar el correo de confirmación.");
            });

        // Limpia el formulario
        form.reset();
    } catch (error) {
        console.error("Error al enviar la reserva: ", error);
        alert("Hubo un error al enviar la reserva. Por favor, inténtelo de nuevo.");
    }
});