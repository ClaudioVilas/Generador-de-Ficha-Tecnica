/**
 * Vista4 - Cuarta vista de la ficha técnica
 * Enfocada en control de calidad, acabados finales y aprobación
 */
class Vista4 {
    constructor() {
        this.container = null;
        this.data = {};
    }

    /**
     * Renderiza la Vista4 en el contenedor especificado
     * @param {HTMLElement} container - Contenedor donde renderizar
     */
    render(container) {
        this.container = container;
        
        const vista4HTML = `
            <div class="vista4-container">
                <div class="vista-header">
                    <h2>✅ Control de Calidad y Aprobación Final</h2>
                    <p>Revisión final, control de calidad y aprobaciones</p>
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

                <!-- Checklist de control de calidad -->
                <div class="seccion-control-calidad">
                    <h3>CONTROL DE CALIDAD</h3>
                    <div class="checklist-grid">
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="patronCorrecto"> 
                                Patrón cortado correctamente
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="medidasCorrectas"> 
                                Medidas según especificaciones
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="costurasCualidad"> 
                                Costuras con calidad requerida
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="acabadosBordes"> 
                                Acabados de bordes correctos
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="cremalleras"> 
                                Cremalleras y cierres funcionales
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="botones"> 
                                Botones y ojales correctos
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="planchado"> 
                                Planchado y presentación
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="etiquetas"> 
                                Etiquetas de composición y cuidado
                            </label>
                        </div>
                        <div class="checklist-item">
                            <label>
                                <input type="checkbox" data-field="empaque"> 
                                Empaque adecuado
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Registro de defectos -->
                <div class="seccion-defectos">
                    <h3>REGISTRO DE DEFECTOS</h3>
                    <table class="tabla" id="tablaDefectos">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo de Defecto</th>
                                <th>Descripción</th>
                                <th>Gravedad</th>
                                <th>Acción Correctiva</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Los defectos se agregan dinámicamente -->
                        </tbody>
                    </table>
                    <div class="tabla-controls">
                        <button class="btn-eliminar-ultima" onclick="Vista4Instance.eliminarUltimoDefecto()" title="Eliminar último defecto">-</button>
                        <button class="btn-agregar-fila" onclick="Vista4Instance.agregarDefecto()" title="Agregar defecto">+</button>
                    </div>
                </div>

                <!-- Pruebas de ajuste -->
                <div class="seccion-pruebas">
                    <h3>PRUEBAS DE AJUSTE</h3>
                    <table class="tabla" id="tablaPruebas">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Talle</th>
                                <th>Modelo</th>
                                <th>Ajuste General</th>
                                <th>Observaciones</th>
                                <th>Aprobado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="date" class="input-celda" value=""></td>
                                <td>
                                    <select class="input-celda">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M" selected>M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </td>
                                <td><input type="text" class="input-celda" placeholder="Nombre del modelo"></td>
                                <td>
                                    <select class="input-celda">
                                        <option value="excelente">Excelente</option>
                                        <option value="bueno" selected>Bueno</option>
                                        <option value="regular">Regular</option>
                                        <option value="malo">Malo</option>
                                    </select>
                                </td>
                                <td><input type="text" class="input-celda" placeholder="Observaciones del ajuste"></td>
                                <td><input type="checkbox" checked></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="tabla-controls">
                        <button class="btn-eliminar-ultima" onclick="Vista4Instance.eliminarUltimaPrueba()" title="Eliminar última prueba">-</button>
                        <button class="btn-agregar-fila" onclick="Vista4Instance.agregarPrueba()" title="Agregar prueba">+</button>
                    </div>
                </div>

                <!-- Tiempo de producción -->
                <div class="seccion-tiempos">
                    <h3>TIEMPOS DE PRODUCCIÓN</h3>
                    <div class="tiempos-grid">
                        <div class="tiempo-item">
                            <label>Tiempo de Corte (min):</label>
                            <input type="number" value="15" class="input-text" data-field="tiempoCorte">
                        </div>
                        <div class="tiempo-item">
                            <label>Tiempo de Confección (min):</label>
                            <input type="number" value="45" class="input-text" data-field="tiempoConfeccion">
                        </div>
                        <div class="tiempo-item">
                            <label>Tiempo de Acabado (min):</label>
                            <input type="number" value="10" class="input-text" data-field="tiempoAcabado">
                        </div>
                        <div class="tiempo-item">
                            <label>Tiempo de Plancha (min):</label>
                            <input type="number" value="5" class="input-text" data-field="tiempoPlanchado">
                        </div>
                        <div class="tiempo-item total-tiempo">
                            <label>Tiempo Total (min):</label>
                            <input type="number" value="75" class="input-text total-input" id="tiempoTotal" readonly>
                        </div>
                        <div class="tiempo-item">
                            <label>Costo Mano de Obra ($):</label>
                            <input type="number" value="1250" class="input-text" data-field="costoManoObra">
                        </div>
                    </div>
                </div>

                <!-- Aprobaciones -->
                <div class="seccion-aprobaciones">
                    <h3>APROBACIONES</h3>
                    <div class="aprobaciones-grid">
                        <div class="aprobacion-item">
                            <h4>Diseñador</h4>
                            <div class="firma-container">
                                <input type="text" placeholder="Nombre del diseñador" class="input-text" data-field="nombreDiseñador">
                                <input type="date" class="input-text" data-field="fechaAprobacionDiseñador">
                                <label>
                                    <input type="checkbox" data-field="aprobadoDiseñador"> 
                                    Aprobado
                                </label>
                                <textarea placeholder="Observaciones del diseñador" class="textarea-observaciones" data-field="observacionesDiseñador"></textarea>
                            </div>
                        </div>
                        
                        <div class="aprobacion-item">
                            <h4>Patronista</h4>
                            <div class="firma-container">
                                <input type="text" placeholder="Nombre del patronista" class="input-text" data-field="nombrePatronista">
                                <input type="date" class="input-text" data-field="fechaAprobacionPatronista">
                                <label>
                                    <input type="checkbox" data-field="aprobadoPatronista"> 
                                    Aprobado
                                </label>
                                <textarea placeholder="Observaciones del patronista" class="textarea-observaciones" data-field="observacionesPatronista"></textarea>
                            </div>
                        </div>
                        
                        <div class="aprobacion-item">
                            <h4>Control de Calidad</h4>
                            <div class="firma-container">
                                <input type="text" placeholder="Nombre del supervisor QC" class="input-text" data-field="nombreControlCalidad">
                                <input type="date" class="input-text" data-field="fechaAprobacionControlCalidad">
                                <label>
                                    <input type="checkbox" data-field="aprobadoControlCalidad"> 
                                    Aprobado
                                </label>
                                <textarea placeholder="Observaciones de control de calidad" class="textarea-observaciones" data-field="observacionesControlCalidad"></textarea>
                            </div>
                        </div>
                        
                        <div class="aprobacion-item">
                            <h4>Producción</h4>
                            <div class="firma-container">
                                <input type="text" placeholder="Nombre del jefe de producción" class="input-text" data-field="nombreProduccion">
                                <input type="date" class="input-text" data-field="fechaAprobacionProduccion">
                                <label>
                                    <input type="checkbox" data-field="aprobadoProduccion"> 
                                    Aprobado
                                </label>
                                <textarea placeholder="Observaciones de producción" class="textarea-observaciones" data-field="observacionesProduccion"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Estado final -->
                <div class="seccion-estado-final">
                    <h3>ESTADO FINAL DEL PRODUCTO</h3>
                    <div class="estado-container">
                        <div class="estado-item">
                            <label>Estado General:</label>
                            <select class="input-text estado-select" data-field="estadoGeneral">
                                <option value="en-desarrollo">En Desarrollo</option>
                                <option value="en-pruebas">En Pruebas</option>
                                <option value="aprobado">Aprobado</option>
                                <option value="rechazado">Rechazado</option>
                                <option value="en-produccion">En Producción</option>
                            </select>
                        </div>
                        <div class="estado-item">
                            <label>Fecha de Aprobación Final:</label>
                            <input type="date" class="input-text" data-field="fechaAprobacionFinal">
                        </div>
                        <div class="estado-item">
                            <label>Número de Lote:</label>
                            <input type="text" class="input-text" data-field="numeroLote" placeholder="L-001">
                        </div>
                        <div class="estado-item">
                            <label>Cantidad Aprobada:</label>
                            <input type="number" class="input-text" data-field="cantidadAprobada">
                        </div>
                    </div>
                    
                    <div class="observaciones-finales">
                        <label>Observaciones Finales:</label>
                        <textarea class="textarea-finales" data-field="observacionesFinales" placeholder="Observaciones finales del producto, recomendaciones para futura producción, etc.">Producto aprobado para producción en serie.
Mantener especificaciones de calidad establecidas.
Revisar proveedores de materiales antes de cada lote.</textarea>
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
        // Eventos de entrada de datos
        const inputs = this.container.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateTotalTime();
                this.saveData();
            });
            input.addEventListener('change', () => {
                this.updateTotalTime();
                this.saveData();
            });
        });

        // Calcular tiempo total inicialmente
        this.updateTotalTime();
    }

    /**
     * Actualiza el tiempo total de producción
     */
    updateTotalTime() {
        const tiempoCorte = parseInt(this.container.querySelector('[data-field="tiempoCorte"]')?.value || 0);
        const tiempoConfeccion = parseInt(this.container.querySelector('[data-field="tiempoConfeccion"]')?.value || 0);
        const tiempoAcabado = parseInt(this.container.querySelector('[data-field="tiempoAcabado"]')?.value || 0);
        const tiempoPlanchado = parseInt(this.container.querySelector('[data-field="tiempoPlanchado"]')?.value || 0);
        
        const tiempoTotal = tiempoCorte + tiempoConfeccion + tiempoAcabado + tiempoPlanchado;
        
        const totalInput = this.container.querySelector('#tiempoTotal');
        if (totalInput) {
            totalInput.value = tiempoTotal;
        }
    }

    /**
     * Agrega un nuevo defecto a la tabla
     */
    agregarDefecto() {
        const tabla = this.container.querySelector('#tablaDefectos tbody');
        const fecha = new Date().toISOString().split('T')[0];
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td><input type="date" class="input-celda" value="${fecha}"></td>
            <td>
                <select class="input-celda">
                    <option value="costura">Costura defectuosa</option>
                    <option value="medida">Medida incorrecta</option>
                    <option value="material">Defecto en material</option>
                    <option value="acabado">Acabado deficiente</option>
                    <option value="patron">Error en patrón</option>
                    <option value="otro">Otro</option>
                </select>
            </td>
            <td><input type="text" class="input-celda" placeholder="Descripción del defecto"></td>
            <td>
                <select class="input-celda">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                </select>
            </td>
            <td><input type="text" class="input-celda" placeholder="Acción correctiva"></td>
            <td>
                <select class="input-celda">
                    <option value="pendiente">Pendiente</option>
                    <option value="en-proceso">En proceso</option>
                    <option value="resuelto">Resuelto</option>
                </select>
            </td>
        `;
        
        this.setupEvents();
    }

