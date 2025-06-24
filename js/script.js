document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias ---
    const loader = document.getElementById('loader');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const sapoDragon = document.getElementById('sapo-dragon-welcome');
    const floatingDragon = document.getElementById('floating-dragon');
    const music = document.getElementById('background-music');
    const musicControlContainer = document.getElementById('music-control-container');
    const musicIconInitial = document.getElementById('music-icon-initial');
    const volumeSlider = document.getElementById('volume-slider');
    const dragonTooltip = floatingDragon ? floatingDragon.querySelector('#dragon-tooltip') : null;

    // --- Loader y overlay de bienvenida ---
    if (sapoDragon && loader && welcomeOverlay) {
        welcomeOverlay.style.display = "none";
        loader.style.display = "flex";
        const sapoImg = new Image();
        sapoImg.src = sapoDragon.src;
        sapoImg.onload = function() {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = "none";
                welcomeOverlay.style.display = "flex";
                welcomeOverlay.style.opacity = 1;
            }, 400);
        };
        sapoImg.onerror = function() {
            loader.style.display = "none";
            welcomeOverlay.style.display = "flex";
            welcomeOverlay.style.opacity = 1;
        };
    } else {
        if (loader) loader.style.display = 'none';
        if (welcomeOverlay) welcomeOverlay.style.display = 'flex';
    }

    // --- Entrada al mundo: click o enter en sapo ---
    if (sapoDragon && welcomeOverlay && floatingDragon) {
        sapoDragon.style.cursor = 'pointer';
        sapoDragon.title = 'Entrar al Otro Mundo'; 
        sapoDragon.addEventListener('click', () => {
            welcomeOverlay.classList.add('hide');
            let hideDone = false;
            function finishHide() {
                if (hideDone) return;
                hideDone = true;
                welcomeOverlay.style.display = 'none';
                floatingDragon.style.display = 'flex';
                // Música al entrar
                if (music) {
                    const playPromise = music.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            music.volume = 0.55;
                            if (volumeSlider) volumeSlider.value = music.volume;
                            updateMusicIcon();
                        }).catch(() => {
                            updateMusicIcon();
                        });
                    }
                }
            }
            welcomeOverlay.addEventListener('transitionend', finishHide, { once: true });
            setTimeout(finishHide, 1000);
        });
        sapoDragon.setAttribute('tabindex', '0');
        sapoDragon.addEventListener('keypress', (e) => {
            if (e.key === ' ' || e.key === 'Enter') sapoDragon.click();
        });
    }

    // --- Control de música ---
    function updateMusicIcon() {
        if (!music || !musicIconInitial) return; 
        if (!music.paused) {
            musicIconInitial.textContent = "🔊";
            musicControlContainer.title = "Pausar música"; 
        } else {
            musicIconInitial.textContent = "🔈";
            musicControlContainer.title = "Reproducir música"; 
        }
    }
    if (musicControlContainer && music && musicIconInitial && volumeSlider) {
        musicIconInitial.addEventListener('click', (event) => {
            event.stopPropagation(); 
            if (music.paused) {
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise.then(updateMusicIcon).catch(updateMusicIcon);
                }
            } else {
                music.pause();
                updateMusicIcon();
            }
        });
        volumeSlider.addEventListener('input', () => {
            music.volume = parseFloat(volumeSlider.value);
            if (music.volume > 0 && music.paused && !music.autoplay) { 
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise.catch(()=>{});
                }
            } else if (music.volume === 0 && !music.paused) {
                music.pause(); 
            }
            updateMusicIcon(); 
        });
        music.addEventListener('volumechange', () => {
            volumeSlider.value = music.volume;
            updateMusicIcon();
        });
        volumeSlider.value = music.volume;
        updateMusicIcon();
    }

    // --- Partículas ambientales con tsParticles ---
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

    // --- Carrusel de imágenes responsive con arrastre/clic/touch y autoavance ---
    const carouselImages = [];
    for (let i = 1; i <= 452; i++) {
        const num = i.toString().padStart(3, '0');
        carouselImages.push(`img/sucu${num}.jpg`);
    }
    let currentIndex = 0;
    const carouselImg = document.getElementById('carousel-image');
    // Efectos mágicos
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

    function setOriginalWithTransition() {
        if (carouselImg) {
            carouselImg.style.transition = 'filter 0.8s cubic-bezier(.66,0,.33,1)';
            carouselImg.style.filter = '';
        }
    }

    function showMagicEffect(next = true) {
        if (!carouselImg || carouselImages.length === 0) return;
        if (next) {
            currentIndex = (currentIndex + 1) % carouselImages.length;
        } else {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        }
        carouselImg.src = carouselImages[currentIndex];
        const randomIndex = Math.floor(Math.random() * magicEffects.length);
        carouselImg.style.transition = 'filter 0.45s cubic-bezier(.66,0,.33,1)';
        carouselImg.style.filter = magicEffects[randomIndex].replace('filter:', '').replace(';', '');
        setTimeout(setOriginalWithTransition, 600);
        restartAutoSlide(); // reinicia el temporizador
    }

    // --- Responsive touch y click para móvil y escritorio ---
    let touchStartX = null;
    let touchEndX = null;
    let dragging = false;
    let dragThreshold = 35; // px mínimo para considerar swipe
    let autoSlideTimer = null;
    const autoSlideDelay = 6000;

    function restartAutoSlide() {
        if (autoSlideTimer) clearTimeout(autoSlideTimer);
        autoSlideTimer = setTimeout(() => showMagicEffect(true), autoSlideDelay);
    }

    if (carouselImg && carouselImages.length > 0) {
        carouselImg.src = carouselImages[currentIndex];

        // Touch (móvil)
        carouselImg.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) return;
            touchStartX = e.touches[0].screenX;
            dragging = true;
            if (autoSlideTimer) clearTimeout(autoSlideTimer);
        });
        carouselImg.addEventListener('touchmove', (e) => {
            if (!dragging) return;
            touchEndX = e.touches[0].screenX;
        });
        carouselImg.addEventListener('touchend', (e) => {
            if (!dragging) return;
            dragging = false;
            if (touchStartX !== null && touchEndX !== null) {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > dragThreshold) {
                    showMagicEffect(diff < 0); // true=next, false=prev
                } else {
                    // Tap sin swipe = avanzar
                    showMagicEffect(true);
                }
            } else {
                // Tap sin swipe = avanzar
                showMagicEffect(true);
            }
            touchStartX = null; touchEndX = null;
        });

        // Click (desktop y también tactil/click en móvil)
        carouselImg.addEventListener('click', () => {
            showMagicEffect(true);
        });

        // Desktop: swipe con mouse (drag)
        let mouseDownX = null;
        carouselImg.addEventListener('mousedown', (e) => {
            mouseDownX = e.screenX;
            dragging = true;
            if (autoSlideTimer) clearTimeout(autoSlideTimer);
        });
        carouselImg.addEventListener('mousemove', (e) => {
            if (!dragging || mouseDownX === null) return;
            touchEndX = e.screenX;
        });
        carouselImg.addEventListener('mouseup', (e) => {
            if (!dragging) return;
            dragging = false;
            if (mouseDownX !== null && touchEndX !== null) {
                const diff = touchEndX - mouseDownX;
                if (Math.abs(diff) > dragThreshold) {
                    showMagicEffect(diff < 0); // true=next, false=prev
                } else {
                    showMagicEffect(true);
                }
            } else {
                showMagicEffect(true);
            }
            mouseDownX = null; touchEndX = null;
        });
        carouselImg.addEventListener('mouseleave', () => {
            dragging = false; mouseDownX = null; touchEndX = null;
        });

        // Teclado (desktop)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                showMagicEffect(true);
            }
            if (e.key === 'ArrowLeft') {
                showMagicEffect(false);
            }
        });

        // Auto-slide
        restartAutoSlide();
    }

    // --- Dragón flotante (tooltip y efecto) ---
    let tooltipTimeout = null;
    if (floatingDragon) {
        floatingDragon.addEventListener('click', (e) => {
            if (musicControlContainer && musicControlContainer.contains(e.target)) return; 
            if (dragonTooltip) {
                dragonTooltip.classList.add('visible');
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                tooltipTimeout = setTimeout(() => {
                    dragonTooltip.classList.remove('visible');
                }, 2500);
            }
            document.body.style.filter = "brightness(1.5) blur(2px)";
            setTimeout(() => { 
                document.body.style.filter = ""; 
            }, 350);
        });
    }
});