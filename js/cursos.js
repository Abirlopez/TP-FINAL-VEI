document.addEventListener("DOMContentLoaded", () => {
  const listaCursos = document.getElementById("listaCursos");
  if (!listaCursos) return;

  const tarjetas = Array.from(listaCursos.querySelectorAll(".tarjeta-catalogo-curso"));
  const cantidadCursosSpan = document.getElementById("cantidadCursos");
  const filtroPrecio = document.getElementById("filtroPrecio");
  const valorPrecio = document.getElementById("valorPrecio");
  const ordenarSelect = document.getElementById("ordenarCursos");
  const btnLimpiar = document.querySelector("aside .btn-link");

  // Selectores de todos los grupos de filtros
  const checkboxesModalidad = document.querySelectorAll(".filtro-modalidad");
  const checkboxesHabilidad = document.querySelectorAll(".filtro-habilidad");
  const checkboxesEmpresa = document.querySelectorAll(".filtro-empresa");
  const checkboxesUbicacion = document.querySelectorAll(".filtro-ubicacion");
  const checkboxesIdioma = document.querySelectorAll(".filtro-idioma");

  function filtrarYOrdenarCursos() {
    // Obtener valores seleccionados en los checkboxes
    const modalidadesSeleccionadas = Array.from(checkboxesModalidad).filter(cb => cb.checked).map(cb => cb.value);
    const habilidadesSeleccionadas = Array.from(checkboxesHabilidad).filter(cb => cb.checked).map(cb => cb.value);
    const empresasSeleccionadas = Array.from(checkboxesEmpresa).filter(cb => cb.checked).map(cb => cb.value);
    const ubicacionesSeleccionadas = Array.from(checkboxesUbicacion).filter(cb => cb.checked).map(cb => cb.value);
    const idiomasSeleccionados = Array.from(checkboxesIdioma).filter(cb => cb.checked).map(cb => cb.value);
    
    // Precio máximo del slider
    const precioMaximo = filtroPrecio ? parseFloat(filtroPrecio.value) : 500;
    if (valorPrecio) {
      valorPrecio.textContent = `USD $${precioMaximo}`;
    }

    let visiblesCount = 0;

    // Filtrar tarjeta por tarjeta
    tarjetas.forEach(tarjeta => {
      const modalidad = tarjeta.getAttribute("data-modalidad") || "";
      const habilidad = tarjeta.getAttribute("data-habilidad") || "";
      const empresa = tarjeta.getAttribute("data-empresa") || "";
      const ubicacion = tarjeta.getAttribute("data-ubicacion") || "";
      const idioma = tarjeta.getAttribute("data-idioma") || "";
      
      // Limpieza de precio por seguridad (por si trae "$" o letras)
      const precioBruto = tarjeta.getAttribute("data-precio") || "0";
      const precioLimpio = precioBruto.replace(/[^0-9.]/g, "");
      const precio = parseFloat(precioLimpio) || 0;

      // Comprobaciones (si no hay nada seleccionado en un grupo, pasa el filtro por defecto)
      const cumpleModalidad = modalidadesSeleccionadas.length === 0 || modalidadesSeleccionadas.includes(modalidad);
      const cumpleHabilidad = habilidadesSeleccionadas.length === 0 || habilidadesSeleccionadas.includes(habilidad);
      const cumpleEmpresa = empresasSeleccionadas.length === 0 || empresasSeleccionadas.includes(empresa);
      const cumpleUbicacion = ubicacionesSeleccionadas.length === 0 || ubicacionesSeleccionadas.includes(ubicacion);
      const cumpleIdioma = idiomasSeleccionados.length === 0 || idiomasSeleccionados.includes(idioma);
      const cumplePrecio = precio <= precioMaximo;

      const contenedorColumna = tarjeta.closest(".col-12");

      if (cumpleModalidad && cumpleHabilidad && cumpleEmpresa && cumpleUbicacion && cumpleIdioma && cumplePrecio) {
        if (contenedorColumna) contenedorColumna.style.display = "";
        visiblesCount++;
      } else {
        if (contenedorColumna) contenedorColumna.style.display = "none";
      }
    });

    // Actualizar contador visual
    if (cantidadCursosSpan) {
      cantidadCursosSpan.textContent = visiblesCount;
    }

    // Ordenamiento de las tarjetas visibles
    if (ordenarSelect) {
      const criterio = ordenarSelect.value;
      const tarjetasVisibles = tarjetas.filter(t => t.closest(".col-12").style.display !== "none");

      tarjetasVisibles.sort((a, b) => {
        const tituloA = a.querySelector("h3").textContent.trim();
        const tituloB = b.querySelector("h3").textContent.trim();
        const ratingA = parseFloat(a.querySelector(".text-yellow").textContent.trim()) || 0;
        const ratingB = parseFloat(b.querySelector(".text-yellow").textContent.trim()) || 0;

        if (criterio === "az") {
          return tituloA.localeCompare(tituloB);
        } else if (criterio === "za") {
          return tituloB.localeCompare(tituloA);
        } else if (criterio === "rating") {
          return ratingB - ratingA;
        }
        return 0; // Relevancia / por defecto
      });

      // Reordenar físicamente en el DOM
      tarjetasVisibles.forEach(tarjeta => {
        listaCursos.appendChild(tarjeta.closest(".col-12"));
      });
    }
  }

  // ESCUCHA DE CLICS PARA GUARDAR EN LOCALSTORAGE AL VER DETALLES
  tarjetas.forEach(tarjeta => {
    const enlacesDetalle = tarjeta.querySelectorAll("a[href*='curso-detalle.html']");
    
    enlacesDetalle.forEach(enlace => {
      enlace.addEventListener("click", () => {
        const cursoSeleccionado = {
          titulo: tarjeta.querySelector("h3").textContent.trim(),
          precio: tarjeta.getAttribute("data-precio") || "0",
          modalidad: tarjeta.getAttribute("data-modalidad") || "",
          habilidad: tarjeta.getAttribute("data-habilidad") || "",
          empresa: tarjeta.getAttribute("data-empresa") || "",
          ubicacion: tarjeta.getAttribute("data-ubicacion") || "",
          idioma: tarjeta.getAttribute("data-idioma") || ""
        };

        // Guardamos los datos específicos de la tarjeta en localStorage
        localStorage.setItem("cursoDetalleActual", JSON.stringify(cursoSeleccionado));
      });
    });
  });

  // Escuchar cambios en los inputs y filtros
  const todosInputs = document.querySelectorAll(".form-check-input, #filtroPrecio, #ordenarCursos");
  todosInputs.forEach(input => {
    input.addEventListener("input", filtrarYOrdenarCursos);
    input.addEventListener("change", filtrarYOrdenarCursos);
  });

  // Funcionalidad del botón "Limpiar"
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", (e) => {
      e.preventDefault();
      todosInputs.forEach(input => {
        if (input.type === "checkbox") input.checked = false;
        if (input.type === "range") {
          input.value = input.max;
          if (valorPrecio) valorPrecio.textContent = `USD $${input.max}`;
        }
      });
      filtrarYOrdenarCursos();
    });
  }

  // Ejecutar al cargar la página
  filtrarYOrdenarCursos();
});