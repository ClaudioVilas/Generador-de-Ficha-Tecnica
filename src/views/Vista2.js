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
     * Renderiza la Vista2 en el contenedor especificado
     * @param {HTMLElement} container - Contenedor donde renderizar
     */
    render(container) {
        this.container = container;
        
        const vista2HTML = `
            <div class="vista2-container">
                <div class="vista-header">
                    <h2>📊 Especificaciones Técnicas y Medidas</h2>
                    <p>Detalles técnicos, medidas y especificaciones del producto</p>
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

                <!-- Información técnica específica -->
                <div class="seccion-tecnica-especifica">
                    <h3>ESPECIFICACIONES TÉCNICAS</h3>
                    <div class="campos-tecnicos">
                        <div class="campo-grupo">
                            <label>Tipo de Prenda:</label>
                            <select class="input-text" data-field="tipoPrenda">
                                <option value="vestido">Vestido</option>
                                <option value="blusa">Blusa</option>
                                <option value="pantalon">Pantalón</option>
                                <option value="falda">Falda</option>
                                <option value="chaqueta">Chaqueta</option>
                            </select>
                        </div>
                        <div class="campo-grupo">
                            <label>Temporada:</label>
                            <select class="input-text" data-field="temporada">
                                <option value="verano">Verano</option>
                                <option value="invierno">Invierno</option>
                                <option value="primavera">Primavera</option>
                                <option value="otono">Otoño</option>
                                <option value="todo-ano">Todo el año</option>
                            </select>
                        </div>
                        <div class="campo-grupo">
                            <label>Género:</label>
                            <select class="input-text" data-field="genero">
                                <option value="mujer">Mujer</option>
                                <option value="hombre">Hombre</option>
                                <option value="unisex">Unisex</option>
                                <option value="ninos">Niños</option>
                            </select>
                        </div>
                        <div class="campo-grupo">
                            <label>Nivel de Dificultad:</label>
                            <select class="input-text" data-field="dificultad">
                                <option value="basico">Básico</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                                <option value="experto">Experto</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Tabla de medidas -->
                <div class="seccion-medidas">
                    <h3>TABLA DE MEDIDAS</h3>
                    <table class="tabla" id="tablaMedidas">
                        <thead>
                            <tr>
                                <th>Medida</th>
                                <th>XS</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>XXL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" value="Busto" class="input-celda medida-nombre"></td>
                                <td><input type="text" value="86" class="input-celda"></td>
                                <td><input type="text" value="90" class="input-celda"></td>
                                <td><input type="text" value="94" class="input-celda"></td>
                                <td><input type="text" value="98" class="input-celda"></td>
                                <td><input type="text" value="102" class="input-celda"></td>
                                <td><input type="text" value="106" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td><input type="text" value="Cintura" class="input-celda medida-nombre"></td>
                                <td><input type="text" value="70" class="input-celda"></td>
                                <td><input type="text" value="74" class="input-celda"></td>
                                <td><input type="text" value="78" class="input-celda"></td>
                                <td><input type="text" value="82" class="input-celda"></td>
                                <td><input type="text" value="86" class="input-celda"></td>
                                <td><input type="text" value="90" class="input-celda"></td>
                            </tr>
                            <tr>
                                <td><input type="text" value="Cadera" class="input-celda medida-nombre"></td>
                                <td><input type="text" value="94" class="input-celda"></td>
                                <td><input type="text" value="98" class="input-celda"></td>
                                <td><input type="text" value="102" class="input-celda"></td>
                                <td><input type="text" value="106" class="input-celda"></td>
                                <td><input type="text" value="110" class="input-celda"></td>
                                <td><input type="text" value="114" class="input-celda"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="tabla-controls">
                        <button class="btn-eliminar-ultima" onclick="Vista2Instance.eliminarUltimaMedida()" title="Eliminar última medida">-</button>
                        <button class="btn-agregar-fila" onclick="Vista2Instance.agregarMedida()" title="Agregar medida">+</button>
                    </div>
                </div>

                <!-- Especificaciones de construcción -->
                <div class="seccion-construccion">
                    <h3>ESPECIFICACIONES DE CONSTRUCCIÓN</h3>
                    <div class="grid-construccion">
                        <div class="construccion-item">
                            <label>Tipo de Costura:</label>
                            <select class="input-text" data-field="tipoCostura">
                                <option value="overlock">Overlock</option>
                                <option value="recta">Recta</option>
                                <option value="francesa">Francesa</option>
                                <option value="inglesa">Inglesa</option>
                                <option value="remallado">Remallado</option>
                            </select>
                        </div>
                        <div class="construccion-item">
                            <label>Acabado de Bordes:</label>
                            <select class="input-text" data-field="acabadoBordes">
                                <option value="dobladillo">Dobladillo</option>
                                <option value="bias">Bies</option>
                                <option value="overlock">Overlock</option>
                                <option value="zigzag">Zigzag</option>
                                <option value="festoneado">Festoneado</option>
                            </select>
                        </div>
                        <div class="construccion-item">
                            <label>Tipo de Cierre:</label>
                            <select class="input-text" data-field="tipoCierre">
                                <option value="cremallera">Cremallera</option>
                                <option value="botones">Botones</option>
                                <option value="velcro">Velcro</option>
                                <option value="automaticos">Automáticos</option>
                                <option value="ninguno">Ninguno</option>
                            </select>
                        </div>
                        <div class="construccion-item">
                            <label>Refuerzos:</label>
                            <input type="text" value="En costuras de stress" class="input-text" data-field="refuerzos">
                        </div>
                    </div>
                </div>

                <!-- Instrucciones de cuidado -->
                <div class="seccion-cuidado">
                    <h3>INSTRUCCIONES DE CUIDADO</h3>
                    <div class="cuidado-grid">
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="lavadoMaquina" checked> 
                                Lavado a máquina (30°C)
                            </label>
                        </div>
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="secadoTendedero" checked> 
                                Secado al aire libre
                            </label>
                        </div>
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="planchado"> 
                                Plancha temperatura media
                            </label>
                        </div>
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="noLejia" checked> 
                                No usar lejía
                            </label>
                        </div>
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="noTintoreria"> 
                                No tintorería
                            </label>
                        </div>
                        <div class="cuidado-item">
                            <label>
                                <input type="checkbox" data-field="lavadoDelicado"> 
                                Lavado delicado
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Notas técnicas -->
                <div class="seccion-notas">
                    <h3>NOTAS TÉCNICAS</h3>
                    <textarea class="textarea-notas" data-field="notasTecnicas" placeholder="Agregar observaciones técnicas, detalles especiales de construcción, consideraciones especiales...">Considerar pre-lavado de tela antes del corte.
Verificar dirección de la tela antes del trazado.
Usar puntada de refuerzo en áreas de stress.</textarea>
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
    }

    /**
     * Agrega una nueva medida a la tabla
     */
    agregarMedida() {
        const tabla = this.container.querySelector('#tablaMedidas tbody');
        
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td><input type="text" value="" class="input-celda medida-nombre" placeholder="Nueva medida"></td>
            <td><input type="text" value="" class="input-celda"></td>
            <td><input type="text" value="" class="input-celda"></td>
            <td><input type="text" value="" class="input-celda"></td>
            <td><input type="text" value="" class="input-celda"></td>
            <td><input type="text" value="" class="input-celda"></td>
            <td><input type="text" value="" class="input-celda"></td>
        `;
        
        this.setupEvents();
    }

    /**
     * Elimina la última medida de la tabla
     */
    eliminarUltimaMedida() {
        const tabla = this.container.querySelector('#tablaMedidas tbody');
        if (tabla.rows.length > 1) {
            tabla.deleteRow(tabla.rows.length - 1);
        }
    }

    /**
     * Obtiene todos los datos de la Vista2
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

        // Tabla de medidas
        data.medidas = this.getMedidasData();

        return data;
    }

    /**
     * Obtiene los datos de la tabla de medidas
     * @returns {Array} Datos de medidas
     */
    getMedidasData() {
        const tabla = this.container.querySelector('#tablaMedidas tbody');
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
                } else {
                    input.value = data[key];
                }
            }
        });

        // Cargar tabla de medidas si existe
        if (data.medidas) {
            this.loadMedidasData(data.medidas);
        }

        this.data = data;
        console.log('Datos cargados en Vista2:', data);
    }

    /**
     * Carga datos de medidas en la tabla
     * @param {Array} medidasData - Datos de medidas
     */
    loadMedidasData(medidasData) {
        const tabla = this.container.querySelector('#tablaMedidas tbody');
        tabla.innerHTML = ''; // Limpiar tabla
        
        medidasData.forEach(medida => {
            const fila = tabla.insertRow();
            medida.forEach((valor, index) => {
                const celda = fila.insertCell();
                if (index === 0) {
                    celda.innerHTML = `<input type="text" value="${valor}" class="input-celda medida-nombre">`;
                } else {
                    celda.innerHTML = `<input type="text" value="${valor}" class="input-celda">`;
                }
            });
        });
        
        this.setupEvents();
    }

    /**
     * Guarda los datos automáticamente
     */
    saveData() {
        this.data = this.getData();
        if (window.ViewManager) {
            window.ViewManager.setViewData('vista2', this.data);
        }
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
