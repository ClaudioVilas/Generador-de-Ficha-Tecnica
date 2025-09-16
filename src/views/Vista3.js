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
                        <div class="contenedor-fotos-vista3">
                            <div class="foto-upload-vista3" onclick="Vista3Instance.triggerFileInput()">
                                <input type="file" id="fileInput-vista3" accept="image/*" style="display: none;" onchange="Vista3Instance.handleFileUpload(event)">
                                <div class="upload-placeholder">
                                    <span class="upload-icon">📷</span>
                                    <span class="upload-text">Hacer clic para agregar foto</span>
                                </div>
                            </div>
                            <div id="preview-container-vista3" class="preview-container-vista3"></div>
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
     * Activa el input de archivo para seleccionar fotos
     */
    triggerFileInput() {
        document.getElementById('fileInput-vista3').click();
    }

    /**
     * Maneja la carga de archivos de imagen
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
        const tabla = document.getElementById('tablaDespiece');
        if (!tabla) return [];

        const filas = tabla.querySelectorAll('tbody tr');
        const data = [];

        filas.forEach(fila => {
            const inputs = fila.querySelectorAll('input');
            if (inputs.length >= 2) {
                data.push({
                    descripcion: inputs[0].value,
                    cantidad: inputs[1].value
                });
            }
        });
        
        return data;
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
        
        // Recopilar datos de inputs generales
        const inputs = this.container.querySelectorAll('input[data-field], select[data-field], textarea[data-field]');
        inputs.forEach(input => {
            data[input.dataset.field] = input.value;
        });

        // Agregar datos de la tabla DESPIECE
        data.despiece = this.getDespieceData();
        
        // Agregar datos de las fotos
        data.fotos = this.getPhotosData();

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
                element.value = data[key] || '';
            }
        });

        // Cargar datos de la tabla DESPIECE
        if (data.despiece && data.despiece.length > 0) {
            this.loadDespieceData(data.despiece);
        }

        // Cargar datos de las fotos
        if (data.fotos && data.fotos.length > 0) {
            this.loadPhotosData(data.fotos);
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
     * Carga los datos de las fotos
     */
    loadPhotosData(photosData) {
        const previewContainer = document.getElementById('preview-container-vista3');
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
            window.ViewManager.setViewData('vista3', this.data);
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
