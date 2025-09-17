/**
 * ============================================
 * NAVBARAPP - CONTROLADOR PRINCIPAL DEL SISTEMA NAVBAR
 * ============================================
 * 
 * PROPÓSITO:
 * NavBarApp es el controlador principal que orquesta todo el sistema NavBar moderno.
 * Actúa como punto central de coordinación entre componentes, gestión de datos,
 * vistas y eventos de la aplicación.
 * 
 * ARQUITECTURA:
 * - Singleton Pattern: Una sola instancia por aplicación
 * - Component Orchestrator: Coordina NavBar, ViewManager y DataManager
 * - Event Hub: Maneja comunicación entre componentes
 * - State Manager: Gestiona el estado global de la aplicación
 * 
 * RESPONSABILIDADES:
 * 1. Inicialización y destrucción del sistema
 * 2. Coordinación entre NavBar, ViewManager y DataManager
 * 3. Gestión de estilos y estructura HTML
 * 4. Manejo de eventos globales
 * 5. Preservación y restauración del contenido original
 * 
 * FLUJO DE INICIALIZACIÓN:
 * init() → saveOriginalContent() → createAppStructure() → loadStyles() → 
 * initializeComponents() → setupEvents() → loadSavedData() → ready
 * 
 * @class NavBarApp
 * @version 1.0.0
 * @author Sistema NavBar
 */
class NavBarApp {
    /**
     * Constructor de NavBarApp
     * 
     * INICIALIZACIÓN:
     * - Establece valores por defecto para todos los componentes
     * - No ejecuta lógica pesada (se hace en init())
     * - Prepara las propiedades de estado
     * 
     * PROPIEDADES DE ESTADO:
     * @property {NavBar|null} navbar - Instancia del componente NavBar
     * @property {ViewManager|null} viewManager - Gestor de vistas (Vista1-4)
     * @property {DataManager|null} dataManager - Gestor de datos y persistencia
     * @property {boolean} initialized - Estado de inicialización completa
     * @property {string|null} originalContent - HTML original para restauración
     */
    constructor() {
        console.log('🏗️ Construyendo nueva instancia de NavBarApp...');
        
        // Componentes principales del sistema
        this.navbar = null;          // Componente de navegación
        this.viewManager = null;     // Gestor de vistas modernas  
        this.dataManager = null;     // Gestor de datos y persistencia
        
        // Estado de la aplicación
        this.initialized = false;    // Flag de inicialización completa
        this.originalContent = null; // Contenido HTML original para restauración
        
        console.log('✅ Instancia NavBarApp creada, lista para inicialización');
    }

    /**
     * Inicializa completamente la aplicación NavBar
     * 
     * PROCESO DE INICIALIZACIÓN:
     * 1. Preserva el contenido HTML original de la página
     * 2. Crea la estructura HTML del sistema NavBar
     * 3. Carga estilos CSS específicos del NavBar
     * 4. Inicializa todos los componentes (NavBar, ViewManager, DataManager)
     * 5. Configura event listeners y comunicación entre componentes
     * 6. Carga datos previamente guardados si existen
     * 7. Marca el sistema como inicializado y listo
     * 
     * MANEJO DE ERRORES:
     * - Captura y maneja errores de inicialización
     * - Proporciona rollback automático en caso de falla
     * - Emite eventos personalizados para notificación externa
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Si algún paso de inicialización falla
     * @fires window#navbarAppReady - Cuando la inicialización está completa
     */
    async init() {
        try {
            console.log('🚀 Iniciando aplicación NavBar...');

            // 1. Preservar contenido original para posible restauración
            console.log('💾 Guardando contenido original...');
            this.saveOriginalContent();

            // 2. Crear estructura HTML del sistema NavBar
            console.log('🏗️ Creando estructura de aplicación...');
            this.createAppStructure();

            // 3. Cargar estilos CSS específicos
            console.log('🎨 Cargando estilos...');
            await this.loadStyles();

            // 4. Inicializar todos los componentes principales
            console.log('⚙️ Inicializando componentes...');
            this.initializeComponents();

            // 5. Configurar eventos y comunicación entre componentes
            console.log('🔗 Configurando eventos...');
            this.setupEvents();

            // 6. Cargar datos previamente guardados
            console.log('📂 Cargando datos guardados...');
            this.loadSavedData();

            // 7. Marcar como inicializado y emitir evento
            this.initialized = true;
            console.log('✅ Aplicación NavBar inicializada correctamente');

            // Emitir evento personalizado para notificar inicialización completa
            window.dispatchEvent(new CustomEvent('navbarAppReady', {
                detail: { navBarApp: this }
            }));

        } catch (error) {
            console.error('❌ Error inicializando aplicación NavBar:', error);
            this.handleInitializationError(error);
            throw error; // Re-lanzar para manejo externo si es necesario
        }
    }

