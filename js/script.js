document.addEventListener('DOMContentLoaded', () => {
    // Loader y bienvenida animada
    const loader = document.getElementById('loader');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const sapoDragon = document.getElementById('sapo-dragon-welcome');
    const floatingDragon = document.getElementById('floating-dragon');
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    // Esperar a que el sapo dragon gif esté completamente cargado antes de mostrarlo
    if (sapoDragon && loader && welcomeOverlay) {
        welcomeOverlay.style.display = "none";
        loader.style.display = "flex";
        // Precarga el gif
        const sapoImg = new window.Image();
        sapoImg.src = sapoDragon.src;
        sapoImg.onload = function() {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = "none";
                welcomeOverlay.style.display = "flex";
                welcomeOverlay.style.opacity = 1;
            }, 400);
        };
    }

    // Sapo dragón GIF es el botón de entrada
    if (sapoDragon && welcomeOverlay && floatingDragon) {
        sapoDragon.style.cursor = 'pointer';
        sapoDragon.title = 'Entrar';
        sapoDragon.addEventListener('click', () => {
            welcomeOverlay.classList.add('hide');
            welcomeOverlay.addEventListener('transitionend', () => {
                welcomeOverlay.style.display = 'none';
                // Muestra el dragón flotante
                floatingDragon.style.display = 'flex';
                // Intenta reproducir la música (algunos navegadores requieren interacción)
                if (music) {
                    music.volume = 0.55;
                    music.play().catch(()=>{});
                    updateMusicIcon();
                }
            }, { once: true });
        });
        // Accesibilidad: enter o espacio
        sapoDragon.setAttribute('tabindex', '0');
        sapoDragon.addEventListener('keypress', (e) => {
            if (e.key === ' ' || e.key === 'Enter') sapoDragon.click();
        });
    }

    // Botón de música en dragón flotante
    function updateMusicIcon() {
        if (!music.paused) {
            musicIcon.textContent = "🔊";
            musicToggle.title = "Pausar música";
        } else {
            musicIcon.textContent = "🔈";
            musicToggle.title = "Reproducir música";
        }
    }
    if (musicToggle && music) {
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
            updateMusicIcon();
        });
        // También actualizar icono si música se pausa/play por otras razones
        music.addEventListener('play', updateMusicIcon);
        music.addEventListener('pause', updateMusicIcon);
    }

    // Partículas ambientales
    if (window.tsParticles) {
        tsParticles.load('ambient-particles', {
            fullScreen: { enable: false },
            background: { color: "transparent" },
            fpsLimit: 30,
            particles: {
                number: { value: 38, density: { enable: true, area: 1000 } },
                color: { value: ["#ffffffcc", "#f3edc3bb", "#b6e6f8cc"] },
                opacity: {
                    value: { min: 0.15, max: 0.44 },
                    animation: { enable: true, speed: 0.15, minimumValue: 0.15, sync: false }
                },
                size: {
                    value: { min: 1.5, max: 3.7 },
                    animation: { enable: true, speed: 0.13, minimumValue: 1.2, sync: false }
                },
                move: {
                    enable: true, speed: 0.17, direction: "none", random: true,
                    straight: false, outModes: { default: "out" }, attract: { enable: false }
                },
                shape: { type: ["circle"] },
                twinkle: {
                    particles: { enable: true, frequency: 0.14, color: "#fff", opacity: 0.38 }
                }
            },
            detectRetina: true
        });
    }

    // Carrusel de imágenes (igual que antes)
    const carouselImages = [];
    for (let i = 1; i <= 452; i++) {
        const num = i.toString().padStart(3, '0');
        carouselImages.push(`img/sucu${num}.jpg`);
    }
    let currentIndex = 0;
    const carouselImg = document.getElementById('carousel-image');
    const magicEffects = [
        "filter: brightness(1.2) contrast(1.8) saturate(2.8) hue-rotate(40deg);",
        "filter: hue-rotate(120deg) saturate(2.8) brightness(1.4);",
        "filter: hue-rotate(210deg) saturate(2.2) brightness(1.2);",
        "filter: hue-rotate(330deg) saturate(2.4) brightness(1.1);",
        "filter: brightness(2) contrast(1.6) hue-rotate(70deg);",
        "filter: blur(2px) brightness(2.2) hue-rotate(180deg);",
        "filter: invert(0.3) saturate(2.2) hue-rotate(260deg);",
        "filter: grayscale(0.7) blur(1px);",
        "filter: sepia(1) brightness(1.8);",
        "filter: contrast(3.5) hue-rotate(140deg);",
        "filter: blur(5px) brightness(1.7) hue-rotate(80deg);",
        "filter: grayscale(1) blur(3px) brightness(2.2);",
        "filter: sepia(1) hue-rotate(180deg) saturate(2.5);",
        "filter: contrast(2.5) hue-rotate(200deg);",
        "filter: invert(1) blur(2px);",
        "filter: drop-shadow(0 0 50px #fff5);",
        "filter: opacity(0.5);",
        "filter: blur(1.5px) brightness(2.5) hue-rotate(330deg);",
        "filter: hue-rotate(250deg) saturate(3);",
        "filter: hue-rotate(80deg) brightness(1.6);",
        "filter: brightness(2.2) grayscale(0.4);",
        "filter: blur(3px) contrast(2);",
        "filter: saturate(2.7) hue-rotate(10deg);",
        "filter: blur(0.5px) brightness(1.9);",
        "filter: invert(0.7) brightness(1.4);",
        "filter: sepia(0.6) contrast(2.2);",
        "filter: brightness(1.6) grayscale(1);",
        "filter: hue-rotate(100deg) blur(2.5px);",
        "filter: contrast(2.5) grayscale(0.7);",
        "filter: blur(1.2px) brightness(2);",
        "filter: sepia(0.8) hue-rotate(220deg);",
        "filter: blur(2.4px) brightness(2.4) saturate(2.2);",
        "filter: contrast(1.3) hue-rotate(333deg);",
        "filter: grayscale(0.9) invert(0.6);",
        "filter: sepia(1) hue-rotate(120deg);",
        "filter: hue-rotate(60deg) blur(1.3px);",
        "filter: brightness(2.8) contrast(1.1);",
        "filter: invert(0.85) blur(1.1px);",
        "filter: saturate(3.5) blur(1.2px);",
        "filter: contrast(2.8) hue-rotate(150deg);",
        "filter: blur(6px) brightness(1.4);",
        "filter: brightness(1.4) grayscale(0.8) blur(0.6px);",
        "filter: grayscale(0.5) hue-rotate(210deg);",
        "filter: sepia(1) brightness(2.5);",
        "filter: contrast(2.2) hue-rotate(0deg);",
        "filter: blur(2.3px) hue-rotate(80deg);",
        "filter: saturate(1.2) brightness(2.7);",
        "filter: invert(0.4) sepia(1);",
        "filter: brightness(1.1) contrast(2.6);",
        "filter: hue-rotate(360deg);",
        "filter: drop-shadow(0 0 80px #b6e6f8cc);",
    ];
    while (magicEffects.length < 100) {
        magicEffects.push(magicEffects[Math.floor(Math.random() * magicEffects.length)]);
    }

    // Siempre que cambies de imagen (por cualquier método), la imagen debe quedar original y con transición suave
    function setOriginalWithTransition() {
        carouselImg.style.transition = 'filter 0.8s cubic-bezier(.66,0,.33,1)';
        carouselImg.style.filter = '';
    }

    function showMagicEffect() {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImg.src = carouselImages[currentIndex];
        const randomIndex = Math.floor(Math.random() * magicEffects.length);
        // Aplica el efecto
        carouselImg.style.transition = 'filter 0.45s cubic-bezier(.66,0,.33,1)';
        carouselImg.style.filter = magicEffects[randomIndex].replace('filter:', '').replace(';', '');
        // Quita el efecto con transición suave
        setTimeout(setOriginalWithTransition, 600);
    }

    let touchStartX = null;
    let touchEndX = null;
    let isMobile = window.matchMedia("(max-width: 700px)").matches;

    function handleGesture() {
        if (touchStartX === null || touchEndX === null) return;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            // Quita filtro con transición suave antes de cambiar imagen
            setOriginalWithTransition();
            setTimeout(() => {
                if (diff > 0) {
                    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                } else {
                    currentIndex = (currentIndex + 1) % carouselImages.length;
                }
                carouselImg.src = carouselImages[currentIndex];
            }, 250); // tiempo para que la transición se note
        }
        touchStartX = null;
        touchEndX = null;
    }

    if (isMobile) {
        carouselImg.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        carouselImg.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });
        carouselImg.addEventListener('click', showMagicEffect);
    } else {
        carouselImg.addEventListener('click', showMagicEffect);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                // Quita filtro con transición suave antes de cambiar imagen
                setOriginalWithTransition();
                setTimeout(() => {
                    if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % carouselImages.length;
                    } else {
                        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                    }
                    carouselImg.src = carouselImages[currentIndex];
                }, 250); // tiempo para que la transición se note
            }
        });
    }

    // Dragón flotante (tooltip y efecto)
    const dragonTooltip = floatingDragon ? floatingDragon.querySelector('#dragon-tooltip') : null;
    let tooltipTimeout = null;
    if (floatingDragon) {
        floatingDragon.addEventListener('mouseenter', () => {
            floatingDragon.classList.add('active');
        });
        floatingDragon.addEventListener('mouseleave', () => {
            floatingDragon.classList.remove('active');
        });
        floatingDragon.addEventListener('click', (e) => {
            // No interrumpir si fue click sobre botón música
            if (e.target === musicToggle || e.target === musicIcon) return;
            if (dragonTooltip) {
                dragonTooltip.classList.add('visible');
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                tooltipTimeout = setTimeout(() => {
                    dragonTooltip.classList.remove('visible');
                }, 2500);
            }
            document.body.style.filter = "brightness(1.5) blur(2px)";
            setTimeout(() => { document.body.style.filter = ""; }, 350);
        });
    }
});