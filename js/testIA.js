const preguntas = [
        {
          titulo: "¿Cuál es tu nivel actual de experiencia formal en tecnología o programación?",
          tipo: "backend",
          opciones: [
            { texto: "Principiante absoluto (Nunca escribí código)", valor: "backend" },
            { texto: "Autodidacta con nociones básicas de lógica", valor: "frontend" },
            { texto: "Estudiante intermedio o técnico recibido", valor: "backend" }
          ]
        },
        {
          titulo: "¿Qué tipo de tareas te resultan más atractivas o estimulantes?",
          tipo: "preferencia",
          opciones: [
            { texto: "Diseñar interfaces visuales atractivas y usables por usuarios", valor: "frontend" },
            { texto: "Optimizar bases de datos, APIs y lógica de servidores ocultos", valor: "backend" },
            { texto: "Diseñar experiencias de usuario completas, prototipos y flujos", valor: "ux" }
          ]
        },
        {
          titulo: "¿Cuánta disponibilidad real tenés para dedicarle al estudio por semana?",
          tipo: "tiempo",
          opciones: [
            { texto: "Más de 15 horas semanales (Busco inmersión total)", valor: "backend" },
            { texto: "Entre 8 y 14 horas semanales (Ritmo moderado)", valor: "frontend" },
            { texto: "Menos de 7 horas semanales (Flexibilidad total)", valor: "ux" }
          ]
        },
        {
          titulo: "¿Cuál es tu principal meta a corto plazo al finalizar la cursada?",
          tipo: "meta",
          opciones: [
            { texto: "Conseguir un empleo formal en el sector IT lo antes posible", valor: "backend" },
            { texto: "Lanzar mis propios proyectos personales o independientes", valor: "frontend" },
            { texto: "Actualizar mis herramientas profesionales actuales", valor: "ux" }
          ]
        },
        {
          titulo: "¿Cómo te llevás con la resolución de problemas matemáticos y lógicos?",
          tipo: "logica",
          opciones: [
            { texto: "Me encantan los acertijos lógicos y la estructuración de datos", valor: "backend" },
            { texto: "Prefiero un balance entre lógica visual y creatividad gráfica", value: "frontend" },
            { texto: "Me inclino mucho más hacia la empatía, psicología y diseño visual", valor: "ux" }
          ]
        },
        {
          titulo: "¿Qué herramienta o software te genera mayor curiosidad explorar?",
          tipo: "herramienta",
          opciones: [
            { texto: "Entornos de servidores, Java, bases de datos y control de versiones", valor: "backend" },
            { texto: "Frameworks web modernos, componentes interactivos y estilos", valor: "frontend" },
            { texto: "Figma, sistemas de diseño, wireframes y herramientas de prototipado", valor: "ux" }
          ]
        },
        {
          titulo: "¿Cómo preferís que sean las evaluaciones de los cursos?",
          tipo: "evaluacion",
          opciones: [
            { texto: "Construyendo la arquitectura de una aplicación funcional desde cero", valor: "backend" },
            { texto: "Desarrollando interfaces responsivas para múltiples dispositivos", valor: "frontend" },
            { texto: "Presentando casos de estudio y auditorías de experiencia de usuario", valor: "ux" }
          ]
        },
        {
          titulo: "¿Cuál es tu nivel de familiaridad actual con el idioma inglés técnico?",
          tipo: "ingles",
          opciones: [
            { texto: "Lectura avanzada (Puedo leer documentación técnica sin problemas)", valor: "backend" },
            { texto: "Nivel intermedio (Entiendo conceptos básicos y tutoriales)", valor: "frontend" },
            { texto: "Principiante (Prefiero contenidos 100% en español)", valor: "ux" }
          ]
        },
        {
          titulo: "¿Qué entorno de trabajo visual te resulta más cómodo para tu día a día?",
          tipo: "entorno",
          opciones: [
            { texto: "Consola de comandos negra, terminales y editores de código oscuros", valor: "backend" },
            { texto: "Editores interactivos con previsualización en tiempo real de código", valor: "frontend" },
            { texto: "Paneles de diseño colaborativo, tableros de ideas y paletas visuales", valor: "ux" }
          ]
        },
        {
          titulo: "¿Qué tan importante es para vos contar con acompañamiento directo de tutores?",
          tipo: "soporte",
          opciones: [
            { texto: "Fundamental: Necesito revisiones de código y feedback constante", valor: "backend" },
            { texto: "Moderado: Me gusta consultar dudas puntuales cuando me trabo", valor: "frontend" },
            { texto: "Independiente: Prefiero investigar a mi propio ritmo con guías claras", valor: "ux" }
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

          pregunta.opciones.forEach((op, idx) => {
            // Se marca solo si el usuario ya había seleccionado esta opción previamente
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
            <!-- Mensaje de error oculto por defecto -->
            <div id="error-alerta" class="text-danger small mt-2 d-none">
              <i class="bi bi-exclamation-circle-fill me-1"></i> Por favor, seleccioná una opción para continuar.
            </div>
          `;

          // Vincular eventos de cambio a los radios
          document.querySelectorAll(".radio-opcion").forEach(radio => {
            radio.addEventListener("change", (e) => {
              respuestasUsuario[indiceActual] = e.target.value;
              // Ocultar alerta de error si el usuario elige una opción
              const alerta = document.getElementById("error-alerta");
              if (alerta) alerta.classList.add("d-none");
            });
          });

          // Actualizar barras y textos de progreso
          const progresoNum = ((indiceActual + 1) / preguntas.length) * 100;
          textoProgreso.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
          badgePorcentaje.textContent = `${Math.round(progresoNum)}% completado`;
          barraProgreso.style.width = `${progresoNum}%`;

          btnAnterior.disabled = indiceActual === 0;
          btnAnterior.style.opacity = indiceActual === 0 ? "0.5" : "1";
          btnSiguiente.textContent = indiceActual === preguntas.length - 1 ? "Analizar con IA" : "Siguiente";
        }

        btnSiguiente.addEventListener("click", () => {
          // VALIDACIÓN: Si no hay respuesta seleccionada para esta pregunta, frenamos el avance
          if (!respuestasUsuario[indiceActual]) {
            const alerta = document.getElementById("error-alerta");
            if (alerta) alerta.classList.remove("d-none");
            return; // Detiene la ejecución para que no avance
          }

          if (indiceActual < preguntas.length - 1) {
            indiceActual++;
            renderizarPregunta();
          } else {
            // Fin del test: Mostrar loading simulado de la IA
            cajaCuestionario.classList.add("d-none");
            cajaLoading.classList.remove("d-none");

            setTimeout(() => {
              cajaLoading.classList.add("d-none");
              cajaResultado.classList.remove("d-none");

              // Calcular qué categoría acumuló más respuestas
              const conteo = { backend: 0, frontend: 0, ux: 0 };
              respuestasUsuario.forEach(r => {
                if (conteo[r] !== undefined) conteo[r]++;
              });

              let ganador = "backend";
              if (conteo.frontend >= conteo.backend && conteo.frontend >= conteo.ux) ganador = "frontend";
              if (conteo.ux > conteo.backend && conteo.ux > conteo.frontend) ganador = "ux";

              // Inyectar el resultado final personalizado
              if (ganador === "backend") {
                resultadoDetalle.innerHTML = `
                  <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 mb-2">Match 98% • Alta Salida Laboral</span>
                  <h4 class="h5 fw-bold text-white mb-1">Java Avanzado y Programación Orientada a Objetos</h4>
                  <p class="small texto-secundario-claro mb-3">Tus respuestas indican una gran afinidad por la lógica estructurada, servidores y bases de datos robustas.</p>
                  <div class="d-flex gap-3 text-muted small"><span class="text-white"><i class="bi bi-clock text-teal me-1"></i> 8 semanas</span> • <span class="text-white"><i class="bi bi-award text-teal me-1"></i> Certificado oficial</span></div>
                `;
              } else if (ganador === "frontend") {
                resultadoDetalle.innerHTML = `
                  <span class="badge bg-indigo bg-opacity-10 text-indigo border border-indigo border-opacity-25 mb-2" style="color: #818cf8;">Match 96% • Alta Demanda Web</span>
                  <h4 class="h5 fw-bold text-white mb-1">Diseño UI/UX con Figma y Sistemas de Diseño</h4>
                  <p class="small texto-secundario-claro mb-3">Tenés el balance perfecto entre interés visual y construcción técnica de experiencias digitales.</p>
                  <div class="d-flex gap-3 text-muted small"><span class="text-white"><i class="bi bi-clock text-teal me-1"></i> 6 semanas</span> • <span class="text-white"><i class="bi bi-award text-teal me-1"></i> Certificado oficial</span></div>
                `;
              } else {
                resultadoDetalle.innerHTML = `
                  <span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 mb-2">Match 94% • Perfil Especializado</span>
                  <h4 class="h5 fw-bold text-white mb-1">SQL y Modelado de Bases de Datos Relacionales</h4>
                  <p class="small texto-secundario-claro mb-3">Tus respuestas destacan una excelente aptitud para la gestión metódica de información y flujos estructurados.</p>
                  <div class="d-flex gap-3 text-muted small"><span class="text-white"><i class="bi bi-clock text-teal me-1"></i> 6 semanas</span> • <span class="text-white"><i class="bi bi-award text-teal me-1"></i> Certificado oficial</span></div>
                `;
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

        // Inicializar primera pregunta
        renderizarPregunta();
      });
 