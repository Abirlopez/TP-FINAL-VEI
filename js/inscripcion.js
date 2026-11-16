document.addEventListener("DOMContentLoaded", () => {
  const paso1 = document.getElementById("paso-1");
  const paso2 = document.getElementById("paso-2");
  const paso3 = document.getElementById("paso-3");

  const stepper1Circle = document.querySelector("#stepper-1 div");
  const stepper2Circle = document.querySelector("#stepper-2 div");
  const stepper2Text = document.querySelector("#stepper-2 span");
  const stepper3Circle = document.querySelector("#stepper-3 div");
  const stepper3Text = document.querySelector("#stepper-3 span");

  const linea1 = document.getElementById("linea-1");
  const linea2 = document.getElementById("linea-2");

  // Función auxiliar para actualizar colores del Stepper superior
  function actualizarStepper(pasoActivo) {
    if (pasoActivo >= 2) {
      linea1.style.width = "100%";
      stepper2Circle.style.backgroundColor = "#7ee7d8";
      stepper2Circle.style.color = "#0b0d17";
      stepper2Circle.classList.remove("bg-dark", "text-muted", "border", "border-secondary");
      stepper2Text.classList.replace("text-muted", "text-white");
    } else {
      linea1.style.width = "0%";
      stepper2Circle.style.backgroundColor = "";
      stepper2Circle.style.color = "";
      stepper2Circle.classList.add("bg-dark", "text-muted", "border", "border-secondary");
      stepper2Text.classList.replace("text-white", "text-muted");
    }

    if (pasoActivo === 3) {
      linea2.style.width = "100%";
      stepper3Circle.style.backgroundColor = "#7ee7d8";
      stepper3Circle.style.color = "#0b0d17";
      stepper3Circle.classList.remove("bg-dark", "text-muted", "border", "border-secondary");
      stepper3Text.classList.replace("text-muted", "text-white");
    } else {
      linea2.style.width = "0%";
      stepper3Circle.style.backgroundColor = "";
      stepper3Circle.style.color = "";
      stepper3Circle.classList.add("bg-dark", "text-muted", "border", "border-secondary");
      stepper3Text.classList.replace("text-white", "text-muted");
    }
  }

  // Función centralizada para manejar la simulación de éxito y guardado
  function ejecutarRedireccionExito() {
    sessionStorage.setItem("alumnoInscripto", document.getElementById("nombreAlumno").value);

    // Ocultar formularios y mostrar el spinner de procesamiento
    paso3.classList.add("d-none");
    const formCheckout = document.getElementById("formCheckout");
    if (formCheckout) formCheckout.classList.add("d-none");
    
    document.getElementById("procesando-pago").classList.remove("d-none");

    setTimeout(() => {
      window.location.href = "./pagoExitoso.html";
    }, 2200);
  }

  // Paso 1 -> Paso 2
  document.getElementById("btn-to-step-2").addEventListener("click", () => {
    const nombre = document.getElementById("nombreAlumno").value.trim();
    const email = document.getElementById("emailAlumno").value.trim();
    const dni = document.getElementById("dniAlumno").value.trim();

    if (!nombre || !email || !dni) {
      alert("Por favor completá todos tus datos personales antes de continuar.");
      return;
    }

    paso1.classList.add("d-none");
    paso2.classList.remove("d-none");
    actualizarStepper(2);
  });

  // Paso 2 -> Paso 1
  document.getElementById("btn-back-to-1").addEventListener("click", () => {
    paso2.classList.add("d-none");
    paso1.classList.remove("d-none");
    actualizarStepper(1);
  });

  // Paso 2 -> Paso 3
  document.getElementById("btn-to-step-3").addEventListener("click", () => {
    const metodo = document.querySelector('input[name="metodoPago"]:checked').value;
    const numTarjeta = document.getElementById("numTarjeta")?.value.trim();

    if (metodo.includes("Tarjeta") && (!numTarjeta || numTarjeta.length < 10)) {
      alert("Por favor ingresá un número de tarjeta válido.");
      return;
    }

    // Volcar datos en la pantalla de resumen
    document.getElementById("resumen-nombre").textContent = document.getElementById("nombreAlumno").value;
    document.getElementById("resumen-email").textContent = document.getElementById("emailAlumno").value;
    document.getElementById("resumen-comision").textContent = document.getElementById("modalidadCursada").value;
    document.getElementById("resumen-pago").textContent = metodo;

    // Renderizar botón de pago dinámico según el medio elegido
    const contenedorBoton = document.getElementById("contenedor-boton-pago");

    if (metodo.includes("Mercado Pago")) {
      contenedorBoton.innerHTML = `
        <div class="p-4 rounded-4 text-center mb-3" style="background: linear-gradient(135deg, rgba(0, 158, 227, 0.15) 0%, rgba(11, 13, 23, 1) 100%); border: 1px solid rgba(0, 158, 227, 0.4);">
          <div class="mb-3">
            <i class="bi bi-qr-code text-info display-4"></i>
          </div>
          <h5 class="text-white fw-bold mb-1">Aboná con Mercado Pago</h5>
          <p class="small text-muted mb-3">Escaneá el código QR desde tu celular o ingresá a tu cuenta para aprobar el pago de <strong class="text-white">$24.900 ARS</strong>.</p>
          <button type="button" id="btnSimularMP" class="btn w-100 py-3 rounded-3 fw-bold text-white shadow" style="background-color: #009ee3;">
            <i class="bi bi-phone-fill me-2"></i> Simular Aprobación en App de Mercado Pago
          </button>
        </div>
      `;

      // Evento específico para simular el pago con la app de MP
      document.getElementById("btnSimularMP").addEventListener("click", () => {
        ejecutarRedireccionExito();
      });

    } else {
      contenedorBoton.innerHTML = `
        <button type="submit" class="btn btn-success-tech w-100 py-3 rounded-3 text-dark fw-bold shadow">
          <i class="bi bi-lock-fill me-1"></i> Pagar $24.900 ARS con Tarjeta
        </button>
      `;
    }

    paso2.classList.add("d-none");
    paso3.classList.remove("d-none");
    actualizarStepper(3);
  });

  // Paso 3 -> Paso 2
  document.getElementById("btn-back-to-2").addEventListener("click", () => {
    paso3.classList.add("d-none");
    paso2.classList.remove("d-none");
    actualizarStepper(2);
  });

  // Envío Final del formulario (para la opción de Tarjeta)
  const formCheckout = document.getElementById("formCheckout");
  if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();
      ejecutarRedireccionExito();
    });
  }

  // LÓGICA PARA CAMBIAR ENTRE TARJETA Y MERCADO PAGO EN EL PASO 2
  const radiosPago = document.querySelectorAll('input[name="metodoPago"]');
  const cajaTarjeta = document.getElementById("datos-tarjeta-box");

  radiosPago.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const metodoElegido = e.target.value;

      if (metodoElegido.includes("Mercado Pago")) {
        cajaTarjeta.innerHTML = `
          <div class="text-center py-3">
            <i class="bi bi-qr-code-scan display-5 text-primary mb-2"></i>
            <h6 class="text-white fw-bold">Pago rápido con Mercado Pago</h6>
            <p class="small text-muted mb-3">Al hacer clic en "Revisar Pedido" se generará el código QR o link de pago seguro.</p>
            <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2">Redirección en entorno seguro</span>
          </div>
        `;
      } else {
        cajaTarjeta.innerHTML = `
          <div class="mb-3">
            <label for="numTarjeta" class="form-label small texto-secundario-claro fw-semibold">Número de Tarjeta</label>
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-muted"><i class="bi bi-credit-card"></i></span>
              <input type="text" class="form-control bg-dark text-white border-secondary py-2" id="numTarjeta" placeholder="4509 •••• •••• 8842" maxlength="19" required />
            </div>
          </div>
          <div class="mb-3">
            <label for="titularTarjeta" class="form-label small texto-secundario-claro fw-semibold">Nombre del Titular (como figura en el plástico)</label>
            <input type="text" class="form-control bg-dark text-white border-secondary rounded-3 py-2 text-uppercase" id="titularTarjeta" placeholder="ALAN L IBANEZ" required />
          </div>
          <div class="row">
            <div class="col-6">
              <label for="vencimientoTarjeta" class="form-label small texto-secundario-claro fw-semibold">Vencimiento</label>
              <input type="text" class="form-control bg-dark text-white border-secondary rounded-3 py-2" id="vencimientoTarjeta" placeholder="MM/AA" maxlength="5" required />
            </div>
            <div class="col-6">
              <label for="cvvTarjeta" class="form-label small texto-secundario-claro fw-semibold">Código (CVV)</label>
              <input type="password" class="form-control bg-dark text-white border-secondary rounded-3 py-2" id="cvvTarjeta" placeholder="•••" maxlength="4" required />
            </div>
          </div>
        `;
      }
    });
  });
});