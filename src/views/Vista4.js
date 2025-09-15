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
                <div class="vista-header">
                    <h2>✅ Control de Calidad y Aprobación Final</h2>
                    <p>Revisión final, control de calidad y aprobaciones</p>
                </div>

                <!-- Información general de la ficha -->
                ${this.getGeneralInfoHTML()}

                <!-- Control de Calidad -->
                <div class="seccion-control-calidad">
                    <h3>CONTROL DE CALIDAD</h3>
                    <div class="checklist-calidad">
                        <h4>Lista de Verificación</h4>
                        <table class="tabla-checklist">
                            <thead>
                                <tr>
                                    <th>Aspecto a Verificar</th>
                                    <th>Conforme</th>
                                    <th>No Conforme</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Medidas según especificación</td>
                                    <td><input type="radio" name="medidas" value="si"></td>
                                    <td><input type="radio" name="medidas" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre medidas"></td>
                                </tr>
                                <tr>
                                    <td>Calidad de costuras</td>
                                    <td><input type="radio" name="costuras" value="si"></td>
                                    <td><input type="radio" name="costuras" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre costuras"></td>
                                </tr>
                                <tr>
                                    <td>Acabados y terminaciones</td>
                                    <td><input type="radio" name="acabados" value="si"></td>
                                    <td><input type="radio" name="acabados" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre acabados"></td>
                                </tr>
                                <tr>
                                    <td>Colores según muestra</td>
                                    <td><input type="radio" name="colores" value="si"></td>
                                    <td><input type="radio" name="colores" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre colores"></td>
                                </tr>
                                <tr>
                                    <td>Accesorios y herrajes</td>
                                    <td><input type="radio" name="accesorios" value="si"></td>
                                    <td><input type="radio" name="accesorios" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre accesorios"></td>
                                </tr>
                                <tr>
                                    <td>Etiquetas y embalaje</td>
                                    <td><input type="radio" name="etiquetas" value="si"></td>
                                    <td><input type="radio" name="etiquetas" value="no"></td>
                                    <td><input type="text" placeholder="Observaciones sobre etiquetas"></td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn-agregar" onclick="Vista4Instance.agregarCheckpoint()">➕ Agregar Punto de Control</button>
                    </div>
                </div>

                <!-- Defectos encontrados -->
                <div class="seccion-defectos">
                    <h3>REGISTRO DE DEFECTOS</h3>
                    <table class="tabla" id="tablaDefectos">
                        <thead>
                            <tr>
                                <th>Tipo de Defecto</th>
                                <th>Ubicación</th>
                                <th>Gravedad</th>
                                <th>Descripción</th>
                                <th>Acción Correctiva</th>
                                <th>Responsable</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Los defectos se agregan dinámicamente -->
                        </tbody>
                    </table>
                    <button class="btn-agregar" onclick="Vista4Instance.agregarDefecto()">➕ Registrar Defecto</button>
                </div>

                <!-- Tiempos de proceso -->
                <div class="seccion-tiempos">
                    <h3>CONTROL DE TIEMPOS</h3>
                    <div class="tiempos-grid">
                        <div class="tiempo-grupo">
                            <label>Fecha Inicio Producción:</label>
                            <input type="datetime-local" data-field="fechaInicioProduccion">
                        </div>
                        <div class="tiempo-grupo">
                            <label>Fecha Fin Producción:</label>
                            <input type="datetime-local" data-field="fechaFinProduccion">
                        </div>
                        <div class="tiempo-grupo">
                            <label>Tiempo Total (horas):</label>
                            <input type="number" step="0.1" placeholder="Completar horas" data-field="tiempoTotal">
                        </div>
                        <div class="tiempo-grupo">
                            <label>Tiempo Planificado (horas):</label>
                            <input type="number" step="0.1" placeholder="Completar horas planificadas" data-field="tiempoPlanificado">
                        </div>
                        <div class="tiempo-grupo">
                            <label>Eficiencia (%):</label>
                            <input type="number" min="0" max="200" placeholder="% de eficiencia" data-field="eficiencia" readonly>
                        </div>
                        <div class="tiempo-grupo">
                            <label>Observaciones de Tiempo:</label>
                            <textarea data-field="observacionesTiempo" placeholder="Observaciones sobre tiempos y eficiencia"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Aprobaciones -->
                <div class="seccion-aprobaciones">
                    <h3>APROBACIONES</h3>
                    <div class="aprobaciones-grid">
                        <div class="aprobacion-grupo">
                            <h4>Control de Calidad</h4>
                            <div class="aprobacion-campos">
                                <label>Inspector:</label>
                                <input type="text" placeholder="Completar nombre del inspector" data-field="inspectorCalidad">
                                <label>Fecha Revisión:</label>
                                <input type="date" data-field="fechaRevisionCalidad">
                                <label>Estado:</label>
                                <select data-field="estadoCalidad">
                                    <option value="">Seleccionar estado</option>
                                    <option value="aprobado">Aprobado</option>
                                    <option value="rechazado">Rechazado</option>
                                    <option value="aprobado_con_observaciones">Aprobado con Observaciones</option>
                                </select>
                                <label>Firma Digital:</label>
                                <input type="text" placeholder="Completar firma o código" data-field="firmaCalidad">
                            </div>
                        </div>

                        <div class="aprobacion-grupo">
                            <h4>Aprobación Cliente</h4>
                            <div class="aprobacion-campos">
                                <label>Representante Cliente:</label>
                                <input type="text" placeholder="Completar nombre del representante" data-field="representanteCliente">
                                <label>Fecha Aprobación:</label>
                                <input type="date" data-field="fechaAprobacionCliente">
                                <label>Estado:</label>
                                <select data-field="estadoCliente">
                                    <option value="">Seleccionar estado</option>
                                    <option value="aprobado">Aprobado</option>
                                    <option value="rechazado">Rechazado</option>
                                    <option value="requiere_cambios">Requiere Cambios</option>
                                </select>
                                <label>Firma Digital:</label>
                                <input type="text" placeholder="Completar firma o código" data-field="firmaCliente">
                            </div>
                        </div>

                        <div class="aprobacion-grupo">
                            <h4>Aprobación Final</h4>
                            <div class="aprobacion-campos">
                                <label>Supervisor de Producción:</label>
                                <input type="text" placeholder="Completar nombre del supervisor" data-field="supervisorProduccion">
                                <label>Fecha Aprobación Final:</label>
                                <input type="date" data-field="fechaAprobacionFinal">
                                <label>Estado Final:</label>
                                <select data-field="estadoFinal">
                                    <option value="">Seleccionar estado final</option>
                                    <option value="completado">Completado</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                                <label>Firma Digital:</label>
                                <input type="text" placeholder="Completar firma o código" data-field="firmaFinal">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Observaciones finales -->
                <div class="seccion-observaciones-finales">
                    <h3>OBSERVACIONES FINALES</h3>
                    <textarea class="textarea-observaciones-finales" data-field="observacionesFinales" placeholder="Observaciones finales, recomendaciones y comentarios sobre el proyecto completado...">Producto terminado según especificaciones.
