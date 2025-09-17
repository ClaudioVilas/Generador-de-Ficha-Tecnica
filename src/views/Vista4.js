/**
 * Vista4 - Planificación de Corte
 * Maneja el control de calidad, acabados finales y aprobaciones
 * 
 * ESTRATEGIA DE MANEJO DE IMÁGENES:
 * ===================================
 * Esta vista implementa un patrón específico para manejar imágenes que resuelve
 * múltiples problemas técnicos:
 * 
 * 1. PROBLEMA ORIGINAL: InvalidStateError
 *    - Los elementos <input type="file"> no pueden tener su value asignado programáticamente
 *    - Esto causaba errores al cargar proyectos guardados
 * 
 * 2. SOLUCIÓN IMPLEMENTADA: DataURL (Base64)
 *    - Las imágenes se convierten inmediatamente a Base64 usando FileReader
 *    - Se almacenan como src de elementos <img>, NO en los file inputs
 *    - Los file inputs solo se usan para la selección inicial del archivo
 * 
 * 3. BENEFICIOS DE ESTE ENFOQUE:
 *    - ✅ Compatible con html2canvas (las imágenes Base64 se exportan correctamente en PDF)
 *    - ✅ Sin InvalidStateError al cargar datos guardados
 *    - ✅ Persistencia completa en localStorage
 *    - ✅ Funciona offline sin dependencias de archivos externos
 *    - ✅ Imágenes siempre disponibles para visualización y exportación
 * 
 * 4. FLUJO TÉCNICO:
 *    [Usuario selecciona archivo] → [FileReader convierte a Base64] → 
 *    [Se muestra en <img>] → [Se guarda Base64 en DataManager] → 
 *    [Al cargar: se restaura Base64 directamente en <img>]
 * 
 * MÉTODOS CLAVE:
 * - handleMaterialPhotoUpload(): Convierte archivos a Base64
 * - loadMuestraMaterialesData(): Restaura imágenes Base64 sin tocar file inputs
 * - getMuestraMaterialesData(): Recopila datos Base64 para persistencia
 */
class Vista4 {
    /**
     * Utilidad para preparar la vista antes de exportar PDF
     * Llamar antes de html2canvas y restaurar después
     */
    prepareForPDFExport() {
        console.log('📋 Vista4Instance: Preparando para exportación PDF...');
        if (!this.container) {
            console.log('⚠️ Vista4Instance: No hay contenedor disponible');
            return null;
        }
        console.log('🔧 Vista4Instance: Llamando método estático forceImagesVisibleForPDF');
        const result = Vista4.forceImagesVisibleForPDF(this.container);
        console.log('✅ Vista4Instance: Preparación completada');
        return result;
    }

    restoreAfterPDFExport(changed) {
        console.log('🔄 Vista4Instance: Restaurando después de exportación PDF...');
        Vista4.restoreImagesVisibility(changed);
        console.log('✅ Vista4Instance: Restauración completada');
    }
    static forceImagesVisibleForPDF(container) {
        const imgs = container.querySelectorAll('.foto-preview, .foto-preview-muestra, .material-image');
        const changed = [];
        console.log(`🔍 Vista4: Encontradas ${imgs.length} imágenes para hacer visibles`);
        imgs.forEach(img => {
            if (img && img.style.display === 'none') {
                changed.push({ el: img, prev: img.style.display });
                img.style.display = 'block';
                console.log(`👁️ Vista4: Imagen hecha visible:`, img.className);
            }
        });
        console.log(`✅ Vista4: ${changed.length} imágenes modificadas para PDF`);
        return changed;
    }

    static restoreImagesVisibility(changed) {
        console.log(`🔄 Vista4: Restaurando ${changed ? changed.length : 0} imágenes`);
        if (changed && changed.length > 0) {
            changed.forEach(({ el, prev }) => {
                el.style.display = prev;
                console.log(`↩️ Vista4: Imagen restaurada a display: ${prev}`);
            });
        }
        console.log(`✅ Vista4: Restauración de imágenes completada`);
    }

