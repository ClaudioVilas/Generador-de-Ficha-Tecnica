/**
 * DataManager - Administrador de datos para persistencia y exportación
 * Maneja guardado, carga y exportación a PDF de todas las vistas
 */
class DataManager {
    constructor() {
        this.viewManager = null;
        this.storageKey = 'fichaNavBarData';
    }

    /**
     * Inicializa el DataManager
     * @param {ViewManager} viewManager - Instancia del ViewManager
     */
    init(viewManager) {
        this.viewManager = viewManager;
        console.log('DataManager inicializado');
    }

    /**
     * Guarda todos los datos de las vistas
     */
    saveAllData() {
        if (!this.viewManager) {
            console.error('ViewManager no inicializado');
            return;
        }

        try {
            const allData = this.viewManager.getAllData();
            
            // Agregar metadatos
            const dataToSave = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                views: allData
            };

            // Mostrar modal para nombre de archivo
            this.showSaveModal(dataToSave);

        } catch (error) {
            console.error('Error guardando datos:', error);
            alert('Error al guardar los datos. Revisa la consola para más detalles.');
        }
    }

    /**
     * Muestra el modal para guardar archivo
     * @param {Object} data - Datos a guardar
     */
    showSaveModal(data) {
        // Crear modal si no existe
        let modal = document.getElementById('modalGuardarNavBar');
        if (!modal) {
            modal = this.createSaveModal();
        }

        // Mostrar modal
        modal.style.display = 'block';

        // Configurar eventos
        const nombreInput = modal.querySelector('#nombreArchivoNavBar');
        const confirmarBtn = modal.querySelector('#confirmarGuardarNavBar');
        const cancelarBtn = modal.querySelector('#cancelarGuardarNavBar');
        const closeBtn = modal.querySelector('.modal-close');

        // Limpiar eventos previos
        const newConfirmarBtn = confirmarBtn.cloneNode(true);
        confirmarBtn.parentNode.replaceChild(newConfirmarBtn, confirmarBtn);

        // Evento confirmar
        newConfirmarBtn.addEventListener('click', () => {
            const nombreArchivo = nombreInput.value.trim() || 'ficha-navbar';
            this.downloadDataAsFile(data, nombreArchivo);
            modal.style.display = 'none';
        });

        // Eventos cancelar/cerrar
        [cancelarBtn, closeBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    /**
     * Crea el modal para guardar
     * @returns {HTMLElement} Elemento del modal
     */
    createSaveModal() {
        const modalHTML = `
            <div id="modalGuardarNavBar" class="modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Guardar Ficha NavBar</h3>
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <label for="nombreArchivoNavBar">Nombre del archivo:</label>
                        <input type="text" id="nombreArchivoNavBar" class="input-modal" placeholder="ficha-navbar" value="ficha-navbar">
                        <small>Se agregará automáticamente la extensión .json</small>
                    </div>
                    <div class="modal-footer">
                        <button id="cancelarGuardarNavBar" class="btn-cancelar">Cancelar</button>
                        <button id="confirmarGuardarNavBar" class="btn-confirmar">Guardar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        return document.getElementById('modalGuardarNavBar');
    }

    /**
     * Descarga los datos como archivo JSON
     * @param {Object} data - Datos a descargar
     * @param {string} filename - Nombre del archivo
     */
    downloadDataAsFile(data, filename) {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log(`Archivo ${filename}.json descargado correctamente`);
            alert(`Archivo ${filename}.json guardado correctamente`);

        } catch (error) {
            console.error('Error descargando archivo:', error);
            alert('Error al descargar el archivo');
        }
    }

    /**
     * Carga datos desde archivo
     */
    loadAllData() {
        // Crear input file temporal
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.loadDataFromFile(file);
            }
        });
        
        input.click();
    }

    /**
     * Carga datos desde un archivo
     * @param {File} file - Archivo a cargar
     */
    loadDataFromFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validar estructura de datos
                if (this.validateDataStructure(data)) {
                    // Cargar datos en el ViewManager
                    if (this.viewManager && data.views) {
                        this.viewManager.setAllData(data.views);
                        console.log('Datos cargados correctamente desde archivo');
                        alert('Datos cargados correctamente');
                    }
                } else {
                    throw new Error('Estructura de datos inválida');
                }

            } catch (error) {
                console.error('Error cargando archivo:', error);
                alert('Error al cargar el archivo. Verifica que sea un archivo válido de ficha NavBar.');
            }
        };
        
        reader.readAsText(file);
    }

    /**
     * Valida la estructura de datos
     * @param {Object} data - Datos a validar
     * @returns {boolean} True si la estructura es válida
     */
    validateDataStructure(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.views || typeof data.views !== 'object') return false;
        
        // Verificar que existan las vistas esperadas
        const expectedViews = ['vista1', 'vista2', 'vista3', 'vista4'];
        return expectedViews.every(view => data.views.hasOwnProperty(view));
    }

    /**
     * Exporta todas las vistas a PDF
     */
    async exportAllViewsToPDF() {
        try {
            console.log('Iniciando exportación a PDF desde DataManager...');
            
            if (!this.viewManager) {
                throw new Error('ViewManager no inicializado');
            }

            // Verificar que las librerías estén disponibles
            if (!window.jspdf) {
                throw new Error('jsPDF no está disponible');
            }

            if (!window.html2canvas) {
                throw new Error('html2canvas no está disponible');
            }

            // Asegurar que los datos estén guardados
            this.viewManager.saveCurrentViewData();

            console.log('Librerías verificadas, creando PDF...');
            
            // Intentar usar la función original como fallback
            if (typeof window.exportToPDF === 'function') {
                console.log('Usando función original de exportar PDF...');
                await window.exportToPDF();
                return;
            }

            // Crear nuevo documento PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            let currentY = 20;
            const pageHeight = pdf.internal.pageSize.height;
            const marginBottom = 20;

            // Título general
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Ficha Técnica de Producción - NavBar', 20, currentY);
            currentY += 15;

            // Exportar cada vista
            const vistas = ['vista1', 'vista2', 'vista3', 'vista4'];
            const titulos = [
                'Vista 1 - Ficha Principal',
                'Vista 2 - Especificaciones Técnicas',
                'Vista 3 - Patrones y Moldes',
                'Vista 4 - Control de Calidad'
            ];

            for (let i = 0; i < vistas.length; i++) {
                const vista = vistas[i];
                const titulo = titulos[i];

                // Agregar nueva página si no es la primera vista
                if (i > 0) {
                    pdf.addPage();
                    currentY = 20;
                }

                // Título de la vista
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text(titulo, 20, currentY);
                currentY += 10;

                // Renderizar contenido de la vista
                currentY = await this.renderViewToPDF(pdf, vista, currentY);
            }

            // Descargar PDF
            const timestamp = new Date().toISOString().slice(0, 10);
            pdf.save(`ficha-navbar-${timestamp}.pdf`);
            
            console.log('PDF exportado correctamente');
            alert('PDF exportado correctamente');

        } catch (error) {
            console.error('Error exportando PDF:', error);
            alert('Error al exportar PDF. Revisa la consola para más detalles.');
        }
    }

    /**
     * Renderiza una vista específica en el PDF
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} vistaName - Nombre de la vista
     * @param {number} startY - Posición Y inicial
     * @returns {number} Nueva posición Y
     */
    async renderViewToPDF(pdf, vistaName, startY) {
        try {
            // Cambiar temporalmente a la vista para capturar su contenido
            const currentView = this.viewManager.getCurrentView();
            this.viewManager.showView(vistaName);

            // Esperar a que se renderice
            await new Promise(resolve => setTimeout(resolve, 500));

            // Capturar el contenido de la vista
            const viewContainer = document.querySelector(`#viewContainer .${vistaName}-container`);
            
            if (viewContainer) {
                // Usar html2canvas para capturar la vista
                const canvas = await html2canvas(viewContainer, {
                    scale: 1,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });

                // Calcular dimensiones para el PDF
                const imgWidth = 170; // Ancho en mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Agregar imagen al PDF
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 20, startY, imgWidth, imgHeight);

                // Restaurar vista original
                this.viewManager.showView(currentView);

                return startY + imgHeight + 10;
            } else {
                // Si no se puede capturar, agregar texto básico
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'normal');
                pdf.text(`Error: No se pudo capturar el contenido de ${vistaName}`, 20, startY);
                
                // Restaurar vista original
                this.viewManager.showView(currentView);
                
                return startY + 10;
            }

        } catch (error) {
            console.error(`Error renderizando ${vistaName}:`, error);
            
            // Agregar mensaje de error al PDF
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Error procesando ${vistaName}: ${error.message}`, 20, startY);
            
            return startY + 20;
        }
    }

    /**
     * Guarda datos en localStorage como respaldo
     */
    saveToLocalStorage() {
        if (!this.viewManager) return;

        try {
            const data = this.viewManager.getAllData();
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            console.log('Datos guardados en localStorage como respaldo');
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    }

    /**
     * Carga datos desde localStorage
     */
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data && this.viewManager) {
                const parsedData = JSON.parse(data);
                this.viewManager.setAllData(parsedData);
                console.log('Datos cargados desde localStorage');
                return true;
            }
        } catch (error) {
            console.error('Error cargando desde localStorage:', error);
        }
        return false;
    }

    /**
     * Limpia los datos de localStorage
     */
    clearLocalStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('Datos de localStorage eliminados');
        } catch (error) {
            console.error('Error eliminando datos de localStorage:', error);
        }
    }

    /**
     * Exporta solo la vista actual a PDF
     */
    async exportCurrentViewToPDF() {
        if (!this.viewManager) {
            console.error('ViewManager no inicializado');
            return;
        }

        try {
            const currentView = this.viewManager.getCurrentView();
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Título
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Ficha NavBar - ${currentView.toUpperCase()}`, 20, 20);

            // Renderizar vista actual
            await this.renderViewToPDF(pdf, currentView, 35);

            // Descargar
            const timestamp = new Date().toISOString().slice(0, 10);
            pdf.save(`ficha-navbar-${currentView}-${timestamp}.pdf`);

            console.log(`PDF de ${currentView} exportado correctamente`);
            alert(`PDF de ${currentView} exportado correctamente`);

        } catch (error) {
            console.error('Error exportando vista actual:', error);
            alert('Error al exportar la vista actual');
        }
    }

    /**
     * Obtiene estadísticas de las vistas
     * @returns {Object} Estadísticas
     */
    getStats() {
        if (!this.viewManager) return null;

        const allData = this.viewManager.getAllData();
        const stats = {
            totalViews: 4,
            viewsWithData: 0,
            totalFields: 0,
            filledFields: 0,
            lastUpdate: new Date().toISOString()
        };

        Object.keys(allData).forEach(viewName => {
            const viewData = allData[viewName];
            if (viewData && Object.keys(viewData).length > 0) {
                stats.viewsWithData++;
                
                Object.values(viewData).forEach(value => {
                    stats.totalFields++;
                    if (value && value !== '') {
                        stats.filledFields++;
                    }
                });
            }
        });

        stats.completionPercentage = stats.totalFields > 0 
            ? Math.round((stats.filledFields / stats.totalFields) * 100) 
            : 0;

        return stats;
    }

    /**
     * Destruye el DataManager
     */
    destroy() {
        this.viewManager = null;
        console.log('DataManager destruido');
    }
}

// Exportar para uso global
window.DataManager = DataManager;