    // ============================================
    // GESTIÓN DE CONTENIDO ORIGINAL
    // ============================================

    /**
     * Preserva el contenido original de la página para restauración posterior
     * 
     * PROPÓSITO:
     * - Mantiene una copia del HTML original antes de la transformación NavBar
     * - Permite restaurar completamente el estado original si es necesario
     * - Oculta elementos del sistema legacy durante el uso del NavBar
     * 
     * FUNCIONAMIENTO:
     * 1. Busca el contenedor principal de la ficha original
     * 2. Crea una copia profunda (cloneNode) del contenido
     * 3. Oculta la ficha original y controles legacy
     * 4. Preserva la copia para restauración futura
     * 
     * ELEMENTOS GESTIONADOS:
     * - #fichaContainer: Contenedor principal de la ficha legacy
     * - .export-controls: Controles de exportación originales
     * 
     * @returns {void}
     */
    saveOriginalContent() {
        console.log('💾 Preservando contenido original...');
        
        // Buscar y preservar contenedor principal
        const fichaContainer = document.getElementById('fichaContainer');
        if (fichaContainer) {
            // Crear copia profunda del contenido original
            this.originalContent = fichaContainer.cloneNode(true);
            // Ocultar la ficha original
            fichaContainer.style.display = 'none';
            console.log('✅ Ficha original preservada y ocultada');
        } else {
            console.warn('⚠️ No se encontró fichaContainer');
        }

        // Ocultar controles de exportación legacy
        const exportControls = document.querySelector('.export-controls');
        if (exportControls) {
            exportControls.style.display = 'none';
            console.log('✅ Controles de exportación legacy ocultados');
        } else {
            console.warn('⚠️ No se encontraron controles de exportación');
        }
    }

    // ============================================
    // CREACIÓN DE ESTRUCTURA HTML
    // ============================================

    /**
     * Crea la estructura HTML completa para la aplicación NavBar
     * 
     * PROPÓSITO:
     * - Genera el contenedor principal y estructura base del sistema NavBar
     * - Establece las áreas para navegación, contenido y componentes
     * - Proporciona la base HTML sobre la cual operan todos los componentes
     * 
     * ESTRUCTURA GENERADA:
     * ```
     * <div id="navbarApp">
     *   <div id="navbarContainer"><!-- NavBar component --></div>
     *   <div id="mainContent"><!-- Vista content --></div>
     * </div>
     * ```
     * 
     * INTEGRACIÓN:
     * - Se inserta en el body después del contenido original
     * - Proporciona IDs específicos para que los componentes se anclen
     * - Establece estructura semántica para CSS y JavaScript
     * 
     * @returns {void}
     */
    createAppStructure() {
        console.log('🏗️ Creando estructura HTML de la aplicación...');
        // Definir estructura HTML del sistema NavBar
        const appHTML = `
            <div id="navbarApp" class="navbar-app">
                <!-- Contenedor para el componente NavBar -->
                <div id="navbarContainer"></div>
                
                <!-- Área principal de contenido de vistas -->
                <div id="navbarContentArea" class="navbar-content-area">
                    <!-- Contenedor donde se renderizan las vistas (Vista1-4) -->
                    <div id="viewContainer" class="view-container"></div>
                </div>
            </div>
        `;

        // Insertar estructura en el DOM
        document.body.insertAdjacentHTML('beforeend', appHTML);
        console.log('✅ Estructura HTML creada e insertada en el DOM');
    }

    // ============================================
    // CARGA DE ESTILOS CSS
    // ============================================

