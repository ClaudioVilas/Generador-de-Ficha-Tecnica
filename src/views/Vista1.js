/**
 * Vista1 - Vista principal con la ficha técnica original
 * Contiene los formularios y tablas de la ficha técnica de producción
 */
class Vista1 {
    constructor() {
        this.container = null;
        this.data = {};
    }

    /**
     * Renderiza la Vista1 en el contenedor especificado
     * @param {HTMLElement} container - Contenedor donde renderizar
     */
    render(container) {
        this.container = container;
        
        const vista1HTML = `
            <div class="vista1-container">
                <div class="vista-header">
                    <h2>📋 Detalle General</h2>
                    <p>Información básica, materiales y especificaciones de producción de la prenda</p>
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

                <!-- Sección principal con imagen y tablas -->
                <div class="seccion-principal">
                    <!-- Columna izquierda: Imagen del vestido -->
                    <div class="imagen-vestido">
                        <div class="contenedor-imagen" id="imagenVestido">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y0ZjRmNCIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5DbGljIHBhcmEgc3ViaXIgaW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K" alt="Vestido" class="imagen-preview">
                            <input type="file" id="uploadVestido" accept="image/*" class="file-input" style="display: none;">
                            <button class="upload-btn" onclick="document.getElementById('uploadVestido').click()">Subir Imagen</button>
                        </div>
                    </div>

                    <!-- Columna derecha: Tabla de materiales -->
                    <div class="tabla-materiales">
                        <h3>MATERIALES</h3>
                        <table class="tabla" id="tablaMateriales">
                            <thead>
                                <tr>
                                    <th>Nº</th>
                                    <th>Descripción</th>
                                    <th>Color</th>
                                    <th>Material</th>
                                    <th>Proveedor</th>
                                    <th>Cantidad</th>
                                    <th>Costo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" value="Tela" class="input-celda"></td>
                                    <td><input type="text" value="Mostaza" class="input-celda"></td>
                                    <td><input type="text" value="Cuadrille" class="input-celda"></td>
                                    <td><input type="text" value="Los Angeles" class="input-celda"></td>
                                    <td><input type="text" value="11 mts" class="input-celda"></td>
                                    <td><input type="text" value="$ 12.000" class="input-celda"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="tabla-controls">
                            <button class="btn-eliminar-ultima" onclick="Vista1Instance.eliminarUltimaFila('tablaMateriales')" title="Eliminar última fila">-</button>
                            <button class="btn-agregar-fila" onclick="Vista1Instance.agregarFilaMateriales()" title="Agregar material">+</button>
                        </div>
                    </div>
                </div>

                <!-- Sección inferior con tablas -->
                <div class="seccion-inferior">
                    <!-- Tabla de costo de producción -->
                    <div class="costo-produccion">
                        <h3>COSTO DE PRODUCCIÓN</h3>
                        <table class="tabla" id="tablaCostos">
                            <thead>
                                <tr>
                                    <th>Nº</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" value="Tela" class="input-celda"></td>
                                    <td><input type="text" value="1.10 mts" class="input-celda"></td>
                                    <td><input type="text" value="$1.100" class="input-celda"></td>
                                </tr>
                                <tr class="total-row">
                                    <td colspan="3"><strong>Total x Prenda</strong></td>
                                    <td><input type="text" value="$3.993" class="input-celda total-input"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="tabla-controls">
                            <button class="btn-eliminar-ultima" onclick="Vista1Instance.eliminarUltimaFila('tablaCostos')" title="Eliminar última fila">-</button>
                            <button class="btn-agregar-fila" onclick="Vista1Instance.agregarFilaCostos()" title="Agregar costo">+</button>
                        </div>
                    </div>

                    <!-- Tabla de taller de corte -->
                    <div class="taller-corte">
                        <h3>TALLER DE CORTE</h3>
                        <table class="tabla tabla-corte" id="tablaCorte">
                            <thead>
                                <tr>
                                    <th rowspan="2">Color</th>
                                    <th colspan="6">Talles</th>
                                </tr>
                                <tr>
                                    <th>XS</th>
                                    <th>S</th>
                                    <th>L</th>
                                    <th>M</th>
                                    <th>XL</th>
                                    <th>XXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="color-cell">
                                        <input type="color" value="#FFFF00" class="color-picker">
                                    </td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                    <td><input type="number" value="5" class="input-numero"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="tabla-controls">
                            <button class="btn-eliminar-ultima" onclick="Vista1Instance.eliminarUltimaFila('tablaCorte')" title="Eliminar último color">-</button>
                            <button class="btn-agregar-fila" onclick="Vista1Instance.agregarFilaCorte()" title="Agregar color">+</button>
                        </div>
                        <div class="cantidad-total">
                            <label>Cantidad total de prendas:</label>
                            <input type="number" value="30" class="input-total" id="totalPrendas">
                        </div>
                    </div>

                    <!-- Muestra de materiales -->
                    <div class="muestra-materiales">
                        <h3>MUESTRA DE MATERIALES</h3>
                        <div class="materiales-grid" id="materialesGrid">
                            <div class="material-item">
                                <div class="imagen-material" id="materialHilo1">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjRmNGY0IiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj7wn5OFPC90ZXh0Pgo8L3N2Zz4K" alt="Hilo" class="material-preview">
                                    <input type="file" id="uploadHilo1" accept="image/*" class="file-input" style="display: none;">
                                    <button class="upload-btn-small" onclick="document.getElementById('uploadHilo1').click()">+</button>
                                </div>
                                <div class="material-description">
                                    <input type="text" value="Hilo de poliester de color rojo y mostaza" class="input-material-desc">
                                </div>
                            </div>
                        </div>
                        <div class="tabla-controls">
                            <button class="btn-eliminar-ultima" onclick="Vista1Instance.eliminarUltimoMaterial()" title="Eliminar último material">-</button>
                            <button class="btn-agregar-fila" onclick="Vista1Instance.agregarMaterial()" title="Agregar material">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = vista1HTML;
        this.setupEvents();
        
        // Establecer instancia global para callbacks
        window.Vista1Instance = this;
        
        console.log('Vista1 renderizada correctamente');
    }

    /**
     * Configura los eventos de la Vista1
     */
    setupEvents() {
        // Eventos de subida de imágenes
        this.setupImageUpload();
        
        // Eventos de entrada de datos
        this.setupDataEvents();
    }

    /**
     * Configura la subida de imágenes
     */
    setupImageUpload() {
        const uploadVestido = this.container.querySelector('#uploadVestido');
        const uploadHilo1 = this.container.querySelector('#uploadHilo1');

        if (uploadVestido) {
            uploadVestido.addEventListener('change', (e) => this.handleImageUpload(e, 'imagenVestido'));
        }

        if (uploadHilo1) {
            uploadHilo1.addEventListener('change', (e) => this.handleImageUpload(e, 'materialHilo1'));
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
     * Configura eventos de entrada de datos
     */
    setupDataEvents() {
        const inputs = this.container.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.saveData());
            input.addEventListener('change', () => this.saveData());
        });
    }

    /**
     * Agrega una fila a la tabla de materiales
     */
    agregarFilaMateriales() {
        const tabla = this.container.querySelector('#tablaMateriales tbody');
        const filaCount = tabla.rows.length + 1;
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td>${filaCount}</td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
        `;
        
        this.setupDataEvents();
    }

