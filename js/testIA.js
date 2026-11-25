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
    titulo: "¿Cuánta carga horaria semanal real podés dedicarle al estudio?",
    tipo: "carga_horaria",
    opciones: [
      { texto: "Más de 15 horas semanales (Busco inmersión total en desarrollo completo)", valor: "fullstack" },
      { texto: "Entre 12 y 15 horas semanales (Prácticas intensivas de seguridad ofensiva)", valor: "hacking" },
      { texto: "Entre 8 y 12 horas semanales (Ritmo constante de defensa e infraestructura)", valor: "ciberseguridad" },
      { texto: "Entre 6 y 8 horas semanales (Módulos ágiles de automatización con IA)", valor: "ia" },
      { texto: "Entre 4 y 6 horas semanales (Aprendizaje enfocado en consultas y datos)", valor: "mysql" },
      { texto: "Menos de 4 horas semanales (Flexibilidad total para armar tableros visuales)", valor: "powerbi" }
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
  },
  {
    titulo: "¿Cómo te llevás con la resolución de problemas matemáticos y lógica abstracta?",
    tipo: "logica",
    opciones: [
      { texto: "Me apasionan los algoritmos y la arquitectura de software", valor: "fullstack" },
      { texto: "Disfruto mucho el álgebra relacional y la estructuración de tablas", valor: "mysql" },
      { texto: "Prefiero aplicar la lógica para detectar patrones de ataque y brechas", valor: "hacking" },
      { texto: "Me interesa usar la lógica para entrenar prompts y flujos inteligentes", valor: "ia" }
    ]
  },
  {
    titulo: "¿Qué grado de afinidad tenés con el diseño visual y la presentación de información?",
    tipo: "afinidad_visual",
    opciones: [
      { texto: "Alta: me encanta crear tableros gráficos e indicadores visuales claros", valor: "powerbi" },
      { texto: "Media-Alta: disfruto maquetar interfaces web atractivas para el usuario", valor: "fullstack" },
      { texto: "Baja: prefiero trabajar en servidores ocultos, consolas y bases de datos", valor: "mysql" },
      { texto: "Nula: me interesa exclusivamente la seguridad de redes y sistemas", valor: "ciberseguridad" }
    ]
  },
  {
    titulo: "¿Cómo preferís que sean las evaluaciones prácticas de tu cursada?",
    tipo: "evaluacion",
    opciones: [
      { texto: "Construyendo una aplicación web funcional desde cero", valor: "fullstack" },
      { texto: "Auditando un entorno simulado para encontrar vulnerabilidades", valor: "hacking" },
      { texto: "Diseñando un dashboard ejecutivo a partir de datos crudos", valor: "powerbi" },
      { texto: "Configurando protocolos de seguridad y cifrado en servidores", valor: "ciberseguridad" }
    ]
  },
  {
    titulo: "¿Qué rol te gustaría ocupar dentro de un equipo de tecnología?",
    tipo: "rol",
    opciones: [
      { texto: "Desarrollador Full Stack", valor: "fullstack" },
      { texto: "Administrador de Bases de Datos (DBA)", valor: "mysql" },
      { texto: "Especialista en Ciberseguridad Defensiva", valor: "ciberseguridad" },
      { texto: "Arquitecto de Soluciones con IA", valor: "ia" },
      { texto: "Analista de Business Intelligence (BI)", valor: "powerbi" },
      { texto: "Consultor de Seguridad Ofensiva / Pentester", valor: "hacking" }
    ]
  },
  {
    titulo: "¿Qué aspecto de la tecnología actual te genera mayor curiosidad explorar?",
    tipo: "curiosidad",
    opciones: [
      { texto: "Cómo los asistentes de IA están transformando la forma de programar", valor: "ia" },
      { texto: "Cómo se protegen las empresas frente al robo de información", valor: "ciberseguridad" },
      { texto: "Cómo se toman decisiones millonarias analizando grandes volúmenes de datos", valor: "powerbi" },
      { texto: "Cómo piensan los atacantes informáticos para vulnerar sistemas", valor: "hacking" }
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

  // Calcula el porcentaje segun las preguntas que ya se respondieron
  function actualizarProgreso() {
    let respondidas = indiceActual;
    if (respuestasUsuario[indiceActual]) {
      respondidas++;
    }

    const progresoNum = (respondidas / preguntas.length) * 100;
    badgePorcentaje.textContent = `${Math.round(progresoNum)}% completado`;
    barraProgreso.style.width = `${progresoNum}%`;
  }

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
        actualizarProgreso();
      });
    });

    textoProgreso.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
    actualizarProgreso();

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

        // Encontrar el curso con mayor puntaje
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