/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FICHA TÉCNICA DE PRODUCCIÓN - SCRIPT PRINCIPAL
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Este archivo contiene las funciones de inicialización y manejo de eventos
 * para la aplicación de Ficha Técnica de Producción.
 * 
 * ARQUITECTURA GENERAL:
 * 1. Este script inicializa la aplicación NavBar
 * 2. La aplicación NavBar gestiona múltiples vistas (Vista1-4)
 * 3. Cada vista maneja su propia lógica de negocio
 * 4. DataManager centraliza el guardado/carga de datos
 * 5. PDFExporter maneja la exportación a PDF
 * 
 * FLUJO PRINCIPAL:
 * 1. DOMContentLoaded → Inicialización automática
 * 2. NavBarApp se carga con Vista1 por defecto
 * 3. Usuario interactúa con vistas mediante NavBar
 * 4. Datos se sincronizan automáticamente
 * 5. Exportación PDF disponible desde cualquier vista
 * 
 * @author Claudio Vilas
 * @version 1.0
 * @since 2025
 */

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Punto de entrada principal de la aplicación
 * Se ejecuta cuando el DOM está completamente cargado
 * 
 * FLUJO DE INICIALIZACIÓN:
 * 1. Inicializa funciones de exportación PDF
 * 2. Configura sistema de guardado/carga
 * 3. Auto-inicializa la aplicación NavBar
 * 4. La aplicación queda lista para uso
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Ficha Técnica de Producción...');
    
    // Inicializar funciones esenciales
    initPDFExport();
    initSaveLoad();
    
    // Auto-inicializar NavBar con Vista1 como vista por defecto
    // Esto crea la interfaz principal de navegación y carga los datos
    autoInitNavBar();
    
    console.log('✅ Ficha Técnica de Producción inicializada correctamente');
});

// ═══════════════════════════════════════════════════════════════════════════════
// GESTIÓN DE IMÁGENES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Inicializa la funcionalidad de subida de imágenes
 * 
 * NOTA: Esta función es parte del sistema legacy y actualmente no se usa
 * en el flujo principal. El manejo de imágenes se realiza directamente
 * en cada vista (Vista1-4) a través de sus propios manejadores.
 * 
 * @deprecated Esta función se mantiene por compatibilidad pero no es utilizada
 */
function initImageUploads() {
    // Imagen del vestido - sistema legacy
    const uploadVestido = document.getElementById('uploadVestido');
    if (uploadVestido) {
        uploadVestido.addEventListener('change', function(e) {
            handleImageUpload(e, 'imagenVestido');
        });
    }

    // Imágenes de materiales existentes - sistema legacy
    const materialUploads = document.querySelectorAll('input[type="file"][id^="upload"]');
    materialUploads.forEach(uploadElement => {
        if (uploadElement.id !== 'uploadVestido') {
            uploadElement.addEventListener('change', function(e) {
                const containerId = uploadElement.id.replace('upload', 'material');
                handleImageUpload(e, containerId);
            });
        }
    });
}

/**
 * Maneja la subida y preview de imágenes
 * 
 * FUNCIONALIDAD:
 * 1. Valida el archivo seleccionado (tipo y tamaño)
 * 2. Convierte la imagen a base64 para preview
 * 3. Actualiza el elemento de imagen en el DOM
 * 
 * VALIDACIONES:
 * - Solo acepta archivos de imagen
 * - Tamaño máximo: 5MB
 * 
 * @param {Event} event - Evento de cambio del input file
 * @param {string} containerId - ID del contenedor donde mostrar la imagen
 * @returns {void}
 */
function handleImageUpload(event, containerId) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido.');
        return;
    }

    // Validar tamaño (máximo 5MB para evitar problemas de rendimiento)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Por favor selecciona una imagen menor a 5MB.');
        return;
    }

    // Procesar la imagen usando FileReader API
    const reader = new FileReader();
    reader.onload = function(e) {
        // Buscar el contenedor de destino en el DOM
        const container = document.getElementById(containerId);
        if (container) {
            const img = container.querySelector('img');
            if (img) {
                // Actualizar la imagen con los datos base64
                img.src = e.target.result;
                img.style.display = 'block';
            }
        }
    };
    // Convertir archivo a URL de datos (base64)
    reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SELECTORES DE COLOR (LEGACY)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Inicializa los selectores de color del sistema legacy
 * 
 * NOTA: Esta función es parte del sistema original y actualmente no se usa
 * en el flujo principal NavBar. Cada vista maneja sus propios selectores de color.
 * 
 * FUNCIONALIDAD:
 * - Sincroniza el valor del input color con el fondo visual
 * - Aplica el color inicial al cargar la página
 * 
 * @deprecated Mantenido por compatibilidad, no usado en flujo actual
 */
