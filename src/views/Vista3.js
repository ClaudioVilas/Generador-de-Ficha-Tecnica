/**
 * Vista3 - Gestión de Patrones y Moldes
 * Maneja la información de patrones, piezas y consumos
 */
class Vista3 {
    constructor() {
        this.data = {};
        this.container = null;
    }

    /**
     * Utilidad para preparar la vista antes de exportar PDF
     * Llamar antes de html2canvas y restaurar después
     */
    prepareForPDFExport() {
        console.log('📋 Vista3Instance: Preparando para exportación PDF...');
        if (!this.container) {
            console.log('⚠️ Vista3Instance: No hay contenedor disponible');
            return null;
        }
        console.log('🔧 Vista3Instance: Llamando método estático forceImagesVisibleForPDF');
        const result = Vista3.forceImagesVisibleForPDF(this.container);
        console.log('✅ Vista3Instance: Preparación completada');
        return result;
    }

    restoreAfterPDFExport(changed) {
        console.log('🔄 Vista3Instance: Restaurando después de exportación PDF...');
        Vista3.restoreImagesVisibility(changed);
        console.log('✅ Vista3Instance: Restauración completada');
    }

    static forceImagesVisibleForPDF(container) {
        const imgs = container.querySelectorAll('.foto-preview, .preview-image-vista3');
        const changed = [];
        console.log(`🔍 Vista3: Encontradas ${imgs.length} imágenes para hacer visibles`);
        imgs.forEach(img => {
            if (img && img.style.display === 'none') {
                changed.push({ el: img, prev: img.style.display });
                img.style.display = 'block';
                console.log(`👁️ Vista3: Imagen hecha visible:`, img.className);
            }
        });
        console.log(`✅ Vista3: ${changed.length} imágenes modificadas para PDF`);
        return changed;
    }

    static restoreImagesVisibility(changed) {
        console.log(`🔄 Vista3: Restaurando ${changed ? changed.length : 0} imágenes`);
        if (changed && changed.length > 0) {
            changed.forEach(({ el, prev }) => {
                el.style.display = prev;
                console.log(`↩️ Vista3: Imagen restaurada a display: ${prev}`);
            });
        }
        console.log(`✅ Vista3: Restauración de imágenes completada`);
    }

    /**
     * Genera el HTML para la información general compartida (igual que en index.html)
     */
    getGeneralInfoHTML() {
        return `
            <div class="info-superior">
                <div class="campo-grupo">
                    <label>Marca:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="marca">
                </div>
                <div class="campo-grupo">
                    <label>Usuario:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="usuario">
                </div>
                <div class="campo-grupo">
                    <label>Artículo:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="articulo">
                </div>
                <div class="campo-grupo">
                    <label>Rubro:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="rubro">
                </div>
                <div class="campo-grupo fecha">
                    <label>Ficha de Producción:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="fichaProduccion">
                </div>
            </div>

            <!-- Fila de descripción y organización -->
            <div class="descripcion-organizacion">
                <div class="descripcion-campo">
                    <label>Descripción:</label>
                    <textarea class="textarea-descripcion" data-field="descripcion" placeholder="Completar descripción"></textarea>
                </div>
                <div class="organizacion-campo">
                    <label>Organización:</label>
                    <input type="text" placeholder="Completar" class="input-text" data-field="organizacion">
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la Vista3 en el contenedor especificado
     */
    render(container) {
        this.container = container;
        
        const vista3HTML = `
            <div class="vista3-container">
                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}
                
                <!-- Contenedor principal con distribución 25%-75% -->
                <div class="contenedor-principal-vista3">
                    <!-- Tabla DESPIECE (25%) -->
                    <div class="seccion-despiece">
                        <h3>DESPIECE</h3>
                        <table id="tablaDespiece" class="tabla-dinamica">
                            <thead>
                                <tr>
                                    <th>Nº</th>
                                    <th>Tela base</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" value="Falda delantera" placeholder="Descripción de la pieza"></td>
                                    <td><input type="text" value="x1" placeholder="Cantidad"></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><input type="text" placeholder="Descripción de la pieza"></td>
                                    <td><input type="text" placeholder="Cantidad"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="controles-tabla">
                            <button class="btn-eliminar-ultima" onclick="Vista3Instance.eliminarUltimaFilaDespiece()" title="Eliminar última fila">-</button>
                            <button class="btn-agregar-fila" onclick="Vista3Instance.agregarFilaDespiece()" title="Agregar pieza">+</button>
                        </div>
                    </div>
                    
