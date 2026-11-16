document.addEventListener("DOMContentLoaded", () => {
  // Recuperar los datos de la inscripción guardados en localStorage
  const datosCompraJSON = localStorage.getItem("ultimaInscripcion");
  
  if (datosCompraJSON) {
    const compra = JSON.parse(datosCompraJSON);

    // Inyectar datos en el DOM de la confirmación
    const elNombre = document.getElementById("nombre-confirmacion");
    const elCurso = document.getElementById("curso-nombre");
    const elComision = document.getElementById("curso-comision");
    const elMetodo = document.getElementById("metodo-pago");
    const elOperacion = document.getElementById("operacion-num");
    const pildoraEstado = document.getElementById("pildora-estado");

    if (elNombre) elNombre.textContent = compra.nombre || "Estudiante";
    if (elCurso) elCurso.textContent = compra.curso || "Curso de Programación";
    if (elComision) elComision.textContent = compra.comision || "Asincrónico";
    if (elMetodo) elMetodo.textContent = compra.metodoPago || "Tarjeta de Crédito";
    
    // Generar un número de operación aleatorio único basado en milisegundos si no existe
    if (elOperacion) {
      const numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
      elOperacion.textContent = `#OP-${numeroAleatorio}-AR`;
    }

    // Personalizar píldora si fue gratuito / becado
    if (compra.metodoPago && compra.metodoPago.toLowerCase().includes("becado")) {
      if (pildoraEstado) pildoraEstado.textContent = "Beca 100% Aplicada";
    }
  }
});