    /**
     * Carga los estilos CSS específicos del sistema NavBar
     * 
     * PROPÓSITO:
     * - Carga dinámicamente los estilos necesarios para el NavBar
     * - Gestiona la carga asíncrona para evitar bloqueos
     * - Proporciona manejo de errores para estilos faltantes
     * 
     * FUNCIONAMIENTO:
     * 1. Crea elemento <link> dinámicamente
     * 2. Configura la ruta al archivo de estilos
     * 3. Maneja eventos de carga y error
     * 4. Resuelve la promesa cuando los estilos están listos
     * 
     * ARCHIVO CARGADO:
     * - src/navbar-styles.css: Estilos específicos del NavBar
     * 
     * @async
     * @returns {Promise<void>} Promesa que se resuelve cuando los estilos están cargados
     * @throws {Error} Si hay problemas cargando los estilos
     */
    async loadStyles() {
        console.log('🎨 Cargando estilos CSS del NavBar...');
        
        return new Promise((resolve, reject) => {
            // Crear elemento link para cargar CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'src/navbar-styles.css';
            
            // Manejar carga exitosa
            link.onload = () => {
                console.log('✅ Estilos NavBar cargados correctamente');
                resolve();
            };
            
            // Manejar errores de carga
            link.onerror = () => {
                console.error('❌ Error cargando estilos NavBar');
                reject(new Error('Error cargando estilos del NavBar'));
            };
            
            // Insertar en el head del documento
            document.head.appendChild(link);
        });
    }

    // ============================================
    // INICIALIZACIÓN DE COMPONENTES
    // ============================================

    /**
     * Inicializa todos los componentes principales del sistema NavBar
     * 
     * PROPÓSITO:
     * - Crea e inicializa las instancias de todos los componentes principales
     * - Establece las conexiones y dependencias entre componentes
     * - Configura el orden correcto de inicialización
     * 
     * ORDEN DE INICIALIZACIÓN:
     * 1. ViewManager: Gestor de vistas (Vista1-4)
     * 2. DataManager: Gestor de datos y persistencia
     * 3. NavBar: Componente de navegación (depende de ViewManager)
     * 
     * DEPENDENCIAS:
     * - ViewManager necesita el contenedor de vistas
     * - DataManager necesita referencia al ViewManager
     * - NavBar necesita ViewManager para navegación y callback de cambio de vista
     * 
     * EXPOSICIÓN GLOBAL:
     * - Componentes se exponen globalmente para acceso desde sistema legacy
     * 
     * @returns {void}
     * @throws {Error} Si algún componente falla en su inicialización
     */
    initializeComponents() {
        console.log('⚙️ Inicializando componentes principales...');
        
        try {
            // 1. Inicializar ViewManager (gestor de vistas)
            console.log('📋 Inicializando ViewManager...');
            this.viewManager = new ViewManager();
            const viewContainer = document.getElementById('viewContainer');
            if (!viewContainer) {
                throw new Error('Contenedor de vistas no encontrado');
            }
            this.viewManager.init(viewContainer);

            // 2. Inicializar DataManager (gestor de datos)
            console.log('💾 Inicializando DataManager...');
            this.dataManager = new DataManager();
            this.dataManager.init(this.viewManager);

            // 3. Inicializar NavBar (componente de navegación)
            console.log('🧭 Inicializando NavBar...');
            this.navbar = new NavBar();
            const navbarContainer = document.getElementById('navbarContainer');
            if (!navbarContainer) {
                throw new Error('Contenedor del NavBar no encontrado');
            }
            this.navbar.init(navbarContainer, (viewName) => {
                this.handleViewChange(viewName);
            });

            // Exponer componentes globalmente para compatibilidad y debugging
            window.NavBarApp = this;
            window.NavBarViewManager = this.viewManager;
            window.NavBarDataManager = this.dataManager;
            
            // Compatibilidad con sistema legacy
            window.DataManager = this.dataManager;
            window.dataManager = this.dataManager;
            
            // Función global para resetear (útil para debugging)
            window.resetToDefaults = () => this.dataManager.resetToDefaults();
            
            console.log('✅ Todos los componentes inicializados correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando componentes:', error);
            throw error;
        }
    }

    // ============================================
    // CONFIGURACIÓN DE EVENTOS
    // ============================================

