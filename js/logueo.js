document.addEventListener("DOMContentLoaded", () => {
  const tabLogin = document.getElementById("tab-login");
  const tabRegistro = document.getElementById("tab-registro");
  const grupoNombre = document.getElementById("grupo-nombre");
  const tituloModo = document.getElementById("titulo-modo");
  const subtituloModo = document.getElementById("subtitulo-modo");
  const btnSubmit = document.getElementById("btn-submit");
  const formAuth = document.getElementById("formAuth");
  
  const inputNombre = document.getElementById("authNombre");
  const inputEmail = document.getElementById("authEmail");
  const inputPassword = document.getElementById("authPassword");
  
  const btnTogglePassword = document.getElementById("togglePassword");
  const iconoOjo = document.getElementById("iconoOjo");

  let esModoRegistro = false;

  // Alternar entre pestañas
  tabLogin.addEventListener("click", () => {
    esModoRegistro = false;
    tabLogin.classList.add("active", "text-white");
    tabLogin.classList.remove("text-muted");
    tabRegistro.classList.remove("active", "text-white");
    tabRegistro.classList.add("text-muted");

    grupoNombre.classList.add("d-none");
    inputNombre.removeAttribute("required");

    tituloModo.textContent = "Iniciar Sesión";
    subtituloModo.textContent = "Accede a tu campus virtual de cursAR";
    btnSubmit.innerHTML = `Iniciar Sesión <i class="bi bi-arrow-right ms-1"></i>`;
  });

  tabRegistro.addEventListener("click", () => {
    esModoRegistro = true;
    tabRegistro.classList.add("active", "text-white");
    tabRegistro.classList.remove("text-muted");
    tabLogin.classList.remove("active", "text-white");
    tabLogin.classList.add("text-muted");

    grupoNombre.classList.remove("d-none");
    inputNombre.setAttribute("required", "true");

    tituloModo.textContent = "Crear Cuenta";
    subtituloModo.textContent = "Registrate gratis para empezar a aprender";
    btnSubmit.innerHTML = `Registrarse y Acceder <i class="bi bi-arrow-right ms-1"></i>`;
  });

  // Mostrar / Ocultar Contraseña
  if (btnTogglePassword && inputPassword && iconoOjo) {
    btnTogglePassword.addEventListener("click", () => {
      const esPassword = inputPassword.type === "password";
      inputPassword.type = esPassword ? "text" : "password";
      iconoOjo.className = esPassword ? "bi bi-eye-slash" : "bi bi-eye";
    });
  }

  // Redirección inteligente post-login
  function redirigirTrasLogin() {
    const destinoPendiente = sessionStorage.getItem("redirectAfterLogin");
    
    if (destinoPendiente) {
      sessionStorage.removeItem("redirectAfterLogin");
      window.location.href = destinoPendiente;
    } else {
      window.location.href = "perfil.html";
    }
  }

  // Manejar el envío del formulario
  formAuth.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value.trim();

    if (!email || !password) {
      alert("Por favor completá los campos obligatorios.");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    if (esModoRegistro) {
      const nombre = inputNombre.value.trim();
      if (!nombre) {
        alert("Por favor ingresá tu nombre y apellido.");
        return;
      }
      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      const usuarioExistente = usuarios.find(u => u.email === email);
      if (usuarioExistente) {
        alert("Este correo electrónico ya está registrado. Probá iniciar sesión.");
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = { nombre, email, password };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

      // Iniciar sesión
      localStorage.setItem("usuarioActivo", JSON.stringify({ nombre, email }));
      
      // Inicializar su listado de cursos vacío si no existe
      if (!localStorage.getItem(`misCursos_${email}`)) {
        localStorage.setItem(`misCursos_${email}`, JSON.stringify([]));
      }

      redirigirTrasLogin();

    } else {
      // Modo Iniciar Sesión
      const usuarioEncontrado = usuarios.find(u => u.email === email);

      if (!usuarioEncontrado) {
        alert("No encontramos ninguna cuenta con este correo. ¡Registrate primero!");
        return;
      }

      if (usuarioEncontrado.password !== password) {
        alert("Contraseña incorrecta. Por favor verificá tus datos.");
        return;
      }

      // Login exitoso
      localStorage.setItem("usuarioActivo", JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email
      }));

      // Garantizar que tenga su espacio de cursos creado
      if (!localStorage.getItem(`misCursos_${email}`)) {
        localStorage.setItem(`misCursos_${email}`, JSON.stringify([]));
      }

      redirigirTrasLogin();
    }
  });
});