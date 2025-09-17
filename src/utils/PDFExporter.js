/**
 * PDFExporter - Manejador especializado pa            const vistas = [
                { name: 'vista1', title: 'Vista 1' },
                { name: 'vista2', title: 'Vista 2' },
                { name: 'vista3', title: 'Vista 3' },
                { name: 'vista4', title: 'Vista 4' }
            ];ortación a PDF
 * Genera PDF con múltiples páginas, una por cada vista
 */
class PDFExporter {
    constructor() {
        this.viewManager = null;
        this.originalViewName = null;
    }

    /**
     * Inicializa el exportador
     * @param {ViewManager} viewManager - Instancia del ViewManager
     */
    init(viewManager) {
        this.viewManager = viewManager;
        console.log('PDFExporter inicializado');
    }

    /**
     * Exporta todas las vistas a PDF
     */
    async exportAllViewsToPDF() {
        try {
            console.log('🔄 Iniciando exportación a PDF...');

            // Verificar dependencias
            if (!this.viewManager) {
                throw new Error('ViewManager no inicializado');
            }

            if (!window.jspdf || !window.html2canvas) {
                throw new Error('Librerías jsPDF o html2canvas no disponibles');
            }

            // Guardar vista actual para restaurar después
            this.originalViewName = this.viewManager.getCurrentView();
            console.log(`📌 Vista actual guardada: ${this.originalViewName}`);

            // Guardar datos de la vista actual antes de proceder
            this.viewManager.saveCurrentViewData();

            // Crear documento PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Configurar vistas a exportar
            const vistas = [
                { name: 'vista1', title: 'Vista 1 - Detalle General' },
                { name: 'vista2', title: 'Vista 2 - Especificaciones Técnicas' },
                { name: 'vista3', title: 'Vista 3 - Patrones y Moldes' },
                { name: 'vista4', title: 'Vista 4 - Control de Calidad' }
            ];

            // Página de título
            this.addTitlePage(pdf);

            // Exportar cada vista en una página separada
            for (let i = 0; i < vistas.length; i++) {
                const vista = vistas[i];
                console.log(`📄 Procesando ${vista.title}...`);

                // Agregar nueva página
                pdf.addPage();

                // Renderizar vista específica usando el método exitoso de Vista1
                await this.renderSingleViewToPDF_V2(pdf, vista.name, vista.title);
            }

            // Descargar PDF
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `ficha-tecnica-completa-${timestamp}.pdf`;
            pdf.save(filename);

            console.log('✅ PDF exportado correctamente');
            alert('PDF exportado correctamente');

        } catch (error) {
            console.error('❌ Error exportando PDF:', error);
            alert(`Error al exportar PDF: ${error.message}`);
        } finally {
            // Restaurar vista original siempre
            if (this.originalViewName && this.viewManager) {
                console.log(`🔙 Restaurando vista original: ${this.originalViewName}`);
                await this.restoreOriginalView();
            }
        }
    }

    /**
     * Agrega página de título al PDF
     * @param {jsPDF} pdf - Instancia del PDF
     */
    addTitlePage(pdf) {
        // Título principal
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Ficha Técnica de Producción - Todas las Vistas', 20, 30);

        // Fecha de generación
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const fecha = new Date().toLocaleDateString('es-ES');
        pdf.text(`Generado el: ${fecha}`, 20, 45);

        console.log('📋 Página de título agregada');
    }

