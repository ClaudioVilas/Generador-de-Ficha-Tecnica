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
        this.cleanCorruptedImageData(); // Limpiar datos de imagen corruptos
        this.cleanVista3TableData(); // Limpiar datos de tabla para empezar con 1 fila
        this.cleanVista4MaterialsData(); // Limpiar datos de materiales para empezar con 1 fila
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
     * Limpia datos de imagen corruptos o inconsistentes
     */
    cleanCorruptedImageData() {
        console.log('🧹 ViewManager: Limpiando datos de imagen corruptos...');
        
        // Lista de campos de imagen a verificar por vista
        const imageFields = {
            vista2: ['fotoIzquierda', 'fotoDerecha'],
            vista3: ['fotoPrincipal'],
            vista4: ['fotoPrincipal']
        };

        let cleaned = false;

        Object.keys(imageFields).forEach(viewName => {
            if (this.data[viewName]) {
                imageFields[viewName].forEach(fieldName => {
                    const fieldValue = this.data[viewName][fieldName];
                    
                    // Si el campo existe pero está vacío o es solo espacios en blanco
                    if (fieldValue !== undefined && (!fieldValue || fieldValue.trim() === '')) {
                        console.log(`🗑️ ViewManager: Limpiando campo vacío ${viewName}.${fieldName}`);
                        delete this.data[viewName][fieldName];
                        cleaned = true;
                    }
                });
            }
        });

        if (cleaned) {
            this.saveData();
            console.log('✅ ViewManager: Datos de imagen limpiados y guardados');
        } else {
            console.log('✅ ViewManager: No se encontraron datos corruptos');
        }
    }

    /**
     * Limpia los datos de la tabla despiece de Vista3 para empezar con una sola fila
     */
    cleanVista3TableData() {
        console.log('🧹 ViewManager: Limpiando datos de tabla Vista3...');
        
        if (this.data.vista3 && this.data.vista3.despiece) {
            console.log('🗑️ ViewManager: Limpiando tabla despiece para empezar con 1 fila');
            delete this.data.vista3.despiece;
            this.saveData();
            console.log('✅ ViewManager: Datos de tabla Vista3 limpiados');
        } else {
            console.log('✅ ViewManager: No se encontraron datos de tabla Vista3 que limpiar');
        }
    }

    /**
     * Limpia los datos de materiales de Vista4 para empezar con una sola fila
     */
    cleanVista4MaterialsData() {
        console.log('🧹 ViewManager: Limpiando datos de materiales Vista4...');
        
        let cleaned = false;
        
        if (this.data.vista4) {
            // Limpiar datos de muestra de materiales
            if (this.data.vista4.muestraMateriales) {
                console.log('🗑️ ViewManager: Limpiando datos de muestra de materiales para empezar con 1 fila');
                delete this.data.vista4.muestraMateriales;
                cleaned = true;
            }
            
            // Limpiar posibles datos de talles/colores que puedan estar guardados
            if (this.data.vista4.talles || this.data.vista4.colores || this.data.vista4.tallerCorte) {
                console.log('🗑️ ViewManager: Limpiando datos de taller de corte para empezar con 1 fila');
                delete this.data.vista4.talles;
                delete this.data.vista4.colores;
                delete this.data.vista4.tallerCorte;
                cleaned = true;
            }
        }
        
        if (cleaned) {
            this.saveData();
            console.log('✅ ViewManager: Datos de materiales Vista4 limpiados');
        } else {
            console.log('✅ ViewManager: No se encontraron datos de materiales Vista4 que limpiar');
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
