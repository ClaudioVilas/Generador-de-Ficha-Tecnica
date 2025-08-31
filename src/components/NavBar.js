/**
 * NavBar Component - Navegación fija superior
 * Permite navegar entre 4 vistas manteniendo persistencia de datos
 */
class NavBar {
    constructor() {
        this.activeView = 'vista1'; // Vista por defecto
        this.container = null;
        this.onViewChange = null; // Callback para cambio de vista
    }

    /**
     * Inicializa el NavBar
     * @param {HTMLElement} container - Contenedor donde se renderizará
     * @param {Function} onViewChange - Callback ejecutado al cambiar vista
     */
    init(container, onViewChange) {
        this.container = container;
        this.onViewChange = onViewChange;
        this.render();
        this.setupEvents();
        console.log('NavBar inicializado correctamente');
    }

    /**
     * Renderiza la estructura del NavBar
     */
    render() {
        const navbarHTML = `
            <nav class="navbar-container" id="navbarContainer">
                <div class="navbar-content">
                    <div class="navbar-brand">
                        <h1>Ficha Técnica de Producción</h1>
                    </div>
                    <div class="navbar-navigation">
                        <button class="nav-btn ${this.activeView === 'vista1' ? 'active' : ''}" 
                                data-view="vista1" id="navVista1">
                            <span class="nav-icon">📋</span>
                            <span class="nav-text">Vista 1</span>
                        </button>
                        <button class="nav-btn ${this.activeView === 'vista2' ? 'active' : ''}" 
                                data-view="vista2" id="navVista2">
                            <span class="nav-icon">📊</span>
                            <span class="nav-text">Vista 2</span>
                        </button>
                        <button class="nav-btn ${this.activeView === 'vista3' ? 'active' : ''}" 
                                data-view="vista3" id="navVista3">
                            <span class="nav-icon">🔧</span>
                            <span class="nav-text">Vista 3</span>
                        </button>
                        <button class="nav-btn ${this.activeView === 'vista4' ? 'active' : ''}" 
                                data-view="vista4" id="navVista4">
                            <span class="nav-icon">✅</span>
                            <span class="nav-text">Vista 4</span>
                        </button>
                    </div>
                    <div class="navbar-actions">
                        <button id="exportAllPDF" class="action-btn export-btn">
                            <span class="btn-icon">📄</span>
                            <span class="btn-text">Exportar PDF</span>
                        </button>
                        <button id="saveData" class="action-btn save-btn">
                            <span class="btn-icon">💾</span>
                            <span class="btn-text">Guardar</span>
                        </button>
                        <button id="loadData" class="action-btn load-btn">
                            <span class="btn-icon">📁</span>
                            <span class="btn-text">Cargar</span>
                        </button>
                    </div>
                </div>
            </nav>
        `;

        this.container.innerHTML = navbarHTML;
    }

    /**
     * Configura los eventos del NavBar
     */
    setupEvents() {
        // Eventos de navegación entre vistas
        const navButtons = this.container.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetView = button.getAttribute('data-view');
                this.navigateToView(targetView);
            });
        });

        // Eventos de acciones (exportar, guardar, cargar)
        this.setupActionEvents();

        // Indicador visual de vista activa
        this.updateActiveIndicator();
    }

    /**
     * Configura eventos de las acciones (exportar, guardar, cargar)
     */
    setupActionEvents() {
        const exportBtn = this.container.querySelector('#exportAllPDF');
        const saveBtn = this.container.querySelector('#saveData');
        const loadBtn = this.container.querySelector('#loadData');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.handleExportPDF());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.handleSaveData());
        }

        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.handleLoadData());
        }
    }

    /**
     * Navega a una vista específica
     * @param {string} viewName - Nombre de la vista (vista1, vista2, vista3, vista4)
     */
    navigateToView(viewName) {
        // Validar vista
        const validViews = ['vista1', 'vista2', 'vista3', 'vista4'];
        if (!validViews.includes(viewName)) {
            console.error(`Vista inválida: ${viewName}`);
            return;
        }

        // Actualizar vista activa
        this.activeView = viewName;

        // Actualizar indicador visual
        this.updateActiveIndicator();

        // Ejecutar callback si está definido
        if (this.onViewChange) {
            this.onViewChange(viewName);
        }

        // Guardar vista activa en localStorage
        localStorage.setItem('activeView', viewName);

        console.log(`Navegado a: ${viewName}`);
    }

    /**
     * Actualiza el indicador visual de la vista activa
     */
    updateActiveIndicator() {
        const navButtons = this.container.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            const viewName = button.getAttribute('data-view');
            if (viewName === this.activeView) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Obtiene la vista activa actual
     * @returns {string} Nombre de la vista activa
     */
    getActiveView() {
        return this.activeView;
    }

    /**
     * Establece la vista activa programáticamente
     * @param {string} viewName - Nombre de la vista
     */
    setActiveView(viewName) {
        this.navigateToView(viewName);
    }

    /**
     * Maneja la exportación a PDF
     */
    handleExportPDF() {
        console.log('Exportando todas las vistas a PDF...');
        // Aquí se integrará con el sistema de PDF existente
        if (window.DataManager) {
            window.DataManager.exportAllViewsToPDF();
        } else {
            console.warn('DataManager no disponible para exportar PDF');
        }
    }

    /**
     * Maneja el guardado de datos
     */
    handleSaveData() {
        console.log('Guardando datos...');
        if (window.DataManager) {
            window.DataManager.saveAllData();
        } else {
            console.warn('DataManager no disponible para guardar datos');
        }
    }

    /**
     * Maneja la carga de datos
     */
    handleLoadData() {
        console.log('Cargando datos...');
        if (window.DataManager) {
            window.DataManager.loadAllData();
        } else {
            console.warn('DataManager no disponible para cargar datos');
        }
    }

    /**
     * Restaura la vista activa desde localStorage
     */
    restoreActiveView() {
        const savedView = localStorage.getItem('activeView');
        if (savedView && ['vista1', 'vista2', 'vista3', 'vista4'].includes(savedView)) {
            this.setActiveView(savedView);
        }
    }

    /**
     * Destruye el NavBar y limpia eventos
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.container = null;
        this.onViewChange = null;
        console.log('NavBar destruido');
    }
}

// Exportar para uso global
window.NavBar = NavBar;