    /**
     * Configura todos los eventos de la aplicación NavBar
     * 
     * PROPÓSITO:
     * - Establece auto-guardado periódico de datos
     * - Configura eventos de ventana (resize, beforeunload)
     * - Maneja atajos de teclado y eventos globales
     * 
     * EVENTOS CONFIGURADOS:
     * 1. Auto-guardado cada 30 segundos
     * 2. Guardado antes de cerrar la página
     * 3. Manejo de redimensionamiento de ventana
     * 4. Atajos de teclado para navegación
     * 
     * @returns {void}
     */
    setupEvents() {
        console.log('🔗 Configurando eventos globales...');
        
        try {
            // 1. Auto-guardado periódico cada 30 segundos
            setInterval(() => {
                if (this.dataManager) {
                    this.dataManager.saveToLocalStorage();
                    console.log('💾 Auto-guardado realizado');
                }
            }, 30000);

            // 2. Guardar datos antes de cerrar la página
            window.addEventListener('beforeunload', () => {
                if (this.dataManager) {
                    this.dataManager.saveToLocalStorage();
                    console.log('💾 Guardado antes de cerrar página');
                }
            });

            // 3. Manejar cambios de tamaño de ventana
            window.addEventListener('resize', () => {
                this.handleResize();
            });

            // 4. Atajos de teclado para navegación
            document.addEventListener('keydown', (e) => {
                this.handleKeyboardShortcuts(e);
            });
            
            console.log('✅ Eventos configurados correctamente');
            
        } catch (error) {
            console.error('❌ Error configurando eventos:', error);
        }
    }

    // ============================================
    // MANEJO DE CAMBIOS DE VISTA
    // ============================================

    /**
     * Maneja el cambio de vista en el sistema NavBar
     * 
     * PROPÓSITO:
     * - Coordina el cambio entre vistas (Vista1, Vista2, Vista3, Vista4)
     * - Aplica animaciones de transición
     * - Actualiza el estado de navegación
     * 
     * FUNCIONAMIENTO:
     * 1. Utiliza ViewManager para cambiar la vista activa
     * 2. Aplica clase CSS para animación de transición
     * 3. Remueve la clase después de la animación
     * 
     * @param {string} viewName - Nombre de la vista a mostrar ('vista1', 'vista2', etc.)
     * @returns {void}
     */
    handleViewChange(viewName) {
        console.log(`🔄 Cambiando a vista: ${viewName}`);
        
        if (this.viewManager) {
            // Cambiar vista usando ViewManager
            this.viewManager.showView(viewName);
            
            // Aplicar animación de transición
            const viewContainer = document.getElementById('viewContainer');
            if (viewContainer) {
                viewContainer.classList.add('view-transition');
                setTimeout(() => {
                    viewContainer.classList.remove('view-transition');
                }, 300);
            }
            
            console.log(`✅ Vista cambiada a: ${viewName}`);
        } else {
            console.error('❌ ViewManager no disponible para cambio de vista');
        }
    }

    /**
     * Carga datos guardados previamente
     */
    loadSavedData() {
        if (this.dataManager) {
            this.dataManager.loadFromLocalStorage();
        }

        // Restaurar vista activa
        if (this.navbar) {
            this.navbar.restoreActiveView();
        }
    }

