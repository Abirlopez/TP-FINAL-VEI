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

  // Le sumamos la lógica del clic (ej: ir al cuestionario o mostrar un mensaje)
  document.getElementById('aiFloatingBtn')?.addEventListener('click', () => {
    const seccionCuestionario = document.querySelector('#cuestionario') || document.querySelector('.seccion-cuestionario');
    if (seccionCuestionario) {
      seccionCuestionario.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'index.html#cuestionario'; // O la ruta a donde esté el test
    }
  });
});