function initColorPickers() {
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        // Agregar evento para sincronizar color visual con valor
        picker.addEventListener('change', function() {
            // Aplicar el color seleccionado como fondo de la celda
            this.style.backgroundColor = this.value;
        });
        
        // Aplicar color inicial al cargar
        picker.style.backgroundColor = picker.value;
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTACIÓN PDF
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Inicializa la funcionalidad de exportación a PDF del sistema legacy
 * 
 * NOTA: En el sistema NavBar actual, la exportación PDF se maneja a través
 * del PDFExporter.js y DataManager.js. Esta función se mantiene por compatibilidad.
 * 
 * @deprecated Utilizar PDFExporter.js en su lugar
 */
function initPDFExport() {
    const exportBtn = document.getElementById('exportPDF');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToPDF);
    }
}

/**
 * Exporta la ficha técnica a PDF usando html2canvas + jsPDF
 * 
 * PROCESO DE EXPORTACIÓN:
 * 1. Obtiene el contenedor de la ficha
 * 2. Aplica estilos específicos para PDF (oculta botones)
 * 3. Captura el contenido con html2canvas
 * 4. Genera PDF con jsPDF en formato A4 horizontal
 * 5. Calcula dimensiones para ajustar contenido
 * 6. Descarga el archivo con nombre basado en fecha
 * 
 * CARACTERÍSTICAS:
 * - Formato: A4 horizontal (297x210mm)
 * - Calidad: Alta resolución (scale: 2)
 * - Nombre archivo: ficha-tecnica-YYYY-MM-DD.pdf
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si hay problemas con las librerías o el DOM
 */
