document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  fetch("./components/footer.html")
    .then(response => response.text())
    .then(data => {
      footerContainer.innerHTML = data;

      // VALIDACIÓN DE SESIÓN PARA EL TEST DE IA DESDE EL FOOTER

      const footerContainerElement = document.getElementById("footer-container");
      
      if (footerContainerElement) {
        footerContainerElement.addEventListener("click", (e) => {
          // Buscamos si el elemento clickeado es el enlace del test de orientación
          const linkTest = e.target.closest("a[href*='testIA.html']");

          if (linkTest) {
            const usuarioActivo = localStorage.getItem("usuarioActivo");

            if (!usuarioActivo) {
              // 1. Cancelamos la navegación por defecto
              e.preventDefault();

              // 2. Guardamos la ruta pendiente para que post-login vuelva al test
              sessionStorage.setItem("redirectAfterLogin", "testIA.html");

              // 3. Alerta amigable y redirección al login
              alert("Por favor iniciá sesión o create una cuenta para realizar el test de orientación profesional con IA.");
              window.location.href = "logueo.html";
            }
            // Si SÍ está logueado, se deja que el enlace avance libremente hacia testIA.html
          }
        });
      }
    })
    .catch(error => console.error("Error cargando el footer:", error));
});