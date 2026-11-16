// ai-widget.js
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

  // Lógica del clic: Redirige directamente a la página del test
  document.getElementById('aiFloatingBtn')?.addEventListener('click', () => {
    // Si querés que vaya directo al test en todas las páginas:
    window.location.href = "./testIA.html"; 
  });
});