                    <!-- Componente de Fotos (75%) -->
                    <div class="seccion-fotos-vista3">
                        <h3>FOTOS DEL PATRÓN</h3>
                        <div class="fotos-container">
                            <div class="foto-principal">
                                <!-- CONTENEDOR CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                                <div class="foto-upload image-container" id="fotoPrincipal" onclick="console.log('Click detectado, Vista3Instance:', window.Vista3Instance); if(window.Vista3Instance) { Vista3Instance.subirFoto('principal'); } else { console.error('Vista3Instance no disponible'); }" style="cursor: pointer;">
                                    <!-- IMAGEN CON OBJECT-FIT: COVER - Llena todo el contenedor sin márgenes -->
                                    <img class="foto-preview" style="display: none;" src="">
                                    <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoPrincipal">
                                    <!-- BOTONES POSICIONADOS EN BORDE INFERIOR DEL CONTENEDOR -->
                                    <div class="foto-controls vista4-controls" style="display: none;">
                                        <button type="button" class="btn-eliminar vista4-btn-eliminar" onclick="event.stopPropagation(); Vista3Instance.eliminarFoto('principal')">
                                            Eliminar Foto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = vista3HTML;
        this.setupEvents();
        
        // Establecer instancia global para callbacks
        window.Vista3Instance = this;
        