async function exportToPDF() {
    try {
        // Mostrar indicador de carga al usuario
        const exportBtn = document.getElementById('exportPDF');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Generando PDF...';
        exportBtn.disabled = true;

        // Obtener el contenedor principal de la ficha
        const fichaContainer = document.getElementById('fichaContainer');
        
        // Aplicar clase CSS para ocultar elementos no deseados en PDF
        fichaContainer.classList.add('pdf-export');
        
        // Esperar para que se apliquen los estilos CSS
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Configurar opciones para html2canvas (captura de pantalla)
        const canvas = await html2canvas(fichaContainer, {
            scale: 2, // Mayor resolución
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: fichaContainer.scrollWidth,
            height: fichaContainer.scrollHeight
        });

        // Remover la clase después de la captura
        fichaContainer.classList.remove('pdf-export');

        // Crear PDF con jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Calcular dimensiones para ajustar a A4 horizontal
        const imgWidth = 297; // Ancho A4 horizontal en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Si la imagen es más alta que A4, ajustar
        let finalHeight = imgHeight;
        let finalWidth = imgWidth;
        
        if (imgHeight > 210) { // Alto máximo A4 horizontal
            finalHeight = 210;
            finalWidth = (canvas.width * finalHeight) / canvas.height;
        }

        // Centrar en la página
        const xOffset = (297 - finalWidth) / 2;
        const yOffset = (210 - finalHeight) / 2;

        // Agregar imagen al PDF
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            xOffset,
            yOffset,
            finalWidth,
            finalHeight
        );

        // Generar nombre de archivo con fecha
        const now = new Date();
        const fileName = `ficha-tecnica-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.pdf`;

        // Guardar el PDF
        pdf.save(fileName);

        // Restaurar botón
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;

        console.log('PDF exportado exitosamente');

    } catch (error) {
        console.error('Error al exportar PDF:', error);
        alert('Error al generar el PDF. Por favor inténtalo de nuevo.');
        
        // Restaurar botón en caso de error
        const exportBtn = document.getElementById('exportPDF');
        exportBtn.textContent = 'Exportar a PDF';
        exportBtn.disabled = false;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GUARDADO Y CARGA DE DATOS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Inicializa la funcionalidad de guardado y carga del sistema legacy
 * 
 * NOTA: Esta función configura los event listeners para botones de guardado
 * y carga del sistema original. En el sistema NavBar actual, estas funciones
 * se manejan a través del DataManager.
 * 
 * FUNCIONALIDAD:
 * - Conecta botones con funciones de guardado/carga
 * - Maneja la selección de archivos para cargar
 * 
 * @see DataManager.js Para el sistema actual de persistencia
 */
function initSaveLoad() {
    // Configurar event listeners para botones del sistema legacy
    const guardarBtn = document.getElementById('guardarDatos');
    const cargarBtn = document.getElementById('cargarDatos');
    const archivoInput = document.getElementById('archivoCargar');
    
    if (guardarBtn) {
        guardarBtn.addEventListener('click', guardarFicha);
    }
    
    if (cargarBtn) {
        cargarBtn.addEventListener('click', function() {
            archivoInput.click();
        });
    }
    
    if (archivoInput) {
        archivoInput.addEventListener('change', cargarFicha);
    }
}

/**
 * Guarda todos los datos de la ficha en un archivo JSON
 * 
 * FUNCIONAMIENTO:
 * 1. Busca la instancia activa del DataManager (múltiples ubicaciones posibles)
 * 2. Utiliza DataManager.saveAllData() para recopilar y guardar todos los datos
 * 3. El DataManager maneja la exportación, modal de nombre y descarga
 * 
 * INTEGRACIÓN CON SISTEMA NAVBAR:
 * - Prioriza window.dataManager (instancia global)
 * - Fallback a window.NavBarDataManager 
 * - Última opción: buscar en instancia de NavBarApp
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si DataManager no está disponible
 * @see DataManager.saveAllData() Para implementación completa
 */
async function guardarFicha() {
    try {
        console.log('🔄 Iniciando guardado de ficha...');
        
        // Verificar disponibilidad del DataManager en múltiples ubicaciones
        if (window.dataManager) {
            console.log('✅ Usando DataManager global...');
            await window.dataManager.saveAllData();
        } else if (window.NavBarDataManager) {
            console.log('✅ Usando NavBarDataManager...');
            await window.NavBarDataManager.saveAllData();
        } else {
            // Fallback: buscar la instancia de NavBarApp
            const navBarApp = window.navBarApp || window.NavBarApp;
            if (navBarApp && navBarApp.dataManager) {
                console.log('Usando DataManager desde NavBarApp...');
                await navBarApp.dataManager.saveAllData();
            } else {
                throw new Error('DataManager no disponible');
            }
        }
        
        console.log('Guardado completado exitosamente');
        
    } catch (error) {
        console.error('Error guardando ficha:', error);
        alert('Error al guardar la ficha. Por favor inténtalo de nuevo.');
    }
}

/**
 * Carga los datos de la ficha desde un archivo JSON
 * 
 * FUNCIONAMIENTO:
 * 1. Valida que se haya seleccionado un archivo JSON válido
 * 2. Lee el contenido del archivo y parsea el JSON
 * 3. Confirma con el usuario antes de sobreescribir datos existentes
 * 4. Utiliza DataManager.loadAllData() para cargar los datos
 * 
 * INTEGRACIÓN CON SISTEMA NAVBAR:
 * - Busca DataManager en múltiples ubicaciones posibles
 * - Maneja errores de parseo y validación de archivos
 * - Proporciona retroalimentación al usuario
 * 
 * @param {Event} event - Evento de change del input file
 * @returns {void}
 * @throws {Error} Si el archivo no es válido o DataManager no está disponible
 * @see DataManager.loadAllData() Para implementación de carga
 */
function cargarFicha(event) {
    try {
        console.log('🔄 Iniciando carga de ficha...');
        
        const archivo = event.target.files[0];
        if (!archivo) {
            console.log('❌ No se seleccionó archivo');
            return;
        }
        
        // Validar tipo de archivo
        if (archivo.type !== 'application/json' && !archivo.name.endsWith('.json')) {
            alert('❌ Por favor selecciona un archivo .json válido.');
            console.error('Tipo de archivo inválido:', archivo.type);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                console.log('📄 Parseando contenido del archivo...');
                const datos = JSON.parse(e.target.result);
                
                // Confirmar carga con el usuario
                if (!confirm('⚠️ Esto reemplazará todos los datos actuales. ¿Continuar?')) {
                    console.log('❌ Carga cancelada por usuario');
                    return;
                }
                
                // Buscar DataManager disponible y cargar datos
                if (window.dataManager) {
                    console.log('✅ Usando DataManager global...');
                    window.dataManager.loadAllData(datos);
                } else if (window.NavBarDataManager) {
                    console.log('✅ Usando NavBarDataManager...');
                    window.NavBarDataManager.loadAllData(datos);
                } else {
                    // Fallback: buscar en NavBarApp
                    const navBarApp = window.navBarApp || window.NavBarApp;
                    if (navBarApp && navBarApp.dataManager) {
                        console.log('✅ Usando DataManager desde NavBarApp...');
                        navBarApp.dataManager.loadAllData(datos);
                    } else {
                        throw new Error('DataManager no disponible para cargar datos');
                    }
                }
                
                console.log('✅ Ficha cargada exitosamente');
                alert('✅ Ficha cargada exitosamente.');
                
            } catch (error) {
                console.error('❌ Error al cargar la ficha:', error);
                if (error.name === 'SyntaxError') {
                    alert('❌ El archivo no contiene un JSON válido. Verifica el formato.');
                } else {
                    alert('❌ Error al cargar la ficha. Archivo no válido.');
                }
            }
        };
        
        // Manejar errores de lectura de archivo
        reader.onerror = function() {
            console.error('❌ Error al leer el archivo');
            alert('❌ Error al leer el archivo.');
        };
        
        reader.readAsText(archivo);
        
    } catch (error) {
        console.error('❌ Error en cargarFicha:', error);
        alert('❌ Error al procesar el archivo.');
    }
}

