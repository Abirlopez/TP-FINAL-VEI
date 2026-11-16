document.addEventListener("DOMContentLoaded", () => {
  const floatingHTML = `
    <div class="ai-floating-container">
      <div id="aiTooltip" class="ai-tooltip-bubble shadow">
        ¡Hola! 👋 Soy tu guía de IA. ¿Buscás un curso IT a medida?
      </div>
      <button id="aiFloatingBtn" class="ai-floating-btn shadow-hover" aria-label="Asistente IA">
        <img src="./img/logoIA.png" alt="Asistente IA" class="ai-avatar-img">
        <span class="ai-pulse-ring"></span>
      </button>
    </div>
  `;

  // Lo agregamos al final del body
  document.body.insertAdjacentHTML('beforeend', floatingHTML);

  // Lógica del clic: Valida sesión antes de redirigir al test con IA
  document.getElementById('aiFloatingBtn')?.addEventListener('click', () => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (!usuarioActivo) {
      // Si NO está logueado, guardamos el destino pendiente para post-login
      sessionStorage.setItem("redirectAfterLogin", "testIA.html");
      
      alert("Por favor iniciá sesión o create una cuenta para realizar el test de orientación profesional con IA.");
      window.location.href = "logueo.html";
    } else {
      // Si SÍ está logueado, va directo al test de IA
      window.location.href = "./testIA.html";
    }
  });
});