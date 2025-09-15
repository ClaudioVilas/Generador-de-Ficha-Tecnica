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
                <div class="vista-header">
                    <h2>📐 Patrones y Moldes</h2>
                    <p>Especificaciones de patrones, piezas y consumos de materiales</p>
                </div>

                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}

                <!-- Información específica de patrones -->
                <div class="seccion-patrones">
                    <h3>INFORMACIÓN DE PATRONES</h3>
                    <div class="patrones-info">
                        <div class="campo-grupo">
                            <label>Número de Patrón:</label>
                            <input type="text" placeholder="Completar número de patrón" class="input-text" data-field="numeroPatron">
                        </div>
                        <div class="campo-grupo">
                            <label>Versión del Patrón:</label>
                            <input type="text" placeholder="Completar versión" class="input-text" data-field="versionPatron">
                        </div>
                        <div class="campo-grupo">
                            <label>Diseñador:</label>
                            <input type="text" placeholder="Completar nombre del diseñador" class="input-text" data-field="disenador">
                        </div>
                        <div class="campo-grupo">
                            <label>Fecha de Creación:</label>
                            <input type="date" class="input-text" data-field="fechaCreacion">
                        </div>
                        <div class="campo-grupo">
                            <label>Escala del Patrón:</label>
                            <select class="input-text" data-field="escalaPatron">
                                <option value="">Seleccionar escala</option>
                                <option value="1:1">1:1 (Real)</option>
                                <option value="1:2">1:2 (Mitad)</option>
                                <option value="1:4">1:4 (Cuarto)</option>
                                <option value="1:8">1:8 (Octavo)</option>
                            </select>
                        </div>
                        <div class="campo-grupo">
                            <label>Tipo de Papel:</label>
                            <select class="input-text" data-field="tipoPapel">
                                <option value="">Seleccionar tipo de papel</option>
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
                                <th>Cantidad</th>
                                <th>Talla</th>
                                <th>Medidas (cm)</th>
                                <th>Material</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" placeholder="Nombre de la pieza" value="Delantero"></td>
                                <td><input type="number" value="2" min="1"></td>
                                <td><input type="text" placeholder="Talla" value="M"></td>
                                <td><input type="text" placeholder="Ancho x Alto" value="45 x 60"></td>
                                <td><input type="text" placeholder="Material" value="Tela principal"></td>
                                <td><input type="text" placeholder="Observaciones" value="Con pinzas"></td>
                                <td><button class="btn-eliminar" onclick="Vista3Instance.eliminarFila(this)">❌</button></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="Nombre de la pieza" value="Trasero"></td>
                                <td><input type="number" value="2" min="1"></td>
                                <td><input type="text" placeholder="Talla" value="M"></td>
                                <td><input type="text" placeholder="Ancho x Alto" value="45 x 65"></td>
                                <td><input type="text" placeholder="Material" value="Tela principal"></td>
                                <td><input type="text" placeholder="Observaciones" value="Con cierre"></td>
                                <td><button class="btn-eliminar" onclick="Vista3Instance.eliminarFila(this)">❌</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn-agregar" onclick="Vista3Instance.agregarPieza()">➕ Agregar Pieza</button>
                </div>

                <!-- Consumo de materiales -->
                <div class="seccion-consumo">
                    <h3>CONSUMO DE MATERIALES</h3>
                    <table class="tabla" id="tablaConsumo">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Ancho (cm)</th>
                                <th>Consumo por Prenda (m)</th>
                                <th>Eficiencia (%)</th>
                                <th>Consumo Real (m)</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" placeholder="Tipo de material" value="Tela principal"></td>
                                <td><input type="number" placeholder="Ancho" value="150"></td>
                                <td><input type="number" step="0.1" placeholder="Metros" value="1.8"></td>
                                <td><input type="number" min="60" max="100" placeholder="%" value="85"></td>
                                <td class="consumo-calculado">2.1</td>
                                <td><input type="text" placeholder="Observaciones" value="Incluye desperdicio"></td>
                                <td><button class="btn-eliminar" onclick="Vista3Instance.eliminarFilaConsumo(this)">❌</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn-agregar" onclick="Vista3Instance.agregarConsumo()">➕ Agregar Material</button>
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
        // Event listeners para actualización automática de datos
        const inputs = this.container.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', () => this.saveData());
            input.addEventListener('input', () => this.calcularConsumos());
        });

        // Event listeners específicos para cálculos
        const consumoInputs = this.container.querySelectorAll('#tablaConsumo input[type="number"]');
        consumoInputs.forEach(input => {
            input.addEventListener('input', () => this.calcularConsumos());
        });
    }

    /**
     * Agregar nueva pieza a la tabla
     */
    agregarPieza() {
        const tabla = document.getElementById('tablaPiezas').getElementsByTagName('tbody')[0];
        const nuevaFila = tabla.insertRow();
        
        nuevaFila.innerHTML = `
            <td><input type="text" placeholder="Nombre de la pieza"></td>
            <td><input type="number" value="1" min="1"></td>
            <td><input type="text" placeholder="Talla"></td>
            <td><input type="text" placeholder="Ancho x Alto"></td>
            <td><input type="text" placeholder="Material"></td>
            <td><input type="text" placeholder="Observaciones"></td>
            <td><button class="btn-eliminar" onclick="Vista3Instance.eliminarFila(this)">❌</button></td>
        `;

        this.setupEvents();
        this.saveData();
    }

    /**
     * Eliminar una fila de piezas
     */
    eliminarFila(boton) {
        const fila = boton.closest('tr');
        fila.remove();
        this.saveData();
    }

    /**
     * Agregar nuevo material de consumo
     */
    agregarConsumo() {
        const tabla = document.getElementById('tablaConsumo').getElementsByTagName('tbody')[0];
        const nuevaFila = tabla.insertRow();
        
        nuevaFila.innerHTML = `
            <td><input type="text" placeholder="Tipo de material"></td>
            <td><input type="number" placeholder="Ancho"></td>
            <td><input type="number" step="0.1" placeholder="Metros"></td>
            <td><input type="number" min="60" max="100" placeholder="%"></td>
            <td class="consumo-calculado">0.0</td>
            <td><input type="text" placeholder="Observaciones"></td>
            <td><button class="btn-eliminar" onclick="Vista3Instance.eliminarFilaConsumo(this)">❌</button></td>
        `;

        this.setupEvents();
        this.saveData();
    }

    /**
     * Eliminar una fila de consumo
     */
    eliminarFilaConsumo(boton) {
        const fila = boton.closest('tr');
        fila.remove();
        this.calcularConsumos();
        this.saveData();
    }

    /**
     * Calcular consumos reales basados en eficiencia
     */
    calcularConsumos() {
        const filas = document.querySelectorAll('#tablaConsumo tbody tr');
        
        filas.forEach(fila => {
            const consumoInput = fila.querySelector('input[step="0.1"]');
            const eficienciaInput = fila.querySelector('input[min="60"]');
            const consumoCalculado = fila.querySelector('.consumo-calculado');
            
            if (consumoInput && eficienciaInput && consumoCalculado) {
                const consumo = parseFloat(consumoInput.value) || 0;
                const eficiencia = parseFloat(eficienciaInput.value) || 100;
                
                const consumoReal = consumo * (100 / eficiencia);
                consumoCalculado.textContent = consumoReal.toFixed(2);
            }
        });
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

        // Recopilar datos de tabla de piezas
        data.piezas = this.getTableData('tablaPiezas');
        
        // Recopilar datos de tabla de consumo
        data.consumos = this.getTableData('tablaConsumo');

        return data;
    }

    /**
     * Obtiene los datos de una tabla específica
     */
    getTableData(tableId) {
        const tabla = document.getElementById(tableId);
        if (!tabla) return [];

        const filas = tabla.querySelectorAll('tbody tr');
        const data = [];

        filas.forEach(fila => {
            const rowData = [];
            const celdas = fila.querySelectorAll('td');
            
            celdas.forEach(celda => {
                const input = celda.querySelector('input, select, textarea');
                if (input) {
                    if (input.type === 'checkbox') {
                        rowData.push(input.checked);
                    } else {
                        rowData.push(input.value);
                    }
                } else {
                    rowData.push(celda.textContent);
                }
            });
            data.push(rowData);
        });
        
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

        // Cargar datos de tablas si existen
        if (data.piezas) {
            this.loadTableData('tablaPiezas', data.piezas);
        }

        if (data.consumos) {
            this.loadTableData('tablaConsumo', data.consumos);
        }

        this.calcularConsumos();
    }

    /**
     * Carga datos en una tabla específica
     */
    loadTableData(tableId, data) {
        const tabla = document.getElementById(tableId);
        if (!tabla || !data) return;

        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(rowData => {
            const fila = tbody.insertRow();
            rowData.forEach((cellData, index) => {
                const celda = fila.insertCell();
                if (index === rowData.length - 1) {
                    // Última columna (acciones)
                    const isConsumo = tableId === 'tablaConsumo';
                    const functionName = isConsumo ? 'eliminarFilaConsumo' : 'eliminarFila';
                    celda.innerHTML = `<button class="btn-eliminar" onclick="Vista3Instance.${functionName}(this)">❌</button>`;
                } else if (tableId === 'tablaConsumo' && index === 4) {
                    // Columna de consumo calculado
                    celda.className = 'consumo-calculado';
                    celda.textContent = cellData;
                } else {
                    // Input normal
                    const input = document.createElement('input');
                    input.type = index === 1 || (tableId === 'tablaConsumo' && (index === 1 || index === 2 || index === 3)) ? 'number' : 'text';
                    input.value = cellData;
                    if (input.type === 'number' && tableId === 'tablaConsumo' && index === 2) {
                        input.step = '0.1';
                    }
                    if (input.type === 'number' && tableId === 'tablaConsumo' && index === 3) {
                        input.min = '60';
                        input.max = '100';
                    }
                    celda.appendChild(input);
                }
            });
        });

        this.setupEvents();
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
