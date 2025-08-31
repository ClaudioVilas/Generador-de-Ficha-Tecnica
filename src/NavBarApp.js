/**
 * NavBarApp - Controlador principal de la aplicación NavBar
 * Inicializa y coordina todos los componentes del sistema NavBar
 */
class NavBarApp {
    constructor() {
        this.navbar = null;
        this.viewManager = null;
        this.dataManager = null;
        this.initialized = false;
        this.originalContent = null;
    }

    /**
     * Inicializa la aplicación NavBar
     */
    async init() {
        try {
            console.log('Iniciando aplicación NavBar...');

            // Guardar contenido original
            this.saveOriginalContent();

            // Crear estructura HTML
            this.createAppStructure();

            // Cargar estilos
            await this.loadStyles();

            // Inicializar componentes
            this.initializeComponents();

            // Configurar eventos
            this.setupEvents();

            // Cargar datos guardados si existen
            this.loadSavedData();

            this.initialized = true;
            console.log('Aplicación NavBar inicializada correctamente');

            // Trigger evento personalizado
            window.dispatchEvent(new CustomEvent('navbarAppReady'));

        } catch (error) {
            console.error('Error inicializando aplicación NavBar:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Guarda el contenido original de la página
     */
    saveOriginalContent() {
        const fichaContainer = document.getElementById('fichaContainer');
        if (fichaContainer) {
            this.originalContent = fichaContainer.cloneNode(true);
            fichaContainer.style.display = 'none';
        }

        // Ocultar controles originales
        const exportControls = document.querySelector('.export-controls');
        if (exportControls) {
            exportControls.style.display = 'none';
        }
    }

    /**
     * Crea la estructura HTML para la aplicación
     */
    createAppStructure() {
        const appHTML = `
            <div id="navbarApp" class="navbar-app">
                <!-- NavBar se renderizará aquí -->
                <div id="navbarContainer"></div>
                
                <!-- Área de contenido -->
                <div id="navbarContentArea" class="navbar-content-area">
                    <!-- Contenedor de vistas -->
                    <div id="viewContainer" class="view-container"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', appHTML);
    }

    /**
     * Carga los estilos necesarios
     */
    async loadStyles() {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'src/navbar-styles.css';
            link.onload = () => {
                console.log('Estilos NavBar cargados');
                resolve();
            };
            link.onerror = () => {
                console.error('Error cargando estilos NavBar');
                reject(new Error('Error cargando estilos'));
            };
            document.head.appendChild(link);
        });
    }

    /**
     * Inicializa todos los componentes
     */
    initializeComponents() {
        // Inicializar ViewManager
        this.viewManager = new ViewManager();
        const viewContainer = document.getElementById('viewContainer');
        this.viewManager.init(viewContainer);

        // Inicializar DataManager
        this.dataManager = new DataManager();
        this.dataManager.init(this.viewManager);

        // Inicializar NavBar
        this.navbar = new NavBar();
        const navbarContainer = document.getElementById('navbarContainer');
        this.navbar.init(navbarContainer, (viewName) => {
            this.handleViewChange(viewName);
        });

        // Hacer disponibles globalmente
        window.NavBarApp = this;
        window.NavBarViewManager = this.viewManager;
        window.NavBarDataManager = this.dataManager;
    }

    /**
     * Configura los eventos de la aplicación
     */
    setupEvents() {
        // Auto-guardado cada 30 segundos
        setInterval(() => {
            if (this.dataManager) {
                this.dataManager.saveToLocalStorage();
            }
        }, 30000);

        // Guardar antes de cerrar la página
        window.addEventListener('beforeunload', () => {
            if (this.dataManager) {
                this.dataManager.saveToLocalStorage();
            }
        });

        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Maneja el cambio de vista
     * @param {string} viewName - Nombre de la vista
     */
    handleViewChange(viewName) {
        if (this.viewManager) {
            this.viewManager.showView(viewName);
            
            // Agregar animación
            const viewContainer = document.getElementById('viewContainer');
            if (viewContainer) {
                viewContainer.classList.add('view-transition');
                setTimeout(() => {
                    viewContainer.classList.remove('view-transition');
                }, 300);
            }
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
