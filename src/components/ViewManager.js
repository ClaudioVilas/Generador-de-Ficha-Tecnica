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
        this.data = {
            generalInfo: {
                marca: '',
                usuario: '',
                articulo: '',
                rubro: '',
                fichaProduccion: '',
                descripcion: '',
                organizacion: ''
            },
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
        this.loadData();
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
            this.syncGeneralInfoFromCurrentView();
        }

        // Ocultar vista actual
        this.hideCurrentView();

        // Mostrar nueva vista
        this.currentView = viewName;
        this.renderView(viewName);

        // Sincronizar información general en la nueva vista
        this.syncGeneralInfoToCurrentView();

        console.log(`Vista cambiada a: ${viewName}`);
    }

    /**
     * Oculta la vista actual
     */
    hideCurrentView() {
        if (this.currentView && this.views[this.currentView]) {
            // Destruir la vista actual si tiene el método
            if (this.views[this.currentView].destroy) {
                this.views[this.currentView].destroy();
            }
            this.views[this.currentView] = null;
        }
        
        // Limpiar el contenedor
        if (this.viewContainer) {
            this.viewContainer.innerHTML = '';
        }
    }

    /**
     * Renderiza una vista específica
     * @param {string} viewName - Nombre de la vista a renderizar
     */
    renderView(viewName) {
        try {
            // Crear instancia de la vista
            const ViewClass = window[viewName.charAt(0).toUpperCase() + viewName.slice(1)];
            if (!ViewClass) {
                throw new Error(`Clase de vista ${viewName} no encontrada`);
            }

            const viewInstance = new ViewClass();
            this.views[viewName] = viewInstance;

            // Renderizar la vista
            viewInstance.render(this.viewContainer);

            // Cargar datos si existen
            if (this.data[viewName] && viewInstance.loadData) {
                viewInstance.loadData(this.data[viewName]);
            }

            console.log(`Vista ${viewName} renderizada correctamente`);
        } catch (error) {
            console.error(`Error renderizando vista ${viewName}:`, error);
            this.viewContainer.innerHTML = `
                <div class="error-container">
                    <h2>Error cargando vista</h2>
                    <p>No se pudo cargar la vista ${viewName}</p>
                    <button onclick="location.reload()">Recargar página</button>
                </div>
            `;
        }
    }

    /**
     * Guarda los datos de la vista actual
     */
    saveCurrentViewData() {
        if (this.currentView && this.views[this.currentView]) {
            const viewInstance = this.views[this.currentView];
            if (viewInstance.getData) {
                this.data[this.currentView] = viewInstance.getData();
                this.saveData();
                console.log(`Datos de ${this.currentView} guardados`);
            }
        }
    }

    /**
     * Guarda todos los datos en localStorage
     */
    saveData() {
        try {
            localStorage.setItem('navbarAppData', JSON.stringify(this.data));
            console.log('Datos guardados en localStorage');
        } catch (error) {
            console.error('Error guardando datos:', error);
        }
    }

    /**
     * Carga los datos guardados en localStorage
     */
    loadData() {
        try {
            const savedData = localStorage.getItem('navbarAppData');
            if (savedData) {
                this.data = JSON.parse(savedData);
                console.log('Datos cargados desde localStorage');
            } else {
                // Inicializar con información general vacía
                this.data = {
                    generalInfo: {
                        clienteNombre: '',
                        clienteRut: '',
                        ordenCompra: '',
                        fechaSolicitud: '',
                        fechaRequerida: '',
                        tipoTrabajo: '',
                        descripcionGeneral: ''
                    },
                    vista1: {},
                    vista2: {},
                    vista3: {},
                    vista4: {}
                };
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            this.data = {
                generalInfo: {
                    clienteNombre: '',
                    clienteRut: '',
                    ordenCompra: '',
                    fechaSolicitud: '',
                    fechaRequerida: '',
                    tipoTrabajo: '',
                    descripcionGeneral: ''
                },
                vista1: {},
                vista2: {},
                vista3: {},
                vista4: {}
            };
        }
    }

    /**
     * Sincroniza la información general desde la vista actual hacia el modelo de datos
     */
    syncGeneralInfoFromCurrentView() {
        if (!this.currentView) return;

        // Asegurar que la estructura de datos existe
        if (!this.data) {
            this.data = {};
        }
        if (!this.data.generalInfo) {
            this.data.generalInfo = {
                marca: '',
                usuario: '',
                articulo: '',
                rubro: '',
                fichaProduccion: '',
                descripcion: '',
                organizacion: ''
            };
        }

        const generalInfoInputs = {
            marca: document.querySelector('[data-field="marca"]'),
            usuario: document.querySelector('[data-field="usuario"]'),
            articulo: document.querySelector('[data-field="articulo"]'),
            rubro: document.querySelector('[data-field="rubro"]'),
            fichaProduccion: document.querySelector('[data-field="fichaProduccion"]'),
            descripcion: document.querySelector('[data-field="descripcion"]'),
            organizacion: document.querySelector('[data-field="organizacion"]')
        };

        // Actualizar los datos centrales con los valores actuales
        Object.keys(generalInfoInputs).forEach(key => {
            const input = generalInfoInputs[key];
            if (input) {
                this.data.generalInfo[key] = input.value || '';
            }
        });

        console.log('Información general sincronizada desde vista actual');
    }

    /**
     * Sincroniza la información general hacia la vista actual desde el modelo de datos
     */
    syncGeneralInfoToCurrentView() {
        if (!this.currentView) return;

        // Asegurar que la estructura de datos existe
        if (!this.data) {
            this.data = {};
        }
        if (!this.data.generalInfo) {
            this.data.generalInfo = {
                marca: '',
                usuario: '',
                articulo: '',
                rubro: '',
                fichaProduccion: '',
                descripcion: '',
                organizacion: ''
            };
        }

        // Esperar un poco para que los elementos se rendericen
        setTimeout(() => {
            const generalInfoInputs = {
                marca: document.querySelector('[data-field="marca"]'),
                usuario: document.querySelector('[data-field="usuario"]'),
                articulo: document.querySelector('[data-field="articulo"]'),
                rubro: document.querySelector('[data-field="rubro"]'),
                fichaProduccion: document.querySelector('[data-field="fichaProduccion"]'),
                descripcion: document.querySelector('[data-field="descripcion"]'),
                organizacion: document.querySelector('[data-field="organizacion"]')
            };

            // Aplicar los datos centrales a los inputs de la vista actual
            Object.keys(generalInfoInputs).forEach(key => {
                const input = generalInfoInputs[key];
                if (input) {
                    input.value = this.data.generalInfo[key] || '';
                    
                    // Remover event listeners existentes para evitar duplicados
                    const newInput = input.cloneNode(true);
                    input.parentNode.replaceChild(newInput, input);
                    
                    // Agregar event listener para sincronización en tiempo real
                    newInput.addEventListener('input', () => {
                        this.data.generalInfo[key] = newInput.value || '';
                        this.saveData(); // Guardar inmediatamente
                        console.log(`Campo ${key} actualizado globalmente`);
                    });

                    newInput.addEventListener('change', () => {
                        this.data.generalInfo[key] = newInput.value || '';
                        this.saveData(); // Guardar inmediatamente
                        console.log(`Campo ${key} actualizado globalmente`);
                    });
                }
            });

            console.log('Información general sincronizada hacia vista actual');
        }, 100);
    }

    /**
     * Obtiene los datos de una vista específica
     * @param {string} viewName - Nombre de la vista
     * @returns {Object} Datos de la vista
     */
    getViewData(viewName) {
        return this.data[viewName] || {};
    }

    /**
     * Establece los datos de una vista específica
     * @param {string} viewName - Nombre de la vista
     * @param {Object} data - Datos a establecer
     */
    setViewData(viewName, data) {
        if (this.data.hasOwnProperty(viewName)) {
            this.data[viewName] = data;
            this.saveData();
            console.log(`Datos de ${viewName} actualizados`);
        }
    }

    /**
     * Obtiene todos los datos de todas las vistas
     * @returns {Object} Todos los datos
     */
    getAllData() {
        this.saveCurrentViewData();
        return this.data;
    }

    /**
     * Establece todos los datos de todas las vistas
     * @param {Object} allData - Todos los datos
     */
    setAllData(allData) {
        this.data = allData;
        this.saveData();
        
        // Recargar vista actual si existe
        if (this.currentView) {
            this.renderView(this.currentView);
        }
    }

    /**
     * Limpia todos los datos guardados
     */
    clearAllData() {
        this.data = {
            generalInfo: {
                clienteNombre: '',
                clienteRut: '',
                ordenCompra: '',
                fechaSolicitud: '',
                fechaRequerida: '',
                tipoTrabajo: '',
                descripcionGeneral: ''
            },
            vista1: {},
            vista2: {},
            vista3: {},
            vista4: {}
        };
        this.saveData();
        console.log('Todos los datos han sido limpiados');
    }

    /**
     * Exporta todos los datos como JSON
     * @returns {string} Datos en formato JSON
     */
    exportData() {
        this.saveCurrentViewData();
        return JSON.stringify(this.data, null, 2);
    }

    /**
     * Importa datos desde JSON
     * @param {string} jsonData - Datos en formato JSON
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.setAllData(data);
            console.log('Datos importados correctamente');
        } catch (error) {
            console.error('Error importando datos:', error);
            throw new Error('Formato de datos inválido');
        }
    }

    /**
     * Destruye el ViewManager y limpia recursos
     */
    destroy() {
        // Guardar datos antes de destruir
        this.saveCurrentViewData();
        
        // Destruir vista actual
        this.hideCurrentView();
        
        // Limpiar referencias
        this.currentView = null;
        this.viewContainer = null;
        this.views = {};
        
        console.log('ViewManager destruido');
    }
}

// Exportar para uso global
window.ViewManager = ViewManager;