    /**
     * Renderiza una vista específica en el PDF de forma segura
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} viewName - Nombre de la vista
     * @param {string} title - Título de la vista
     */
    async renderSingleViewToPDFSafe(pdf, viewName, title) {
        try {
            console.log(`🔄 Capturando ${viewName} de forma segura...`);

            // Agregar título de la vista en el PDF
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, 20, 20);

            // Renderizar vista sin cambiar la vista activa
            const success = await this.captureViewWithoutSwitching(pdf, viewName);
            
            if (!success) {
                // Fallback: capturar vista actual si es la misma
                if (this.viewManager.getCurrentView() === viewName) {
                    console.log(`📷 Capturando vista actual: ${viewName}`);
                    await this.captureCurrentView(pdf, viewName);
                } else {
                    // Último recurso: cambio temporal muy rápido
                    await this.captureViewWithQuickSwitch(pdf, viewName);
                }
            }

            console.log(`✅ ${viewName} procesada correctamente`);

        } catch (error) {
            console.error(`❌ Error procesando ${viewName}:`, error);
            
            // Agregar mensaje de error en el PDF
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Error procesando ${title}`, 20, 50);
            pdf.setFontSize(10);
            pdf.text(`Detalle: ${error.message}`, 20, 65);
        }
    }

    /**
     * Intenta capturar una vista sin cambiar la vista activa
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} viewName - Nombre de la vista
     * @returns {boolean} - True si tuvo éxito
     */
    async captureViewWithoutSwitching(pdf, viewName) {
        try {
            // Verificar si existe una instancia de la vista
            const viewInstanceName = `${viewName.charAt(0).toUpperCase()}${viewName.slice(1)}Instance`;
            const viewInstance = window[viewInstanceName];
            
            if (!viewInstance) {
                console.log(`⚠️ No se encontró instancia de ${viewName}`);
                return false;
            }

            // Crear contenedor temporal oculto
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = '1200px';
            tempContainer.style.backgroundColor = '#ffffff';
            tempContainer.className = 'pdf-export';
            document.body.appendChild(tempContainer);

            // Crear instancia temporal de la vista
            const ViewClass = window[viewName.charAt(0).toUpperCase() + viewName.slice(1)];
            if (!ViewClass) {
                throw new Error(`Clase ${viewName} no encontrada`);
            }

            const tempView = new ViewClass();
            tempView.render(tempContainer);

            // Cargar datos en la vista temporal
            const data = this.viewManager.getViewData(viewName);
            if (data && tempView.loadData) {
                tempView.loadData(data);
            }

            // Preparar imágenes
            await this.prepareImagesForCapture(tempContainer);

            // Esperar renderizado
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Capturar
            const canvas = await html2canvas(tempContainer, {
                scale: 0.75,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                removeContainer: false,
                imageTimeout: 20000,
                foreignObjectRendering: false,
                onclone: (clonedDoc) => {
                    // Procesar imágenes en el documento clonado
                    this.processImagesInClone(clonedDoc.body);
                }
            });            // Agregar al PDF
            this.addCanvasToPDF(pdf, canvas);

            // Limpiar contenedor temporal
            document.body.removeChild(tempContainer);
            
            console.log(`✅ Vista ${viewName} capturada sin cambio de vista`);
            return true;

        } catch (error) {
            console.error(`❌ Error capturando ${viewName} sin cambiar vista:`, error);
            return false;
        }
    }

    /**
     * Captura la vista actual si coincide con la requerida
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} viewName - Nombre de la vista
     */
    async captureCurrentView(pdf, viewName) {
        try {
            const viewContainer = document.getElementById('viewContainer');
            const vistaContainer = viewContainer.querySelector(`.${viewName}-container`);
            
            if (!vistaContainer) {
                throw new Error(`No se encontró contenedor para ${viewName}`);
            }

            // Aplicar clase PDF temporalmente
            viewContainer.classList.add('pdf-export');

            try {
            // Capturar la vista actual
            const canvas = await html2canvas(vistaContainer, {
                scale: 0.75,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                removeContainer: false,
                imageTimeout: 20000,
                foreignObjectRendering: false,
                onclone: (clonedDoc) => {
                    // Procesar imágenes en el documento clonado
                    this.processImagesInClone(clonedDoc.querySelector(`.${viewName}-container`));
                }
            });                this.addCanvasToPDF(pdf, canvas);

            } finally {
                // Remover clase PDF
                viewContainer.classList.remove('pdf-export');
            }

        } catch (error) {
            console.error(`❌ Error capturando vista actual ${viewName}:`, error);
            throw error;
        }
    }

    /**
     * Último recurso: cambio temporal muy rápido
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} viewName - Nombre de la vista
     */
    async captureViewWithQuickSwitch(pdf, viewName) {
        try {
            console.log(`⚡ Cambio rápido a ${viewName}...`);
            
            // Cambio muy rápido
            this.viewManager.showView(viewName);
            await new Promise(resolve => setTimeout(resolve, 300)); // Tiempo mínimo para renderizado

            // Preparar imágenes si hay
            const viewContainer = document.getElementById('viewContainer');
            const vistaContainer = viewContainer.querySelector(`.${viewName}-container`);
            if (vistaContainer) {
                await this.prepareImagesForCapture(vistaContainer);
            }

            // Capturar inmediatamente
            await this.captureCurrentView(pdf, viewName);

        } catch (error) {
            console.error(`❌ Error en cambio rápido para ${viewName}:`, error);
            throw error;
        }
    }

    /**
     * Agrega un canvas al PDF con las dimensiones correctas
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {HTMLCanvasElement} canvas - Canvas a agregar
     */
    addCanvasToPDF(pdf, canvas) {
        try {
            // Calcular dimensiones para ajustar a la página
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const maxWidth = pageWidth - 40; // Márgenes de 20mm
            const maxHeight = pageHeight - 60; // Espacio para título y márgenes

            const imgWidth = Math.min(maxWidth, canvas.width * 0.75 / 96 * 25.4); // Convertir px a mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Si la imagen es muy alta, ajustar
            const finalHeight = Math.min(imgHeight, maxHeight);
            const finalWidth = imgHeight > maxHeight ? (canvas.width * finalHeight) / canvas.height : imgWidth;

            // Agregar imagen al PDF
            const imgData = canvas.toDataURL('image/png', 0.8);
            pdf.addImage(imgData, 'PNG', 20, 30, finalWidth, finalHeight);

        } catch (error) {
            console.error('❌ Error agregando canvas al PDF:', error);
            throw error;
        }
    }

    /**
     * Restaura la vista original de forma segura
     */
    async restoreOriginalView() {
        try {
            if (this.originalViewName && this.viewManager) {
                // Pequeña pausa para asegurar que el PDF se haya completado
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Restaurar vista original
                this.viewManager.showView(this.originalViewName);
                
                // Recargar datos para asegurar consistencia
                await new Promise(resolve => setTimeout(resolve, 100));
                
                console.log(`✅ Vista ${this.originalViewName} restaurada correctamente`);
            }
        } catch (error) {
            console.error('❌ Error restaurando vista original:', error);
        }
    }    /**
     * Espera a que la vista se renderice completamente
     */
    async waitForViewToRender() {
        return new Promise((resolve) => {
            // Esperar un momento para el renderizado inicial
            setTimeout(() => {
                // Verificar si hay imágenes cargándose
                const images = document.querySelectorAll('#viewContainer img');
                const imagePromises = Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve; // Resolver incluso si hay error
                        setTimeout(resolve, 2000); // Timeout máximo
                    });
                });

                Promise.all(imagePromises).then(() => {
                    // Esperar un poco más para asegurar renderizado completo
                    setTimeout(resolve, 500);
                });
            }, 300);
        });
    }

    /**
     * Procesa las imágenes en el documento clonado para mejor compatibilidad con html2canvas
     * @param {HTMLElement} container - Contenedor clonado
     */
    processImagesInClone(container) {
        if (!container) return;

        try {
            // Procesar todas las imágenes
            const images = container.querySelectorAll('img');
            images.forEach(img => {
                // Si la imagen tiene src base64, asegurar que esté bien formateada
                if (img.src && img.src.startsWith('data:')) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    img.crossOrigin = 'anonymous';
                }
                
                // Si la imagen está oculta, mostrarla temporalmente
                if (img.style.display === 'none') {
                    img.style.display = 'block';
                    img.style.visibility = 'visible';
                }
            });

            // Procesar contenedores de fotos
            const fotoContainers = container.querySelectorAll('.foto-upload, .foto-principal, .foto-preview');
            fotoContainers.forEach(container => {
                container.style.display = 'block';
                container.style.visibility = 'visible';
            });

            // Ocultar elementos problemáticos
            const problematicElements = container.querySelectorAll(
                '.color-palette, .btn-upload, .btn-cambiar, .btn-eliminar, ' +
                '.tabla-controls, .controles-tabla, .controles-muestra, .controles-taller'
            );
            problematicElements.forEach(el => {
                el.style.display = 'none';
            });

        } catch (error) {
            console.warn('Error procesando imágenes en clone:', error);
        }
    }

    /**
     * Prepara las imágenes para la captura
     * @param {HTMLElement} container - Contenedor de la vista
     */
    async prepareImagesForCapture(container) {
        try {
            const images = container.querySelectorAll('img');
            const imagePromises = [];

            images.forEach(img => {
                if (img.src && !img.complete) {
                    imagePromises.push(new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                        // Timeout para no bloquear indefinidamente
                        setTimeout(resolve, 3000);
                    }));
                }
            });

            if (imagePromises.length > 0) {
                console.log(`⏳ Esperando carga de ${imagePromises.length} imágenes...`);
                await Promise.all(imagePromises);
                console.log('✅ Imágenes cargadas');
            }

        } catch (error) {
            console.warn('Error preparando imágenes:', error);
        }
    }

    /**
     * Renderiza una vista específica usando el método exitoso de Vista1
     * @param {jsPDF} pdf - Instancia del PDF
     * @param {string} viewName - Nombre de la vista
     * @param {string} title - Título de la vista
     */
    async renderSingleViewToPDF_V2(pdf, viewName, title) {
        try {
            console.log(`🔄 Cambiando a ${viewName} (método V2)...`);
            // Cambiar a la vista específica
            this.viewManager.showView(viewName);
            // Esperar a que se renderice completamente
            await this.waitForViewToRender();
            
            console.log(`📋 Vista ${viewName} renderizada, buscando contenedor...`);

            // Obtener el contenedor de la vista
            const viewContainer = document.getElementById('viewContainer');
            const vistaContainer = viewContainer.querySelector(`.${viewName}-container`);
            if (!vistaContainer) {
                throw new Error(`No se encontró contenedor para ${viewName}`);
            }

            // Agregar título de la vista en el PDF
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, 20, 20);

            // --- INTEGRACIÓN DE VISIBILIDAD DE IMÁGENES ---
            let imagesChanged = null;
            const instanceName = viewName.charAt(0).toUpperCase() + viewName.slice(1) + 'Instance';
            console.log(`🔍 Buscando instancia: ${instanceName}`);
            
            if (window[instanceName]) {
                console.log(`✅ Instancia ${instanceName} encontrada`);
                
                if (typeof window[instanceName].prepareForPDFExport === 'function') {
                    console.log(`🔧 Llamando prepareForPDFExport en ${instanceName}`);
                    try {
                        imagesChanged = window[instanceName].prepareForPDFExport();
                        console.log(`✅ prepareForPDFExport completado, cambios:`, imagesChanged);
                    } catch (error) {
                        console.error(`❌ Error en prepareForPDFExport:`, error);
                    }
                } else {
                    console.log(`⚠️ prepareForPDFExport no es función en ${instanceName}`);
                }
            } else {
                console.log(`⚠️ Instancia ${instanceName} no encontrada`);
            }

            // Aplicar clase para ocultar botones durante la captura
            viewContainer.classList.add('pdf-export');
            // Esperar un poco para que se apliquen los estilos
            await new Promise(resolve => setTimeout(resolve, 200));

            // Configurar opciones para html2canvas (igual que Vista1 exitosa)
            const canvas = await html2canvas(vistaContainer, {
                scale: 1.5, // Buena resolución sin ser excesiva
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 15000,
                width: vistaContainer.scrollWidth,
                height: vistaContainer.scrollHeight
            });

            // Remover la clase después de la captura (como Vista1)
            viewContainer.classList.remove('pdf-export');

            // Restaurar visibilidad de imágenes
            if (window[instanceName]) {
                console.log(`🔧 Intentando restaurar imágenes en ${instanceName}`);
                
                if (typeof window[instanceName].restoreAfterPDFExport === 'function') {
                    console.log(`🔄 Llamando restoreAfterPDFExport en ${instanceName}`);
                    try {
                        window[instanceName].restoreAfterPDFExport(imagesChanged);
                        console.log(`✅ restoreAfterPDFExport completado`);
                    } catch (error) {
                        console.error(`❌ Error en restoreAfterPDFExport:`, error);
                    }
                } else {
                    console.log(`⚠️ restoreAfterPDFExport no es función en ${instanceName}`);
                }
            }

            // Calcular dimensiones para ajustar a A4 vertical
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const maxWidth = pageWidth - 40; // Márgenes de 20mm cada lado
            const maxHeight = pageHeight - 60; // Espacio para título y márgenes

            // Calcular escala manteniendo aspecto
            const imgWidth = maxWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let finalHeight = imgHeight;
            let finalWidth = imgWidth;
            if (imgHeight > maxHeight) {
                finalHeight = maxHeight;
                finalWidth = (canvas.width * finalHeight) / canvas.height;
            }
            // Centrar horizontalmente
            const xOffset = (pageWidth - finalWidth) / 2;
            // Agregar imagen al PDF (como Vista1 exitosa)
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.8),
                'JPEG',
                xOffset,
                35, // Posición Y fija para dar espacio al título
                finalWidth,
                finalHeight
            );
            console.log(`✅ ${viewName} capturada correctamente (método V2)`);

        } catch (error) {
            console.error(`❌ Error procesando ${viewName} (método V2):`, error);
            
            // Agregar mensaje de error en el PDF
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Error procesando ${title}`, 20, 50);
            pdf.setFontSize(10);
            pdf.text(`Detalle: ${error.message}`, 20, 65);
        }
    }
}

// Crear instancia global
window.PDFExporter = PDFExporter;