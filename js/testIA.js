const preguntas = [
  {
    titulo: "¿Cuál es tu principal objetivo o área de interés dentro del mundo tecnológico?",
    tipo: "objetivo",
    opciones: [
      { texto: "Crear aplicaciones web completas (frontend y backend)", valor: "fullstack" },
      { texto: "Diseñar, modelar y optimizar bases de datos relacionales", valor: "mysql" },
      { texto: "Proteger sistemas, redes y prevenir ciberataques defensivos", valor: "ciberseguridad" },
      { texto: "Integrar inteligencia artificial y agentes de código en proyectos", valor: "ia" },
      { texto: "Analizar datos, métricas y crear dashboards ejecutivos", valor: "powerbi" },
      { texto: "Auditar vulnerabilidades y realizar pruebas de penetración (pentesting)", valor: "hacking" }
    ]
  },
  {
    titulo: "¿Qué tipo de desafíos lógicos o prácticos te resultan más estimulantes?",
    tipo: "desafio",
    opciones: [
      { texto: "Construir flujos de usuarios interactivos y servidores conectados", valor: "fullstack" },
      { texto: "Normalizar tablas complejas y acelerar consultas SQL masivas", valor: "mysql" },
      { texto: "Configurar firewalls, criptografía y análisis de amenazas", valor: "ciberseguridad" },
      { texto: "Automatizar tareas repetitivas mediante modelos de lenguaje", valor: "ia" },
      { texto: "Transformar planillas dispersas en tableros visuales de negocio", valor: "powerbi" },
      { texto: "Encontrar fallas de seguridad ocultas en aplicaciones web", valor: "hacking" }
    ]
  },
  {
    titulo: "¿Con qué herramientas o entornos te visualizás trabajando en tu día a día?",
    tipo: "herramientas",
    opciones: [
      { texto: "React, Node.js y frameworks web modernos", valor: "fullstack" },
      { texto: "Gestores de bases de datos como MySQL Workbench y terminales SQL", valor: "mysql" },
      { texto: "Sistemas operativos Linux, redes y herramientas de hardening", valor: "ciberseguridad" },
      { texto: "APIs de IA, asistentes de código (GitHub Copilot, Cursor)", valor: "ia" },
      { texto: "Power BI, Power Query y planillas de cálculo avanzadas", valor: "powerbi" },
      { texto: "Burp Suite, Nmap, Metasploit y herramientas de auditoría", valor: "hacking" }
    ]
  },
  {
    titulo: "¿Cuál es tu meta profesional a corto plazo al finalizar la capacitación?",
    tipo: "meta",
    opciones: [
      { texto: "Desarrollar productos digitales escalables de punta a punta", valor: "fullstack" },
      { texto: "Gestionar y asegurar la integridad de la información corporativa", valor: "mysql" },
      { texto: "Trabajar en la defensa y blindaje de infraestructura digital", valor: "ciberseguridad" },
      { texto: "Potenciar mi productividad y desarrollo de software con IA", valor: "ia" },
      { texto: "Convertirme en analista de datos para la toma de decisiones gerenciales", valor: "powerbi" },
      { texto: "Insertarme en el área de seguridad ofensiva y hacking ético", valor: "hacking" }
    ]
  }
];

let indiceActual = 0;
let respuestasUsuario = [];