        console.log('Vista3 renderizada correctamente');
    }

    /**
     * Configura los eventos de la Vista3
     */
    setupEvents() {
        // Event listeners para actualización automática de datos
        const inputs = this.container.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', () => this.saveData());
        });

        // Eventos de archivos de fotos
        const fileInputs = this.container.querySelectorAll('.file-input');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => this.manejarCambioFoto(e));
        });
        
        // Actualizar numeración de la tabla al cargar
        this.actualizarNumeracion();
    }

    /**
     * Agrega una nueva fila a la tabla DESPIECE
     */
    agregarFilaDespiece() {
        const tabla = document.getElementById('tablaDespiece');
        const tbody = tabla.querySelector('tbody');
        const numeroFila = tbody.rows.length + 1;
        
        const nuevaFila = tbody.insertRow();
        nuevaFila.innerHTML = `
            <td>${numeroFila}</td>
            <td><input type="text" placeholder="Descripción de la pieza"></td>
            <td><input type="text" placeholder="Cantidad"></td>
        `;
        
        // Configurar eventos para los nuevos inputs
        const nuevosInputs = nuevaFila.querySelectorAll('input');
        nuevosInputs.forEach(input => {
            input.addEventListener('change', () => this.saveData());
        });
        
        this.saveData();
    }

    /**
     * Elimina la última fila de la tabla DESPIECE
     */
    eliminarUltimaFilaDespiece() {
        const tabla = document.getElementById('tablaDespiece');
        const tbody = tabla.querySelector('tbody');
        
        if (tbody.rows.length > 1) {
            tbody.deleteRow(tbody.rows.length - 1);
            this.actualizarNumeracion();
            this.saveData();
        }
    }

    /**
     * Actualiza la numeración de las filas de la tabla DESPIECE
     */
    actualizarNumeracion() {
        const tabla = document.getElementById('tablaDespiece');
        const filas = tabla.querySelectorAll('tbody tr');
        filas.forEach((fila, index) => {
            const primeraCelda = fila.querySelector('td:first-child');
            if (primeraCelda) {
                primeraCelda.textContent = index + 1;
            }
        });
    }

    /**
     * Obtiene los datos de la tabla DESPIECE

    /**
     * Agrega una vista previa de la foto cargada
     */
    addPhotoPreview(imageSrc, fileName) {
        const previewContainer = document.getElementById('preview-container-vista3');
        
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-preview-vista3';
        
        photoDiv.innerHTML = `
            <img src="${imageSrc}" alt="${fileName}" class="preview-image-vista3">
            <div class="photo-controls-vista3">
                <span class="photo-name-vista3">${fileName}</span>
                <button class="btn-delete-photo-vista3" onclick="Vista3Instance.deletePhoto(this)">🗑️</button>
            </div>
        `;
        
        previewContainer.appendChild(photoDiv);
        this.saveData();
    }

    /**
     * Elimina una foto del preview
     */
    deletePhoto(button) {
        const photoDiv = button.closest('.photo-preview-vista3');
        photoDiv.remove();
        this.saveData();
    }

    /**
     * Obtiene los datos de la tabla DESPIECE
     */
    getDespieceData() {
        try {
            const tabla = document.getElementById('tablaDespiece');
            if (!tabla) {
                console.warn('Tabla DESPIECE no encontrada');
                return [];
            }

            const filas = tabla.querySelectorAll('tbody tr');
            const data = [];

            filas.forEach(fila => {
                try {
                    const inputs = fila.querySelectorAll('input');
                    if (inputs.length >= 2) {
                        data.push({
                            descripcion: inputs[0].value || '',
                            cantidad: inputs[1].value || ''
                        });
                    }
                } catch (error) {
                    console.warn('Error procesando fila de despiece:', error);
                }
            });
            
            return data;
        } catch (error) {
            console.error('Error en getDespieceData:', error);
            return [];
        }
    }

    /**
     * Obtiene los datos de las fotos
     */
    getPhotosData() {
        const previewContainer = document.getElementById('preview-container-vista3');
        const photos = previewContainer.querySelectorAll('.photo-preview-vista3');
        const photosData = [];

        photos.forEach(photo => {
            const img = photo.querySelector('.preview-image-vista3');
            const name = photo.querySelector('.photo-name-vista3').textContent;
            photosData.push({
                src: img.src,
                name: name
            });
        });

        return photosData;
    }

    /**
     * Obtiene todos los datos de la vista
     */
    getData() {
        const data = {};
        
        try {
            // Verificar que el contenedor existe
            if (!this.container) {
                console.warn('Container no disponible en Vista3.getData()');
                return data;
            }
            
            // Recopilar datos de inputs generales
            const inputs = this.container.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
            inputs.forEach(input => {
                try {
                    data[input.dataset.field] = input.value;
                } catch (error) {
                    console.warn('Error procesando input en Vista3:', error);
                }
            });

            // Agregar datos de la tabla DESPIECE
            try {
                data.despiece = this.getDespieceData();
            } catch (error) {
                console.warn('Error obteniendo datos de despiece en Vista3:', error);
                data.despiece = [];
            }
            
            // Obtener foto principal (base64)
            try {
                const fotoPrincipal = this.container.querySelector('#fotoPrincipal .foto-preview');
                
                if (fotoPrincipal && fotoPrincipal.src && !fotoPrincipal.src.includes('data:')) {
                    data.fotoPrincipal = fotoPrincipal.src;
                } else if (fotoPrincipal && fotoPrincipal.src) {
                    data.fotoPrincipal = fotoPrincipal.src;
                }
            } catch (error) {
                console.warn('Error procesando foto principal en Vista3:', error);
            }

        } catch (error) {
            console.error('Error general en Vista3.getData():', error);
        }

        return data;
    }

    /**
     * Carga los datos en la vista
     */
    loadData(data) {
        if (!data) return;

        // Cargar datos de inputs generales
        Object.keys(data).forEach(key => {
            const element = this.container.querySelector(`[data-field="${key}"]`);
            if (element) {
                if (element.type === 'file') {
                    // IMPORTANTE: No se puede asignar valor a inputs de tipo file
                    // Los archivos se manejan por separado usando Base64 en imágenes
                    console.log(`Vista3: Omitiendo asignación de valor a input file para campo: ${key}`);
                } else {
                    element.value = data[key] || '';
                }
            }
        });

        // Cargar datos de la tabla DESPIECE
        if (data.despiece && data.despiece.length > 0) {
            this.loadDespieceData(data.despiece);
        }

        // Cargar foto principal
        if (data.fotoPrincipal) {
            this.mostrarFoto('principal', data.fotoPrincipal);
        }
    }

    /**
     * Carga los datos en la tabla DESPIECE
     */
    loadDespieceData(despieceData) {
        const tabla = document.getElementById('tablaDespiece');
        if (!tabla) return;

        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar tabla existente

        despieceData.forEach((item, index) => {
            const fila = tbody.insertRow();
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td><input type="text" value="${item.descripcion || ''}" placeholder="Descripción de la pieza"></td>
                <td><input type="text" value="${item.cantidad || ''}" placeholder="Cantidad"></td>
            `;

            // Configurar eventos para los inputs cargados
            const inputs = fila.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('change', () => this.saveData());
            });
        });
    }

    /**
     * Abre el selector de archivos para subir una foto
     * @param {string} lado - 'principal'
     */
    subirFoto(lado) {
        console.log('Vista3: subirFoto llamado para lado:', lado);
        const input = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)} .file-input`);
        console.log('Vista3: Input encontrado:', !!input);
        if (input) {
            input.click();
        } else {
            console.error('Vista3: No se encontró el input file');
        }
    }

    /**
     * Maneja el cambio de archivo de foto
     * @param {Event} event - Evento de cambio
     */
    manejarCambioFoto(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es demasiado grande. Máximo 5MB permitido');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const lado = event.target.getAttribute('data-field') === 'fotoPrincipal' ? 'principal' : 'principal';
            this.mostrarFoto(lado, e.target.result);
            this.saveData();
        };
        reader.readAsDataURL(file);
    }

    /**
     * Muestra la foto en el contenedor correspondiente
     * 
     * COMPORTAMIENTO DE ADAPTACIÓN DE IMAGEN PRINCIPAL:
     * =================================================
     * - El contenedor .foto-upload mantiene su tamaño fijo (450px altura)
     * - La imagen se adapta proporcionalmente al contenedor (object-fit: contain)
     * - Fotos panorámicas: se ajustan al ancho, quedan márgenes arriba/abajo
     * - Fotos verticales: se ajustan a la altura, quedan márgenes izquierda/derecha
     * - La imagen completa siempre es visible sin cortes
     * - El contenedor mantiene sus dimensiones independiente de la imagen cargada
     * - La clase 'image-container' aplicada garantiza la contención y previene overflow
     * 
     * @param {string} lado - 'principal'
     * @param {string} dataUrl - URL de la imagen en base64
     */
    mostrarFoto(lado, dataUrl) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');

        // Validar que todos los elementos existen
        if (!container || !preview || !controls) {
            console.error('Vista3: Error - elementos no encontrados:', {
                container: !!container,
                preview: !!preview,
                controls: !!controls
            });
            return;
        }

        // Mostrar la imagen
        preview.src = dataUrl;
        preview.style.display = 'block';
        
        // Agregar clase para indicar que tiene imagen (esto activa los estilos CSS)
        container.classList.add('tiene-imagen');
        
        // Forzar la visibilidad de los controles
        controls.style.display = 'flex';
        controls.style.visibility = 'visible';
        controls.style.opacity = '1';
        controls.style.zIndex = '50';

        // Verificar que el botón eliminar exista y sea visible
        const btnEliminar = controls.querySelector('.vista4-btn-eliminar');
        
        if (btnEliminar) {
            // APLICAR LOS MISMOS ESTILOS EN LÍNEA QUE USA VISTA4
            btnEliminar.style.display = 'inline-block';
            btnEliminar.style.visibility = 'visible';
            btnEliminar.style.opacity = '1';
            
            console.log('Vista3: Botón eliminar configurado como visible (usando estilos Vista4)');
        } else {
            console.error('Vista3: Botón eliminar no encontrado');
        }
        
        console.log('Vista3: Imagen mostrada correctamente con controles visibles');
    }

    /**
     * Elimina la foto del contenedor correspondiente
     * @param {string} lado - 'principal'
     */
    eliminarFoto(lado) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');
        const input = container.querySelector('.file-input');

        // Solo eliminar la imagen y ocultar controles - mantener toda la funcionalidad del contenedor
        preview.style.display = 'none';
        preview.src = ''; // Usar src vacío en lugar de SVG
        input.value = '';

        // Usar setTimeout para suavizar la transición visual
        setTimeout(() => {
            // Remover la clase para volver al estado sin imagen (con fondo y borde)
            container.classList.remove('tiene-imagen');
        }, 150); // 150ms de delay para transición suave
        
        console.log('Vista3: Imagen eliminada - contenedor listo para nueva imagen');
        this.saveData();
    }

    /**
     * Guarda los datos de la vista
     */
    saveData() {
        this.data = this.getData();
        if (window.NavBarViewManager) {
            window.NavBarViewManager.setViewData('vista3', this.data);
        }
    }

    /**
     * Destruye la vista y limpia recursos
     */
    destroy() {
        this.container = null;
        this.data = {};
        window.Vista3Instance = null;
        console.log('Vista3 destruida');
    }
}

// Exportar para uso global
window.Vista3 = Vista3;