    /**
     * Elimina el último defecto de la tabla
     */
    eliminarUltimoDefecto() {
        const tabla = this.container.querySelector('#tablaDefectos tbody');
        if (tabla.rows.length > 0) {
            tabla.deleteRow(tabla.rows.length - 1);
        }
    }

    /**
     * Agrega una nueva prueba de ajuste
     */
    agregarPrueba() {
        const tabla = this.container.querySelector('#tablaPruebas tbody');
        const fecha = new Date().toISOString().split('T')[0];
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td><input type="date" class="input-celda" value="${fecha}"></td>
            <td>
                <select class="input-celda">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </td>
            <td><input type="text" class="input-celda" placeholder="Nombre del modelo"></td>
            <td>
                <select class="input-celda">
                    <option value="excelente">Excelente</option>
                    <option value="bueno">Bueno</option>
                    <option value="regular">Regular</option>
                    <option value="malo">Malo</option>
                </select>
            </td>
            <td><input type="text" class="input-celda" placeholder="Observaciones del ajuste"></td>
            <td><input type="checkbox"></td>
        `;
        
        this.setupEvents();
    }

    /**
     * Elimina la última prueba de ajuste
     */
    eliminarUltimaPrueba() {
        const tabla = this.container.querySelector('#tablaPruebas tbody');
        if (tabla.rows.length > 1) {
            tabla.deleteRow(tabla.rows.length - 1);
        }
    }

    /**
     * Obtiene todos los datos de la Vista4
     * @returns {Object} Datos de la vista
     */
    getData() {
        const data = {};
        
        // Campos básicos
        const inputs = this.container.querySelectorAll('[data-field]');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.getAttribute('data-field')] = input.checked;
            } else {
                data[input.getAttribute('data-field')] = input.value;
            }
        });

        // Tablas
        data.defectos = this.getTableData('tablaDefectos');
        data.pruebas = this.getTableData('tablaPruebas');

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
            const rowData = [];
            
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                const input = cell.querySelector('input, select');
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
     * Carga datos en la Vista4
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
                } else {
                    input.value = data[key];
                }
            }
        });

        this.data = data;
        this.updateTotalTime();
        console.log('Datos cargados en Vista4:', data);
    }

    /**
     * Guarda los datos automáticamente
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
