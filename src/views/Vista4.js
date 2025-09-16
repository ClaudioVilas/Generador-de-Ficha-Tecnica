/**
 * Vista4 - Control de Calidad y Aprobación
 * Maneja el control de calidad, acabados finales y aprobaciones
 */
class Vista4 {
    constructor() {
        this.data = {};
        this.container = null;
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
        this.container = container;
        
        const vista4HTML = `
            <div class="vista4-container">
                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}
                
                <!-- Contenedor principal con distribución 25%-75% -->
                <div class="contenedor-principal-vista4">
                    <!-- Componente MUESTRA DE MATERIALES (100% ancho) -->
                    <div class="seccion-muestra-materiales-completa">
                        <h3>MUESTRA DE MATERIALES</h3>
                        <div id="contenedorMuestraMateriales" class="contenedor-muestras">
                            <!-- Muestra 1 -->
                            <div class="muestra-item">
                                <div class="muestra-foto-container">
                                    <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                                    <div class="foto-muestra-box">
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
                                    <div class="foto-muestra-box">
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
                    
                    <!-- Componente de Fotos (100% ancho debajo) -->
                    <div class="seccion-fotos-vista4">
                        <h3>FOTOS ADICIONALES</h3>
                        <div class="contenedor-fotos-vista4">
                            <div class="foto-upload-vista4" onclick="Vista4Instance.triggerFileInput()">
                                <input type="file" id="fileInput-vista4" accept="image/*" style="display: none;" onchange="Vista4Instance.handleFileUpload(event)">
                                <div class="upload-placeholder">
                                    <span class="upload-icon">📷</span>
                                    <span class="upload-text">Hacer clic para agregar foto</span>
                                </div>
                            </div>
                            <div id="preview-container-vista4" class="preview-container-vista4"></div>
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
    }

    /**
     * Configura los eventos de la Vista4
     */
    setupEvents() {
        // Event listeners para actualización automática de datos
        const inputs = this.container.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', () => this.saveData());
        });
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
                <div class="foto-muestra-box">
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
            const container = input.closest('.muestra-foto-container');
            const previewDiv = container.querySelector('.foto-preview-muestra');
            const botonAgregar = container.querySelector('.btn-agregar-foto');
            
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="Material" class="material-image">
                <button class="btn-remove-material" onclick="Vista4Instance.removeMaterialPhoto(this)">×</button>
            `;
            
            // Ocultar el botón + cuando hay imagen
            botonAgregar.style.display = 'none';
            
            this.saveData();
        };
        reader.readAsDataURL(file);
    }

    /**
     * Elimina la foto de un material
     */
    removeMaterialPhoto(button) {
        const container = button.closest('.muestra-foto-container');
        const previewDiv = container.querySelector('.foto-preview-muestra');
        const fileInput = container.querySelector('.input-foto-material-hidden');
        const botonAgregar = container.querySelector('.btn-agregar-foto');
        
        previewDiv.innerHTML = '';
        fileInput.value = '';
        botonAgregar.style.display = 'block'; // Mostrar el botón + nuevamente
        
        this.saveData();
    }

    /**
     * Activa el input de archivo para seleccionar fotos adicionales
     */
    triggerFileInput() {
        document.getElementById('fileInput-vista4').click();
    }

    /**
     * Maneja la carga de archivos de imagen adicionales
     */
    handleFileUpload(event) {
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
            this.addPhotoPreview(e.target.result, file.name);
        };
        reader.readAsDataURL(file);

        // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
        event.target.value = '';
    }

    /**
     * Agrega una vista previa de la foto cargada
     */
    addPhotoPreview(imageSrc, fileName) {
        const previewContainer = document.getElementById('preview-container-vista4');
        
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-preview-vista4';
        
        photoDiv.innerHTML = `
            <img src="${imageSrc}" alt="${fileName}" class="preview-image-vista4">
            <div class="photo-controls-vista4">
                <span class="photo-name-vista4">${fileName}</span>
                <button class="btn-delete-photo-vista4" onclick="Vista4Instance.deletePhoto(this)">🗑️</button>
            </div>
        `;
        
        previewContainer.appendChild(photoDiv);
        this.saveData();
    }

    /**
     * Elimina una foto del preview
     */
    deletePhoto(button) {
        const photoDiv = button.closest('.photo-preview-vista4');
        photoDiv.remove();
        this.saveData();
    }

    /**
     * Obtiene los datos de la tabla de muestra de materiales
     */
    getMuestraMaterialesData() {
        const contenedor = document.getElementById('contenedorMuestraMateriales');
        if (!contenedor) return [];

        const muestras = contenedor.querySelectorAll('.muestra-item');
        const data = [];

        muestras.forEach(muestra => {
            const descripcionInput = muestra.querySelector('.input-descripcion-material');
            const fotoImg = muestra.querySelector('.material-image');
            
            data.push({
                foto: fotoImg ? fotoImg.src : '',
                descripcion: descripcionInput ? descripcionInput.value : ''
            });
        });
        
        return data;
    }

    /**
     * Obtiene los datos de las fotos adicionales
     */
    getPhotosData() {
        const previewContainer = document.getElementById('preview-container-vista4');
        const photos = previewContainer.querySelectorAll('.photo-preview-vista4');
        const photosData = [];

        photos.forEach(photo => {
            const img = photo.querySelector('.preview-image-vista4');
            const name = photo.querySelector('.photo-name-vista4').textContent;
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
        
        // Recopilar datos de inputs generales
        const inputs = this.container.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.dataset.field] = input.checked;
            } else if (input.type === 'radio') {
                if (input.checked) {
                    data[input.dataset.field] = input.value;
                }
            } else {
                data[input.dataset.field] = input.value;
            }
        });

        // Agregar datos de la tabla de muestra de materiales
        data.muestraMateriales = this.getMuestraMaterialesData();
        
        // Agregar datos de las fotos adicionales
        data.fotosAdicionales = this.getPhotosData();

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
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else if (element.type === 'radio') {
                    if (element.value === data[key]) {
                        element.checked = true;
                    }
                } else {
                    element.value = data[key] || '';
                }
            }
        });

        // Cargar datos de la tabla de muestra de materiales
        if (data.muestraMateriales && data.muestraMateriales.length > 0) {
            this.loadMuestraMaterialesData(data.muestraMateriales);
        }

        // Cargar datos de las fotos adicionales
        if (data.fotosAdicionales && data.fotosAdicionales.length > 0) {
            this.loadPhotosData(data.fotosAdicionales);
        }
    }

    /**
     * Carga los datos en la tabla de muestra de materiales
     */
    loadMuestraMaterialesData(materialesData) {
        const contenedor = document.getElementById('contenedorMuestraMateriales');
        if (!contenedor) return;

        contenedor.innerHTML = ''; // Limpiar contenedor existente

        materialesData.forEach((item) => {
            const nuevaMuestra = document.createElement('div');
            nuevaMuestra.className = 'muestra-item';
            nuevaMuestra.innerHTML = `
                <div class="muestra-foto-container">
                    <input type="file" accept="image/*" class="input-foto-material-hidden" onchange="Vista4Instance.handleMaterialPhotoUpload(event, this)">
                    <div class="foto-muestra-box">
                        <button class="btn-agregar-foto" onclick="Vista4Instance.triggerMaterialInput(this)" ${item.foto ? 'style="display: none;"' : ''}>+</button>
                        <div class="foto-preview-muestra">
                            ${item.foto ? `
                                <img src="${item.foto}" alt="Material" class="material-image">
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
        });
    }

    /**
     * Carga los datos de las fotos adicionales
     */
    loadPhotosData(photosData) {
        const previewContainer = document.getElementById('preview-container-vista4');
        if (!previewContainer) return;

        previewContainer.innerHTML = ''; // Limpiar fotos existentes

        photosData.forEach(photo => {
            this.addPhotoPreview(photo.src, photo.name);
        });
    }

    /**
     * Guarda los datos de la vista
     */
    saveData() {
        this.data = this.getData();
        if (window.ViewManager) {
            window.ViewManager.setViewData('vista4', this.data);
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
