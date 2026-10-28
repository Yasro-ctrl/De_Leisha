const envoltura = document.querySelector('.envoltura-sobre');
const carta = document.querySelector('.carta');
const audio = document.querySelector('#musica-fondo');
const botonMusica = document.querySelector('#boton-musica');
const estadoMusica = document.querySelector('#estado-musica');
document.querySelectorAll('.foto-recuerdo').forEach((marco) => {
    const imagen = marco.querySelector('img');
    const aviso = marco.querySelector('.foto-placeholder');
    const mostrarAviso = () => {
        imagen.hidden = true;
        aviso.hidden = false;
    };
    imagen.addEventListener('error', mostrarAviso);
    if (imagen.complete && imagen.naturalWidth === 0) mostrarAviso();
});

let animando = false;
document.addEventListener('click', (evento) => {
    if (evento.target.closest('#boton-musica')) return;
    if (animando) return;
    const clicEnSobre = evento.target.closest('.corazon, .solapa-derecha, .solapa-izquierda, .sobre');
    if (!clicEnSobre) return;
    if (!envoltura.classList.contains('abierto')) {
        // El clic de apertura es un gesto del usuario: inicia la canción.
        if (audio.paused) reproducirMusica();
        envoltura.classList.add('abierto');
        return;
    }
    if (!carta.classList.contains('abierta')) {
        animando = true;
        carta.classList.add('mostrar-carta');
        envoltura.classList.add('desactivar-sobre');
        setTimeout(() => {
            carta.classList.remove('mostrar-carta');
            carta.classList.add('abierta');
            animando = false;
        }, 500);
    }
});

// Los navegadores permiten iniciar música después de un gesto del usuario.
async function reproducirMusica() {
    try {
        await audio.play();
        botonMusica.textContent = '❚❚ Pausar música';
        botonMusica.setAttribute('aria-pressed', 'true');
        estadoMusica.textContent = '';
    } catch (_) {
        estadoMusica.textContent = 'No se pudo reproducir. Comprueba que musica.mp3 esté en esta carpeta o usa el botón de música.';
    }
}
botonMusica.addEventListener('click', () => {
    if (audio.paused) reproducirMusica();
    else {
        audio.pause();
        botonMusica.textContent = '♫ Reproducir música';
        botonMusica.setAttribute('aria-pressed', 'false');
    }
});
