document.addEventListener("DOMContentLoaded", () => {
  const carouselElement = document.querySelector('#carouselCards') || document.querySelector('#carruselTarjetas');
  
  if (carouselElement) {
    const items = carouselElement.querySelectorAll('.carousel-item');
    const currentIndexSpan = document.getElementById('currentIndex');
    const totalSlidesSpan = document.getElementById('totalSlides');

    // Seteamos el total de slides al cargar la página
    if (totalSlidesSpan) {
      totalSlidesSpan.textContent = items.length;
    }

    // Escuchamos cuando Bootstrap cambia de slide
    carouselElement.addEventListener('slid.bs.carousel', (event) => {
      if (currentIndexSpan) {
        // event.to te da el índice del slide actual (empieza en 0, por eso sumamos 1)
        currentIndexSpan.textContent = event.to + 1;
      }
    });
  }

       // 1. Guardar todos los datos del curso en localStorage al hacer clic en "Ver curso"
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
              
              // Guardamos la ruta pendiente para devolverlo luego de iniciar sesión
              sessionStorage.setItem("redirectAfterLogin", "testIA.html");
              
              alert("Por favor iniciá sesión o create una cuenta para realizar el test de orientación profesional con IA.");
              window.location.href = "logueo.html";
            }
          });
        }
});