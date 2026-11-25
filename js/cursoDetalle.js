document.addEventListener("DOMContentLoaded", () => {

  // 1. OBTENCIÓN DE DATOS DEL CURSO (URL Y LOCALSTORAGE)
 
  const params = new URLSearchParams(window.location.search);
  const cursoId = params.get("id") || "fullstack";

  const cursoGuardadoJSON = localStorage.getItem("cursoDetalleActual");
  const cursoGuardado = cursoGuardadoJSON ? JSON.parse(cursoGuardadoJSON) : null;

  const baseDeDatosCursos = {
    fullstack: {
      categoria: "Desarrollo Web Full Stack",
      nivel: "Nivel inicial",
      rating: "4.9",
      reseñas: "512",
      titulo: "Desarrollo Web Full Stack desde Cero",
      descripcionLarga:
        "Aprende el desarrollo web integral paso a paso. Comienza desde los fundamentos de la programación y el diseño web básico hasta la creación de aplicaciones funcionales con bases de datos y JavaScript moderno.",
      duracionHoras: "20 horas",
      instructorNombre: "Carla Méndez",
      instructorCargo: "Lead Full Stack Engineer",
      instructorIniciales: "CM",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $120",
      clasesCount: "12 clases en video Full HD",
      proyectosCount: "1 proyecto práctico web",
      imagen: "./img/full stack.jpg",
      temarioResumen: "4 secciones · 12 clases · 20h total",
      temario: [
        {
          id: "sec_fs_1",
          tituloBadge: "Sección 1 · Introducción",
          tituloSeccion: "Fundamentos de la Web y HTML/CSS",
          descripcion: "Conceptos iniciales de cómo funciona internet y diseño visual básico.",
          clases: [
            { titulo: "Cómo funciona la web: Cliente, Servidor y Navegadores", duracion: "1h 30m" },
            { titulo: "Estructura básica de una página con HTML5", duracion: "1h 45m" },
            { titulo: "Estilos y diseño visual inicial con CSS3", duracion: "1h 50m" }
          ]
        },
        {
          id: "sec_fs_2",
          tituloBadge: "Sección 2 · Programación",
          tituloSeccion: "Lógica de Programación con JavaScript",
          descripcion: "Primeros pasos escribiendo código funcional y interactivo.",
          clases: [
            { titulo: "¿Qué es JavaScript y cómo ejecutarlo?", duracion: "1h 40m" },
            { titulo: "Variables, tipos de datos y operadores básicos", duracion: "2h 00m" },
            { titulo: "Estructuras de control: Condicionales y Ciclos", duracion: "1h 30m" }
          ]
        },
        {
          id: "sec_fs_3",
          tituloBadge: "Sección 3 · Interactividad",
          tituloSeccion: "Manipulación del DOM y Formularios",
          descripcion: "Conectando JavaScript con el diseño visual HTML.",
          clases: [
            { titulo: "Selección de elementos y eventos en el DOM", duracion: "1h 50m" },
            { titulo: "Validación básica de formularios de contacto", duracion: "1h 45m" },
            { titulo: "Introducción a herramientas de desarrollo (DevTools)", duracion: "1h 30m" }
          ]
        },
        {
          id: "sec_fs_4",
          tituloBadge: "Sección 4 · Proyecto",
          tituloSeccion: "Proyecto Integrador Inicial",
          descripcion: "Construcción y publicación de tu primera página web funcional.",
          clases: [
            { titulo: "Planificación del sitio web personal", duracion: "1h 35m" },
            { titulo: "Desarrollo y ensamblado del proyecto final", duracion: "2h 00m" },
            { titulo: "Introducción a subida de archivos en servidores web", duracion: "1h 20m" }
          ]
        }
      ],
      aprender: [
        "Comprender la estructura fundamental de internet y páginas web.",
        "Diseñar sitios web adaptables usando HTML5 y CSS3.",
        "Escribir scripts interactivos básicos utilizando JavaScript.",
        "Desarrollar y publicar un sitio web completo desde cero.",
      ],
      requisitos: [
        "Ninguna experiencia previa en programación.",
        "Contar con una computadora con acceso a internet y un navegador web.",
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
      duracionHoras: "40 horas",
      instructorNombre: "Esteban Ruarte",
      instructorCargo: "Database Administrator",
      instructorIniciales: "ER",
      precioPrincipal: "150", 
      precioTachado: "USD $65",
      clasesCount: "15 clases en video Full HD",
      proyectosCount: "3 proyectos de bases de datos",
      imagen: "./img/sql.jpeg",
      temarioResumen: "5 secciones · 15 clases · 40h total",
      temario: [
        {
          id: "sec_sql_1",
          tituloBadge: "Sección 1 · Fundamentos",
          tituloSeccion: "Introducción a las Bases de Datos",
          descripcion: "Conceptos iniciales y diseño lógico básico.",
          clases: [
            { titulo: "¿Qué es una base de datos relacional y para qué sirve?", duracion: "2h 30m" },
            { titulo: "Introducción al modelo Entidad-Relación", duracion: "2h 45m" },
            { titulo: "Conceptos básicos de normalización de datos", duracion: "3h 00m" }
          ]
        },
        {
          id: "sec_sql_2",
          tituloBadge: "Sección 2 · Estructuras",
          tituloSeccion: "Creación de Tablas y Consultas Simples",
          descripcion: "Primeros comandos SQL y tipos de datos.",
          clases: [
            { titulo: "Instalación de MySQL y gestores visuales", duracion: "2h 15m" },
            { titulo: "Creación de bases de datos y primeras tablas (CREATE TABLE)", duracion: "2h 50m" },
            { titulo: "Consultas de lectura básicas con SELECT y WHERE", duracion: "2h 30m" }
          ]
        },
        {
          id: "sec_sql_3",
          tituloBadge: "Sección 3 · Filtrado",
          tituloSeccion: "Filtrado Avanzado y Funciones",
          descripcion: "Uso de operadores y agrupamientos lógicos.",
          clases: [
            { titulo: "Ordenamiento y limitación de resultados", duracion: "2h 20m" },
            { titulo: "Funciones de agregación: SUM, AVG, COUNT", duracion: "2h 40m" },
            { titulo: "Agrupamiento de datos con GROUP BY y HAVING", duracion: "2h 55m" }
          ]
        },
        {
          id: "sec_sql_4",
          tituloBadge: "Sección 4 · Relaciones",
          tituloSeccion: "Combinación de Tablas (JOINs)",
          descripcion: "Relacionando información entre múltiples tablas.",
          clases: [
            { titulo: "Concepto de claves foráneas (Foreign Keys)", duracion: "2h 45m" },
            { titulo: "Consultas cruzadas con INNER JOIN", duracion: "3h 00m" },
            { titulo: "Uso de LEFT JOIN y RIGHT JOIN para datos opcionales", duracion: "2h 30m" }
          ]
        },
        {
          id: "sec_sql_5",
          tituloBadge: "Sección 5 · Optimización",
          tituloSeccion: "Optimización y Buenas Prácticas",
          descripcion: "Índices, seguridad y mantenimiento preventivo.",
          clases: [
            { titulo: "Mejora de velocidad mediante Índices en SQL", duracion: "3h 15m" },
            { titulo: "Copias de seguridad (Backups) y restauración", duracion: "3h 00m" },
            { titulo: "Roles, permisos de usuario y seguridad básica", duracion: "2h 50m" }
          ]
        }
      ],
      aprender: [
        "Comprender el almacenamiento estructurado de la información.",
        "Diseñar esquemas relacionales limpios y ordenados.",
        "Escribir consultas SQL eficientes para extraer información clave.",
        "Administrar respaldos y seguridad en bases de datos MySQL.",
      ],
      requisitos: [
        "Lógica de programación básica.",
        "Disposición para trabajar con terminal y gestores como MySQL Workbench o DBeaver.",
      ],
    },
    ciberseguridad: {
      categoria: "Seguridad Informática",
      nivel: "Nivel Inicial",
      rating: "4.9",
      reseñas: "195",
      titulo: "Introducción a la Ciberseguridad y Autoprotección",
      descripcionLarga:
        "Comprende los conceptos clave de la seguridad digital orientada a usuarios y sistemas. Aprende a identificar amenazas comunes, proteger tus cuentas y aplicar buenas prácticas de navegación defensiva.",
      duracionHoras: "12 horas",
      instructorNombre: "Lucía Benítez",
      instructorCargo: "Information Security Officer",
      instructorIniciales: "LB",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $150",
      clasesCount: "9 clases en video Full HD",
      proyectosCount: "3 laboratorios de buenas prácticas",
      imagen: "./img/ciberseguridad.jpg",
      temarioResumen: "3 secciones · 9 clases · 12h total",
      temario: [
        {
          id: "sec_cib_1",
          tituloBadge: "Sección 1 · Conceptos",
          tituloSeccion: "Fundamentos de Seguridad Digital",
          descripcion: "Conceptos iniciales sobre la importancia de proteger la información.",
          clases: [
            { titulo: "¿Qué es la ciberseguridad y por qué nos afecta?", duracion: "1h 15m" },
            { titulo: "Principios básicos de la tríada CIA (Confidencialidad, Integridad y Disponibilidad)", duracion: "1h 25m" },
            { titulo: "Identificación de riesgos cotidianos en internet", duracion: "1h 20m" }
          ]
        },
        {
          id: "sec_cib_2",
          tituloBadge: "Sección 2 · Amenazas",
          tituloSeccion: "Ingeniería Social y Fraudes Comunes",
          descripcion: "Cómo operan los ciberdelincuentes a nivel humano y digital.",
          clases: [
            { titulo: "Qué es el Phishing y cómo detectarlo a tiempo", duracion: "1h 20m" },
            { titulo: "Fraudes en redes sociales y correos electrónicos", duracion: "1h 35m" },
            { titulo: "Importancia de las actualizaciones de software", duracion: "1h 10m" }
          ]
        },
        {
          id: "sec_cib_3",
          tituloBadge: "Sección 3 · Protección",
          tituloSeccion: "Estrategias de Autoprotección",
          descripcion: "Herramientas sencillas para elevar tu nivel de seguridad.",
          clases: [
            { titulo: "Creación de contraseñas robustas y gestores de claves", duracion: "1h 30m" },
            { titulo: "Autenticación de dos factores (2FA): qué es y cómo usarla", duracion: "1h 25m" },
            { titulo: "Navegación segura y uso responsable de redes públicas Wi-Fi", duracion: "1h 25m" }
          ]
        }
      ],
      aprender: [
        "Reconocer las amenazas informáticas más comunes del día a día.",
        "Identificar correos y sitios web fraudulentos (phishing).",
        "Implementar contraseñas seguras y sistemas de doble factor de autenticación.",
        "Aplicar hábitos saludables de navegación en internet.",
      ],
      requisitos: [
        "Ningún conocimiento previo en seguridad informática.",
        "Manejo cotidiano de dispositivos móviles o computadoras.",
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
      precioPrincipal: "300", 
      precioTachado: "USD $95",
      clasesCount: "12 clases en video Full HD",
      proyectosCount: "4 automatizaciones con IA",
      imagen: "./img/ia.jpg",
      temarioResumen: "4 secciones · 12 clases · 20h total",
      temario: [
        {
          id: "sec_ia_1",
          tituloBadge: "Sección 1 · Prompts",
          tituloSeccion: "Ingeniería de Prompts aplicada",
          descripcion: "Técnicas esenciales de comunicación con modelos de lenguaje.",
          clases: [
            { titulo: "Introducción a los Modelos de Lenguaje (LLMs)", duracion: "1h 35m" },
            { titulo: "Estructura correcta de un Prompt para programación", duracion: "1h 40m" },
            { titulo: "Optimización de contextos y manejo de instrucciones claras", duracion: "1h 25m" }
          ]
        },
        {
          id: "sec_ia_2",
          tituloBadge: "Sección 2 · Asistentes",
          tituloSeccion: "Herramientas de Asistencia por IA",
          descripcion: "Uso de copilotos de código en tu entorno de desarrollo.",
          clases: [
            { titulo: "Configuración y uso básico de GitHub Copilot", duracion: "1h 45m" },
            { titulo: "Programación asistida con Cursor IDE", duracion: "1h 50m" },
            { titulo: "Refactorización y limpieza de código con ayuda de IA", duracion: "1h 30m" }
          ]
        },
        {
          id: "sec_ia_3",
          tituloBadge: "Sección 3 · Testing",
          tituloSeccion: "Pruebas y Documentación Automatizada",
          descripcion: "Generación de tests unitarios y documentación técnica.",
          clases: [
            { titulo: "Generación automatizada de pruebas unitarias", duracion: "1h 35m" },
            { titulo: "Creación de documentación técnica clara para proyectos", duracion: "1h 20m" },
            { titulo: "Detección temprana de errores lógicos mediante prompts", duracion: "1h 40m" }
          ]
        },
        {
          id: "sec_ia_4",
          tituloBadge: "Sección 4 · Integración",
          tituloSeccion: "Consumo de APIs de Inteligencia Artificial",
          descripcion: "Conectando aplicaciones con servicios de IA.",
          clases: [
            { titulo: "Consumo básico de APIs de OpenAI y Claude", duracion: "1h 55m" },
            { titulo: "Diseño de flujos automatizados simples", duracion: "2h 10m" },
            { titulo: "Buenas prácticas éticas en el uso de IA para desarrollo", duracion: "1h 55m" }
          ]
        }
      ],
      aprender: [
        "Escribir instrucciones (prompts) precisas para obtener código de calidad.",
        "Utilizar asistentes modernos como GitHub Copilot y Cursor.",
        "Automatizar la redacción de pruebas unitarias y documentación.",
        "Integrar capacidades de IA en proyectos de software.",
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
        "Transforma datos complejos y dispersos en dashboards interactivos, reportes dinámicos y visualizaciones de alto impacto para la toma de decisiones estratégicas desde cero.",
      duracionHoras: "22 horas",
      instructorNombre: "Valeria Sosa",
      instructorCargo: "BI & Data Analytics Lead",
      instructorIniciales: "VS",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $70",
      clasesCount: "11 clases en video Full HD",
      proyectosCount: "4 dashboards ejecutivos",
      imagen: "./img/bi.jpg",
      temarioResumen: "4 secciones · 11 clases · 22h total",
      temario: [
        {
          id: "sec_bi_1",
          tituloBadge: "Sección 1 · Introducción",
          tituloSeccion: "Primeros Pasos en Power BI",
          descripcion: "Conociendo el entorno de trabajo y conectores iniciales.",
          clases: [
            { titulo: "¿Qué es Business Intelligence y Power BI?", duracion: "1h 50m" },
            { titulo: "Instalación y recorrido por la interfaz de Power BI Desktop", duracion: "2h 00m" },
            { titulo: "Importación de datos desde archivos Excel y CSV", duracion: "1h 45m" }
          ]
        },
        {
          id: "sec_bi_2",
          tituloBadge: "Sección 2 · Transformación",
          tituloSeccion: "Limpieza de Datos con Power Query",
          descripcion: "Preparando y estructurando la información antes de analizarla.",
          clases: [
            { titulo: "Introducción al editor de Power Query", duracion: "1h 55m" },
            { titulo: "Limpieza de valores nulos, duplicados y tipos de datos", duracion: "2h 00m" }
          ]
        },
        {
          id: "sec_bi_3",
          tituloBadge: "Sección 3 · Modelado",
          tituloSeccion: "Modelado de Datos y Relaciones Básicas",
          descripcion: "Conectando tablas para crear un reporte coherente.",
          clases: [
            { titulo: "Concepto de tablas de hechos y dimensiones", duracion: "2h 10m" },
            { titulo: "Creación de relaciones entre tablas", duracion: "2h 20m" },
            { titulo: "Introducción sencilla a medidas calculadas", duracion: "2h 05m" }
          ]
        },
        {
          id: "sec_bi_4",
          tituloBadge: "Sección 4 · Visuales",
          tituloSeccion: "Diseño de Dashboards Interactivos",
          descripcion: "Creación de gráficos y publicación de reportes.",
          clases: [
            { titulo: "Selección correcta de gráficos y tarjetas visuales", duracion: "2h 00m" },
            { titulo: "Aplicación de filtros, segmentos y interactividad", duracion: "1h 55m" },
            { titulo: "Introducción a la publicación de reportes compartidos", duracion: "2h 00m" }
          ]
        }
      ],
      aprender: [
        "Comprender los conceptos clave de Business Intelligence.",
        "Importar y limpiar datos utilizando Power Query sin programar.",
        "Establecer relaciones lógicas entre tablas de datos.",
        "Diseñar dashboards interactivos claros y profesionales.",
      ],
      requisitos: ["Manejo fluido de planillas de cálculo (Excel o similar)."],
    },
    hacking: {
      categoria: "Seguridad Ofensiva",
      nivel: "Nivel Avanzado",
      rating: "4.9",
      reseñas: "210",
      titulo: "Hacking Ético y Pruebas de Intrusión Avanzadas",
      descripcionLarga:
        "Domina técnicas profesionales de pentesting, auditoría profunda de vulnerabilidades web, explotación de servicios y pruebas de intrusión bajo un marco estrictamente legal y normativo.",
      duracionHoras: "38 horas",
      instructorNombre: "Damián Kestel",
      instructorCargo: "Lead Offensive Security Consultant",
      instructorIniciales: "DK",
      precioPrincipal: "50", 
      precioTachado: "USD $160",
      clasesCount: "15 clases en video Full HD",
      proyectosCount: "5 escenarios de pentesting real",
      imagen: "./img/he.png",
      temarioResumen: "5 secciones · 15 clases · 38h total",
      temario: [
        {
          id: "sec_hack_1",
          tituloBadge: "Sección 1 · Metodología",
          tituloSeccion: "Marco Legal y Metodologías de Pentesting",
          descripcion: "Normativas internacionales y reconocimiento avanzado.",
          clases: [
            { titulo: "Introducción al Hacking Ético y marco PTES", duracion: "2h 20m" },
            { titulo: "Reconocimiento avanzado y técnicas de OSINT", duracion: "2h 30m" },
            { titulo: "Escaneo profundo de puertos y fingerprinting con Nmap", duracion: "2h 45m" }
          ]
        },
        {
          id: "sec_hack_2",
          tituloBadge: "Sección 2 · Web",
          tituloSeccion: "Explotación de Aplicaciones Web (OWASP Top 10)",
          descripcion: "Identificación de fallas críticas en arquitecturas web.",
          clases: [
            { titulo: "Auditoría avanzada de vulnerabilidades web", duracion: "2h 55m" },
            { titulo: "Explotación avanzada de Inyecciones SQL (SQLi)", duracion: "3h 00m" },
            { titulo: "Ataques complejos de XSS persistente y CSRF", duracion: "2h 45m" }
          ]
        },
        {
          id: "sec_hack_3",
          tituloBadge: "Sección 3 · Herramientas",
          tituloSeccion: "Auditoría Profesional con Burp Suite",
          descripcion: "Manipulación y análisis de tráfico cifrado e intercepción.",
          clases: [
            { titulo: "Configuración y manejo experto de Burp Suite Proxy", duracion: "2h 30m" },
            { titulo: "Evasión de filtros y validaciones de seguridad", duracion: "2h 40m" },
            { titulo: "Ataques contra la lógica de negocio de aplicaciones", duracion: "2h 50m" }
          ]
        },
        {
          id: "sec_hack_4",
          tituloBadge: "Sección 4 · Explotación",
          tituloSeccion: "Post-Explotación y Metasploit Framework",
          descripcion: "Uso de payloads, persistencia y escalada de privilegios.",
          clases: [
            { titulo: "Uso avanzado de Metasploit Framework y sesiones Meterpreter", duracion: "3h 00m" },
            { titulo: "Técnicas de escalada de privilegios en sistemas operativos Linux", duracion: "2h 55m" },
            { titulo: "Auditoría y escalada de privilegios en entornos Windows", duracion: "2h 45m" }
          ]
        },
        {
          id: "sec_hack_5",
          tituloBadge: "Sección 5 · Informes",
          tituloSeccion: "Documentación Ejecutiva y Remediación",
          descripcion: "Estructuración de reportes de hallazgos para corporaciones.",
          clases: [
            { titulo: "Redacción de un reporte profesional de Pentesting", duracion: "2h 15m" },
            { titulo: "Métrica y priorización de riesgos mediante CVSS v3.1", duracion: "2h 10m" },
            { titulo: "Diseño de estrategias de remediación y mitigación", duracion: "2h 20m" }
          ]
        }
      ],
      aprender: [
        "Ejecutar pruebas de penetración bajo marcos metodológicos formales.",
        "Explotar vulnerabilidades críticas en aplicaciones web (OWASP).",
        "Utilizar herramientas avanzadas como Burp Suite y Metasploit.",
        "Redactar informes técnicos y ejecutivos de hallazgos.",
      ],
      requisitos: [
        "Conocimientos sólidos de redes, protocolos HTTP/HTTPS y sistemas operativos Linux.",
        "Conceptos básicos de lenguajes de scripting (Python o Bash).",
      ],
    },
    "ia-ml": {
      categoria: "Inteligencia Artificial",
      nivel: "Nivel Intermedio",
      rating: "4.8",
      reseñas: "310",
      titulo: "Inteligencia Artificial y Machine Learning",
      descripcionLarga:
        "Entrená modelos predictivos con Python, scikit-learn y fundamentos de redes neuronales aplicados a casos reales. Aprendé a preparar datasets, evaluar métricas y llevar modelos a producción.",
      duracionHoras: "28 horas",
      instructorNombre: "Mateo Rossi",
      instructorCargo: "Machine Learning Engineer",
      instructorIniciales: "MR",
      precioPrincipal: "280",
      precioTachado: "USD $340",
      clasesCount: "14 clases en video Full HD",
      proyectosCount: "3 modelos de ML aplicados",
      imagen: "./img/ia.jpg",
      temarioResumen: "4 secciones · 14 clases · 28h total",
      temario: [
        {
          id: "sec_ml_1",
          tituloBadge: "Sección 1 · Fundamentos",
          tituloSeccion: "Introducción a IA y Machine Learning",
          descripcion: "Tipos de aprendizaje automático y flujo de trabajo de un proyecto de datos.",
          clases: [
            { titulo: "Diferencias entre IA, Machine Learning y Deep Learning", duracion: "1h 45m" },
            { titulo: "Aprendizaje supervisado, no supervisado y por refuerzo", duracion: "2h 00m" },
            { titulo: "Preparación del entorno con Python, NumPy y Pandas", duracion: "1h 50m" }
          ]
        },
        {
          id: "sec_ml_2",
          tituloBadge: "Sección 2 · Datos",
          tituloSeccion: "Preprocesamiento y Análisis Exploratorio",
          descripcion: "Limpieza, codificación de variables y división de conjuntos de datos.",
          clases: [
            { titulo: "Tratamiento de valores faltantes y outliers", duracion: "2h 10m" },
            { titulo: "Escalado de variables y encoding de categorías", duracion: "1h 55m" },
            { titulo: "Train/Test split y validación cruzada", duracion: "2h 05m" }
          ]
        },
        {
          id: "sec_ml_3",
          tituloBadge: "Sección 3 · Algoritmos",
          tituloSeccion: "Modelos de Regresión y Clasificación",
          descripcion: "Entrenamiento y evaluación con scikit-learn.",
          clases: [
            { titulo: "Regresión lineal y logística paso a paso", duracion: "2h 15m" },
            { titulo: "Árboles de decisión y Random Forest", duracion: "2h 20m" },
            { titulo: "Métricas de evaluación: Accuracy, Precision, Recall y F1", duracion: "2h 00m" },
            { titulo: "Clustering con K-Means", duracion: "1h 50m" }
          ]
        },
        {
          id: "sec_ml_4",
          tituloBadge: "Sección 4 · Redes Neuronales",
          tituloSeccion: "Introducción a Redes Neuronales y Proyecto",
          descripcion: "Bases de redes neuronales y cierre con un caso práctico.",
          clases: [
            { titulo: "Perceptrón, funciones de activación y backpropagation", duracion: "2h 15m" },
            { titulo: "Primer modelo neuronal secuencial", duracion: "2h 10m" },
            { titulo: "Ajuste de hiperparámetros y prevención de overfitting", duracion: "1h 50m" },
            { titulo: "Proyecto integrador: predicción de demanda o churn", duracion: "2h 00m" }
          ]
        }
      ],
      aprender: [
        "Manipular y limpiar datasets reales con Python, NumPy y Pandas.",
        "Entrenar y evaluar modelos de clasificación, regresión y clustering.",
        "Elegir las métricas adecuadas para evitar overfitting y subajuste.",
        "Construir un proyecto práctico de Machine Learning de punta a punta.",
      ],
      requisitos: [
        "Conocimientos básicos de programación en Python.",
        "Nociones elementales de estadística y álgebra.",
      ],
    },
    ciberseguridad: {
      categoria: "Ciberseguridad",
      nivel: "Nivel Inicial a Intermedio",
      rating: "4.7",
      reseñas: "245",
      titulo: "Ciberseguridad Fundamental",
      descripcionLarga:
        "Protegé redes, aplicaciones y datos identificando vulnerabilidades comunes, autenticación segura y respuesta a incidentes con enfoque práctico en entornos reales.",
      duracionHoras: "24 horas",
      instructorNombre: "Lucia Benitez",
      instructorCargo: "Security Analyst & Blue Team Lead",
      instructorIniciales: "SL",
      precioPrincipal: "190",
      precioTachado: "USD $240",
      clasesCount: "12 clases en video Full HD",
      proyectosCount: "4 simulaciones de defensa y respuesta",
      imagen: "./img/ciberseguridad.jpg",
      temarioResumen: "4 secciones · 12 clases · 24h total",
      temario: [
        {
          id: "sec_cibfund_1",
          tituloBadge: "Sección 1 · Bases",
          tituloSeccion: "Fundamentos de Seguridad y Redes",
          descripcion: "Principios de defensa, vectores de ataque y tráfico de red.",
          clases: [
            { titulo: "Tríada CIA, gestión de riesgos y superficie de ataque", duracion: "1h 50m" },
            { titulo: "Protocolos TCP/IP, DNS, HTTP/HTTPS y puertos críticos", duracion: "2h 10m" },
            { titulo: "Análisis de tráfico y captura de paquetes", duracion: "2h 00m" }
          ]
        },
        {
          id: "sec_cibfund_2",
          tituloBadge: "Sección 2 · Identidad",
          tituloSeccion: "Control de Acceso, Criptografía y Autenticación",
          descripcion: "Protección de identidades y datos en tránsito o reposo.",
          clases: [
            { titulo: "Principio de menor privilegio y control de accesos RBAC", duracion: "1h 45m" },
            { titulo: "Criptografía simétrica, asimétrica, hashing y certificados TLS", duracion: "2h 15m" },
            { titulo: "MFA, OAuth y prevención de robo de sesiones", duracion: "1h 55m" }
          ]
        },
        {
          id: "sec_cibfund_3",
          tituloBadge: "Sección 3 · Amenazas",
          tituloSeccion: "Vulnerabilidades Web y Malware",
          descripcion: "Cómo se originan los ataques más frecuentes y cómo mitigarlos.",
          clases: [
            { titulo: "Phishing, ingeniería social y defensas de correo", duracion: "1h 50m" },
            { titulo: "Malware, ransomware y hardening de sistemas", duracion: "2h 05m" },
            { titulo: "Fallas web frecuentes: inyecciones, XSS y CSRF", duracion: "2h 00m" }
          ]
        },
        {
          id: "sec_cibfund_4",
          tituloBadge: "Sección 4 · Respuesta",
          tituloSeccion: "Monitoreo, Logs y Respuesta a Incidentes",
          descripcion: "Detección temprana, contención y recuperación ante incidentes.",
          clases: [
            { titulo: "Lectura de logs de sistema, firewalls y servidores web", duracion: "2h 00m" },
            { titulo: "Fases de respuesta a incidentes: preparación a lecciones aprendidas", duracion: "2h 10m" },
            { titulo: "Plan de continuidad y backups resilientes ante ransomware", duracion: "2h 00m" }
          ]
        }
      ],
      aprender: [
        "Identificar amenazas y vulnerabilidades frecuentes en redes y aplicaciones.",
        "Aplicar buenas prácticas de autenticación, cifrado y control de accesos.",
        "Analizar registros y eventos para detectar comportamientos anómalos.",
        "Ejecutar un protocolo ordenado de contención y respuesta ante incidentes.",
      ],
      requisitos: [
        "Manejo fluido de computadora y navegación web.",
        "Conocimientos básicos de redes o sistemas operativos es un plus.",
      ],
    },
    "testing-automation": {
      categoria: "Testing Automation",
      nivel: "Nivel Inicial a Intermedio",
      rating: "4.9",
      reseñas: "360",
      titulo: "Testing Automation con Selenium y Playwright",
      descripcionLarga:
        "Automatizá pruebas end-to-end en aplicaciones web para detectar bugs temprano y mejorar la calidad de cada release con estrategias mantenibles y reportes claros.",
      duracionHoras: "22 horas",
      instructorNombre: "Mateo Rossi",
      instructorCargo: "QA Automation Engineer",
      instructorIniciales: "DG",
      precioPrincipal: "Gratuito",
      precioTachado: "USD $140",
      clasesCount: "12 clases en video Full HD",
      proyectosCount: "3 suites automatizadas E2E",
      imagen: "./img/full stack.jpg",
      temarioResumen: "4 secciones · 12 clases · 22h total",
      temario: [
        {
          id: "sec_qa_1",
          tituloBadge: "Sección 1 · Estrategia",
          tituloSeccion: "Fundamentos de QA y Automatización E2E",
          descripcion: "Qué automatizar, pirámide de pruebas y selectores estables.",
          clases: [
            { titulo: "Pirámide de testing y criterios para automatizar casos", duracion: "1h 40m" },
            { titulo: "Localizadores robustos: CSS, XPath y roles accesibles", duracion: "1h 55m" },
            { titulo: "Configuración inicial del proyecto de pruebas", duracion: "1h 45m" }
          ]
        },
        {
          id: "sec_qa_2",
          tituloBadge: "Sección 2 · Playwright",
          tituloSeccion: "Pruebas Modernas con Playwright",
          descripcion: "Interacciones, esperas automáticas y aserciones confiables.",
          clases: [
            { titulo: "Navegación, formularios, modales y uploads con Playwright", duracion: "2h 00m" },
            { titulo: "Web-first assertions y manejo de asincronía sin flaky tests", duracion: "1h 50m" },
            { titulo: "Interceptación y mock de respuestas HTTP/API", duracion: "1h 50m" }
          ]
        },
        {
          id: "sec_qa_3",
          tituloBadge: "Sección 3 · Selenium",
          tituloSeccion: "Automatización con Selenium WebDriver",
          descripcion: "Uso de WebDriver, esperas explícitas y compatibilidad cross-browser.",
          clases: [
            { titulo: "Arquitectura de Selenium WebDriver y manejo del navegador", duracion: "1h 55m" },
            { titulo: "Explicit waits, frames, alertas y acciones avanzadas", duracion: "1h 50m" },
            { titulo: "Comparativa práctica: cuándo usar Playwright o Selenium", duracion: "1h 30m" }
          ]
        },
        {
          id: "sec_qa_4",
          tituloBadge: "Sección 4 · Arquitectura",
          tituloSeccion: "Page Object Model, Reportes y CI",
          descripcion: "Código limpio y ejecución automática en pipelines.",
          clases: [
            { titulo: "Implementación de Page Object Model (POM)", duracion: "2h 00m" },
            { titulo: "Capturas de pantalla, trazas, videos y reportes HTML", duracion: "1h 45m" },
            { titulo: "Integración de la suite en flujos de CI (GitHub Actions)", duracion: "1h 45m" }
          ]
        }
      ],
      aprender: [
        "Diseñar y automatizar pruebas end-to-end en flujos web críticos.",
        "Escribir scripts estables con Playwright y Selenium WebDriver.",
        "Organizar pruebas con Page Object Model para facilitar el mantenimiento.",
        "Generar reportes de fallos y correr pruebas automáticamente en CI.",
      ],
      requisitos: [
        "Conocimientos básicos de HTML y programación (JavaScript o Python).",
        "Familiaridad con el funcionamiento básico de sitios web.",
      ],
    },
    "bi-datos": {
      categoria: "Business Intelligence",
      nivel: "Nivel Inicial a Intermedio",
      rating: "4.8",
      reseñas: "275",
      titulo: "Business Intelligence y Analítica de Datos",
      descripcionLarga:
        "Transformá datos crudos en tableros interactivos, KPIs claros y reportes accionables para la toma de decisiones en áreas comerciales, operativas y financieras.",
      duracionHoras: "26 horas",
      instructorNombre: "Valeria Sosa",
      instructorCargo: "BI & Data Analytics Specialist",
      instructorIniciales: "VP",
      precioPrincipal: "240",
      precioTachado: "USD $295",
      clasesCount: "13 clases en video Full HD",
      proyectosCount: "4 tableros y reportes de negocio",
      imagen: "./img/bi.jpg",
      temarioResumen: "4 secciones · 13 clases · 26h total",
      temario: [
        {
          id: "sec_bidat_1",
          tituloBadge: "Sección 1 · Analítica",
          tituloSeccion: "Cultura Data-Driven y Definición de KPIs",
          descripcion: "De preguntas de negocio a indicadores medibles.",
          clases: [
            { titulo: "Rol de Business Intelligence en las organizaciones", duracion: "1h 50m" },
            { titulo: "Definición de KPIs y métricas accionables vs. métricas vanidosas", duracion: "2h 00m" },
            { titulo: "Fuentes de datos: planillas, bases SQL y sistemas de gestión", duracion: "1h 55m" }
          ]
        },
        {
          id: "sec_bidat_2",
          tituloBadge: "Sección 2 · ETL y Modelo",
          tituloSeccion: "Preparación y Modelado Dimensional",
          descripcion: "Limpieza de datos y diseño de esquemas analíticos.",
          clases: [
            { titulo: "Extracción, limpieza y estandarización de datos", duracion: "2h 05m" },
            { titulo: "Modelo estrella, tablas de hechos y tablas de dimensiones", duracion: "2h 15m" },
            { titulo: "Granularidad, calendarios y relaciones correctas", duracion: "1h 55m" }
          ]
        },
        {
          id: "sec_bidat_3",
          tituloBadge: "Sección 3 · Métricas",
          tituloSeccion: "Cálculos, Comparativas y Tendencias",
          descripcion: "Análisis temporal, variaciones y segmentación de resultados.",
          clases: [
            { titulo: "Cálculo de márgenes, ticket promedio, conversión y retención", duracion: "2h 00m" },
            { titulo: "Comparativas interanuales, acumulados y análisis de estacionalidad", duracion: "2h 05m" },
            { titulo: "Análisis de cohorts y segmentación por clientes o canales", duracion: "2h 00m" }
          ]
        },
        {
          id: "sec_bidat_4",
          tituloBadge: "Sección 4 · Visualización",
          tituloSeccion: "Storytelling con Datos y Dashboards Ejecutivos",
          descripcion: "Diseño visual claro y presentación de hallazgos.",
          clases: [
            { titulo: "Jerarquía visual y elección del gráfico adecuado", duracion: "1h 55m" },
            { titulo: "Diseño de tableros ejecutivos y operativos sin saturación", duracion: "2h 05m" },
            { titulo: "Data storytelling: cómo comunicar hallazgos y recomendaciones", duracion: "2h 00m" }
          ]
        }
      ],
      aprender: [
        "Traducir objetivos de negocio en KPIs y tableros fáciles de interpretar.",
        "Limpiar y estructurar datos bajo un modelo dimensional claro.",
        "Calcular métricas clave de ventas, operaciones y evolución temporal.",
        "Presentar reportes visuales que respalden decisiones concretas.",
      ],
      requisitos: [
        "Manejo básico de hojas de cálculo (Excel o Google Sheets).",
        "Interés en análisis de datos y toma de decisiones de negocio.",
      ],
    },
  };

  let curso = baseDeDatosCursos[cursoId] || baseDeDatosCursos["fullstack"];

  if (cursoGuardado && cursoGuardado.titulo === curso.titulo) {
    curso.precioPrincipal = cursoGuardado.precio;
  }

 
  // 2. RENDERIZADO DE LA INFORMACIÓN EN EL DOM

  document.getElementById("page-title").textContent = `cursAR - ${curso.titulo}`;
  document.getElementById("curso-categoria").textContent = curso.categoria;
  document.getElementById("curso-nivel").textContent = curso.nivel;
  document.getElementById("curso-rating").textContent = curso.rating;
  document.getElementById("curso-reseñas").textContent = curso.reseñas;
  document.getElementById("curso-titulo").textContent = curso.titulo;
  document.getElementById("curso-descripcion-larga").textContent = curso.descripcionLarga;
  document.getElementById("curso-modalidad").textContent = "Remoto asincrónico";
  document.getElementById("curso-duracion-horas").textContent = curso.duracionHoras;
  document.getElementById("curso-video-img").src = curso.imagen;

  document.getElementById("instructor-nombre").textContent = curso.instructorNombre;
  document.getElementById("instructor-cargo").textContent = curso.instructorCargo;
  document.getElementById("instructor-iniciales").textContent = curso.instructorIniciales;

  // Lógica de precios y estilos de visualización
  const elPrecioPrincipal = document.getElementById("curso-precio-principal");
  const elPrecioTachado = document.getElementById("curso-precio-tachado");
  const pildoraEstado = document.querySelector(".pildora-gratis");

  const precioStr = String(curso.precioPrincipal).trim().toLowerCase();
  const esGratis = precioStr === "0" || precioStr === "gratuito" || precioStr === "gratis" || precioStr === "";

  if (esGratis) {
    elPrecioPrincipal.textContent = "Gratuito";
    elPrecioPrincipal.style.color = "#6ee7b7"; 
    if (elPrecioTachado) {
      elPrecioTachado.textContent = curso.precioTachado || "USD $80";
      elPrecioTachado.style.display = "inline";
    }
  } else {
    elPrecioPrincipal.textContent = `USD $${curso.precioPrincipal}`;
    elPrecioPrincipal.style.color = "#f5b83d"; 
    if (elPrecioTachado) elPrecioTachado.style.display = "none";
    if (pildoraEstado) {
      pildoraEstado.textContent = "Acceso Completo";
      pildoraEstado.style.display = "inline-block";
    }
  }

  document.getElementById("curso-inc-1").textContent = curso.clasesCount;
  document.getElementById("curso-inc-2").textContent = curso.proyectosCount;

  // Inyección de listas (Lo que aprenderás y Requisitos)
  const listaAprender = document.getElementById("lista-aprender");
  listaAprender.innerHTML = curso.aprender.map(item => `
    <div class="col-12 col-md-6 d-flex align-items-start gap-2">
      <i class="bi bi-check2-circle text-teal fs-5 mt-n1"></i>
      <span>${item}</span>
    </div>
  `).join("");

  const listaRequisitos = document.getElementById("lista-requisitos");
  listaRequisitos.innerHTML = curso.requisitos.map(req => `
    <li class="d-flex align-items-start gap-2 p-3 rounded-3 caja-descripcion-curso">
      <i class="bi bi-check-circle-fill text-teal mt-1"></i>
      <span>${req}</span>
    </li>
  `).join("");

  // Inyección dinámica del Resumen del Temario y el Acordeón
  const elResumenTemario = document.getElementById("curso-resumen-temario");
  if (elResumenTemario && curso.temarioResumen) {
    elResumenTemario.textContent = curso.temarioResumen;
  }

  const contenedorTemario = document.getElementById("temarioCurso");
  if (contenedorTemario && curso.temario) {
    contenedorTemario.innerHTML = curso.temario.map((sec, index) => {
      const isShow = index === 0 ? "show" : "";
      const isCollapsed = index === 0 ? "" : "collapsed";
      const ariaExpanded = index === 0 ? "true" : "false";

      const listaClases = sec.clases.map((clase, cIndex) => `
        <li class="d-flex align-items-center justify-content-between p-2 rounded-3 caja-descripcion-curso">
          <span><i class="bi bi-play-circle-fill text-teal me-2"></i> ${cIndex + 1}. ${clase.titulo}</span>
          <span class="texto-secundario-claro">${clase.duracion}</span>
        </li>
      `).join("");

      return `
        <div class="accordion-item barra rounded-4 overflow-hidden">
          <h3 class="accordion-header">
            <button
              class="accordion-button bg-transparent text-white fw-bold shadow-none p-3 p-md-4 ${isCollapsed}"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${sec.id}"
              aria-expanded="${ariaExpanded}"
            >
              <div class="d-flex flex-column gap-1 pe-3">
                <span class="badge bg-indigo-subtle text-indigo align-self-start">${sec.tituloBadge}</span>
                <span>${sec.tituloSeccion}</span>
              </div>
            </button>
          </h3>
          <div
            id="${sec.id}"
            class="accordion-collapse collapse ${isShow}"
            data-bs-parent="#temarioCurso"
          >
            <div class="accordion-body pt-0 px-3 px-md-4 pb-4">
              <p class="small texto-secundario-claro mb-3">${sec.descripcion}</p>
              <ul class="list-unstyled d-flex flex-column gap-2 small mb-0">
                ${listaClases}
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }


  // 3. VALIDACIÓN DE SESIÓN Y PROPIEDAD AL INSCRIBIRSE

  const btnInscribirse = document.getElementById("btn-inscribirse-checkout");
  if (btnInscribirse) {
    btnInscribirse.addEventListener("click", (e) => {
      const usuarioActivoJSON = localStorage.getItem("usuarioActivo");

      if (!usuarioActivoJSON) {
        e.preventDefault();
        sessionStorage.setItem("cursoSeleccionado", curso.titulo);
        sessionStorage.setItem("redirectAfterLogin", "inscripcion.html");
        
        alert("Por favor iniciá sesión o create una cuenta para inscribirte al curso.");
        window.location.href = "logueo.html";
        return;
      }

      const usuarioActivo = JSON.parse(usuarioActivoJSON);
      const storageKeyCursos = `misCursos_${usuarioActivo.email}`;
      const misCursos = JSON.parse(localStorage.getItem(storageKeyCursos)) || [];

      let nombreCursoOficial = "Desarrollo Web Full Stack";
      const tituloLower = curso.titulo.toLowerCase();

      if (tituloLower.includes("full stack") || tituloLower.includes("desarrollo web")) {
        nombreCursoOficial = "Desarrollo Web Full Stack desde Cero";
      } else if (tituloLower.includes("mysql") || tituloLower.includes("bases de datos")) {
        nombreCursoOficial = "Bases de Datos en MySQL";
      } else if (tituloLower.includes("ciberseguridad")) {
        nombreCursoOficial = "Introducción a la Ciberseguridad";
      } else if (tituloLower.includes("ia") || tituloLower.includes("inteligencia artificial")) {
        nombreCursoOficial = "IA en Programación";
      } else if (tituloLower.includes("power bi")) {
        nombreCursoOficial = "Curso de Power BI";
      } else if (tituloLower.includes("hacking") || tituloLower.includes("etico")) {
        nombreCursoOficial = "Hacking Ético";
      } else if (tituloLower.includes("machine learning") || tituloLower.includes("ia en programación")) {
        nombreCursoOficial = "Inteligencia Artificial y Machine Learning";
      } else if (tituloLower.includes("ciberseguridad fundamental")) {
        nombreCursoOficial = "Ciberseguridad Fundamental";
      } else if (tituloLower.includes("testing automation") || tituloLower.includes("selenium")) {
        nombreCursoOficial = "Testing Automation con Selenium y Playwright";
      } else if (tituloLower.includes("analítica de datos") || tituloLower.includes("business intelligence")) {
        nombreCursoOficial = "Business Intelligence y Analítica de Datos";
      }

      const yaAdquirido = misCursos.some(c => c.curso.toLowerCase() === nombreCursoOficial.toLowerCase());

      if (yaAdquirido) {
        e.preventDefault();
        alert(`¡Ya tenés adquirido el curso "${nombreCursoOficial}"! Podés acceder al contenido directamente desde tu perfil.`);
        return;
      }

      sessionStorage.setItem("cursoSeleccionado", nombreCursoOficial);
    });
  }
});