// ============================================
// FUNCIONES AUXILIARES PARA MANEJO DE ARCHIVOS
// ============================================

/**
 * Configuración de eventos para botones de carga y guardado
 * 
 * PROPÓSITO:
 * - Función auxiliar del sistema legacy para manejar botones de guardado/carga
 * - Configura event listeners para botones específicos del HTML
 * 
 * NOTA DE DEPRECACIÓN:
 * Esta función es principalmente para compatibilidad con el sistema legacy.
 * El sistema NavBar moderno maneja estos eventos de forma más robusta.
 * 
 * @deprecated Usar NavBar system para manejo de eventos más robusto
 * @returns {void}
 */
function setupFileHandlers() {
    console.log('🔧 Configurando manejadores de archivos legacy...');
    
    // Buscar botones con IDs alternativos (legacy compatibility)
    const guardarBtn = document.getElementById('guardarBtn') || 
                      document.getElementById('guardarDatos');
    const cargarBtn = document.getElementById('cargarBtn') || 
                     document.getElementById('cargarDatos');
    const archivoInput = document.getElementById('archivoInput') || 
                        document.getElementById('archivoCargar');
    
    if (guardarBtn) {
        console.log('✅ Configurando botón guardar');
        guardarBtn.addEventListener('click', guardarFicha);
    } else {
        console.warn('⚠️ Botón guardar no encontrado');
    }
    
    if (cargarBtn && archivoInput) {
        console.log('✅ Configurando botón cargar');
        cargarBtn.addEventListener('click', function() {
            archivoInput.click();
        });
        archivoInput.addEventListener('change', cargarFicha);
    } else {
        console.warn('⚠️ Botón cargar o input archivo no encontrado');
    }
}

// ============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

/**
 * Función principal de inicialización del sistema legacy
 * 
 * PROPÓSITO:
 * - Inicializa componentes básicos del sistema legacy
 * - Configura manejadores de archivos y eventos básicos
 * - Proporciona auto-inicialización del NavBar como fallback
 * 
 * ARQUITECTURA:
 * 1. Setup de manejadores de archivos legacy
 * 2. Inicialización del toggle del NavBar
 * 3. Auto-inicialización del sistema NavBar moderno
 * 
 * INTEGRACIÓN:
 * - Esta función actúa como puente entre el sistema legacy y el NavBar moderno
 * - El sistema NavBar tiene su propia inicialización más robusta
 * - Esta función se mantiene para compatibilidad hacia atrás
 * 
 * @returns {void}
 * @throws {Error} Si hay problemas en la inicialización
 * @see NavBarApp.js Para la inicialización principal del sistema moderno
 */
