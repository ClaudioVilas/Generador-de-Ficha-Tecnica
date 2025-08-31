/**
 * ViewManager - Administrador de vistas
 * Controla la navegación entre vistas y mantiene la persistencia de datos
 */
class ViewManager {
    constructor() {
        this.currentView = null;
        this.viewContainer = null;
        this.views = {
            vista1: null,
            vista2: null,
            vista3: null,
            vista4: null
        };
        this.viewData = {
            vista1: {},
            vista2: {},
            vista3: {},
            vista4: {}
        };
    }

    /**
     * Inicializa el ViewManager
     * @param {HTMLElement} container - Contenedor donde se renderizarán las vistas
     */
    init(container) {
        this.viewContainer = container;
        this.loadViewData();
        this.showView('vista1'); // Vista por defecto
        console.log('ViewManager inicializado correctamente');
    }

    /**
     * Muestra una vista específica
     * @param {string} viewName - Nombre de la vista a mostrar
     */
    showView(viewName) {
        // Validar vista
        if (!this.views.hasOwnProperty(viewName)) {
            console.error(`Vista no válida: ${viewName}`);
            return;
        }

        // Guardar datos de la vista actual antes de cambiar
        if (this.currentView) {
            this.saveCurrentViewData();
        }

        // Ocultar vista actual
        this.hideCurrentView();

        // Mostrar nueva vista
        this.currentView = viewName;
        this.renderView(viewName);

        console.log(`Vista cambiada a: ${viewName}`);
    }

    /**
     * Renderiza una vista específica
     * @param {string} viewName - Nombre de la vista a renderizar
     */
    renderView(viewName) {
        if (!this.viewContainer) {
            console.error('Contenedor de vistas no inicializado');
            return;
        }

        // Limpiar contenedor
        this.viewContainer.innerHTML = '';

        // Crear instancia de vista si no existe
        if (!this.views[viewName]) {
            this.views[viewName] = this.createViewInstance(viewName);
        }

        // Renderizar vista
        const viewInstance = this.views[viewName];
        if (viewInstance && viewInstance.render) {
            viewInstance.render(this.viewContainer);
            
            // Cargar datos de la vista
            if (this.viewData[viewName] && viewInstance.loadData) {
                viewInstance.loadData(this.viewData[viewName]);
            }
        } else {
            console.error(`No se pudo renderizar la vista: ${viewName}`);
        }
    }

    /**
     * Crea una instancia de vista
     * @param {string} viewName - Nombre de la vista
     * @returns {Object} Instancia de la vista
     */
    createViewInstance(viewName) {
        switch (viewName) {
            case 'vista1':
                return new Vista1();
            case 'vista2':
                return new Vista2();
            case 'vista3':
                return new Vista3();
            case 'vista4':
                return new Vista4();
            default:
                console.error(`Tipo de vista desconocido: ${viewName}`);
                return null;
        }
    }

    /**
     * Oculta la vista actual
     */
    hideCurrentView() {
        if (this.viewContainer) {
            this.viewContainer.style.display = 'none';
            setTimeout(() => {
                this.viewContainer.style.display = 'block';
            }, 100);
        }
    }

    /**
     * Guarda los datos de la vista actual
     */
    saveCurrentViewData() {
        if (this.currentView && this.views[this.currentView]) {
            const viewInstance = this.views[this.currentView];
            if (viewInstance.getData) {
                this.viewData[this.currentView] = viewInstance.getData();
                this.saveViewData();
            }
        }
    }

    /**
     * Guarda todos los datos de las vistas en localStorage
     */
    saveViewData() {
        try {
            localStorage.setItem('viewsData', JSON.stringify(this.viewData));
            console.log('Datos de vistas guardados en localStorage');
        } catch (error) {
            console.error('Error guardando datos de vistas:', error);
        }
    }

    /**
     * Carga los datos de las vistas desde localStorage
     */
    loadViewData() {
        try {
            const savedData = localStorage.getItem('viewsData');
            if (savedData) {
                this.viewData = JSON.parse(savedData);
                console.log('Datos de vistas cargados desde localStorage');
            }
        } catch (error) {
            console.error('Error cargando datos de vistas:', error);
            // Resetear a valores por defecto
            this.viewData = {
                vista1: {},
                vista2: {},
                vista3: {},
                vista4: {}
            };
        }
    }

    /**
     * Obtiene los datos de una vista específica
     * @param {string} viewName - Nombre de la vista
     * @returns {Object} Datos de la vista
     */
    getViewData(viewName) {
        return this.viewData[viewName] || {};
    }

    /**
     * Establece los datos de una vista específica
     * @param {string} viewName - Nombre de la vista
     * @param {Object} data - Datos a establecer
     */
    setViewData(viewName, data) {
        if (this.viewData.hasOwnProperty(viewName)) {
            this.viewData[viewName] = data;
            this.saveViewData();
        }
    }

    /**
     * Obtiene todos los datos de todas las vistas
     * @returns {Object} Todos los datos de las vistas
     */
    getAllData() {
        // Asegurar que los datos actuales estén guardados
        this.saveCurrentViewData();
        return this.viewData;
    }

    /**
     * Carga todos los datos en todas las vistas
     * @param {Object} allData - Datos de todas las vistas
     */
    setAllData(allData) {
        this.viewData = allData;
        this.saveViewData();
        
        // Recargar vista actual si está activa
        if (this.currentView) {
            this.renderView(this.currentView);
        }
    }

    /**
     * Limpia todos los datos de las vistas
     */
    clearAllData() {
        this.viewData = {
            vista1: {},
            vista2: {},
            vista3: {},
            vista4: {}
        };
        localStorage.removeItem('viewsData');
        
        // Recargar vista actual
        if (this.currentView) {
            this.renderView(this.currentView);
        }
        
        console.log('Todos los datos de vistas limpiados');
    }

    /**
     * Obtiene la vista activa actual
     * @returns {string} Nombre de la vista activa
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Destruye el ViewManager y limpia recursos
     */
    destroy() {
        // Guardar datos antes de destruir
        this.saveCurrentViewData();
        
        // Limpiar vistas
        Object.values(this.views).forEach(view => {
            if (view && view.destroy) {
                view.destroy();
            }
        });
        
        this.views = {};
        this.currentView = null;
        this.viewContainer = null;
        
        console.log('ViewManager destruido');
    }
}

// Exportar para uso global
window.ViewManager = ViewManager;
