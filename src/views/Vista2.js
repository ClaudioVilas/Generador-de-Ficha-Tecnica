/**
 * Vista2 - Segunda vista de la ficha técnica
 * Enfocada en especificaciones técnicas y medidas
 */
class Vista2 {
    constructor() {
        this.container = null;
        this.data = {};
    }

    /**
     * Utilidad para preparar la vista antes de exportar PDF
     * Llamar antes de html2canvas y restaurar después
     */
    prepareForPDFExport() {
        console.log('📋 Vista2Instance: Preparando para exportación PDF...');
        if (!this.container) {
            console.log('⚠️ Vista2Instance: No hay contenedor disponible');
            return null;
        }
        console.log('🔧 Vista2Instance: Llamando método estático forceImagesVisibleForPDF');
        const result = Vista2.forceImagesVisibleForPDF(this.container);
        console.log('✅ Vista2Instance: Preparación completada');
        return result;
    }

    restoreAfterPDFExport(changed) {
        console.log('🔄 Vista2Instance: Restaurando después de exportación PDF...');
        Vista2.restoreImagesVisibility(changed);
        console.log('✅ Vista2Instance: Restauración completada');
    }

    static forceImagesVisibleForPDF(container) {
        const imgs = container.querySelectorAll('.foto-preview');
        const changed = [];
        console.log(`🔍 Vista2: Encontradas ${imgs.length} imágenes para hacer visibles`);
        imgs.forEach(img => {
            if (img && img.style.display === 'none') {
                changed.push({ el: img, prev: img.style.display });
                img.style.display = 'block';
                console.log(`👁️ Vista2: Imagen hecha visible:`, img.className);
            }
        });
        console.log(`✅ Vista2: ${changed.length} imágenes modificadas para PDF`);
        return changed;
    }

    static restoreImagesVisibility(changed) {
        console.log(`🔄 Vista2: Restaurando ${changed ? changed.length : 0} imágenes`);
        if (changed && changed.length > 0) {
            changed.forEach(({ el, prev }) => {
                el.style.display = prev;
                console.log(`↩️ Vista2: Imagen restaurada a display: ${prev}`);
            });
        }
        console.log(`✅ Vista2: Restauración de imágenes completada`);
    }

