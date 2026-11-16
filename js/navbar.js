document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  fetch("./components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      navbarContainer.innerHTML = data;
      actualizarEstadoNavbar();
    })
    .catch((error) => console.error("Error cargando la navbar:", error));
});

function actualizarEstadoNavbar() {
  const usuarioJSON = localStorage.getItem("usuarioActivo");
  const authContainer = document.getElementById("nav-auth-container");
  const navItemPerfil = document.getElementById("nav-item-perfil");

  if (!authContainer) return;

  if (usuarioJSON) {
    // HAY UN USUARIO LOGUEADO
    const usuario = JSON.parse(usuarioJSON);
    const primerNombre = usuario.nombre.split(" ")[0]; // Ej: "Alan"

    // Calculamos iniciales para el mini-avatar
    const partes = usuario.nombre.trim().split(" ");
    const iniciales = partes.length > 1 
      ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase() 
      : partes[0][0].toUpperCase();

    // Mostramos el link directo de "Mi perfil" en el menú
    if (navItemPerfil) navItemPerfil.classList.remove("d-none");

    // Reemplazamos el botón "Ingresar" por un Dropdown moderno del usuario
    authContainer.innerHTML = `
      <div class="dropdown">
        <button 
          class="btn border border-secondary border-opacity-50 dropdown-toggle d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <span 
            class="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold text-dark" 
            style="width: 28px; height: 28px; background-color: #7ee7d8; font-size: 0.75rem;"
          >
            ${iniciales}
          </span>
          <span class="text-white small fw-semibold">${primerNombre}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-secondary border-opacity-50 shadow-lg mt-2 rounded-3">
          <li>
            <div class="px-3 py-2 border-bottom border-secondary border-opacity-25">
              <span class="d-block text-white small fw-bold">${usuario.nombre}</span>
              <span class="d-block text-muted" style="font-size: 0.75rem;">${usuario.email}</span>
            </div>
          </li>
          <li>
            <a class="dropdown-item text-white small py-2 d-flex align-items-center gap-2" href="./perfil.html">
              <i class="bi bi-person-badge text-teal"></i> Mi Perfil y Cursos
            </a>
          </li>
          <li><hr class="dropdown-divider border-secondary border-opacity-25"></li>
          <li>
            <button class="dropdown-item text-danger small py-2 d-flex align-items-center gap-2" id="nav-btn-logout">
              <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    `;

    // Evento para cerrar sesión desde cualquier página
    const btnLogout = document.getElementById("nav-btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "./logueo.html"; // Recordá que coincida con el nombre de tu archivo de login
      });
    }

  } else {
    // NO HAY USUARIO LOGUEADO
    if (navItemPerfil) navItemPerfil.classList.add("d-none");

    authContainer.innerHTML = `
      <a class="btn btn-success-tech text-dark fw-bold px-4 rounded-3" href="./logueo.html">
        Ingresar
      </a>
    `;
  }
}