function initializeApp() {
    try {
        console.log('🚀 Inicializando aplicación legacy...');
        
        // 1. Configurar manejo de archivos legacy
        setupFileHandlers();
        
        // 2. Inicializar funcionalidad del NavBar toggle
        initNavBarToggle();
        
        // 3. Auto-inicializar el sistema NavBar moderno como fallback
        autoInitNavBar();
        
        console.log('✅ Aplicación legacy inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar la aplicación legacy:', error);
        alert('Error al inicializar la aplicación. Recarga la página.');
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ============================================
// FUNCIONALIDAD NAVBAR - SISTEMA MODERNO
// ============================================

/**
 * Inicializa la funcionalidad de toggle del NavBar
 * 
 * PROPÓSITO:
 * - Configura el botón de alternancia entre sistema legacy y NavBar moderno
 * - Permite al usuario cambiar entre interfaces
 * 
 * FUNCIONAMIENTO:
 * - Busca el botón con ID 'toggleNavBar'
 * - Asocia la función toggleNavBarApp al evento click
 * 
 * @returns {void}
 */
function initNavBarToggle() {
    console.log('🔧 Inicializando toggle del NavBar...');
    
    const toggleButton = document.getElementById('toggleNavBar');
    if (toggleButton) {
        console.log('✅ Botón toggle encontrado, configurando evento...');
        toggleButton.addEventListener('click', toggleNavBarApp);
    } else {
        console.warn('⚠️ Botón toggleNavBar no encontrado en el DOM');
    }
}

/**
 * Variable global para controlar la instancia de NavBar
 * 
 * GESTIÓN DE ESTADO:
 * - null: NavBar no inicializado
 * - NavBarApp instance: NavBar inicializado y disponible
 * 
 * @type {NavBarApp|null}
 */
let navBarAppInstance = null;

/**
 * Alterna entre la ficha original (legacy) y el NavBar moderno
 * 
 * FUNCIONAMIENTO:
 * 1. Verifica si el NavBar está inicializado
 * 2. Si no está inicializado: crea nueva instancia y la inicializa
 * 3. Si está inicializado: alterna la visibilidad entre sistemas
 * 4. Actualiza el texto y estilo del botón según el estado
 * 
 * ESTADOS DEL SISTEMA:
 * - Sistema Legacy activo: Ficha original visible
 * - Sistema NavBar activo: Interfaz moderna visible
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si hay problemas en la inicialización del NavBar
 */
async function toggleNavBarApp() {
    const toggleButton = document.getElementById('toggleNavBar');
    
    try {
        console.log('🔄 Alternando sistema NavBar...');
        
        // Verificar si NavBar necesita inicialización
        if (!navBarAppInstance || !navBarAppInstance.isReady()) {
            console.log('🚀 Inicializando nuevo NavBar...');
            
            // Mostrar estado de carga
            if (toggleButton) {
                toggleButton.textContent = 'Cargando NavBar...';
                toggleButton.disabled = true;
            }
            
            // Crear e inicializar nueva instancia
            navBarAppInstance = new NavBarApp();
            await navBarAppInstance.init();
            
            console.log('✅ NavBar inicializado exitosamente');
            
            // Actualizar botón para mostrar opción de volver
            if (toggleButton) {
                toggleButton.textContent = '📋 Volver a Ficha Original';
                toggleButton.style.background = '#dc3545';
                toggleButton.disabled = false;
            }
            
        } else {
            // NavBar ya inicializado - alternar vista
            console.log('🔄 Alternando vista entre sistemas...');
            navBarAppInstance.toggleOriginalView();
            
            // Actualizar botón según el estado actual
            if (toggleButton) {
                const navbarApp = document.getElementById('navbarApp');
                if (navbarApp && navbarApp.style.display === 'none') {
                    // Sistema legacy activo
                    toggleButton.textContent = '🚀 Abrir NavBar';
                    toggleButton.style.background = '#6f42c1';
                    console.log('✅ Cambiado a sistema legacy');
                } else {
                    // Sistema NavBar activo
                    toggleButton.textContent = '📋 Volver a Ficha Original';
                    toggleButton.style.background = '#dc3545';
                    console.log('✅ Cambiado a sistema NavBar');
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Error al alternar NavBar:', error);
        
        if (toggleButton) {
            alert('❌ Error al cargar el NavBar. Revisa la consola para más detalles.');
            toggleButton.textContent = '🚀 Abrir NavBar';
            toggleButton.style.background = '#6f42c1';
            toggleButton.disabled = false;
        }
    } finally {
        // Asegurar que el botón esté habilitado
        if (toggleButton) {
            toggleButton.disabled = false;
        }
    }
}

// ============================================
// FUNCIONES DE UTILIDAD Y DEBUGGING
// ============================================

/**
 * Obtiene la instancia actual del NavBar para debugging y acceso externo
 * 
 * PROPÓSITO:
 * - Proporciona acceso a la instancia del NavBar desde la consola
 * - Útil para debugging y testing
 * - Permite verificar el estado de inicialización
 * 
 * @returns {NavBarApp|null} La instancia actual del NavBar o null si no está inicializado
 * @example
 * // En la consola del navegador:
 * const navbar = getNavBarInstance();
 * console.log(navbar.isReady());
 */
function getNavBarInstance() {
    return navBarAppInstance;
}

/**
 * Resetea la instancia del NavBar y restaura el estado inicial
 * 
 * PROPÓSITO:
 * - Destruye completamente la instancia actual del NavBar
 * - Restaura el botón toggle a su estado inicial
 * - Útil para resolución de problemas y testing
 * 
 * FUNCIONAMIENTO:
 * 1. Llama al método destroy() de la instancia NavBar
 * 2. Resetea la variable global a null
 * 3. Restaura el texto y estilo del botón toggle
 * 
 * @returns {void}
 */
function resetNavBar() {
    console.log('🔄 Reseteando NavBar...');
    
    if (navBarAppInstance) {
        // Destruir instancia actual
        try {
            navBarAppInstance.destroy();
            console.log('✅ Instancia NavBar destruida');
        } catch (error) {
            console.warn('⚠️ Error al destruir NavBar:', error);
        }
        
        navBarAppInstance = null;
    }
    
    // Resetear botón toggle
    const toggleButton = document.getElementById('toggleNavBar');
    if (toggleButton) {
        toggleButton.textContent = '🚀 Abrir NavBar';
        toggleButton.style.background = '#6f42c1';
        toggleButton.disabled = false;
    }
    
    console.log('✅ NavBar reseteado completamente');
}

/**
 * Auto-inicializa el NavBar con Vista1 al cargar la página
 * 
 * PROPÓSITO:
 * - Proporciona inicialización automática del sistema NavBar
 * - Facilita el acceso directo al sistema moderno
 * - Mejora la experiencia del usuario
 * 
 * FUNCIONAMIENTO:
 * 1. Espera un pequeño delay para asegurar que el DOM esté listo
 * 2. Llama a toggleNavBarApp() para inicializar el NavBar
 * 3. Maneja errores de inicialización automática
 * 
 * NOTA:
 * - Delay de 100ms para evitar problemas de timing con el DOM
 * - Esta función es opcional y puede ser deshabilitada
 * 
 * @async
 * @returns {Promise<void>}
 */
async function autoInitNavBar() {
    try {
        console.log('🚀 Auto-inicializando NavBar con Vista1...');
        
        // Pequeño delay para asegurar que el DOM esté completamente cargado
        setTimeout(async () => {
            try {
                await toggleNavBarApp();
                console.log('✅ Auto-inicialización completada');
            } catch (error) {
                console.warn('⚠️ Error en auto-inicialización:', error);
                // No mostrar alert aquí para evitar interrumpir la carga de página
            }
        }, 100);
        
    } catch (error) {
        console.error('❌ Error al configurar auto-inicialización:', error);
    }
}

// ============================================
// EXPOSICIÓN GLOBAL PARA DEBUGGING Y ACCESO EXTERNO
// ============================================

// Hacer funciones disponibles globalmente para debugging, testing y acceso desde NavBar
window.getNavBarInstance = getNavBarInstance;
window.resetNavBar = resetNavBar;
window.guardarFicha = guardarFicha;
window.cargarFicha = cargarFicha;
window.toggleNavBarApp = toggleNavBarApp;

// Hacer funciones principales disponibles para el NavBar
window.exportToPDF = exportToPDF;
window.guardarFicha = guardarFicha;
window.cargarFicha = cargarFicha;
