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
});