    /**
     * Renderiza la Vista2 en el contenedor especificado
     * @param {HTMLElement} container - Contenedor donde renderizar
     */
    render(container) {
        this.container = container;
        
        const vista2HTML = `
            <div class="vista2-container">
                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}

                <!-- Sección de fotos -->
                <div class="seccion-fotos">
                    <h3>IMÁGENES DEL PRODUCTO</h3>
                    <div class="fotos-container">
                        <div class="foto-izquierda">
                            <div class="foto-upload" id="fotoIzquierda">
                                <div class="foto-placeholder">
                                    <i class="📷"></i>
                                    <p>Imagen Principal</p>
                                    <button type="button" class="btn-upload" onclick="Vista2Instance.subirFoto('izquierda')">
                                        Subir Imagen
                                    </button>
                                </div>
                                <img class="foto-preview" style="display: none;" alt="Imagen Principal">
                                <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoIzquierda">
                                <div class="foto-controls" style="display: none;">
                                    <button type="button" class="btn-cambiar" onclick="Vista2Instance.subirFoto('izquierda')">
                                        Cambiar
                                    </button>
                                    <button type="button" class="btn-eliminar" onclick="Vista2Instance.eliminarFoto('izquierda')">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="foto-derecha">
                            <div class="foto-upload" id="fotoDerecha">
                                <div class="foto-placeholder">
                                    <i class="📷"></i>
                                    <p>Imagen Secundaria</p>
                                    <button type="button" class="btn-upload" onclick="Vista2Instance.subirFoto('derecha')">
                                        Subir Imagen
                                    </button>
                                </div>
                                <img class="foto-preview" style="display: none;" alt="Imagen Secundaria">
                                <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoDerecha">
                                <div class="foto-controls" style="display: none;">
                                    <button type="button" class="btn-cambiar" onclick="Vista2Instance.subirFoto('derecha')">
                                        Cambiar
                                    </button>
                                    <button type="button" class="btn-eliminar" onclick="Vista2Instance.eliminarFoto('derecha')">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = vista2HTML;
        this.setupEvents();
        
        // Establecer instancia global para callbacks
        window.Vista2Instance = this;
        
        console.log('Vista2 renderizada correctamente');
    }

    /**
     * Configura los eventos de la Vista2
     */
    setupEvents() {
        // Eventos de entrada de datos
        const inputs = this.container.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.saveData());
            input.addEventListener('change', () => this.saveData());
        });

        // Eventos de archivos de fotos
        const fileInputs = this.container.querySelectorAll('.file-input');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => this.manejarCambioFoto(e));
        });
    }

    /**
     * Abre el selector de archivos para subir una foto
     * @param {string} lado - 'izquierda' o 'derecha'
     */
    subirFoto(lado) {
        const input = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)} .file-input`);
        if (input) {
            input.click();
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
            const lado = event.target.getAttribute('data-field') === 'fotoIzquierda' ? 'izquierda' : 'derecha';
            this.mostrarFoto(lado, e.target.result);
            this.saveData();
        };
        reader.readAsDataURL(file);
    }

    /**
     * Muestra la foto en el contenedor correspondiente
     * @param {string} lado - 'izquierda' o 'derecha'
     * @param {string} dataUrl - URL de la imagen en base64
     */
    mostrarFoto(lado, dataUrl) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        const placeholder = container.querySelector('.foto-placeholder');
        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');

        placeholder.style.display = 'none';
        preview.src = dataUrl;
        preview.style.display = 'block';
        controls.style.display = 'flex';
    }

    /**
     * Elimina la foto del contenedor correspondiente
     * @param {string} lado - 'izquierda' o 'derecha'
     */
    eliminarFoto(lado) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        const placeholder = container.querySelector('.foto-placeholder');
        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');
        const input = container.querySelector('.file-input');

        placeholder.style.display = 'block';
        preview.style.display = 'none';
        preview.src = '';
        controls.style.display = 'none';
        input.value = '';

        this.saveData();
    }

    /**
     * Obtiene todos los datos de la Vista2
     * @returns {Object} Datos de la vista
     */
    getData() {
        const data = {};
        
        try {
            // Verificar que el contenedor existe
            if (!this.container) {
                console.warn('Container no disponible en Vista2.getData()');
                return data;
            }
            
            // Campos básicos
            const inputs = this.container.querySelectorAll('[data-field]');
            inputs.forEach(input => {
                try {
                    if (input.type === 'checkbox') {
                        data[input.getAttribute('data-field')] = input.checked;
                    } else {
                        data[input.getAttribute('data-field')] = input.value;
                    }
                } catch (error) {
                    console.warn('Error procesando input en Vista2:', error);
                }
            });

            // Obtener fotos (base64)
            try {
                const fotoIzquierda = this.container.querySelector('#fotoIzquierda .foto-preview');
                const fotoDerecha = this.container.querySelector('#fotoDerecha .foto-preview');
                
                if (fotoIzquierda && fotoIzquierda.src && !fotoIzquierda.src.includes('data:')) {
                    data.fotoIzquierda = fotoIzquierda.src;
                } else if (fotoIzquierda && fotoIzquierda.src) {
                    data.fotoIzquierda = fotoIzquierda.src;
                }

                if (fotoDerecha && fotoDerecha.src && !fotoDerecha.src.includes('data:')) {
                    data.fotoDerecha = fotoDerecha.src;
                } else if (fotoDerecha && fotoDerecha.src) {
                    data.fotoDerecha = fotoDerecha.src;
                }
            } catch (error) {
                console.warn('Error procesando fotos en Vista2:', error);
            }

        } catch (error) {
            console.error('Error general en Vista2.getData():', error);
        }

        return data;
    }    /**
     * Carga datos en la Vista2
     * @param {Object} data - Datos a cargar
     */
    loadData(data) {
        if (!data) return;
        
        // Cargar campos básicos
        Object.keys(data).forEach(key => {
            const input = this.container.querySelector(`[data-field="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = data[key];
                } else if (input.type === 'file') {
                    // IMPORTANTE: No se puede asignar valor a inputs de tipo file
                    // Los archivos se manejan por separado usando Base64 en imágenes
                    console.log(`Vista2: Omitiendo asignación de valor a input file para campo: ${key}`);
                } else {
                    input.value = data[key];
                }
            }
        });

        // Cargar fotos
        if (data.fotoIzquierda) {
            this.mostrarFoto('izquierda', data.fotoIzquierda);
        }
        
        if (data.fotoDerecha) {
            this.mostrarFoto('derecha', data.fotoDerecha);
        }

        this.data = data;
        console.log('Datos cargados en Vista2:', data);
    }

    /**
     * Guarda los datos automáticamente
     */
    saveData() {
        this.data = this.getData();
        if (window.NavBarViewManager) {
            window.NavBarViewManager.setViewData('vista2', this.data);
        }
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
     * Destruye la vista y limpia recursos
     */
    destroy() {
        this.container = null;
        this.data = {};
        window.Vista2Instance = null;
        console.log('Vista2 destruida');
    }
}

// Exportar para uso global
window.Vista2 = Vista2;