    /**
     * Maneja errores de inicialización
     * @param {Error} error - Error ocurrido
     */
    handleInitializationError(error) {
        console.error('Error de inicialización:', error);
        
        // Mostrar mensaje de error al usuario
        const errorHTML = `
            <div class="navbar-error">
                <h3>Error inicializando NavBar</h3>
                <p>Ha ocurrido un error al cargar la aplicación NavBar:</p>
                <pre>${error.message}</pre>
                <button onclick="location.reload()">Recargar Página</button>
            </div>
        `;

        const errorContainer = document.createElement('div');
        errorContainer.innerHTML = errorHTML;
        errorContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            max-width: 500px;
        `;

        document.body.appendChild(errorContainer);
    }

    /**
     * Maneja cambios de tamaño de ventana
     */
    handleResize() {
        // Reajustar layout si es necesario
        if (this.initialized) {
            // Aquí puedes agregar lógica específica para responsive
            console.log('Reajustando layout para nuevo tamaño de ventana');
        }
    }

    /**
     * Maneja teclas de acceso rápido
     * @param {KeyboardEvent} e - Evento de teclado
     */
    handleKeyboardShortcuts(e) {
        if (!this.initialized) return;

        // Ctrl/Cmd + número para cambiar vista
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const viewNumber = parseInt(e.key);
            const viewName = `vista${viewNumber}`;
            this.navbar.navigateToView(viewName);
        }

        // Ctrl/Cmd + S para guardar
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.dataManager.saveAllData();
        }

        // Ctrl/Cmd + O para abrir
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            this.dataManager.loadAllData();
        }

        // Ctrl/Cmd + P para exportar PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            this.dataManager.exportAllViewsToPDF();
        }

        // Escape para volver a ficha original
        if (e.key === 'Escape') {
            this.toggleOriginalView();
        }
    }

    /**
     * Alterna entre NavBar y vista original
     */
    toggleOriginalView() {
        const navbarApp = document.getElementById('navbarApp');
        const fichaContainer = document.getElementById('fichaContainer');
        const exportControls = document.querySelector('.export-controls');

        if (navbarApp.style.display === 'none') {
            // Mostrar NavBar
            navbarApp.style.display = 'block';
            if (fichaContainer) fichaContainer.style.display = 'none';
            if (exportControls) exportControls.style.display = 'none';
        } else {
            // Mostrar ficha original
            navbarApp.style.display = 'none';
            if (fichaContainer) fichaContainer.style.display = 'block';
            if (exportControls) exportControls.style.display = 'flex';
        }
    }

    /**
     * Obtiene estadísticas de la aplicación
     * @returns {Object} Estadísticas
     */
    getAppStats() {
        const stats = {
            initialized: this.initialized,
            currentView: this.viewManager ? this.viewManager.getCurrentView() : null,
            dataStats: this.dataManager ? this.dataManager.getStats() : null,
            activeTime: this.initialized ? Date.now() - this.initTime : 0
        };

        return stats;
    }

    /**
     * Exporta configuración de la aplicación
     * @returns {Object} Configuración
     */
    exportConfig() {
        return {
            version: '1.0',
            timestamp: new Date().toISOString(),
            activeView: this.navbar ? this.navbar.getActiveView() : 'vista1',
            settings: {
                autoSave: true,
                saveInterval: 30000,
                keyboardShortcuts: true
            }
        };
    }

    /**
     * Importa configuración de la aplicación
     * @param {Object} config - Configuración a importar
     */
    importConfig(config) {
        try {
            if (config.activeView && this.navbar) {
                this.navbar.setActiveView(config.activeView);
            }

            console.log('Configuración importada correctamente');
        } catch (error) {
            console.error('Error importando configuración:', error);
        }
    }

    /**
     * Reinicia la aplicación
     */
    restart() {
        this.destroy();
        setTimeout(() => {
            this.init();
        }, 100);
    }

    /**
     * Destruye la aplicación y limpia recursos
     */
    destroy() {
        try {
            // Destruir componentes
            if (this.navbar) {
                this.navbar.destroy();
                this.navbar = null;
            }

            if (this.viewManager) {
                this.viewManager.destroy();
                this.viewManager = null;
            }

            if (this.dataManager) {
                this.dataManager.destroy();
                this.dataManager = null;
            }

            // Remover HTML
            const navbarApp = document.getElementById('navbarApp');
            if (navbarApp) {
                navbarApp.remove();
            }

            // Restaurar contenido original
            const fichaContainer = document.getElementById('fichaContainer');
            const exportControls = document.querySelector('.export-controls');
            
            if (fichaContainer) fichaContainer.style.display = 'block';
            if (exportControls) exportControls.style.display = 'flex';

            // Limpiar variables globales
            delete window.NavBarApp;
            delete window.NavBarViewManager;
            delete window.NavBarDataManager;

            this.initialized = false;
            console.log('Aplicación NavBar destruida');

        } catch (error) {
            console.error('Error destruyendo aplicación:', error);
        }
    }

    /**
     * Verifica si la aplicación está lista
     * @returns {boolean} True si está inicializada
     */
    isReady() {
        return this.initialized;
    }
}

// Hacer disponible globalmente
window.NavBarApp = NavBarApp;

// Auto-inicialización cuando se carga el script
document.addEventListener('DOMContentLoaded', () => {
    // La aplicación se inicializará cuando el usuario haga clic en el botón NavBar
    console.log('NavBarApp lista para inicializar');
});
