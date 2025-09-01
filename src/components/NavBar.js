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
        
        try {
            // Verificar que las librerías estén disponibles
            if (!window.html2canvas) {
                alert('Librería html2canvas no disponible');
                return;
            }
            
            if (!window.jspdf) {
                alert('Librería jsPDF no disponible');
                return;
            }
            
            // Exportar todas las vistas en orden
            this.exportAllViewsToPDF();
            
        } catch (error) {
            console.error('Error al exportar PDF:', error);
            alert('Error al generar el PDF. Por favor inténtalo de nuevo.');
        }
    }
    
    /**
     * Exporta todas las vistas a PDF en orden con márgenes de 1.5cm
     */
    async exportAllViewsToPDF() {
        try {
            // Mostrar indicador de carga en el botón
            const exportBtn = this.container.querySelector('#exportAllPDF');
            const originalText = exportBtn.innerHTML;
            exportBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Generando PDF...</span>';
            exportBtn.disabled = true;

            console.log('Iniciando exportación de todas las vistas...');
            
            // Crear el PDF con márgenes de 1.5cm (15mm)
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Configuración de márgenes (1.5cm = 15mm)
            const marginLeft = 15;
            const marginRight = 15;
            const pageWidth = 210; // A4 width
            const contentWidth = pageWidth - marginLeft - marginRight; // 180mm
            const pageHeight = 297; // A4 height
            
            // Configurar primera página
            let currentY = 20; // Margen superior
            let isFirstPage = true;
            
            // Título general
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Ficha Técnica de Producción - Todas las Vistas', marginLeft, currentY);
            currentY += 15;
            
            // Agregar fecha
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            const fecha = new Date().toLocaleDateString('es-ES');
            pdf.text(`Generado el: ${fecha}`, marginLeft, currentY);
            currentY += 15;

            // Lista de vistas a exportar
            const vistas = ['vista1', 'vista2', 'vista3', 'vista4'];
            const titulosVistas = [
                'Vista 1 - Detalle General',
                'Vista 2 - Especificaciones Técnicas', 
                'Vista 3 - Patrones y Moldes',
                'Vista 4 - Control de Calidad'
            ];

            // Exportar cada vista
            for (let i = 0; i < vistas.length; i++) {
                const vistaName = vistas[i];
                const titulo = titulosVistas[i];
                
                console.log(`Procesando ${vistaName}...`);
                
                // Cambiar a la vista para capturarla
                if (this.onViewChange) {
                    this.onViewChange(vistaName);
                    // Esperar a que se renderice la vista
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

                // Obtener el contenedor de la vista
                const viewContainer = document.getElementById('viewContainer');
                
                if (!viewContainer) {
                    console.warn(`No se pudo encontrar contenedor para ${vistaName}`);
                    continue;
                }

                // Capturar la vista
                const canvas = await window.html2canvas(viewContainer, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: viewContainer.scrollWidth,
                    height: viewContainer.scrollHeight,
                    scrollX: 0,
                    scrollY: 0
                });

                // Calcular dimensiones de la imagen en el PDF
                const imgWidth = contentWidth; // Ancho del contenido (180mm)
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Verificar si necesitamos una nueva página
                if (!isFirstPage || (currentY + imgHeight + 20) > pageHeight) {
                    pdf.addPage();
                    currentY = 20; // Reset Y position
                    isFirstPage = false;
                }

                // Agregar título de la vista
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.text(titulo, marginLeft, currentY);
                currentY += 10;

                // Agregar la imagen de la vista
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', marginLeft, currentY, imgWidth, imgHeight);
                currentY += imgHeight + 15; // Espaciado entre vistas

                // Si la imagen es muy alta, manejar páginas adicionales
                let heightLeft = imgHeight;
                let position = currentY - imgHeight;
                
                while (heightLeft >= pageHeight - 40) { // 40mm de margen total (superior + inferior)
                    pdf.addPage();
                    position = 20 - (imgHeight - heightLeft);
                    pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
                    heightLeft -= (pageHeight - 40);
                    currentY = 20;
                }
                
                console.log(`${vistaName} exportada correctamente`);
            }

            // Guardar el PDF
            const fechaArchivo = new Date().toISOString().split('T')[0];
            const nombreArchivo = `ficha-tecnica-completa-${fechaArchivo}.pdf`;
            pdf.save(nombreArchivo);

            console.log('PDF de todas las vistas generado correctamente:', nombreArchivo);

            // Restaurar botón
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;

            // Volver a la vista original
            if (this.onViewChange) {
                this.onViewChange(this.activeView);
            }

        } catch (error) {
            console.error('Error en exportAllViewsToPDF:', error);
            
            // Restaurar botón en caso de error
            const exportBtn = this.container.querySelector('#exportAllPDF');
            if (exportBtn) {
                exportBtn.innerHTML = '<span class="btn-icon">📄</span><span class="btn-text">Exportar PDF</span>';
                exportBtn.disabled = false;
            }
            
            // Volver a la vista original
            if (this.onViewChange) {
                this.onViewChange(this.activeView);
            }
            
            throw error;
        }
    }

    /**
     * Maneja el guardado de datos
     */
    handleSaveData() {
        console.log('Guardando datos desde NavBar...');
        
        // Intentar usar la función original de script.js
        if (typeof guardarFicha === 'function') {
            guardarFicha();
        } else if (window.DataManager && typeof window.DataManager.saveAllData === 'function') {
            window.DataManager.saveAllData();
        } else {
            console.warn('Función de guardar datos no disponible');
            alert('Función de guardar datos no está disponible');
        }
    }

    /**
     * Maneja la carga de datos
     */
    handleLoadData() {
        console.log('Abriendo carga de datos desde NavBar...');
        
        // Simular click en el input file existente o crear uno nuevo
        let fileInput = document.getElementById('archivoCargar');
        
        if (!fileInput) {
            // Crear input file si no existe
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.style.display = 'none';
            fileInput.id = 'archivoCargar';
            document.body.appendChild(fileInput);
            
            // Agregar event listener
            fileInput.addEventListener('change', function(event) {
                if (typeof cargarFicha === 'function') {
                    cargarFicha(event);
                } else {
                    console.warn('Función cargarFicha no disponible');
                }
            });
        }
        
        fileInput.click();
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
