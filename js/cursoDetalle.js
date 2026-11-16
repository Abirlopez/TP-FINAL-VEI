document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const cursoId = params.get("id") || "fullstack";

  // 1. Intentamos leer si el usuario hizo clic en una tarjeta desde el catálogo
  const cursoGuardadoJSON = localStorage.getItem("cursoDetalleActual");
  const cursoGuardado = cursoGuardadoJSON ? JSON.parse(cursoGuardadoJSON) : null;

  const baseDeDatosCursos = {
    fullstack: {
      categoria: "Desarrollo Web Full Stack",
      nivel: "Nivel Profesional",
      rating: "4.9",
      reseñas: "512",
      titulo: "Desarrollo Web Full Stack Avanzado",
      descripcionLarga:
        "Domina el desarrollo frontend y backend moderno construyendo aplicaciones escalables desde cero con React, Node.js, Express y bases de datos relacionales y no relacionales integradas.",
      duracionHoras: "40 horas",
      instructorNombre: "Carla Méndez",
      instructorCargo: "Lead Full Stack Engineer",
      instructorIniciales: "CM",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $120",
      clasesCount: "50 clases en video Full HD",
      proyectosCount: "6 proyectos prácticos full stack",
      imagen: "./img/full stack.jpg",
      aprender: [
        "Construir interfaces de usuario dinámicas y responsivas con React y Hooks.",
        "Desarrollar servidores robustos con Node.js y Express.",
        "Diseñar esquemas de bases de datos con MongoDB y PostgreSQL.",
        "Implementar autenticación segura basada en JWT y cookies httpOnly.",
      ],
      requisitos: [
        "Fundamentos sólidos de HTML5, CSS3 y JavaScript moderno (ES6+).",
        "Manejo básico de Git y herramientas de línea de comandos.",
      ],
    },
    mysql: {
      categoria: "Bases de Datos",
      nivel: "Nivel Inicial a Avanzado",
      rating: "4.8",
      reseñas: "280",
      titulo: "Bases de Datos en MySQL y Modelado SQL",
      descripcionLarga:
        "Aprende a modelar, optimizar y consultar bases de datos relacionales de alto rendimiento con MySQL, asegurando la integridad, normalización y velocidad de la información corporativa.",
      duracionHoras: "18 horas",
      instructorNombre: "Esteban Ruarte",
      instructorCargo: "Database Administrator",
      instructorIniciales: "ER",
      precioPrincipal: "150", // Ejemplo de curso pago en base de datos
      precioTachado: "USD $65",
      clasesCount: "25 clases en video Full HD",
      proyectosCount: "3 proyectos de bases de datos",
      imagen: "./img/sql.jpeg",
      aprender: [
        "Modelado entidad-relación y normalización hasta 3FN.",
        "Consultas SQL avanzadas con JOINs complejos, subconsultas y funciones agregadas.",
        "Optimización de rendimiento mediante índices, EXPLAIN y stored procedures.",
        "Políticas de respaldo, transacciones ACID y seguridad en MySQL.",
      ],
      requisitos: [
        "Lógica de programación básica.",
        "Disposición para trabajar con terminal y gestores como MySQL Workbench o DBeaver.",
      ],
    },
    ciberseguridad: {
      categoria: "Seguridad Informática",
      nivel: "Nivel Intermedio",
      rating: "4.9",
      reseñas: "195",
      titulo: "Especialista en Ciberseguridad y Defensa",
      descripcionLarga:
        "Comprende los vectores de amenaza actuales, el endurecimiento de sistemas operativos, criptografía aplicada y los protocolos de defensa activa para proteger infraestructuras críticas.",
      duracionHoras: "35 horas",
      instructorNombre: "Lucía Benítez",
      instructorCargo: "Information Security Officer",
      instructorIniciales: "LB",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $150",
      clasesCount: "42 clases en video Full HD",
      proyectosCount: "5 laboratorios de hardening",
      imagen: "./img/ciberseguridad.jpg",
      aprender: [
        "Análisis de vulnerabilidades en redes corporativas y sistemas operativos.",
        "Implementación de firewalls, sistemas IDS/IPS y VPNs corporativas.",
        "Criptografía simétrica, asimétrica y gestión de certificados SSL/TLS.",
        "Protocolos de respuesta ante incidentes y forenses digitales.",
      ],
      requisitos: [
        "Redes informáticas básicas (modelo OSI, protocolos TCP/IP, DNS).",
        "Familiaridad general con entornos Linux y comandos de consola.",
      ],
    },
    ia: {
      categoria: "Inteligencia Artificial",
      nivel: "Todos los niveles",
      rating: "5.0",
      reseñas: "430",
      titulo: "IA en Programación y Desarrollo Ágil",
      descripcionLarga:
        "Integra modelos de lenguaje avanzados, agentes autónomos y herramientas de asistencia por IA en tu flujo de desarrollo diario para potenciar tu productividad y la calidad del código.",
      duracionHoras: "20 horas",
      instructorNombre: "Mateo Rossi",
      instructorCargo: "AI Solutions Architect",
      instructorIniciales: "MR",
      precioPrincipal: "300", // Ejemplo de curso pago
      precioTachado: "USD $95",
      clasesCount: "30 clases en video Full HD",
      proyectosCount: "4 automatizaciones con IA",
      imagen: "./img/ia.jpg",
      aprender: [
        "Prompt engineering avanzado aplicado a la escritura y refactorización de código.",
        "Integración de APIs de modelos de lenguaje (OpenAI, Claude, etc.) en aplicaciones.",
        "Uso experto de asistentes de código (GitHub Copilot, Cursor).",
        "Automatización de pruebas unitarias y documentación mediante agentes inteligentes.",
      ],
      requisitos: [
        "Experiencia mínima escribiendo código en cualquier lenguaje de programación.",
      ],
    },
    powerbi: {
      categoria: "Business Intelligence",
      nivel: "Nivel Inicial",
      rating: "4.9",
      reseñas: "389",
      titulo: "Curso de Power BI y Analítica de Negocio",
      descripcionLarga:
        "Transforma datos complejos y dispersos en dashboards interactivos, reportes dinámicos, modelos de datos con DAX y visualizaciones de alto impacto para la toma de decisiones estratégicas.",
      duracionHoras: "22 horas",
      instructorNombre: "Valeria Sosa",
      instructorCargo: "BI & Data Analytics Lead",
      instructorIniciales: "VS",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $70",
      clasesCount: "28 clases en video Full HD",
      proyectosCount: "4 dashboards ejecutivos",
      imagen: "./img/bi.jpg",
      aprender: [
        "Extracción y limpieza de datos con Power Query desde múltiples fuentes.",
        "Modelado dimensional y creación de medidas y columnas calculadas con lenguaje DAX.",
        "Diseño de tableros ejecutivos interactivos centrados en la experiencia del usuario.",
        "Publicación y gestión de reportes en el servicio cloud de Power BI.",
      ],
      requisitos: ["Manejo fluido de planillas de cálculo (Excel o similar)."],
    },
    hacking: {
      categoria: "Seguridad Ofensiva",
      nivel: "Nivel Avanzado",
      rating: "4.9",
      reseñas: "210",
      titulo: "Hacking Ético y Pruebas de Intrusión",
      descripcionLarga:
        "Aprende técnicas profesionales de pentesting, auditoría de vulnerabilidades web, explotación de servicios y pruebas de intrusión bajo un marco estrictamente legal, ético y normativo.",
      duracionHoras: "38 horas",
      instructorNombre: "Damián Kestel",
      instructorCargo: "Lead Offensive Security Consultant",
      instructorIniciales: "DK",
      precioPrincipal: "50", // Ejemplo de curso pago
      precioTachado: "USD $160",
      clasesCount: "45 clases en video Full HD",
      proyectosCount: "5 escenarios de pentesting real",
      imagen: "./img/he.png",
      aprender: [
        "Metodologías oficiales de pentesting (PTES, OWASP Top 10).",
        "Explotación de aplicaciones web, inyecciones SQL, XSS y CSRF.",
        "Uso avanzado de herramientas de auditoría (Burp Suite, Metasploit, Nmap).",
        "Redacción de reportes ejecutivos de hallazgos y remediación de brechas.",
      ],
      requisitos: [
        "Conocimientos sólidos de redes, protocolos HTTP/HTTPS y sistemas operativos Linux.",
        "Conceptos básicos de lenguajes de scripting (Python o Bash).",
      ],
    },
  };

  // Seleccionamos el curso base por ID de la URL
  let curso = baseDeDatosCursos[cursoId] || baseDeDatosCursos["fullstack"];

  // 2. Si vino información específica desde el catálogo mediante localStorage y coincide el título, priorizamos el precio guardado
  if (cursoGuardado && cursoGuardado.titulo === curso.titulo) {
    curso.precioPrincipal = cursoGuardado.precio;
  }

  // Inyectar datos generales e imagen del video
  document.getElementById("page-title").textContent = `cursAR - ${curso.titulo}`;
  document.getElementById("curso-categoria").textContent = curso.categoria;
  document.getElementById("curso-nivel").textContent = curso.nivel;
  document.getElementById("curso-rating").textContent = curso.rating;
  document.getElementById("curso-reseñas").textContent = curso.reseñas;
  document.getElementById("curso-titulo").textContent = curso.titulo;
  document.getElementById("curso-descripcion-larga").textContent = curso.descripcionLarga;
  document.getElementById("curso-modalidad").textContent = "Remoto asincrónico";
  document.getElementById("curso-duracion-horas").textContent = curso.duracionHoras;

  // Imagen dinámica del video de introducción
  document.getElementById("curso-video-img").src = curso.imagen;

  document.getElementById("instructor-nombre").textContent = curso.instructorNombre;
  document.getElementById("instructor-cargo").textContent = curso.instructorCargo;
  document.getElementById("instructor-iniciales").textContent = curso.instructorIniciales;

  // LÓGICA DINÁMICA DE PRECIOS Y PÍLDORAS
  const elPrecioPrincipal = document.getElementById("curso-precio-principal");
  const elPrecioTachado = document.getElementById("curso-precio-tachado");
  const pildoraEstado = document.querySelector(".pildora-gratis");

  // Limpiamos y evaluamos si el precio es gratuito ("0", 0 o "Gratuito")
  const precioStr = String(curso.precioPrincipal).trim().toLowerCase();
  const esGratis = precioStr === "0" || precioStr === "gratuito" || precioStr === "gratis" || precioStr === "";

  if (esGratis) {
    elPrecioPrincipal.textContent = "Gratuito";
    elPrecioPrincipal.style.color = "#6ee7b7"; 
    if (elPrecioTachado) {
      elPrecioTachado.textContent = curso.precioTachado || "USD $80";
      elPrecioTachado.style.display = "inline"; // Muestra el precio tachado de referencia (beca)
    }

 } else {
    // Si es de pago (ej: "150", "300", etc.)
    elPrecioPrincipal.textContent = `USD $${curso.precioPrincipal}`;
    
    // Cambiar color del precio a turquesa/teal (o el color que quieras en HEX o RGB)
    elPrecioPrincipal.style.color = "#f5b83d"; 
    
    if (elPrecioTachado) {
      elPrecioTachado.style.display = "none"; // Oculta por completo el precio tachado
    }
    if (pildoraEstado) {
      pildoraEstado.textContent = "Acceso Completo";
      pildoraEstado.style.display = "inline-block";
    }
  }

  document.getElementById("curso-inc-1").textContent = curso.clasesCount;
  document.getElementById("curso-inc-2").textContent = curso.proyectosCount;

  const listaAprender = document.getElementById("lista-aprender");
  listaAprender.innerHTML = curso.aprender
    .map(
      (item) => `
          <div class="col-12 col-md-6 d-flex align-items-start gap-2">
            <i class="bi bi-check2-circle text-teal fs-5 mt-n1"></i>
            <span>${item}</span>
          </div>
        `,
    )
    .join("");

  const listaRequisitos = document.getElementById("lista-requisitos");
  listaRequisitos.innerHTML = curso.requisitos
    .map(
      (req) => `
          <li class="d-flex align-items-start gap-2 p-3 rounded-3 caja-descripcion-curso">
            <i class="bi bi-check-circle-fill text-teal mt-1"></i>
            <span>${req}</span>
          </li>
        `,
    )
    .join("");

  const btnInscribirse = document.getElementById("btn-inscribirse-checkout");
  if (btnInscribirse) {
    btnInscribirse.addEventListener("click", () => {
      sessionStorage.setItem("cursoSeleccionado", curso.titulo);
    });
  }
});