document.addEventListener("DOMContentLoaded", () => {
  // 1. Recuperar el curso seleccionado y sus detalles del almacenamiento local
  let nombreCursoCrudo = sessionStorage.getItem("cursoSeleccionado") || "Desarrollo Web Full Stack";
  const cursoDetalleJSON = localStorage.getItem("cursoDetalleActual");
  const cursoData = cursoDetalleJSON ? JSON.parse(cursoDetalleJSON) : null;

  // Normalizar el título a uno de los 6 nombres oficiales exactos de la plataforma
  let nombreCurso = "Desarrollo Web Full Stack";
  const tituloLower = (cursoData?.titulo || nombreCursoCrudo).toLowerCase();

  if (tituloLower.includes("full stack") || tituloLower.includes("desarrollo web")) {
    nombreCurso = "Desarrollo Web Full Stack";
  } else if (tituloLower.includes("mysql") || tituloLower.includes("bases de datos")) {
    nombreCurso = "Bases de Datos en MySQL";
  } else if (tituloLower.includes("ciberseguridad")) {
    nombreCurso = "Especialista en Ciberseguridad";
  } else if (tituloLower.includes("ia") || tituloLower.includes("inteligencia artificial")) {
    nombreCurso = "IA en Programación";
  } else if (tituloLower.includes("power bi")) {
    nombreCurso = "Curso de Power BI";
  } else if (tituloLower.includes("hacking") || tituloLower.includes("etico")) {
    nombreCurso = "Hacking Ético";
  }

  // Guardamos el nombre oficial normalizado
  sessionStorage.setItem("cursoSeleccionado", nombreCurso);

  // Determinar si es gratuito basándonos en el precio guardado
  const precioCurso = cursoData ? String(cursoData.precio).trim().toLowerCase() : "0";
  const esGratis = precioCurso === "0" || precioCurso === "gratuito" || precioCurso === "gratis" || precioCurso === "";

  // Referencias a elementos del DOM
  const paso1 = document.getElementById("paso-1");
  const paso2 = document.getElementById("paso-2");
  const pasofinal = document.getElementById("paso-final");

  const stepperPago = document.getElementById("stepper-pago");
  const lineaPagoWrapper = document.getElementById("linea-pago-wrapper");
  const numPasoFinal = document.getElementById("num-paso-final");
  const txtPasoFinal = document.getElementById("txt-paso-final");
  const tituloPasoFinal = document.getElementById("titulo-paso-final");
  const filaResumenPago = document.getElementById("fila-resumen-pago");

  // Referencias de los círculos del stepper superior
  const circulo1 = document.querySelector("#stepper-1 div");
  const texto1 = document.querySelector("#stepper-1 span");
  const linea1 = document.getElementById("linea-1");

  const circuloPago = document.querySelector("#stepper-pago div");
  const textoPago = document.querySelector("#stepper-pago span");
  const linea2 = document.getElementById("linea-2");

  const circuloFinal = document.getElementById("num-paso-final");
  const textoFinal = document.getElementById("txt-paso-final");

  // CONFIGURACIÓN VISUAL INICIAL SEGÚN SI ES GRATIS O PAGO
  if (esGratis) {
    if (stepperPago) stepperPago.style.display = "none";
    if (lineaPagoWrapper) lineaPagoWrapper.style.display = "none";
    if (numPasoFinal) numPasoFinal.textContent = "2";
    if (txtPasoFinal) txtPasoFinal.textContent = "Confirmación";
    if (tituloPasoFinal) tituloPasoFinal.textContent = "Paso 2: Resumen y Confirmación";
    if (filaResumenPago) filaResumenPago.style.display = "none";
  } else {
    if (stepperPago) stepperPago.style.display = "block";
    if (lineaPagoWrapper) lineaPagoWrapper.style.display = "block";
    if (numPasoFinal) numPasoFinal.textContent = "3";
    if (txtPasoFinal) txtPasoFinal.textContent = "Confirmación";
    if (tituloPasoFinal) tituloPasoFinal.textContent = "Paso 3: Resumen y Pago";
    if (filaResumenPago) filaResumenPago.style.display = "flex";
  }

  let datosEstudiante = {};

  // Función robusta para actualizar los colores y estado del Stepper superior
  function actualizarStepper(pasoActivo) {
    const colorActivoBg = "#7ee7d8";
    const colorActivoText = "#0b0d17";

    const styleInactivoCirculo = () => {
      return 'width: 40px; height: 40px; background-color: transparent; color: #6c757d;';
    };

    if (pasoActivo === 1) {
      if (circulo1) {
        circulo1.style.cssText = `width: 40px; height: 40px; background-color: ${colorActivoBg}; color: ${colorActivoText};`;
        circulo1.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 shadow-sm";
      }
      if (texto1) texto1.className = "d-block small text-white fw-semibold";
      if (linea1) linea1.style.width = "0%";

      if (circuloPago) {
        circuloPago.style.cssText = styleInactivoCirculo();
        circuloPago.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary text-muted";
      }
      if (textoPago) textoPago.className = "d-block small text-muted fw-semibold";
      if (linea2) linea2.style.width = "0%";

      if (circuloFinal) {
        circuloFinal.style.cssText = styleInactivoCirculo();
        circuloFinal.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary text-muted";
      }
      if (textoFinal) textoFinal.className = "d-block small text-muted fw-semibold";

    } else if (pasoActivo === 2 && !esGratis) {
      if (circulo1) {
        circulo1.style.cssText = 'width: 40px; height: 40px; background-color: transparent; color: #7ee7d8;';
        circulo1.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary";
      }
      if (texto1) texto1.className = "d-block small text-muted fw-semibold";
      if (linea1) linea1.style.width = "100%";

      if (circuloPago) {
        circuloPago.style.cssText = `width: 40px; height: 40px; background-color: ${colorActivoBg}; color: ${colorActivoText};`;
        circuloPago.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 shadow-sm";
      }
      if (textoPago) textoPago.className = "d-block small text-white fw-semibold";
      if (linea2) linea2.style.width = "0%";

      if (circuloFinal) {
        circuloFinal.style.cssText = styleInactivoCirculo();
        circuloFinal.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary text-muted";
      }
      if (textoFinal) textoFinal.className = "d-block small text-muted fw-semibold";

    } else {
      if (circulo1) {
        circulo1.style.cssText = 'width: 40px; height: 40px; background-color: transparent; color: #7ee7d8;';
        circulo1.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary";
      }
      if (texto1) texto1.className = "d-block small text-muted fw-semibold";
      if (linea1) linea1.style.width = "100%";

      if (!esGratis && circuloPago) {
        circuloPago.style.cssText = 'width: 40px; height: 40px; background-color: transparent; color: #7ee7d8;';
        circuloPago.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 border border-secondary";
        if (textoPago) textoPago.className = "d-block small text-muted fw-semibold";
        if (linea2) linea2.style.width = "100%";
      }

      if (circuloFinal) {
        circuloFinal.style.cssText = `width: 40px; height: 40px; background-color: ${colorActivoBg}; color: ${colorActivoText};`;
        circuloFinal.className = "rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1 shadow-sm";
      }
      if (textoFinal) textoFinal.className = "d-block small text-white fw-semibold";
    }
  }

  // --- LÓGICA DE TARJETA VS MERCADO PAGO ---
  const radiosPago = document.querySelectorAll("input[name='metodoPago']");
  const datosTarjetaBox = document.getElementById("datos-tarjeta-box");

  radiosPago.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (datosTarjetaBox) {
        datosTarjetaBox.style.display = e.target.value.includes("Mercado Pago") ? "none" : "block";
      }
    });
  });

  // Botón del Paso 1 ("Continuar")
  const btnToNext = document.getElementById("btn-to-next");
  if (btnToNext) {
    btnToNext.addEventListener("click", () => {
      const nombre = document.getElementById("nombreAlumno").value.trim();
      const email = document.getElementById("emailAlumno").value.trim();
      const dni = document.getElementById("dniAlumno").value.trim();
      const comision = document.getElementById("modalidadCursada").value;

      if (!nombre || !email || !dni) {
        alert("Por favor completá todos los campos obligatorios.");
        return;
      }

      datosEstudiante = { nombre, email, dni, comision, curso: nombreCurso };

      paso1.classList.add("d-none");

      if (esGratis) {
        llenarResumen();
        pasofinal.classList.remove("d-none");
        actualizarStepper(2);
      } else {
        paso2.classList.remove("d-none");
        actualizarStepper(2);
      }
    });
  }

  // Botones de retroceso (Volver)
  const btnBack = document.getElementById("btn-back");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      paso2.classList.add("d-none");
      paso1.classList.remove("d-none");
      actualizarStepper(1);
    });
  }

  const btnBackToPrev = document.getElementById("btn-back-to-prev");
  if (btnBackToPrev) {
    btnBackToPrev.addEventListener("click", () => {
      pasofinal.classList.add("d-none");
      if (esGratis) {
        paso1.classList.remove("d-none");
        actualizarStepper(1);
      } else {
        paso2.classList.remove("d-none");
        actualizarStepper(2);
      }
    });
  }

  // Botón desde Paso 2 (Pago) hacia Paso Final (Revisión)
  const btnToFinal = document.getElementById("btn-to-final");
  if (btnToFinal) {
    btnToFinal.addEventListener("click", () => {
      const metodoSeleccionado = document.querySelector("input[name='metodoPago']:checked")?.value || "";

      if (metodoSeleccionado.includes("Tarjeta")) {
        const numTarjeta = document.getElementById("numTarjeta").value.trim();
        const titular = document.getElementById("titularTarjeta").value.trim();
        
        if (!numTarjeta || !titular) {
          alert("Por favor completá los datos de tu tarjeta.");
          return;
        }
      }

      llenarResumen();
      paso2.classList.add("d-none");
      pasofinal.classList.remove("d-none");
      actualizarStepper(3);
    });
  }

  // Función para llenar los datos en el resumen antes de confirmar
  function llenarResumen() {
    document.getElementById("resumen-curso").textContent = datosEstudiante.curso;
    document.getElementById("resumen-nombre").textContent = datosEstudiante.nombre;
    document.getElementById("resumen-email").textContent = datosEstudiante.email;
    document.getElementById("resumen-comision").textContent = datosEstudiante.comision;

    const contenedorBoton = document.getElementById("contenedor-boton-pago");

    if (esGratis) {
      contenedorBoton.innerHTML = `
        <button type="button" id="btnConfirmarInscripcion" class="btn btn-success-tech fw-bold w-100 py-3 rounded-3 text-dark fs-6">
          ¡Confirmar e Inscribirme Gratis!
        </button>
      `;
    } else {
      const metodoSeleccionado = document.querySelector("input[name='metodoPago']:checked")?.value || "Tarjeta";
      document.getElementById("resumen-pago").textContent = metodoSeleccionado;

      if (metodoSeleccionado.includes("Mercado Pago")) {
        contenedorBoton.innerHTML = `
          <button type="button" id="btnConfirmarInscripcion" class="btn btn-primary fw-bold w-100 py-3 rounded-3 text-white fs-6" style="background-color: #009ee3; border: none;">
            Pagar con Mercado Pago e Inscribirme
          </button>
        `;
      } else {
        contenedorBoton.innerHTML = `
          <button type="button" id="btnConfirmarInscripcion" class="btn btn-success-tech fw-bold w-100 py-3 rounded-3 text-dark fs-6">
            Pagar con Tarjeta e Inscribirme
          </button>
        `;
      }
    }

    const btnConfirmarInscripcion = document.getElementById("btnConfirmarInscripcion");
    if (btnConfirmarInscripcion) {
      btnConfirmarInscripcion.addEventListener("click", procesarInscripcionFinal);
    }
  }

  // Procesamiento final: guarda en localStorage (aislado por email) y redirige a la página de éxito
  function procesarInscripcionFinal() {
    pasofinal.classList.add("d-none");
    const spinner = document.getElementById("procesando-pago");
    const textoSpinner = document.getElementById("texto-spinner");

    const metodoSeleccionado = document.querySelector("input[name='metodoPago']:checked")?.value || "Gratuito";

    if (esGratis) {
      textoSpinner.textContent = "Generando tu acceso gratuito...";
    } else if (metodoSeleccionado.includes("Mercado Pago")) {
      textoSpinner.textContent = "Conectando con la pasarela de Mercado Pago...";
    } else {
      textoSpinner.textContent = "Validando transacción con el banco...";
    }

    spinner.classList.remove("d-none");

    // Guardamos los detalles definitivos de la compra en localStorage global para sincronizar con perfil
    const detalleCompra = {
      curso: datosEstudiante.curso,
      nombre: datosEstudiante.nombre,
      email: datosEstudiante.email,
      dni: datosEstudiante.dni,
      comision: datosEstudiante.comision,
      metodoPago: esGratis ? "100% Becado / Gratuito" : metodoSeleccionado,
      fecha: new Date().toLocaleDateString()
    };
    localStorage.setItem("ultimaInscripcion", JSON.stringify(detalleCompra));

    // Redirección directa a la página de pago exitoso tras el spinner
    setTimeout(() => {
      window.location.href = "./pagoExitoso.html";
    }, 2000);
  }
});