document.addEventListener("DOMContentLoaded", () => {
  const usuarioJSON = localStorage.getItem("usuarioActivo");
  if (!usuarioJSON) {
    window.location.href = "logueo.html";
    return;
  }

  let usuarioActivo = JSON.parse(usuarioJSON);
  let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

  // Buscar el registro completo del usuario en usuariosRegistrados para tener todos sus campos
  let indiceUsuario = usuariosRegistrados.findIndex(u => u.email === usuarioActivo.email);
  let datosCompletos = indiceUsuario !== -1 ? usuariosRegistrados[indiceUsuario] : { ...usuarioActivo };

  // ==========================================
  // 1. RENDERIZAR DATOS EN BANNER Y FORMULARIO
  // ==========================================
  function actualizarVistaUsuario(datos) {
    const elNombre = document.getElementById("perfil-nombre");
    const elEmail = document.getElementById("perfil-email");
    const elIniciales = document.getElementById("perfil-iniciales");
    const bannerAvatarImg = document.getElementById("banner-avatar-img");
    const previewFotoPerfil = document.getElementById("preview-foto-perfil");

    if (elNombre) elNombre.textContent = datos.nombre;
    if (elEmail) elEmail.textContent = datos.email;

    // Iniciales
    if (elIniciales && datos.nombre) {
      const partes = datos.nombre.trim().split(" ");
      let iniciales = partes[0][0];
      if (partes.length > 1) {
        iniciales += partes[partes.length - 1][0];
      }
      elIniciales.textContent = iniciales.toUpperCase();
    }

    // Foto de perfil (si tiene guardada en Base64)
    if (datos.fotoPerfil) {
      if (bannerAvatarImg) {
        bannerAvatarImg.src = datos.fotoPerfil;
        bannerAvatarImg.classList.remove("d-none");
      }
      if (elIniciales) elIniciales.classList.add("d-none");
      if (previewFotoPerfil) previewFotoPerfil.src = datos.fotoPerfil;
    }

    // Llenar inputs del formulario de edición
    const inputNombre = document.getElementById("edit-nombre");
    const inputGenero = document.getElementById("edit-genero");
    const inputNacimiento = document.getElementById("edit-nacimiento");
    const inputEmail = document.getElementById("edit-email");

    if (inputNombre) inputNombre.value = datos.nombre || "";
    if (inputGenero) inputGenero.value = datos.genero || "";
    if (inputNacimiento) inputNacimiento.value = datos.fechaNacimiento || "";
    if (inputEmail) inputEmail.value = datos.email || "";
  }

  actualizarVistaUsuario(datosCompletos);

  // ==========================================
  // 2. CURSOS ADQUIRIDOS (Aislados por email)
  // ==========================================
  const storageKeyCursos = `misCursos_${datosCompletos.email}`;
  const contenedorCursos = document.getElementById("contenedor-mis-cursos");
  let misCursos = JSON.parse(localStorage.getItem(storageKeyCursos)) || [];

  const ultimaInscripcionJSON = localStorage.getItem("ultimaInscripcion");
  if (ultimaInscripcionJSON) {
    const ultimaInscripcion = JSON.parse(ultimaInscripcionJSON);
    const yaExiste = misCursos.some(c => c.curso === ultimaInscripcion.curso);
    if (!yaExiste) {
      misCursos.push(ultimaInscripcion);
      localStorage.setItem(storageKeyCursos, JSON.stringify(misCursos));
    }
    localStorage.removeItem("ultimaInscripcion");
  }

  const statCursos = document.getElementById("stat-cursos-count");
  if (statCursos) statCursos.textContent = misCursos.length;

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
    const enlacesEmpresas = {
      "Desarrollo Web Full Stack": "https://platzi.com/",
      "Bases de Datos en MySQL": "https://www.datacamp.com/",
      "Especialista en Ciberseguridad": "https://www.coderhouse.com/",
      "IA en Programación": "https://platzi.com/",
      "Curso de Power BI": "https://www.datacamp.com/",
      "Hacking Ético": "https://www.coderhouse.com/"
    };

    contenedorCursos.innerHTML = misCursos.map(c => {
      const tituloCurso = c.curso || "Curso cursAR";
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

  // ==========================================
  // 3. CAMBIAR IMAGEN DE PERFIL
  // ==========================================
  const btnCambiarImg = document.getElementById("btn-cambiar-img");
  const inputFotoPerfil = document.getElementById("input-foto-perfil");
  const previewFotoPerfil = document.getElementById("preview-foto-perfil");
  let nuevaFotoBase64 = datosCompletos.fotoPerfil || null;

  if (btnCambiarImg && inputFotoPerfil) {
    btnCambiarImg.addEventListener("click", () => inputFotoPerfil.click());

    inputFotoPerfil.addEventListener("change", (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;

      if (archivo.size > 2 * 1024 * 1024) {
        alert("La imagen supera los 2MB permitidos. Elegí una más liviana.");
        return;
      }

      const lector = new FileReader();
      lector.onload = (evento) => {
        nuevaFotoBase64 = evento.target.result;
        if (previewFotoPerfil) previewFotoPerfil.src = nuevaFotoBase64;
      };
      lector.readAsDataURL(archivo);
    });
  }

  // ==========================================
  // 4. GUARDAR DATOS PERSONALES (Nombre, Género, Nacimiento, Mail)
  // ==========================================
  const formDatosPersonales = document.getElementById("formDatosPersonales");
  if (formDatosPersonales) {
    formDatosPersonales.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoNombre = document.getElementById("edit-nombre").value.trim();
      const nuevoGenero = document.getElementById("edit-genero").value;
      const nuevaFechaNac = document.getElementById("edit-nacimiento").value;
      const nuevoEmail = document.getElementById("edit-email").value.trim().toLowerCase();

      if (!nuevoNombre || !nuevoEmail) {
        alert("El nombre y el correo electrónico son obligatorios.");
        return;
      }

      const emailAnterior = datosCompletos.email;

      if (nuevoEmail !== emailAnterior) {
        const emailEnUso = usuariosRegistrados.some((u, idx) => u.email === nuevoEmail && idx !== indiceUsuario);
        if (emailEnUso) {
          alert("Ese correo electrónico ya está registrado por otra cuenta.");
          return;
        }

        const cursosViejos = localStorage.getItem(`misCursos_${emailAnterior}`);
        if (cursosViejos) {
          localStorage.setItem(`misCursos_${nuevoEmail}`, cursosViejos);
          localStorage.removeItem(`misCursos_${emailAnterior}`);
        }
      }

      datosCompletos = {
        ...datosCompletos,
        nombre: nuevoNombre,
        genero: nuevoGenero,
        fechaNacimiento: nuevaFechaNac,
        email: nuevoEmail,
        fotoPerfil: nuevaFotoBase64
      };

      if (indiceUsuario !== -1) {
        usuariosRegistrados[indiceUsuario] = datosCompletos;
      } else {
        usuariosRegistrados.push(datosCompletos);
        indiceUsuario = usuariosRegistrados.length - 1;
      }
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

      usuarioActivo = {
        nombre: datosCompletos.nombre,
        email: datosCompletos.email,
        fotoPerfil: datosCompletos.fotoPerfil
      };
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

      actualizarVistaUsuario(datosCompletos);

      const msgGuardado = document.getElementById("msg-datos-guardados");
      if (msgGuardado) {
        msgGuardado.classList.remove("d-none");
        setTimeout(() => msgGuardado.classList.add("d-none"), 3000);
      }
    });
  }

  // ==========================================
  // 5. SEGURIDAD: CAMBIO DE CONTRASEÑA (LIBRE)
  // ==========================================
  const inputNuevaPass = document.getElementById("nueva-password");
  const inputRepetirPass = document.getElementById("repetir-password");
  const formSeguridad = document.getElementById("formSeguridad");

  function configurarOjo(btnId, inputEl) {
    const btn = document.getElementById(btnId);
    if (btn && inputEl) {
      btn.addEventListener("click", () => {
        const esPass = inputEl.type === "password";
        inputEl.type = esPass ? "text" : "password";
        btn.innerHTML = esPass ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
      });
    }
  }
  configurarOjo("toggleNuevaPass", inputNuevaPass);
  configurarOjo("toggleRepetirPass", inputRepetirPass);

  if (formSeguridad) {
    formSeguridad.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass1 = inputNuevaPass.value.trim();
      const pass2 = inputRepetirPass.value.trim();
      const alertaError = document.getElementById("error-password");
      const alertaExito = document.getElementById("exito-password");

      alertaError.classList.add("d-none");
      alertaExito.classList.add("d-none");

      if (!pass1) {
        alertaError.textContent = "Por favor ingresá una nueva contraseña.";
        alertaError.classList.remove("d-none");
        return;
      }

      if (pass1 !== pass2) {
        alertaError.textContent = "Las contraseñas no coinciden. Verificá ambos campos.";
        alertaError.classList.remove("d-none");
        return;
      }

      datosCompletos.password = pass1;
      if (indiceUsuario !== -1) {
        usuariosRegistrados[indiceUsuario] = datosCompletos;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
      }

      formSeguridad.reset();
      alertaExito.textContent = "¡Tu contraseña se actualizó con éxito!";
      alertaExito.classList.remove("d-none");
      setTimeout(() => alertaExito.classList.add("d-none"), 4000);
    });
  }

  // ==========================================
  // 6. CERRAR SESIÓN
  // ==========================================
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "logueo.html";
    });
  }
});