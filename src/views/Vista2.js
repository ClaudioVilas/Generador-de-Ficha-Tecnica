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
                            <!-- CONTENEDOR CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                            <div class="foto-upload image-container" id="fotoIzquierda" onclick="console.log('Click detectado, Vista2Instance:', window.Vista2Instance); if(window.Vista2Instance) { Vista2Instance.subirFoto('izquierda'); } else { console.error('Vista2Instance no disponible'); }" style="cursor: pointer;">
                                <!-- IMAGEN CON OBJECT-FIT: COVER - Llena todo el contenedor sin márgenes -->
                                <img class="foto-preview" style="display: none;" src="">
                                <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoIzquierda">
                                <!-- SVG PLACEHOLDER CUANDO NO HAY IMAGEN -->
                                <div class="foto-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; font-size: 14px; text-align: center; width: 100%; height: 100%;">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                        <polyline points="21,15 16,10 5,21"/>
                                    </svg>
                                    <p style="margin: 8px 0 0 0; user-select: none;">Click para subir imagen</p>
                                </div>
                                <!-- BOTONES POSICIONADOS EN BORDE INFERIOR DEL CONTENEDOR -->
                                <div class="foto-controls vista4-controls" style="display: none;">
                                    <button type="button" class="btn-eliminar vista4-btn-eliminar" onclick="event.stopPropagation(); Vista2Instance.eliminarFoto('izquierda')">
                                        Eliminar Foto
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="foto-derecha">
                            <!-- CONTENEDOR CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                            <div class="foto-upload image-container" id="fotoDerecha" onclick="console.log('Click detectado, Vista2Instance:', window.Vista2Instance); if(window.Vista2Instance) { Vista2Instance.subirFoto('derecha'); } else { console.error('Vista2Instance no disponible'); }" style="cursor: pointer;">
                                <!-- IMAGEN CON OBJECT-FIT: COVER - Llena todo el contenedor sin márgenes -->
                                <img class="foto-preview" style="display: none;" src="">
                                <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoDerecha">
                                <!-- SVG PLACEHOLDER CUANDO NO HAY IMAGEN -->
                                <div class="foto-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; font-size: 14px; text-align: center; width: 100%; height: 100%;">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                        <polyline points="21,15 16,10 5,21"/>
                                    </svg>
                                    <p style="margin: 8px 0 0 0; user-select: none;">Click para subir imagen</p>
                                </div>
                                <!-- BOTONES POSICIONADOS EN BORDE INFERIOR DEL CONTENEDOR -->
                                <div class="foto-controls vista4-controls" style="display: none;">
                                    <button type="button" class="btn-eliminar vista4-btn-eliminar" onclick="event.stopPropagation(); Vista2Instance.eliminarFoto('derecha')">
                                        Eliminar Foto
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
        
        // Asegurar estado inicial correcto para contenedores de imagen
        this.ensureInitialState();
        
        // Establecer instancia global para callbacks
        window.Vista2Instance = this;
        
        console.log('Vista2 renderizada correctamente');
    }

    /**
     * Asegura que todos los contenedores de imagen estén en estado inicial
     */
    ensureInitialState() {
        // Para Vista2 hay dos imágenes: 'izquierda' y 'derecha'
        this.asegurarEstadoInicial('izquierda');
        this.asegurarEstadoInicial('derecha');
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
     * 
     * COMPORTAMIENTO DE ADAPTACIÓN DE IMAGEN:
     * =======================================
     * - El contenedor .foto-upload mantiene su tamaño fijo (400px altura)
     * - La imagen se adapta proporcionalmente al contenedor (object-fit: cover)
     * - Fotos panorámicas: se recortan para llenar completamente el contenedor
     * - Fotos verticales: se recortan para llenar completamente el contenedor  
     * - La imagen llena todo el contenedor sin márgenes (efecto cover)
     * - El contenedor mantiene sus dimensiones independiente de la imagen cargada
     * - La clase 'image-container' aplicada garantiza la contención y previene overflow
     * 
     * @param {string} lado - 'izquierda' o 'derecha'
     * @param {string} dataUrl - URL de la imagen en base64
     */
    mostrarFoto(lado, dataUrl) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        const placeholder = container.querySelector('.foto-placeholder');
        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');

        // Validar que todos los elementos existen
        if (!container || !preview || !controls) {
            console.error('Vista2: Error - elementos no encontrados:', {
                container: !!container,
                preview: !!preview,
                controls: !!controls
            });
            return;
        }

        // Ocultar placeholder y mostrar imagen
        placeholder.style.display = 'none';
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
            
            console.log('Vista2: Botón eliminar configurado como visible (usando estilos Vista4)');
        } else {
            console.error('Vista2: Botón eliminar no encontrado');
        }
        
        console.log('Vista2: Imagen mostrada correctamente con controles visibles');
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

        // Solo eliminar la imagen y ocultar controles - mantener toda la funcionalidad del contenedor
        preview.style.display = 'none';
        preview.src = ''; // Usar src vacío en lugar de SVG
        input.value = '';

        // Mostrar placeholder nuevamente
        placeholder.style.display = 'flex';
        
        // Ocultar controles
        controls.style.display = 'none';

        // Usar setTimeout para suavizar la transición visual
        setTimeout(() => {
            // Remover la clase para volver al estado sin imagen (con fondo y borde)
            container.classList.remove('tiene-imagen');
        }, 150); // 150ms de delay para transición suave
        
        console.log('Vista2: Imagen eliminada - contenedor listo para nueva imagen');
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
        if (data.fotoIzquierda && data.fotoIzquierda.trim() !== '') {
            this.mostrarFoto('izquierda', data.fotoIzquierda);
        } else {
            // Asegurar que el contenedor esté en estado inicial limpio
            this.asegurarEstadoInicial('izquierda');
        }
        
        if (data.fotoDerecha && data.fotoDerecha.trim() !== '') {
            this.mostrarFoto('derecha', data.fotoDerecha);
        } else {
            // Asegurar que el contenedor esté en estado inicial limpio
            this.asegurarEstadoInicial('derecha');
        }

        this.data = data;
        console.log('Datos cargados en Vista2:', data);
    }

    /**
     * Asegura que el contenedor esté en estado inicial limpio (solo placeholder visible)
     * @param {string} lado - 'izquierda' o 'derecha'
     */
    asegurarEstadoInicial(lado) {
        const container = this.container.querySelector(`#foto${lado.charAt(0).toUpperCase() + lado.slice(1)}`);
        if (!container) return;

        const preview = container.querySelector('.foto-preview');
        const controls = container.querySelector('.foto-controls');
        const placeholder = container.querySelector('.foto-placeholder');
        const input = container.querySelector('.file-input');

        // Forzar estado inicial: solo placeholder visible
        if (preview) {
            preview.style.display = 'none';
            preview.src = '';
        }
        if (controls) {
            controls.style.display = 'none';
        }
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
        if (input) {
            input.value = '';
        }
        
        // Remover clase de "tiene imagen"
        container.classList.remove('tiene-imagen');
        
        console.log(`Vista2: Estado inicial asegurado para ${lado}`);
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