    constructor() {
        this.data = {};
        this.container = null;
        this.colorRowCounter = 2; // Contador para nuevas filas de color
        
        // Definir paleta de colores estilo Excel (igual que Vista1)
        this.colorPalette = {
            theme: [
                { name: 'Blanco', value: '#FFFFFF' },
                { name: 'Negro', value: '#000000' },
                { name: 'Gris Oscuro', value: '#404040' },
                { name: 'Azul Oscuro', value: '#1F4E79' },
                { name: 'Azul', value: '#4472C4' },
                { name: 'Rojo', value: '#C5504B' }
            ],
            standard: [
                { name: 'Rojo Oscuro', value: '#C00000' },
                { name: 'Rojo', value: '#FF0000' },
                { name: 'Naranja', value: '#FFC000' },
                { name: 'Amarillo', value: '#FFFF00' },
                { name: 'Verde Claro', value: '#92D050' },
                { name: 'Verde', value: '#00B050' },
                { name: 'Azul Claro', value: '#00B0F0' },
                { name: 'Azul', value: '#0070C0' },
                { name: 'Azul Oscuro', value: '#002060' },
                { name: 'Púrpura', value: '#7030A0' }
            ]
        };
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
     * Renderiza la Vista4 en el contenedor especificado
     */
    render(container) {
        try {
            this.container = container;
            
            const vista4HTML = `
                <div class="vista4-container">
                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}
                
                <!-- Contenedor principal con distribución 25%-75% -->
                <div class="contenedor-principal-vista4">
                    <!-- Fila superior: Muestra de Materiales + Imágenes -->
                    <div class="fila-materiales-imagenes">
                        <!-- Columna izquierda (25%) - Muestra de Materiales -->
                        <div class="columna-materiales">
                            <!-- Componente MUESTRA DE MATERIALES -->
                            <div class="seccion-muestra-materiales-completa">
                                <h3>MUESTRA DE MATERIALES</h3>
                                <div id="contenedorMuestraMateriales" class="contenedor-muestras">
                                <!-- Muestra 1 -->
                                <div class="muestra-item">
                                    <div class="muestra-foto-container">
                                        <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                                        <!-- CONTENEDOR DE MATERIAL CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                                        <div class="foto-muestra-box image-container">
                                            <button class="btn-agregar-foto" onclick="Vista4Instance.triggerMaterialInput(this)">+</button>
                                            <div class="foto-preview-muestra"></div>
                                        </div>
                                    </div>
                                    <div class="muestra-descripcion">
                                        <input type="text" value="Hilo de poliester de color rojo y mostaza" placeholder="Descripción del material" class="input-descripcion-material">
                                    </div>
                                </div>
                                <!-- Muestra 2 -->
                                <div class="muestra-item">
                                    <div class="muestra-foto-container">
                                        <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                                        <!-- CONTENEDOR DE MATERIAL CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                                        <div class="foto-muestra-box image-container">
                                            <button class="btn-agregar-foto" onclick="Vista4Instance.triggerMaterialInput(this)">+</button>
                                            <div class="foto-preview-muestra"></div>
                                        </div>
                                    </div>
                                    <div class="muestra-descripcion">
                                        <input type="text" value="Cierre invisible de 35 cm" placeholder="Descripción del material" class="input-descripcion-material">
                                    </div>
                                </div>
                            </div>
                            <div class="controles-muestra">
                                <button class="btn-eliminar-muestra" onclick="Vista4Instance.eliminarUltimaMuestra()" title="Eliminar última muestra">-</button>
                                <button class="btn-agregar-muestra" onclick="Vista4Instance.agregarMuestra()" title="Agregar muestra">+</button>
                            </div>
                        </div>
                        
                        <!-- Columna derecha (75%) - Taller de Corte -->
                        <div class="columna-imagenes">
                            <div class="seccion-taller-corte">
                                <h3>TALLER DE CORTE</h3>
                                <div class="contenedor-taller-corte">
                                    <div class="tabla-taller-corte">
                                        <div class="fila-header">
                                            <div class="columna-color-header">Color</div>
                                            <div class="columna-talles-header">Talles</div>
                                        </div>
                                        <div class="fila-subheader">
                                            <div class="columna-color-subheader"></div>
                                            <div class="columna-talles-grid">
                                                <div class="talle-header">XS</div>
                                                <div class="talle-header">S</div>
                                                <div class="talle-header">M</div>
                                                <div class="talle-header">L</div>
                                                <div class="talle-header">XL</div>
                                                <div class="talle-header">XXL</div>
                                            </div>
                                        </div>
                                        <!-- Fila de color ejemplo 1 (Amarillo) -->
                                        <div class="fila-color" data-color-row="1">
                                            <div class="columna-color">
                                                <div class="color-selector-taller" data-color-id="taller-color-1">
                                                    <div class="color-display-button" onclick="Vista4Instance.toggleColorPalette('taller-color-1')">
                                                        <div class="color-display-preview" style="background-color: #FFFF00"></div>
                                                    </div>
                                                    <div class="color-palette" id="palette-taller-color-1" style="display: none;">
                                                        <div class="color-section">
                                                            <div class="color-section-title">Colores del tema</div>
                                                            <div class="color-grid theme-colors">
                                                                <div class="color-option" style="background-color: #FFFFFF" title="Blanco" onclick="Vista4Instance.selectColorTaller(event, '#FFFFFF')"></div>
                                                                <div class="color-option" style="background-color: #000000" title="Negro" onclick="Vista4Instance.selectColorTaller(event, '#000000')"></div>
                                                                <div class="color-option" style="background-color: #404040" title="Gris Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#404040')"></div>
                                                                <div class="color-option" style="background-color: #1F4E79" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#1F4E79')"></div>
                                                                <div class="color-option" style="background-color: #4472C4" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#4472C4')"></div>
                                                                <div class="color-option" style="background-color: #C5504B" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#C5504B')"></div>
                                                            </div>
                                                        </div>
                                                        <div class="color-section">
                                                            <div class="color-section-title">Colores estándar</div>
                                                            <div class="color-grid standard-colors">
                                                                <div class="color-option" style="background-color: #C00000" title="Rojo Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#C00000')"></div>
                                                                <div class="color-option" style="background-color: #FF0000" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#FF0000')"></div>
                                                                <div class="color-option" style="background-color: #FFC000" title="Naranja" onclick="Vista4Instance.selectColorTaller(event, '#FFC000')"></div>
                                                                <div class="color-option" style="background-color: #FFFF00" title="Amarillo" onclick="Vista4Instance.selectColorTaller(event, '#FFFF00')"></div>
                                                                <div class="color-option" style="background-color: #92D050" title="Verde Claro" onclick="Vista4Instance.selectColorTaller(event, '#92D050')"></div>
                                                                <div class="color-option" style="background-color: #00B050" title="Verde" onclick="Vista4Instance.selectColorTaller(event, '#00B050')"></div>
                                                                <div class="color-option" style="background-color: #00B0F0" title="Azul Claro" onclick="Vista4Instance.selectColorTaller(event, '#00B0F0')"></div>
                                                                <div class="color-option" style="background-color: #0070C0" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#0070C0')"></div>
                                                                <div class="color-option" style="background-color: #002060" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#002060')"></div>
                                                                <div class="color-option" style="background-color: #7030A0" title="Púrpura" onclick="Vista4Instance.selectColorTaller(event, '#7030A0')"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columna-talles-grid">
                                                <input type="number" class="input-talle" data-talle="XS" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="S" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="M" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="L" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="XL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="XXL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                            </div>
                                        </div>
                                        <!-- Fila de color ejemplo 2 (Rojo) -->
                                        <div class="fila-color" data-color-row="2">
                                            <div class="columna-color">
                                                <div class="color-selector-taller" data-color-id="taller-color-2">
                                                    <div class="color-display-button" onclick="Vista4Instance.toggleColorPalette('taller-color-2')">
                                                        <div class="color-display-preview" style="background-color: #C5504B"></div>
                                                    </div>
                                                    <div class="color-palette" id="palette-taller-color-2" style="display: none;">
                                                        <div class="color-section">
                                                            <div class="color-section-title">Colores del tema</div>
                                                            <div class="color-grid theme-colors">
                                                                <div class="color-option" style="background-color: #FFFFFF" title="Blanco" onclick="Vista4Instance.selectColorTaller(event, '#FFFFFF')"></div>
                                                                <div class="color-option" style="background-color: #000000" title="Negro" onclick="Vista4Instance.selectColorTaller(event, '#000000')"></div>
                                                                <div class="color-option" style="background-color: #404040" title="Gris Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#404040')"></div>
                                                                <div class="color-option" style="background-color: #1F4E79" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#1F4E79')"></div>
                                                                <div class="color-option" style="background-color: #4472C4" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#4472C4')"></div>
                                                                <div class="color-option" style="background-color: #C5504B" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#C5504B')"></div>
                                                            </div>
                                                        </div>
                                                        <div class="color-section">
                                                            <div class="color-section-title">Colores estándar</div>
                                                            <div class="color-grid standard-colors">
                                                                <div class="color-option" style="background-color: #C00000" title="Rojo Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#C00000')"></div>
                                                                <div class="color-option" style="background-color: #FF0000" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#FF0000')"></div>
                                                                <div class="color-option" style="background-color: #FFC000" title="Naranja" onclick="Vista4Instance.selectColorTaller(event, '#FFC000')"></div>
                                                                <div class="color-option" style="background-color: #FFFF00" title="Amarillo" onclick="Vista4Instance.selectColorTaller(event, '#FFFF00')"></div>
                                                                <div class="color-option" style="background-color: #92D050" title="Verde Claro" onclick="Vista4Instance.selectColorTaller(event, '#92D050')"></div>
                                                                <div class="color-option" style="background-color: #00B050" title="Verde" onclick="Vista4Instance.selectColorTaller(event, '#00B050')"></div>
                                                                <div class="color-option" style="background-color: #00B0F0" title="Azul Claro" onclick="Vista4Instance.selectColorTaller(event, '#00B0F0')"></div>
                                                                <div class="color-option" style="background-color: #0070C0" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#0070C0')"></div>
                                                                <div class="color-option" style="background-color: #002060" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#002060')"></div>
                                                                <div class="color-option" style="background-color: #7030A0" title="Púrpura" onclick="Vista4Instance.selectColorTaller(event, '#7030A0')"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columna-talles-grid">
                                                <input type="number" class="input-talle" data-talle="XS" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="S" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="M" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="L" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="XL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                                <input type="number" class="input-talle" data-talle="XXL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="total-prendas-container">
                                        <span class="total-prendas-label">Cantidad total de prendas:</span>
                                        <span class="total-prendas-valor" id="total-prendas">-</span>
                                    </div>
                                    <div class="controles-taller">
                                        <button class="btn-eliminar-color" onclick="Vista4Instance.eliminarFilaColor()" title="Eliminar color">-</button>
                                        <button class="btn-agregar-color" onclick="Vista4Instance.agregarFilaColor()" title="Agregar color">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Fila inferior: Imágenes del Producto -->
                    <div class="fila-taller">
                        <!-- Columna completa - Imágenes del Producto -->
                        <div class="seccion-fotos seccion-fotos-lateral">
                            <h3>IMÁGENES DEL PRODUCTO</h3>
                            <div class="fotos-container">
                                <div class="foto-principal">
                                    <!-- CONTENEDOR DE IMAGEN LIMPIO - Sin texto ni íconos innecesarios -->
                                    <div class="foto-upload image-container" id="fotoPrincipal" onclick="Vista4Instance.subirFoto('principal')" style="cursor: pointer;">
                                        <!-- IMAGEN CON OBJECT-FIT: COVER - Llena todo el contenedor sin márgenes -->
                                        <img class="foto-preview" style="display: none;" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==">
                                        <input type="file" class="file-input" accept="image/*" style="display: none;" data-field="fotoPrincipal">
                                        <!-- BOTONES POSICIONADOS EN BORDE INFERIOR DEL CONTENEDOR -->
                                        <div class="foto-controls vista4-controls" style="display: none;">
                                            <button type="button" class="btn-eliminar vista4-btn-eliminar" onclick="event.stopPropagation(); Vista4Instance.eliminarFoto('principal')">
                                                Eliminar Foto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    container.innerHTML = vista4HTML;
    this.setupEvents();
    // Establecer instancia global para callbacks
    window.Vista4Instance = this;
    console.log('Vista4 renderizada correctamente');
        } catch (error) {
            console.error('Error al renderizar Vista4:', error);
        }
    }

    /**
     * Configura los eventos de la Vista4
     */
    setupEvents() {
        // Event listeners para actualización automática de datos
        const inputs = this.container.querySelectorAll('input, select, textarea');
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
     * Crea el HTML de la paleta de colores para el componente TALLER DE CORTE
     * @returns {string} HTML de la paleta de colores
     */
    createColorPaletteHTML() {
        return `
            <div class="color-section">
                <div class="color-section-title">Colores del tema</div>
                <div class="color-grid theme-colors">
                    ${this.colorPalette.theme.map(color => 
                        `<div class="color-option" 
                             style="background-color: ${color.value}" 
                             title="${color.name}"
                             onclick="Vista4Instance.selectColorTaller(event, '${color.value}')"></div>`
                    ).join('')}
                </div>
            </div>
            <div class="color-section">
                <div class="color-section-title">Colores estándar</div>
                <div class="color-grid standard-colors">
                    ${this.colorPalette.standard.map(color => 
                        `<div class="color-option" 
                             style="background-color: ${color.value}" 
                             title="${color.name}"
                             onclick="Vista4Instance.selectColorTaller(event, '${color.value}')"></div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Alterna la visibilidad de la paleta de colores para TALLER DE CORTE
     * @param {string} id - ID del selector de color
     */
    toggleColorPalette(id) {
        const palette = document.getElementById(`palette-${id}`);
        const allPalettes = document.querySelectorAll('.color-palette');
        
        // Cerrar todas las otras paletas
        allPalettes.forEach(p => {
            if (p.id !== `palette-${id}`) {
                p.style.display = 'none';
            }
        });
        
        // Alternar la paleta actual
        if (palette.style.display === 'none' || palette.style.display === '') {
            palette.style.display = 'block';
        } else {
            palette.style.display = 'none';
        }
    }

    /**
     * Selecciona un color para el componente TALLER DE CORTE
     * @param {Event} event - Evento del clic
     * @param {string} colorValue - Valor del color seleccionado
     */
    selectColorTaller(event, colorValue) {
        const colorOption = event.target;
        const palette = colorOption.closest('.color-palette');
        const container = palette.closest('.color-selector-taller');
        const preview = container.querySelector('.color-display-preview');
        
        // Actualizar preview
        preview.style.backgroundColor = colorValue;
        
        // Actualizar selección visual
        const options = palette.querySelectorAll('.color-option');
        options.forEach(option => option.classList.remove('selected'));
        colorOption.classList.add('selected');
        
        // Cerrar paleta
        palette.style.display = 'none';
        
        // Almacenar valor seleccionado
        container.setAttribute('data-selected-color', colorValue);
    }

    /**
     * Calcula el total de prendas automáticamente
     */
    calcularTotalPrendas() {
        const inputs = document.querySelectorAll('.input-talle');
        let total = 0;
        let hasValues = false;
        
        inputs.forEach(input => {
            if (input.value && input.value.trim() !== '') {
                hasValues = true;
                const valor = parseInt(input.value) || 0;
                total += valor;
            }
        });
        
        // Si no hay valores ingresados, mostrar "-", sino mostrar el total
        document.getElementById('total-prendas').textContent = hasValues ? total : '-';
    }

    /**
     * Agrega una nueva fila de color al componente TALLER DE CORTE
     */
    agregarFilaColor() {
        this.colorRowCounter++;
        const tabla = document.querySelector('.tabla-taller-corte');
        const controles = document.querySelector('.controles-taller');
        
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'fila-color';
        nuevaFila.setAttribute('data-color-row', this.colorRowCounter);
        
        nuevaFila.innerHTML = `
            <div class="columna-color">
                <div class="color-selector-taller" data-color-id="taller-color-${this.colorRowCounter}">
                    <div class="color-display-button" onclick="Vista4Instance.toggleColorPalette('taller-color-${this.colorRowCounter}')">
                        <div class="color-display-preview" style="background-color: #FFFFFF"></div>
                    </div>
                    <div class="color-palette" id="palette-taller-color-${this.colorRowCounter}" style="display: none;">
                        <div class="color-section">
                            <div class="color-section-title">Colores del tema</div>
                            <div class="color-grid theme-colors">
                                <div class="color-option" style="background-color: #FFFFFF" title="Blanco" onclick="Vista4Instance.selectColorTaller(event, '#FFFFFF')"></div>
                                <div class="color-option" style="background-color: #000000" title="Negro" onclick="Vista4Instance.selectColorTaller(event, '#000000')"></div>
                                <div class="color-option" style="background-color: #404040" title="Gris Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#404040')"></div>
                                <div class="color-option" style="background-color: #1F4E79" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#1F4E79')"></div>
                                <div class="color-option" style="background-color: #4472C4" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#4472C4')"></div>
                                <div class="color-option" style="background-color: #C5504B" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#C5504B')"></div>
                            </div>
                        </div>
                        <div class="color-section">
                            <div class="color-section-title">Colores estándar</div>
                            <div class="color-grid standard-colors">
                                <div class="color-option" style="background-color: #C00000" title="Rojo Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#C00000')"></div>
                                <div class="color-option" style="background-color: #FF0000" title="Rojo" onclick="Vista4Instance.selectColorTaller(event, '#FF0000')"></div>
                                <div class="color-option" style="background-color: #FFC000" title="Naranja" onclick="Vista4Instance.selectColorTaller(event, '#FFC000')"></div>
                                <div class="color-option" style="background-color: #FFFF00" title="Amarillo" onclick="Vista4Instance.selectColorTaller(event, '#FFFF00')"></div>
                                <div class="color-option" style="background-color: #92D050" title="Verde Claro" onclick="Vista4Instance.selectColorTaller(event, '#92D050')"></div>
                                <div class="color-option" style="background-color: #00B050" title="Verde" onclick="Vista4Instance.selectColorTaller(event, '#00B050')"></div>
                                <div class="color-option" style="background-color: #00B0F0" title="Azul Claro" onclick="Vista4Instance.selectColorTaller(event, '#00B0F0')"></div>
                                <div class="color-option" style="background-color: #0070C0" title="Azul" onclick="Vista4Instance.selectColorTaller(event, '#0070C0')"></div>
                                <div class="color-option" style="background-color: #002060" title="Azul Oscuro" onclick="Vista4Instance.selectColorTaller(event, '#002060')"></div>
                                <div class="color-option" style="background-color: #7030A0" title="Púrpura" onclick="Vista4Instance.selectColorTaller(event, '#7030A0')"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columna-talles-grid">
                <input type="number" class="input-talle" data-talle="XS" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                <input type="number" class="input-talle" data-talle="S" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                <input type="number" class="input-talle" data-talle="M" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                <input type="number" class="input-talle" data-talle="L" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                <input type="number" class="input-talle" data-talle="XL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
                <input type="number" class="input-talle" data-talle="XXL" min="0" onchange="Vista4Instance.calcularTotalPrendas()">
            </div>
        `;
        
        tabla.appendChild(nuevaFila);
        this.calcularTotalPrendas();
    }

    /**
     * Elimina la última fila de color del componente TALLER DE CORTE
     */
    eliminarFilaColor() {
        const tabla = document.querySelector('.tabla-taller-corte');
        const filas = tabla.querySelectorAll('.fila-color');
        
        if (filas.length > 1) {
            filas[filas.length - 1].remove();
            this.colorRowCounter--;
            this.calcularTotalPrendas();
        }
    }

    /**
     * Agrega una nueva fila a la tabla de muestra de materiales
     */
    agregarMuestra() {
        const contenedor = document.getElementById('contenedorMuestraMateriales');
        
        const nuevaMuestra = document.createElement('div');
        nuevaMuestra.className = 'muestra-item';
        nuevaMuestra.innerHTML = `
            <div class="muestra-foto-container">
                <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                <!-- CONTENEDOR DE MATERIAL CON TAMAÑO FIJO - Las imágenes se adaptan sin desbordamiento -->
                <div class="foto-muestra-box image-container">
                    <button class="btn-agregar-foto" onclick="Vista4Instance.triggerMaterialInput(this)">+</button>
                    <div class="foto-preview-muestra"></div>
                </div>
            </div>
            <div class="muestra-descripcion">
                <input type="text" placeholder="Descripción del material" class="input-descripcion-material">
            </div>
        `;
        
        contenedor.appendChild(nuevaMuestra);
        
        // Configurar eventos para el nuevo input
        const nuevoInput = nuevaMuestra.querySelector('.input-descripcion-material');
        nuevoInput.addEventListener('change', () => this.saveData());
        
        this.saveData();
    }

    /**
     * Elimina la última fila de la tabla de muestra de materiales
     */
    eliminarUltimaMuestra() {
        const contenedor = document.getElementById('contenedorMuestraMateriales');
        const muestras = contenedor.querySelectorAll('.muestra-item');
        
        if (muestras.length > 1) {
            muestras[muestras.length - 1].remove();
            this.saveData();
        }
    }

    /**
     * Activa el input de archivo para un material específico
     */
    triggerMaterialInput(button) {
        const container = button.closest('.muestra-foto-container');
        const fileInput = container.querySelector('.input-foto-material-hidden');
        fileInput.click();
    }

    /**
     * Maneja la carga de fotos para materiales individuales
     */
    /**
     * Maneja la carga de fotos de materiales
     * 
     * FLUJO TÉCNICO IMPORTANTE:
     * 1. El usuario selecciona un archivo usando <input type="file">
     * 2. El archivo se convierte inmediatamente a DataURL (Base64) usando FileReader
     * 3. El DataURL se almacena como src de un elemento <img>
     * 4. Los datos se guardan en formato Base64, NO como referencia al archivo
     * 
     * VENTAJAS DE ESTE ENFOQUE:
     * - Compatible con html2canvas para exportación PDF (las imágenes Base64 se renderizan correctamente)
     * - No hay InvalidStateError al cargar datos guardados (no se intenta asignar valores a file inputs)
     * - Las imágenes persisten en el localStorage sin problemas de rutas de archivo
     * - Funciona offline sin dependencias de archivos externos
     * 
     * @param {Event} event - Evento de cambio del input file
     * @param {HTMLInputElement} input - Elemento input que disparó el evento
     */
    handleMaterialPhotoUpload(event, input) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido.');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo es demasiado grande. El tamaño máximo permitido es 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            // NOTA: e.target.result contiene el DataURL (Base64) de la imagen
            // Este formato es compatible con html2canvas y se puede guardar en localStorage
            const base64Image = e.target.result;
            
            const container = input.closest('.muestra-foto-container');
            const previewDiv = container.querySelector('.foto-preview-muestra');
            const botonAgregar = container.querySelector('.btn-agregar-foto');
            
            // Crear elemento img con el Base64 como src
            // ADAPTACIÓN DE IMÁGENES DE MATERIALES:
            // ====================================
            // - Contenedor fijo: 60x60px (foto-muestra-box)
            // - object-fit: contain = muestra el material completo sin cortes
            // - object-position: center = centra la imagen en el contenedor
            // - Es preferible ver toda la muestra aunque queden espacios en blanco
            // - Evita cortar detalles importantes de texturas o colores
            previewDiv.innerHTML = `
                <img src="${base64Image}" alt="Material" class="material-image">
                <button class="btn-remove-material" onclick="Vista4Instance.removeMaterialPhoto(this)">×</button>
            `;
            
            // Ocultar el botón + cuando hay imagen
            botonAgregar.style.display = 'none';
            
            // Guardar datos (esto almacenará el Base64 en el DataManager)
            this.saveData();
            
            console.log('Vista4: Imagen de material cargada y convertida a Base64');
        };
        
        // Iniciar conversión a DataURL (Base64)
        reader.readAsDataURL(file);
    }

    /**
     * Elimina la foto de un material
     * 
     * FUNCIONAMIENTO:
     * - Limpia el contenido HTML que muestra la imagen Base64
     * - Resetea el input de archivo (esto SÍ es seguro, solo limpia el valor)
     * - Restaura la visibilidad del botón "+" para agregar nueva imagen
     * - Guarda los cambios para actualizar el DataManager
     * 
     * NOTA: Es seguro limpiar el value de un file input, solo no se puede asignar
     * 
     * @param {HTMLButtonElement} button - Botón de eliminar que fue clickeado
     */
    removeMaterialPhoto(button) {
        const container = button.closest('.muestra-foto-container');
        const previewDiv = container.querySelector('.foto-preview-muestra');
        const fileInput = container.querySelector('.input-foto-material-hidden');
        const botonAgregar = container.querySelector('.btn-agregar-foto');
        
        // Limpiar la vista previa (elimina la imagen Base64 del DOM)
        previewDiv.innerHTML = '';
        
        // Limpiar el input de archivo (esto SÍ es permitido por el navegador)
        fileInput.value = '';
        
        // Mostrar el botón + nuevamente para permitir nueva carga
        botonAgregar.style.display = 'block';
        
        // Guardar cambios (esto eliminará el Base64 del DataManager)
        this.saveData();
        
        console.log('Vista4: Imagen de material eliminada');
    }

    /**
     * Abre el selector de archivos para subir una foto
     * @param {string} lado - 'principal'
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
            const lado = event.target.getAttribute('data-field') === 'fotoPrincipal' ? 'principal' : 'principal';
            this.mostrarFoto(lado, e.target.result);
            this.saveData();
        };
        reader.readAsDataURL(file);
    }

    /**
     * Muestra la foto en el contenedor correspondiente
     * 
     * COMPORTAMIENTO DE ADAPTACIÓN DE IMAGEN VISTA4:
     * ==============================================
     * - El contenedor .foto-upload mantiene su tamaño fijo (380px altura)
     * - La imagen se adapta con object-fit: COVER para llenar todo el contenedor
     * - NO quedan márgenes en blanco dentro del contenedor
     * - La imagen puede ser cortada para llenar completamente el espacio
     * - El contenedor NUNCA cambia su tamaño según la imagen
     * - Los botones se posicionan en el borde inferior, centrados horizontalmente
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
            console.error('Vista4: Error - elementos no encontrados:', {
                container: !!container,
                preview: !!preview,
                controls: !!controls
            });
            return;
        }

        preview.src = dataUrl;
        preview.style.display = 'block';
        controls.style.display = 'flex';
        controls.style.visibility = 'visible'; // Asegurar visibilidad
        
        // Agregar clase para indicar que tiene imagen
        container.classList.add('tiene-imagen');

        // Verificar que el botón eliminar exista y sea visible
        const btnEliminar = controls.querySelector('.vista4-btn-eliminar');
        
        if (btnEliminar) {
            // Forzar visibilidad del botón eliminar con clase específica de Vista4
            btnEliminar.style.display = 'inline-block';
            btnEliminar.style.visibility = 'visible';
            btnEliminar.style.opacity = '1';
            
            console.log('Vista4: Botón eliminar configurado como visible');
        } else {
            console.error('Vista4: Botón eliminar no encontrado:', {
                btnEliminar: !!btnEliminar
            });
        }
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
        preview.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';
        controls.style.display = 'none';
        controls.style.visibility = 'hidden'; // Forzar ocultación adicional por si hay CSS con !important
        input.value = '';

        // Remover la clase para volver al estado sin imagen (con fondo y borde)
        container.classList.remove('tiene-imagen');
        
        console.log('Vista4: Imagen eliminada - contenedor listo para nueva imagen');
        this.saveData();
    }

    /**
     * Obtiene los datos de la tabla de muestra de materiales
     */
    /**
     * Obtiene los datos de la muestra de materiales
     * 
     * IMPORTANTE: Las imágenes se almacenan como DataURL (Base64) en el src de los elementos <img>.
     * Esto garantiza:
     * - Compatibilidad con html2canvas para exportación PDF
     * - Persistencia en localStorage sin problemas de rutas
     * - No hay InvalidStateError al cargar datos guardados
     * 
     * @returns {Array<Object>} Array de objetos con estructura:
     *   - foto: {string} DataURL (Base64) de la imagen o string vacío
     *   - descripcion: {string} Descripción del material
     */
    getMuestraMaterialesData() {
        try {
            const contenedor = document.getElementById('contenedorMuestraMateriales');
            if (!contenedor) {
                console.warn('Contenedor de muestra de materiales no encontrado');
                return [];
            }

            const muestras = contenedor.querySelectorAll('.muestra-item');
            const data = [];

            muestras.forEach((muestra, index) => {
                try {
                    const descripcionInput = muestra.querySelector('.input-descripcion-material');
                    const fotoImg = muestra.querySelector('.material-image');
                    
                    const materialData = {
                        foto: fotoImg ? fotoImg.src : '', // Base64 DataURL o string vacío
                        descripcion: descripcionInput ? descripcionInput.value : ''
                    };
                    
                    data.push(materialData);
                    
                    // Log solo si hay imagen (para debugging)
                    if (materialData.foto) {
                        console.log(`Vista4: Material ${index + 1} tiene imagen Base64 (${materialData.foto.length} caracteres)`);
                    }
                } catch (error) {
                    console.warn(`Error procesando muestra de material ${index + 1}:`, error);
                }
            });
            
            console.log(`Vista4: Recopilados datos de ${data.length} materiales`);
            return data;
        } catch (error) {
            console.error('Error en getMuestraMaterialesData:', error);
            return [];
        }
    }

    /**
     * Obtiene todos los datos de la vista
     */
    getData() {
        const data = {};
        
        try {
            // Validar que el contenedor existe
            if (!this.container) {
                console.warn('Container no disponible en Vista4.getData()');
                return data;
            }
            
            // Recopilar datos de inputs generales
            const inputs = this.container.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
            inputs.forEach(input => {
                try {
                    if (input.type === 'checkbox') {
                        data[input.dataset.field] = input.checked;
                    } else if (input.type === 'radio') {
                        if (input.checked) {
                            data[input.dataset.field] = input.value;
                        }
                    } else {
                        data[input.dataset.field] = input.value;
                    }
                } catch (error) {
                    console.warn('Error procesando input en Vista4:', error);
                }
            });

            // Agregar datos de la tabla de muestra de materiales
            try {
                data.muestraMateriales = this.getMuestraMaterialesData();
            } catch (error) {
                console.warn('Error obteniendo datos de muestra de materiales en Vista4:', error);
                data.muestraMateriales = [];
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
                console.warn('Error procesando foto principal en Vista4:', error);
            }

        } catch (error) {
            console.error('Error general en Vista4.getData():', error);
        }

        return data;
    }

    /**
     * Carga los datos en la vista
     */
    loadData(data) {
        if (!data || !this.container) return;

        // Cargar datos de inputs generales
        Object.keys(data).forEach(key => {
            const element = this.container.querySelector(`[data-field="${key}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else if (element.type === 'radio') {
                    if (element.value === data[key]) {
                        element.checked = true;
                    }
                } else if (element.type === 'file') {
                    // IMPORTANTE: No se puede asignar valor a inputs de tipo file
                    // Los archivos se manejan por separado usando Base64 en imágenes
                    console.log(`Vista4: Omitiendo asignación de valor a input file para campo: ${key}`);
                } else {
                    element.value = data[key] || '';
                }
            }
        });

        // Cargar datos de la tabla de muestra de materiales
        if (data.muestraMateriales && Array.isArray(data.muestraMateriales) && data.muestraMateriales.length > 0) {
            if (typeof this.loadMuestraMaterialesData === 'function') {
                this.loadMuestraMaterialesData(data.muestraMateriales);
            }
        }

        // Cargar foto principal
        if (data.fotoPrincipal) {
            const fotoContainer = this.container.querySelector('#fotoPrincipal .foto-preview');
            if (fotoContainer) {
                this.mostrarFoto('principal', data.fotoPrincipal);
            }
        }

        this.data = data;
        console.log('Datos cargados en Vista4:', data);
    }

    /**
     * Carga los datos en la tabla de muestra de materiales
     * IMPORTANTE: Este método maneja imágenes almacenadas como DataURL (Base64) 
     * para evitar el InvalidStateError que ocurre al intentar asignar valores 
     * a elementos <input type="file"> programáticamente.
     * 
     * Las imágenes se muestran directamente como <img> con src en Base64,
     * lo que es compatible con html2canvas para la exportación PDF.
     */
    loadMuestraMaterialesData(materialesData) {
        const contenedor = document.getElementById('contenedorMuestraMateriales');
        if (!contenedor) {
            console.warn('Vista4: Contenedor de muestra de materiales no encontrado');
            return;
        }

        contenedor.innerHTML = ''; // Limpiar contenedor existente

        materialesData.forEach((item, index) => {
            const nuevaMuestra = document.createElement('div');
            nuevaMuestra.className = 'muestra-item';
            
            // NOTA TÉCNICA: No intentamos asignar valores a los inputs de archivo
            // porque esto causaría InvalidStateError. En su lugar, mostramos 
            // directamente las imágenes Base64 almacenadas.
            nuevaMuestra.innerHTML = `
                <div class="muestra-foto-container">
                    <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                    <div class="foto-muestra-box">
                        <button class="btn-agregar-foto" onclick="Vista4Instance.triggerMaterialInput(this)" ${item.foto ? 'style="display: none;"' : ''}>+</button>
                        <div class="foto-preview-muestra">
                            ${item.foto ? `
                                <img src="${item.foto}" alt="Material ${index + 1}" class="material-image">
                                <button class="btn-remove-material" onclick="Vista4Instance.removeMaterialPhoto(this)">×</button>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="muestra-descripcion">
                    <input type="text" value="${item.descripcion || ''}" placeholder="Descripción del material" class="input-descripcion-material">
                </div>
            `;

            contenedor.appendChild(nuevaMuestra);

            // Configurar eventos para los inputs cargados
            const input = nuevaMuestra.querySelector('.input-descripcion-material');
            input.addEventListener('change', () => this.saveData());

            // Log para debugging (solo si hay imagen)
            if (item.foto) {
                console.log(`Vista4: Imagen cargada para material ${index + 1} (Base64: ${item.foto.substring(0, 50)}...)`);
            }
        });

        console.log(`Vista4: Cargados ${materialesData.length} materiales`);
    }

    /**
     * Guarda los datos de la vista
     */
    saveData() {
        try {
            // Validar que la vista esté inicializada
            if (!this.container) {
                console.warn('Vista4: Intento de guardar datos antes de la inicialización');
                return;
            }
            
            this.data = this.getData();
            if (window.NavBarViewManager) {
                window.NavBarViewManager.setViewData('vista4', this.data);
            }
        } catch (error) {
            console.error('Error al guardar datos de Vista4:', error);
        }
    }

    /**
     * Destruye la vista y limpia recursos
     */
    destroy() {
        this.container = null;
        this.data = {};
        window.Vista4Instance = null;
        console.log('Vista4 destruida');
    }
}

// Exportar para uso global
window.Vista4 = Vista4;
