document.addEventListener("DOMContentLoaded", () => {
  const botonesVerCurso = document.querySelectorAll(".btn-course[href*='curso-detalle.html']");

  botonesVerCurso.forEach(btn => {
    btn.addEventListener("click", () => {
      const urlParams = new URLSearchParams(btn.getAttribute("href").split('?')[1]);
      const cursoId = urlParams.get("id");
      const card = btn.closest(".course-card");

      const titulo = card.querySelector("h3").textContent.trim();
      const tagElement = card.querySelector(".course-tag");
      const categoria = tagElement ? tagElement.textContent.trim() : "Tecnología";

      const cursosDePago = ["mysql", "ia", "hacking"];
      const precio = cursosDePago.includes(cursoId) ? "150" : "Gratuito";

      const cursoData = {
        id: cursoId,
        titulo: titulo,
        categoria: categoria,
        precio: precio
      };

      localStorage.setItem("cursoDetalleActual", JSON.stringify(cursoData));
    });
  });

  const btnTestIA = document.querySelector("a[href='./testIA.html']");

  if (btnTestIA) {
    btnTestIA.addEventListener("click", (e) => {
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