    /**
     * Agrega una fila a la tabla de costos
     */
    agregarFilaCostos() {
        const tabla = this.container.querySelector('#tablaCostos tbody');
        const totalRow = tabla.querySelector('.total-row');
        const filaCount = tabla.rows.length; // No sumar 1 porque hay fila total
        
        const nuevaFila = tabla.insertRow(tabla.rows.length - 1); // Insertar antes del total
        nuevaFila.innerHTML = `
            <td>${filaCount}</td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
            <td><input type="text" class="input-celda"></td>
        `;
        
        this.setupDataEvents();
    }

    /**
     * Agrega una fila a la tabla de corte
     */
    agregarFilaCorte() {
        const tabla = this.container.querySelector('#tablaCorte tbody');
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td class="color-cell">
                <input type="color" value="#FFFFFF" class="color-picker">
            </td>
            <td><input type="number" value="0" class="input-numero"></td>
            <td><input type="number" value="0" class="input-numero"></td>
            <td><input type="number" value="0" class="input-numero"></td>
            <td><input type="number" value="0" class="input-numero"></td>
            <td><input type="number" value="0" class="input-numero"></td>
            <td><input type="number" value="0" class="input-numero"></td>
        `;
        
        this.setupDataEvents();
    }

    /**
     * Agrega un nuevo material a la muestra
     */
    agregarMaterial() {
        const grid = this.container.querySelector('#materialesGrid');
        const materialCount = grid.children.length + 1;
        
        const nuevoMaterial = document.createElement('div');
        nuevoMaterial.className = 'material-item';
        nuevoMaterial.innerHTML = `
            <div class="imagen-material" id="materialHilo${materialCount}">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjRmNGY0IiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj7wn5OFPC90ZXh0Pgo8L3N2Zz4K" alt="Material" class="material-preview">
                <input type="file" id="uploadHilo${materialCount}" accept="image/*" class="file-input" style="display: none;">
                <button class="upload-btn-small" onclick="document.getElementById('uploadHilo${materialCount}').click()">+</button>
            </div>
            <div class="material-description">
                <input type="text" value="" class="input-material-desc" placeholder="Descripción del material">
            </div>
        `;
        
        grid.appendChild(nuevoMaterial);
        this.setupDataEvents();
    }

    /**
     * Elimina la última fila de una tabla
     * @param {string} tablaId - ID de la tabla
     */
    eliminarUltimaFila(tablaId) {
        const tabla = this.container.querySelector(`#${tablaId} tbody`);
        if (tabla.rows.length > 1) {
            // Para tabla de costos, no eliminar la fila total
            if (tablaId === 'tablaCostos' && tabla.rows.length > 2) {
                tabla.deleteRow(tabla.rows.length - 2);
            } else if (tablaId !== 'tablaCostos') {
                tabla.deleteRow(tabla.rows.length - 1);
            }
        }
    }

