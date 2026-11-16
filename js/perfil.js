document.addEventListener("DOMContentLoaded", () => {
  const usuarioJSON = localStorage.getItem("usuarioActivo");
  if (!usuarioJSON) {
    window.location.href = "logueo.html";
    return;
  }

  const usuario = JSON.parse(usuarioJSON);

  // Inyectar datos del usuario
  const elNombre = document.getElementById("perfil-nombre");
  const elEmail = document.getElementById("perfil-email");
  const elIniciales = document.getElementById("perfil-iniciales");

  if (elNombre) elNombre.textContent = usuario.nombre;
  if (elEmail) elEmail.textContent = usuario.email;

  if (elIniciales && usuario.nombre) {
    const partes = usuario.nombre.trim().split(" ");
    let iniciales = partes[0][0];
    if (partes.length > 1) {
      iniciales += partes[partes.length - 1][0];
    }
    elIniciales.textContent = iniciales.toUpperCase();
  }

  // Clave única de localStorage por cada usuario para evitar cruces de datos
  const storageKeyCursos = `misCursos_${usuario.email}`;
  const contenedorCursos = document.getElementById("contenedor-mis-cursos");
  let misCursos = JSON.parse(localStorage.getItem(storageKeyCursos)) || [];

  // Sincronizar nueva inscripción si viene de pago exitoso
  const ultimaInscripcionJSON = localStorage.getItem("ultimaInscripcion");
  if (ultimaInscripcionJSON) {
    const ultimaInscripcion = JSON.parse(ultimaInscripcionJSON);
    
    const yaExiste = misCursos.some(c => c.curso === ultimaInscripcion.curso);
    if (!yaExiste) {
      misCursos.push(ultimaInscripcion);
      localStorage.setItem(storageKeyCursos, JSON.stringify(misCursos));
    }
    // Limpiamos la última inscripción para que no se reasigne por error
    localStorage.removeItem("ultimaInscripcion");
  }

  // Actualizar estadísticas del banner superior (cantidad de cursos activos)
  const statCursos = document.getElementById("stat-cursos-count");
  if (statCursos) statCursos.textContent = misCursos.length;

  // Renderizar los cursos del usuario activo
  if (misCursos.length === 0) {
    contenedorCursos.innerHTML = `
      <div class="col-12">
        <div class="filtros_cursos p-5 rounded-4 text-center border border-secondary border-opacity-25">
          <i class="bi bi-journal-x display-4 text-muted mb-3 d-block"></i>
          <h3 class="h5 fw-bold text-white mb-2">Aún no tenés cursos adquiridos</h3>
          <p class="texto-secundario-claro small mb-4">Explorá nuestro catálogo y sumate a las capacitaciones con certificación oficial.</p>
          <a href="cursos.html" class="btn btn-success-tech px-4 py-2 text-dark fw-bold">Ver Catálogo de Cursos</a>
        </div>
      </div>
    `;
  } else {
    // Mapeo exacto de las instituciones aliadas según el título oficial del curso
    const enlacesEmpresas = {
      "Desarrollo Web Full Stack Avanzado": "https://platzi.com/",
      "Bases de Datos en MySQL y Modelado SQL": "https://www.datacamp.com/",
      "Especialista en Ciberseguridad y Defensa": "https://www.coderhouse.com/",
      "IA en Programación y Desarrollo Ágil": "https://platzi.com/",
      "Curso de Power BI y Analítica de Negocio": "https://www.datacamp.com/",
      "Hacking Ético y Pruebas de Intrusión": "https://www.coderhouse.com/" // (Por si hacés uso del sexto curso en el futuro)
    };

    contenedorCursos.innerHTML = misCursos.map(c => {
      const tituloCurso = c.curso || "Curso cursAR";
      // Selecciona el link correspondiente o usa Platzi por defecto si no hace match exacto
      const linkCampus = enlacesEmpresas[tituloCurso] || "https://platzi.com/";

      return `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="filtros_cursos p-4 rounded-4 h-100 d-flex flex-column justify-content-between border border-secondary border-opacity-25 shadow-sm">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Activo</span>
                <span class="small text-muted font-monospace">${c.fecha || "Reciente"}</span>
              </div>
              <h3 class="h5 fw-bold text-white mb-2">${tituloCurso}</h3>
              <p class="small text-muted mb-2"><i class="bi bi-clock me-1 text-teal"></i> ${c.comision || "Remoto asincrónico"}</p>
              <p class="small texto-secundario-claro mb-3"><i class="bi bi-credit-card me-1"></i> ${c.metodoPago || "Acceso Completo"}</p>
            </div>
            <div class="pt-3 border-top border-secondary border-opacity-25">
              <a href="${linkCampus}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light btn-sm w-100 rounded-3">
                Ir al Campus Virtual <i class="bi bi-box-arrow-up-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Cerrar Sesión
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "logueo.html";
    });
  }
});