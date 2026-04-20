/* script.js - Lógica interactiva de la página */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTabs();
  initComparisonTool();
});

/* 1. Comportamiento del Navbar al hacer scroll */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Menú Móvil */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = menu.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  };

  btn.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer click en un enlace
  links.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
}

/* 3. Navegación por Pestañas (Tabs) */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Añadir clase active al botón clickeado
      button.classList.add('active');

      // Mostrar el contenido correspondiente
      const targetId = button.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* 4. Herramienta de Comparación Interactiva */
const synergiesData = {
  'ia-robotica': {
    title: 'Inteligencia Artificial + Robótica Avanzada',
    description: 'La convergencia genera "Robótica Cognitiva". Las máquinas ya no solo ejecutan rutinas mecánicas preprogramadas, sino que aprenden de su entorno en tiempo real, toman decisiones autónomas ante imprevistos y optimizan sus propios movimientos.',
    impact: 'Revolución total en manufactura ágil, exploración espacial autónoma y asistencia médica de precisión.'
  },
  'ia-rvra': {
    title: 'Inteligencia Artificial + Realidad Virtual/Aumentada',
    description: 'Creación de entornos sintéticos inteligentes. La IA genera mundos virtuales dinámicos que se adaptan a las respuestas biométricas y psicológicas del usuario, creando simulaciones hiper-personalizadas.',
    impact: 'Entrenamiento inmersivo adaptativo, terapias psicológicas reactivas y diseño de interfaces neuronales.'
  },
  'automatizacion-ia': {
    title: 'Inteligencia Artificial + Automatización',
    description: 'Evolución hacia la "Automatización Cognitiva" (RPA Inteligente). Los sistemas asumen no solo tareas físicas repetitivas, sino también trabajo de conocimiento, análisis de datos y toma de decisiones corporativas.',
    impact: 'Desplazamiento del trabajo de cuello blanco, eficiencia administrativa absoluta y modelos de negocio autónomos.'
  },
  'robotica-rvra': {
    title: 'Robótica + Realidad Virtual/Aumentada',
    description: 'Telepresencia y Teleoperación avanzada. Un operador humano puede inmersarse virtualmente en un entorno remoto y controlar un avatar robótico con respuesta háptica (sentido del tacto).',
    impact: 'Cirugías a miles de kilómetros de distancia, desactivación de explosivos y trabajo en entornos biológicamente hostiles.'
  },
  'automatizacion-robotica': {
    title: 'Robótica + Automatización',
    description: 'Fábricas oscuras (Dark Factories). Instalaciones de producción donde el ciclo completo, desde la extracción de materia prima hasta el ensamblaje final y logística, opera sin intervención humana directa.',
    impact: 'Hiper-productividad, cadenas de suministro invulnerables a crisis sanitarias, pero drástica pérdida de empleos industriales.'
  },
  'automatizacion-rvra': {
    title: 'Realidad Virtual/Aumentada + Automatización',
    description: 'Interfaces de gestión inmersiva. Control visual y predictivo de sistemas automatizados globales. Trabajadores supervisan granjas de servidores o procesos industriales logísticos desde centros de mando en Realidad Mixta.',
    impact: 'Supervisión intuitiva de sistemas ultracomplejos, reducción de la curva de aprendizaje para operarios de sistemas autónomos.'
  }
};

function initComparisonTool() {
  const btnCompare = document.getElementById('btn-compare');
  const select1 = document.getElementById('tech1');
  const select2 = document.getElementById('tech2');
  const resultBox = document.getElementById('compare-result');

  btnCompare.addEventListener('click', () => {
    const val1 = select1.value;
    const val2 = select2.value;

    if (val1 === val2) {
      showComparisonResult({
        title: 'Selección redundante',
        description: 'Por favor, seleccione dos tecnologías diferentes para analizar sus sinergias e impacto cruzado.',
        impact: 'No aplicable.'
      });
      return;
    }

    // Generar la llave ordenando alfabéticamente para buscar en el diccionario sin importar el orden
    const key = [val1, val2].sort().join('-');
    const data = synergiesData[key];

    if (data) {
      showComparisonResult(data);
    } else {
      showComparisonResult({
        title: 'Sinergia en desarrollo',
        description: 'El análisis para la intersección de estas dos tecnologías está en fase de estudio documental.',
        impact: 'Pendiente de revisión académica.'
      });
    }
  });
}

function showComparisonResult(data) {
  const resultBox = document.getElementById('compare-result');
  
  resultBox.innerHTML = `
    <div class="compare-header">
      <h3 style="color: var(--color-primary); font-family: var(--font-serif); font-size: 1.5rem;">${data.title}</h3>
    </div>
    <div class="compare-content">
      <p style="margin-bottom: 1rem; color: var(--text-main);"><strong>Descripción de la Sinergia:</strong><br> ${data.description}</p>
      <p style="color: var(--text-main);"><strong>Impacto Proyectado:</strong><br> <span style="color: var(--color-accent); font-weight: 500;">${data.impact}</span></p>
    </div>
  `;
  
  resultBox.classList.remove('hidden');
  resultBox.style.display = 'block';
  
  // Scroll suave hacia el resultado
  setTimeout(() => {
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}