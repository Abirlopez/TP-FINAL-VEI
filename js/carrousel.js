document.addEventListener("DOMContentLoaded", () => {
  const desktopCarousel = document.querySelector('#carouselCards');
  const mobileCarousel = document.querySelector('#carouselCardsMobile');
  const currentIndexSpan = document.getElementById('currentIndex');
  const totalSlidesSpan = document.getElementById('totalSlides');

  function updateCarouselState() {
    // Detectamos cuál de los dos carruseles está visible según el CSS actual
    let activeCarousel = null;
    
    if (desktopCarousel && window.getComputedStyle(desktopCarousel).display !== 'none') {
      activeCarousel = desktopCarousel;
    } else if (mobileCarousel && window.getComputedStyle(mobileCarousel).display !== 'none') {
      activeCarousel = mobileCarousel;
    }

    if (activeCarousel) {
      const items = activeCarousel.querySelectorAll('.carousel-item');
      
      // Actualizamos el total (2 para PC, 6 para Mobile)
      if (totalSlidesSpan) {
        totalSlidesSpan.textContent = items.length;
      }

      // Buscamos cuál es el slide activo actual en ese carrusel
      const activeItem = activeCarousel.querySelector('.carousel-item.active');
      const index = Array.from(items).indexOf(activeItem);
      if (currentIndexSpan && index !== -1) {
        currentIndexSpan.textContent = index + 1;
      }
    }
  }

  // Ejecutamos al cargar
  updateCarouselState();

  // Escuchamos los cambios de slide en AMBOS carousels
  [desktopCarousel, mobileCarousel].forEach(carousel => {
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', (event) => {
        // Solo actualizamos si este carrusel es el que está visible en pantalla
        if (window.getComputedStyle(carousel).display !== 'none') {
          const items = carousel.querySelectorAll('.carousel-item');
          if (totalSlidesSpan) totalSlidesSpan.textContent = items.length;
          if (currentIndexSpan) currentIndexSpan.textContent = event.to + 1;
        }
      });
    }
  });

  // Si el usuario redimensiona la ventana (ej: abre las herramientas de desarrollo), se actualiza solo
  window.addEventListener('resize', updateCarouselState);

  // 1. Guardar datos del curso en localStorage al hacer clic en "Ver curso"
  const botonesVerCurso = document.querySelectorAll(".btn-guardar-curso");
  botonesVerCurso.forEach(btn => {
    btn.addEventListener("click", () => {
      const cursoData = {
        titulo: btn.dataset.titulo,
        precio: btn.dataset.precio,
        modalidad: btn.dataset.modalidad,
        habilidad: btn.dataset.habilidad,
        empresa: btn.dataset.empresa,
        ubicacion: btn.dataset.ubicacion,
        idioma: btn.dataset.idioma
      };
      localStorage.setItem("cursoDetalleActual", JSON.stringify(cursoData));
    });
  });

  // 2. Validar sesión para el botón "Iniciar Test con IA"
  const btnIniciarTest = document.getElementById("btn-iniciar-test");
  if (btnIniciarTest) {
    btnIniciarTest.addEventListener("click", (e) => {
      const usuarioActivo = localStorage.getItem("usuarioActivo");
      if (!usuarioActivo) {
        e.preventDefault();
        sessionStorage.setItem("redirectAfterLogin", "testIA.html");
        alert("Por favor iniciá sesión o create una cuenta para realizar el test de orientación profesional con IA.");
        window.location.href = "logueo.html";
      }
    });
  }
});