    /**
     * Elimina el último material
     */
    eliminarUltimoMaterial() {
        const grid = this.container.querySelector('#materialesGrid');
        if (grid.children.length > 1) {
            grid.removeChild(grid.lastElementChild);
        }
    }

    /**
     * Obtiene todos los datos de la Vista1
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
        data.materiales = this.getTableData('tablaMateriales');
        data.costos = this.getTableData('tablaCostos');
        data.corte = this.getTableData('tablaCorte');
        data.materialesMuestra = this.getMaterialesData();

        return data;
    }

    /**
     * Obtiene los datos de una tabla
     * @param {string} tablaId - ID de la tabla
     * @returns {Array} Datos de la tabla
     */
    getTableData(tablaId) {
        const tabla = this.container.querySelector(`#${tablaId} tbody`);
        const data = [];
        
        for (let i = 0; i < tabla.rows.length; i++) {
            const row = tabla.rows[i];
            if (row.classList.contains('total-row')) continue;
            
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
     * Obtiene los datos de los materiales
     * @returns {Array} Datos de materiales
     */
    getMaterialesData() {
        const grid = this.container.querySelector('#materialesGrid');
        const data = [];
        
        Array.from(grid.children).forEach(item => {
            const img = item.querySelector('img');
            const desc = item.querySelector('.input-material-desc');
            data.push({
                imagen: img ? img.src : '',
                descripcion: desc ? desc.value : ''
            });
        });
        
        return data;
    }

    /**
     * Carga datos en la Vista1
     * @param {Object} data - Datos a cargar
     */
    loadData(data) {
        if (!data) return;
        
        // Cargar campos básicos
        Object.keys(data).forEach(key => {
            const input = this.container.querySelector(`[data-field="${key}"]`);
            if (input && typeof data[key] === 'string') {
                input.value = data[key];
            }
        });

        this.data = data;
        console.log('Datos cargados en Vista1:', data);
    }

    /**
     * Guarda los datos automáticamente
     */
    saveData() {
        this.data = this.getData();
        if (window.ViewManager) {
            window.ViewManager.setViewData('vista1', this.data);
        }
    }

    /**
     * Destruye la vista y limpia recursos
     */
    destroy() {
        this.container = null;
        this.data = {};
        window.Vista1Instance = null;
        console.log('Vista1 destruida');
    }
}

// Exportar para uso global
window.Vista1 = Vista1;