document.addEventListener("DOMContentLoaded", () => {
  const areaPregunta = document.getElementById("area-pregunta");
  const textoProgreso = document.getElementById("texto-progreso");
  const badgePorcentaje = document.getElementById("badge-porcentaje");
  const barraProgreso = document.getElementById("barra-progresso");
  const btnSiguiente = document.getElementById("btn-siguiente");
  const btnAnterior = document.getElementById("btn-anterior");
  
  const cajaCuestionario = document.getElementById("caja-cuestionario");
  const cajaLoading = document.getElementById("caja-loading");
  const cajaResultado = document.getElementById("caja-resultado");
  const resultadoDetalle = document.getElementById("resultado-detalle");
  const btnReiniciar = document.getElementById("btn-reiniciar");

  function renderizarPregunta() {
    const pregunta = preguntas[indiceActual];
    let htmlOpciones = "";

    pregunta.opciones.forEach((op) => {
      const seleccionado = respuestasUsuario[indiceActual] === op.valor ? "checked" : "";

      htmlOpciones += `
        <label class="caja-descripcion-curso p-3 rounded-3 border border-secondary border-opacity-25 d-flex align-items-center gap-3 cursor-puntero opcion-label">
          <input class="form-check-input mt-0 bg-dark border-secondary radio-opcion" type="radio" name="p_${indiceActual}" value="${op.valor}" ${seleccionado}>
          <span class="text-white small fw-semibold">${op.texto}</span>
        </label>
      `;
    });

    areaPregunta.innerHTML = `
      <h2 class="h5 fw-bold text-white mb-3">${indiceActual + 1}. ${pregunta.titulo}</h2>
      <div class="d-flex flex-column gap-3 mb-2" id="grupo-opciones">
        ${htmlOpciones}
      </div>
      <div id="error-alerta" class="text-danger small mt-2 d-none">
        <i class="bi bi-exclamation-circle-fill me-1"></i> Por favor, seleccioná una opción para continuar.
      </div>
    `;

    document.querySelectorAll(".radio-opcion").forEach(radio => {
      radio.addEventListener("change", (e) => {
        respuestasUsuario[indiceActual] = e.target.value;
        const alerta = document.getElementById("error-alerta");
        if (alerta) alerta.classList.add("d-none");
      });
    });

    const progresoNum = ((indiceActual + 1) / preguntas.length) * 100;
    textoProgreso.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
    badgePorcentaje.textContent = `${Math.round(progresoNum)}% completado`;
    barraProgreso.style.width = `${progresoNum}%`;

    btnAnterior.disabled = indiceActual === 0;
    btnAnterior.style.opacity = indiceActual === 0 ? "0.5" : "1";
    btnSiguiente.textContent = indiceActual === preguntas.length - 1 ? "Analizar con IA" : "Siguiente";
  }

  btnSiguiente.addEventListener("click", () => {
    if (!respuestasUsuario[indiceActual]) {
      const alerta = document.getElementById("error-alerta");
      if (alerta) alerta.classList.remove("d-none");
      return;
    }

    if (indiceActual < preguntas.length - 1) {
      indiceActual++;
      renderizarPregunta();
    } else {
      cajaCuestionario.classList.add("d-none");
      cajaLoading.classList.remove("d-none");

      setTimeout(() => {
        cajaLoading.classList.add("d-none");
        cajaResultado.classList.remove("d-none");

        // Contar votos de cada curso
        const conteo = { fullstack: 0, mysql: 0, ciberseguridad: 0, ia: 0, powerbi: 0, hacking: 0 };
        respuestasUsuario.forEach(r => {
          if (conteo[r] !== undefined) conteo[r]++;
        });

        // Encontrar el curso con mayor puntaje (o por defecto fullstack)
        let ganador = "fullstack";
        let maxVotos = -1;
        for (const [key, value] of Object.entries(conteo)) {
          if (value > maxVotos) {
            maxVotos = value;
            ganador = key;
          }
        }

        // Base de datos de los 6 cursos oficiales vinculados al resultado de la IA
        const baseCursosIA = {
          fullstack: {
            id: "fullstack",
            titulo: "Desarrollo Web Full Stack Avanzado",
            match: "98%",
            badgeColor: "bg-success text-success border-success",
            descripcion: "Tus respuestas reflejan una gran afinidad por construir aplicaciones completas conectando interfaces dinámicas con servidores y bases de datos.",
            duracion: "40 horas",
            precio: "0"
          },
          mysql: {
            id: "mysql",
            titulo: "Bases de Datos en MySQL y Modelado SQL",
            match: "96%",
            badgeColor: "bg-warning text-warning border-warning",
            descripcion: "Demostraste gran interés por la estructuración metódica de datos, consultas complejas y la optimización de rendimiento corporativo.",
            duracion: "18 horas",
            precio: "150"
          },
          ciberseguridad: {
            id: "ciberseguridad",
            titulo: "Especialista en Ciberseguridad y Defensa",
            match: "97%",
            badgeColor: "bg-danger text-danger border-danger",
            descripcion: "Tus respuestas indican un perfil enfocado en proteger infraestructuras críticas, blindar sistemas y aplicar protocolos de defensa activa.",
            duracion: "35 horas",
            precio: "0"
          },
          ia: {
            id: "ia",
            titulo: "IA en Programación y Desarrollo Ágil",
            match: "99%",
            badgeColor: "text-indigo border-indigo",
            descripcion: "Tenés una excelente sintonía con las tecnologías emergentes, modelos de lenguaje avanzados y automatización inteligente de código.",
            duracion: "20 horas",
            precio: "300"
          },
          powerbi: {
            id: "powerbi",
            titulo: "Curso de Power BI y Analítica de Negocio",
            match: "95%",
            badgeColor: "bg-info text-info border-info",
            descripcion: "Tu perfil se destaca en la transformación de datos dispersos en tableros de control ejecutivos para la toma de decisiones estratégicas.",
            duracion: "22 horas",
            precio: "0"
          },
          hacking: {
            id: "hacking",
            titulo: "Hacking Ético y Pruebas de Intrusión",
            match: "97%",
            badgeColor: "bg-danger text-danger border-danger",
            descripcion: "Te motiva profundamente auditar sistemas, descubrir brechas de seguridad y realizar pruebas de penetración bajo un marco ético.",
            duracion: "38 horas",
            precio: "50"
          }
        };

        const cursoRecomendado = baseCursosIA[ganador] || baseCursosIA["fullstack"];

        resultadoDetalle.innerHTML = `
          <span class="badge bg-opacity-10 border border-opacity-25 mb-2 ${cursoRecomendado.badgeColor}">Match ${cursoRecomendado.match} • Recomendado por IA</span>
          <h4 class="h5 fw-bold text-white mb-1">${cursoRecomendado.titulo}</h4>
          <p class="small texto-secundario-claro mb-3">${cursoRecomendado.descripcion}</p>
          <div class="d-flex flex-wrap gap-3 text-muted small mb-4">
            <span class="text-white"><i class="bi bi-clock text-teal me-1"></i> ${cursoRecomendado.duracion}</span> • 
            <span class="text-white"><i class="bi bi-award text-teal me-1"></i> Certificado oficial</span>
          </div>
          <a href="curso-detalle.html?id=${cursoRecomendado.id}" class="btn btn-success-tech w-100 py-2 text-dark fw-bold btn-ir-curso-ia" data-id="${cursoRecomendado.id}" data-titulo="${cursoRecomendado.titulo}" data-precio="${cursoRecomendado.precio}">
            Ver Programa e Inscribirme <i class="bi bi-arrow-right ms-1"></i>
          </a>
        `;

        const btnIrCurso = document.querySelector(".btn-ir-curso-ia");
        if (btnIrCurso) {
          btnIrCurso.addEventListener("click", () => {
            const cursoData = {
              id: cursoRecomendado.id,
              titulo: cursoRecomendado.titulo,
              precio: cursoRecomendado.precio,
              modalidad: "Remoto asincrónico"
            };
            localStorage.setItem("cursoDetalleActual", JSON.stringify(cursoData));
          });
        }
      }, 2500);
    }
  });

  btnAnterior.addEventListener("click", () => {
    if (indiceActual > 0) {
      indiceActual--;
      renderizarPregunta();
    }
  });

  btnReiniciar.addEventListener("click", () => {
    indiceActual = 0;
    respuestasUsuario = [];
    cajaResultado.classList.add("d-none");
    cajaCuestionario.classList.remove("d-none");
    renderizarPregunta();
  });

  renderizarPregunta();
});