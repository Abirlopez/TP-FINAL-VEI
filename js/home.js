document.addEventListener("DOMContentLoaded", () => {
  // 1. Guardar datos del curso al hacer clic en "Ver curso" desde el Home
  const botonesVerCurso = document.querySelectorAll(".btn-course[href*='curso-detalle.html']");
  
  botonesVerCurso.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Extraemos el ID del curso de la URL (ej: "fullstack", "mysql", etc.)
      const urlParams = new URLSearchParams(btn.getAttribute("href").split('?')[1]);
      const cursoId = urlParams.get("id");

      // Buscamos el título y categoría dentro de la tarjeta contenedora
      const card = btn.closest(".course-card");
      const titulo = card.querySelector("h3").textContent.trim();
      const tag = card.querySelector(".course-tag")?.textContent.trim() || "Tecnología";

      // Definimos un objeto con el detalle básico para el localStorage
      const cursoData = {
        id: cursoId,
        titulo: titulo,
        categoria: tag,
        precio: cursoId === "mysql" || cursoId === "ia" || cursoId === "hacking" ? "150" : "Gratuito"
      };

      localStorage.setItem("cursoDetalleActual", JSON.stringify(cursoData));
    });
  });

  // 2. Validación de Sesión para el botón "Iniciar Test con IA"
  const btnTestIA = document.querySelector("a[href='./testIA.html']");
  if (btnTestIA) {
    btnTestIA.addEventListener("click", (e) => {
      const usuarioActivo = localStorage.getItem("usuarioActivo");

      if (!usuarioActivo) {
        e.preventDefault();
        
        // Guardamos el destino pendiente para que post-login vuelva al test
        sessionStorage.setItem("redirectAfterLogin", "testIA.html");
        
        alert("Por favor iniciá sesión o create una cuenta para realizar el test de orientación profesional con IA.");
        window.location.href = "logueo.html";
      }
    });
  }
});