/**
 * Vista3 - Tercera vista de la ficha técnica
 * Enfocada en patrones, moldes y trazado
 */
class Vista3 {
    constructor() {
        this.container = null;
        this.data = {};
    }

    /**
     * Renderiza la Vista3 en el contenedor especificado
     * @param {HTMLElement} container - Contenedor donde renderizar
     */
    render(container) {
        this.container = container;
        
        const vista3HTML = `
            <div class="vista3-container">
                <div class="vista-header">
                    <h2>🔧 Patrones y Moldes</h2>
                    <p>Especificaciones de patrones, moldes y trazado</p>
                </div>

                <!-- Información general de la ficha -->
                <div class="seccion-cabecera">
                    <h3>INFORMACIÓN GENERAL</h3>
                    <div class="info-superior">
                        <div class="campo-grupo">
                            <label>Nombre y Apellido:</label>
                            <input type="text" value="Pascual, Mairena Bahiana" class="input-text" data-field="nombreApellido">
                        </div>
                        <div class="campo-grupo">
                            <label>Usuario:</label>
                            <input type="text" value="Mujer" class="input-text" data-field="usuario">
                        </div>
                        <div class="campo-grupo">
                            <label>Artículo:</label>
                            <input type="text" value="A-01" class="input-text" data-field="articulo">
                        </div>
                        <div class="campo-grupo">
                            <label>Rubro:</label>
                            <input type="text" value="Casual" class="input-text" data-field="rubro">
                        </div>
                        <div class="campo-grupo fecha">
                            <label>Ficha de Producción:</label>
                            <input type="text" value="1" class="input-text" data-field="fichaProduccion">
                        </div>
                    </div>
                    
                    <div class="descripcion-organizacion">
                        <div class="descripcion-campo">
                            <label>Descripción:</label>
                            <textarea class="textarea-descripcion" data-field="descripcion">Vestido corto de mujer, con escote recto, y tirantes pinzas de hombro.
Falda evasé, con volados en ruedo. Utiliza un textil cuadrille, y cierre en espalda.</textarea>
                        </div>
                        <div class="organizacion-campo">
                            <label>Organización:</label>
                            <input type="text" value="Control interno" class="input-text" data-field="organizacion">
                        </div>
                    </div>
                </div>

                <!-- Información específica de patrones -->
                <div class="seccion-patrones">
                    <h3>INFORMACIÓN DE PATRONES</h3>
                    <div class="patrones-info">
                        <div class="campo-grupo">
                            <label>Número de Patrón:</label>
                            <input type="text" value="P-001" class="input-text" data-field="numeroPatron">
                        </div>
                        <div class="campo-grupo">
                            <label>Versión del Patrón:</label>
                            <input type="text" value="1.0" class="input-text" data-field="versionPatron">
                        </div>
                        <div class="campo-grupo">
                            <label>Diseñador:</label>
                            <input type="text" value="" class="input-text" data-field="disenador">
                        </div>
                        <div class="campo-grupo">
                            <label>Fecha de Creación:</label>
                            <input type="date" class="input-text" data-field="fechaCreacion">
                        </div>
                        <div class="campo-grupo">
                            <label>Escala del Patrón:</label>
                            <select class="input-text" data-field="escalaPatron">
                                <option value="1:1">1:1 (Real)</option>
                                <option value="1:2">1:2 (Mitad)</option>
                                <option value="1:4">1:4 (Cuarto)</option>
                                <option value="1:8">1:8 (Octavo)</option>
                            </select>
                        </div>
                        <div class="campo-grupo">
                            <label>Tipo de Papel:</label>
                            <select class="input-text" data-field="tipoPapel">
                                <option value="kraft">Papel Kraft</option>
                                <option value="manila">Papel Manila</option>
                                <option value="opalina">Opalina</option>
                                <option value="plastico">Plástico</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Lista de piezas del patrón -->
                <div class="seccion-piezas">
                    <h3>PIEZAS DEL PATRÓN</h3>
                    <table class="tabla" id="tablaPiezas">
                        <thead>
                            <tr>
                                <th>Pieza</th>
                                <th>Descripción</th>
                                <th>Cantidad a Cortar</th>
                                <th>Tela Principal</th>
                                <th>Forro</th>
                                <th>Entretela</th>
                                <th>Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" value="Delantero" class="input-celda"></td>
                                <td><input type="text" value="Parte frontal del vestido" class="input-celda"></td>
                                <td><input type="text" value="2" class="input-celda"></td>
                                <td><input type="checkbox" checked></td>
                                <td><input type="checkbox"></td>
                                <td><input type="checkbox"></td>
                                <td><input type="text" value="Cortar al hilo" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td><input type="text" value="Espalda" class="input-celda"></td>
                                <td><input type="text" value="Parte posterior del vestido" class="input-celda"></td>
                                <td><input type="text" value="2" class="input-celda"></td>
                                <td><input type="checkbox" checked></td>
                                <td><input type="checkbox"></td>
                                <td><input type="checkbox"></td>
                                <td><input type="text" value="Incluye abertura cremallera" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td><input type="text" value="Tirante" class="input-celda"></td>
                                <td><input type="text" value="Tirantes del escote" class="input-celda"></td>
                                <td><input type="text" value="4" class="input-celda"></td>
                                <td><input type="checkbox" checked></td>
                                <td><input type="checkbox"></td>
                                <td><input type="checkbox" checked></td>
                                <td><input type="text" value="Reforzar con entretela" class="input-celda"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="tabla-controls">
                        <button class="btn-eliminar-ultima" onclick="Vista3Instance.eliminarUltimaPieza()" title="Eliminar última pieza">-</button>
                        <button class="btn-agregar-fila" onclick="Vista3Instance.agregarPieza()" title="Agregar pieza">+</button>
                    </div>
                </div>

                <!-- Instrucciones de trazado -->
                <div class="seccion-trazado">
                    <h3>INSTRUCCIONES DE TRAZADO</h3>
                    <div class="trazado-grid">
                        <div class="trazado-item">
                            <label>Dirección del Hilo:</label>
                            <select class="input-text" data-field="direccionHilo">
                                <option value="longitudinal">Longitudinal</option>
                                <option value="transversal">Transversal</option>
                                <option value="sesgo">Al sesgo</option>
                                <option value="mixto">Mixto</option>
                            </select>
                        </div>
                        <div class="trazado-item">
                            <label>Ancho de Tela Recomendado:</label>
                            <select class="input-text" data-field="anchoTela">
                                <option value="90cm">90 cm</option>
                                <option value="110cm">110 cm</option>
                                <option value="140cm">140 cm</option>
                                <option value="150cm">150 cm</option>
                                <option value="180cm">180 cm</option>
                            </select>
                        </div>
                        <div class="trazado-item">
                            <label>Márgen de Costura:</label>
                            <select class="input-text" data-field="margenCostura">
                                <option value="1cm">1 cm</option>
                                <option value="1.5cm">1.5 cm</option>
                                <option value="2cm">2 cm</option>
                                <option value="variable">Variable</option>
                            </select>
                        </div>
                        <div class="trazado-item">
                            <label>Márgen de Dobladillo:</label>
                            <select class="input-text" data-field="margenDobladillo">
                                <option value="2cm">2 cm</option>
                                <option value="3cm">3 cm</option>
                                <option value="4cm">4 cm</option>
                                <option value="5cm">5 cm</option>
                                <option value="variable">Variable</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Cálculo de consumo de tela -->
                <div class="seccion-consumo">
                    <h3>CÁLCULO DE CONSUMO DE TELA</h3>
                    <table class="tabla" id="tablaConsumo">
                        <thead>
                            <tr>
                                <th>Talle</th>
                                <th>Tela Principal (mts)</th>
                                <th>Forro (mts)</th>
                                <th>Entretela (mts)</th>
                                <th>Otros Materiales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XS</td>
                                <td><input type="text" value="1.20" class="input-celda"></td>
                                <td><input type="text" value="0.80" class="input-celda"></td>
                                <td><input type="text" value="0.10" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td>S</td>
                                <td><input type="text" value="1.25" class="input-celda"></td>
                                <td><input type="text" value="0.85" class="input-celda"></td>
                                <td><input type="text" value="0.10" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td>M</td>
                                <td><input type="text" value="1.30" class="input-celda"></td>
                                <td><input type="text" value="0.90" class="input-celda"></td>
                                <td><input type="text" value="0.10" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td>L</td>
                                <td><input type="text" value="1.35" class="input-celda"></td>
                                <td><input type="text" value="0.95" class="input-celda"></td>
                                <td><input type="text" value="0.10" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td>XL</td>
                                <td><input type="text" value="1.40" class="input-celda"></td>
                                <td><input type="text" value="1.00" class="input-celda"></td>
                                <td><input type="text" value="0.15" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td>XXL</td>
                                <td><input type="text" value="1.45" class="input-celda"></td>
                                <td><input type="text" value="1.05" class="input-celda"></td>
                                <td><input type="text" value="0.15" class="input-celda"></td>
                                <td><input type="text" value="Cremallera 20cm" class="input-celda"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Esquema de trazado -->
                <div class="seccion-esquema">
                    <h3>ESQUEMA DE TRAZADO</h3>
                    <div class="esquema-container">
                        <div class="imagen-esquema" id="imagenEsquema">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y5ZjlmOSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Fc3F1ZW1hIGRlIHRyYXphZG88L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiI+Q2xpYyBwYXJhIHN1YmlyIGltYWdlbjwvdGV4dD4KPC9zdmc+" alt="Esquema" class="esquema-preview">
                            <input type="file" id="uploadEsquema" accept="image/*" class="file-input" style="display: none;">
                            <button class="upload-btn" onclick="document.getElementById('uploadEsquema').click()">Subir Esquema</button>
                        </div>
                        <div class="esquema-description">
                            <label>Descripción del esquema:</label>
                            <textarea class="textarea-descripcion" data-field="descripcionEsquema" placeholder="Describe el esquema de trazado, disposición de piezas, etc.">Disposición eficiente de piezas sobre tela de 140cm de ancho.
Todas las piezas van al hilo excepto los bies que van al sesgo.
Considerar el dibujo de la tela para centrado.</textarea>
                        </div>
                    </div>
                </div>

                <!-- Observaciones del patrón -->
                <div class="seccion-observaciones">
                    <h3>OBSERVACIONES DEL PATRÓN</h3>
                    <textarea class="textarea-observaciones" data-field="observacionesPatron" placeholder="Observaciones especiales, modificaciones, ajustes requeridos...">- Verificar ajuste en el busto antes del corte final
- Patron incluye pinzas de busto que pueden eliminarse según el tipo de tela
- Para telas elásticas reducir 2cm en contorno de busto
- El largo puede ajustarse según preferencia del cliente</textarea>
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
        // Eventos de subida de imágenes
        this.setupImageUpload();
        
        // Eventos de entrada de datos
        const inputs = this.container.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.saveData());
            input.addEventListener('change', () => this.saveData());
        });
    }

    /**
     * Configura la subida de esquemas
     */
    setupImageUpload() {
        const uploadEsquema = this.container.querySelector('#uploadEsquema');

        if (uploadEsquema) {
            uploadEsquema.addEventListener('change', (e) => this.handleImageUpload(e, 'imagenEsquema'));
        }
    }

    /**
     * Maneja la subida de imágenes
     * @param {Event} event - Evento de cambio del input file
     * @param {string} containerId - ID del contenedor de imagen
     */
    handleImageUpload(event, containerId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const container = this.container.querySelector(`#${containerId}`);
                const img = container.querySelector('img');
                if (img) {
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * Agrega una nueva pieza a la tabla
     */
    agregarPieza() {
        const tabla = this.container.querySelector('#tablaPiezas tbody');
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td><input type="text" value="" class="input-celda" placeholder="Nombre pieza"></td>
            <td><input type="text" value="" class="input-celda" placeholder="Descripción"></td>
            <td><input type="text" value="1" class="input-celda"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="text" value="" class="input-celda" placeholder="Observaciones"></td>
        `;
        
        this.setupEvents();
    }

    /**
     * Elimina la última pieza de la tabla
     */
    eliminarUltimaPieza() {
        const tabla = this.container.querySelector('#tablaPiezas tbody');
        if (tabla.rows.length > 1) {
            tabla.deleteRow(tabla.rows.length - 1);
        }
    }

    /**
     * Obtiene todos los datos de la Vista3
     * @returns {Object} Datos de la vista
     */
    getData() {
        const data = {};
        
        // Campos básicos
        const inputs = this.container.querySelectorAll('[data-field]');
        inputs.forEach(input => {
            data[input.getAttribute('data-field')] = input.value;
        });

        // Tablas
        data.piezas = this.getPiezasData();
        data.consumo = this.getConsumoData();

        return data;
    }

    /**
     * Obtiene los datos de la tabla de piezas
     * @returns {Array} Datos de piezas
     */
    getPiezasData() {
        const tabla = this.container.querySelector('#tablaPiezas tbody');
        const data = [];
        
        for (let i = 0; i < tabla.rows.length; i++) {
            const row = tabla.rows[i];
            const rowData = [];
            
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                const input = cell.querySelector('input');
                if (input) {
                    if (input.type === 'checkbox') {
                        rowData.push(input.checked);
                    } else {
                        rowData.push(input.value);
                    }
                } else {
                    rowData.push(cell.textContent);
                }
            }
            data.push(rowData);
        }
        
        return data;
    }

    /**
     * Obtiene los datos de la tabla de consumo
     * @returns {Array} Datos de consumo
     */
    getConsumoData() {
        const tabla = this.container.querySelector('#tablaConsumo tbody');
        const data = [];
        
        for (let i = 0; i < tabla.rows.length; i++) {
            const row = tabla.rows[i];
            const rowData = [];
            
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                const input = cell.querySelector('input');
                rowData.push(input ? input.value : cell.textContent);
            }
            data.push(rowData);
        }
        
        return data;
    }

    /**
     * Carga datos en la Vista3
     * @param {Object} data - Datos a cargar
     */
    loadData(data) {
        if (!data) return;
        
        // Cargar campos básicos
        Object.keys(data).forEach(key => {
            const input = this.container.querySelector(`[data-field="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });

        this.data = data;
        console.log('Datos cargados en Vista3:', data);
    }

    /**
     * Guarda los datos automáticamente
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