Control de calidad satisfactorio.
Listo para entrega al cliente.</textarea>
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
            input.addEventListener('input', () => this.calcularEficiencia());
        });

        // Event listeners específicos para cálculos de eficiencia
        const tiempoInputs = this.container.querySelectorAll('[data-field="tiempoTotal"], [data-field="tiempoPlanificado"]');
        tiempoInputs.forEach(input => {
            input.addEventListener('input', () => this.calcularEficiencia());
        });
    }

    /**
     * Agregar nuevo checkpoint de calidad
     */
    agregarCheckpoint() {
        const tabla = document.querySelector('.tabla-checklist tbody');
        const nuevaFila = tabla.insertRow();
        
        const checkpointName = prompt('Nombre del punto de control:');
        if (!checkpointName) return;
        
        const radioName = 'checkpoint_' + Date.now();
        
        nuevaFila.innerHTML = `
            <td>${checkpointName}</td>
            <td><input type="radio" name="${radioName}" value="si"></td>
            <td><input type="radio" name="${radioName}" value="no"></td>
            <td><input type="text" placeholder="Observaciones"></td>
        `;

        this.setupEvents();
        this.saveData();
    }

    /**
     * Agregar nuevo defecto
     */
    agregarDefecto() {
        const tabla = document.getElementById('tablaDefectos').getElementsByTagName('tbody')[0];
        const nuevaFila = tabla.insertRow();
        
        nuevaFila.innerHTML = `
            <td>
                <select>
                    <option value="">Seleccionar tipo</option>
                    <option value="costura">Defecto de Costura</option>
                    <option value="medida">Error de Medidas</option>
                    <option value="material">Defecto de Material</option>
                    <option value="acabado">Defecto de Acabado</option>
                    <option value="manchas">Manchas/Suciedad</option>
                    <option value="otros">Otros</option>
                </select>
            </td>
            <td><input type="text" placeholder="Ubicación del defecto"></td>
            <td>
                <select>
                    <option value="">Seleccionar gravedad</option>
                    <option value="critico">Crítico</option>
                    <option value="mayor">Mayor</option>
                    <option value="menor">Menor</option>
                </select>
            </td>
            <td><input type="text" placeholder="Descripción detallada"></td>
            <td><input type="text" placeholder="Acción a tomar"></td>
            <td><input type="text" placeholder="Responsable de corrección"></td>
            <td>
                <select>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="corregido">Corregido</option>
                    <option value="aceptado">Aceptado</option>
                </select>
            </td>
            <td><button class="btn-eliminar" onclick="Vista4Instance.eliminarDefecto(this)">❌</button></td>
        `;

        this.setupEvents();
        this.saveData();
    }

    /**
     * Eliminar un defecto
     */
    eliminarDefecto(boton) {
        const fila = boton.closest('tr');
        fila.remove();
        this.saveData();
    }

    /**
     * Calcular eficiencia basada en tiempos
     */
    calcularEficiencia() {
        const tiempoTotal = parseFloat(document.querySelector('[data-field="tiempoTotal"]')?.value) || 0;
        const tiempoPlanificado = parseFloat(document.querySelector('[data-field="tiempoPlanificado"]')?.value) || 0;
        
        if (tiempoTotal > 0 && tiempoPlanificado > 0) {
            const eficiencia = (tiempoPlanificado / tiempoTotal) * 100;
            const eficienciaInput = document.querySelector('[data-field="eficiencia"]');
            if (eficienciaInput) {
                eficienciaInput.value = eficiencia.toFixed(1);
            }
        }
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

        // Recopilar datos de checklist de calidad
        data.checklistCalidad = this.getChecklistData();
        
        // Recopilar datos de defectos
        data.defectos = this.getTableData('tablaDefectos');

        return data;
    }

    /**
     * Obtiene los datos del checklist de calidad
     */
    getChecklistData() {
        const filas = document.querySelectorAll('.tabla-checklist tbody tr');
        const checklist = [];

        filas.forEach(fila => {
            const aspecto = fila.cells[0].textContent;
            const conforme = fila.querySelector('input[type="radio"]:checked')?.value || 'no_evaluado';
            const observaciones = fila.querySelector('input[type="text"]').value || '';
            
            checklist.push({
                aspecto,
                conforme,
                observaciones
            });
        });

        return checklist;
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

        // Cargar datos de checklist si existen
        if (data.checklistCalidad) {
            this.loadChecklistData(data.checklistCalidad);
        }

        // Cargar datos de defectos si existen
        if (data.defectos) {
            this.loadTableData('tablaDefectos', data.defectos);
        }

        this.calcularEficiencia();
    }

    /**
     * Carga datos del checklist
     */
    loadChecklistData(checklistData) {
        // Implementar carga de checklist si es necesario
        console.log('Cargando datos de checklist:', checklistData);
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
                    celda.innerHTML = `<button class="btn-eliminar" onclick="Vista4Instance.eliminarDefecto(this)">❌</button>`;
                } else {
                    // Input o select normal
                    if (index === 0 || index === 2 || index === 6) {
                        // Columnas con select
                        const select = document.createElement('select');
                        let options = [];
                        
                        if (index === 0) {
                            options = ['', 'costura', 'medida', 'material', 'acabado', 'manchas', 'otros'];
                        } else if (index === 2) {
                            options = ['', 'critico', 'mayor', 'menor'];
                        } else if (index === 6) {
                            options = ['pendiente', 'en_proceso', 'corregido', 'aceptado'];
                        }
                        
                        options.forEach(opt => {
                            const option = document.createElement('option');
                            option.value = opt;
                            option.textContent = opt;
                            if (opt === cellData) option.selected = true;
                            select.appendChild(option);
                        });
                        
                        celda.appendChild(select);
                    } else {
                        // Input de texto
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.value = cellData;
                        celda.appendChild(input);
                    }
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
