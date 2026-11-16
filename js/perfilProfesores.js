document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-profesores");
  if (!contenedor) return;

  // Base de datos oficial de instructores correspondiente a los 6 cursos
  const profesores = [
    {
      nombre: "Carla Méndez",
      cargo: "Lead Full Stack Engineer",
      cursoAsociado: "Desarrollo Web Full Stack Avanzado",
      linkCurso: "curso-detalle.html?id=fullstack",
      iniciales: "CM",
      bio: "Especialista en arquitecturas frontend robustas con React y ecosistema Node.js. Apasionada por el código limpio y escalable.",
      tag: "Desarrollo Web",
      colorTag: "c-violet",
      imagen: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      nombre: "Esteban Ruarte",
      cargo: "Database Administrator",
      cursoAsociado: "Bases de Datos en MySQL y Modelado SQL",
      linkCurso: "curso-detalle.html?id=mysql",
      iniciales: "ER",
      bio: "Administrador experto en optimización de consultas de alto rendimiento, normalización de datos corporativos y transacciones ACID.",
      tag: "Bases de Datos",
      colorTag: "c-teal",
      imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      nombre: "Lucía Benítez",
      cargo: "Information Security Officer",
      cursoAsociado: "Especialista en Ciberseguridad y Defensa",
      linkCurso: "curso-detalle.html?id=ciberseguridad",
      iniciales: "LB",
      bio: "Consultora de seguridad ofensiva y defensiva. Enfocada en hardening de sistemas operativos, criptografía y respuesta a incidentes.",
      tag: "Ciberseguridad",
      colorTag: "c-amber",
      imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      nombre: "Mateo Rossi",
      cargo: "AI Solutions Architect",
      cursoAsociado: "IA en Programación y Desarrollo Ágil",
      linkCurso: "curso-detalle.html?id=ia",
      iniciales: "MR",
      bio: "Pionero en la integración de modelos de lenguaje avanzados y agentes inteligentes en flujos de desarrollo de software ágil.",
      tag: "Inteligencia Artificial",
      colorTag: "c-violet",
      imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      nombre: "Valeria Sosa",
      cargo: "BI & Data Analytics Lead",
      cursoAsociado: "Curso de Power BI y Analítica de Negocio",
      linkCurso: "curso-detalle.html?id=powerbi",
      iniciales: "VS",
      bio: "Experta en modelado dimensional, lenguaje DAX y diseño de tableros de control ejecutivos para la toma de decisiones estratégicas.",
      tag: "Business Intelligence",
      colorTag: "c-teal",
      imagen: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      nombre: "Damián Kestel",
      cargo: "Lead Offensive Security Consultant",
      cursoAsociado: "Hacking Ético y Pruebas de Intrusión",
      linkCurso: "curso-detalle.html?id=hacking",
      iniciales: "DK",
      bio: "Pentester profesional especializado en auditorías de aplicaciones web, explotación de servicios y marcos regulatorios de seguridad.",
      tag: "Seguridad Ofensiva",
      colorTag: "c-amber",
      imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  // Renderizar dinámicamente las tarjetas de profesores
  contenedor.innerHTML = profesores.map(p => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="filtros_cursos p-4 rounded-4 h-100 d-flex flex-column justify-content-between border border-secondary border-opacity-25 shadow-sm">
        <div>
          <!-- AVATAR Y ESTADO -->
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="position-relative" style="width: 70px; height: 70px;">
              <img src="${p.imagen}" alt="${p.nombre}" class="rounded-circle w-100 h-100 object-fit-cover shadow" style="border: 2px solid #7ee7d8;" />
              <span class="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle p-1" title="Activo"></span>
            </div>
            <div>
              <h3 class="h5 fw-bold text-white mb-1">${p.nombre}</h3>
              <span class="small fw-semibold" style="color: #7ee7d8;">${p.cargo}</span>
            </div>
          </div>

          <p class="small texto-secundario-claro mb-3">${p.bio}</p>

          <div class="mb-3">
            <span class="badge bg-dark border border-secondary border-opacity-25 text-white py-1 px-2 small">
              <i class="bi bi-book me-1 text-teal"></i> ${p.cursoAsociado}
            </span>
          </div>
        </div>

        <div class="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <span class="course-tag ${p.colorTag}">${p.tag}</span>
          <a href="${p.linkCurso}" class="btn btn-outline-light btn-sm rounded-3">
            Ver Curso <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  `).join("");
});