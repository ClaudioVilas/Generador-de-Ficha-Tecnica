// JavaScript para la Ficha Técnica de Producción

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initImageUploads();
    initColorPickers();
    initPDFExport();
    initAutoCalculations();
    initDynamicRows();
    initSaveLoad();
    
    console.log('Ficha Técnica de Producción inicializada correctamente');
});

/**
 * Inicializa la funcionalidad de subida de imágenes
 */
function initImageUploads() {
    // Imagen del vestido
    const uploadVestido = document.getElementById('uploadVestido');
    if (uploadVestido) {
        uploadVestido.addEventListener('change', function(e) {
            handleImageUpload(e, 'imagenVestido');
        });
    }

    // Imágenes de materiales existentes
    const materialUploads = document.querySelectorAll('input[type="file"][id^="upload"]');
    materialUploads.forEach(uploadElement => {
        if (uploadElement.id !== 'uploadVestido') {
            uploadElement.addEventListener('change', function(e) {
                const containerId = uploadElement.id.replace('upload', 'material');
                handleImageUpload(e, containerId);
            });
        }
    });
}

/**
 * Maneja la subida y preview de imágenes
 * @param {Event} event - Evento de cambio del input file
 * @param {string} containerId - ID del contenedor donde mostrar la imagen
 */
function handleImageUpload(event, containerId) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido.');
        return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Por favor selecciona una imagen menor a 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const container = document.getElementById(containerId);
        if (container) {
            const img = container.querySelector('img');
            if (img) {
                img.src = e.target.result;
                img.style.display = 'block';
            }
        }
    };
    reader.readAsDataURL(file);
}

/**
 * Inicializa los selectores de color
 */
function initColorPickers() {
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        picker.addEventListener('change', function() {
            // Aplicar el color seleccionado como fondo de la celda
            this.style.backgroundColor = this.value;
        });
        
        // Aplicar color inicial
        picker.style.backgroundColor = picker.value;
    });
}

/**
 * Inicializa la funcionalidad de exportación a PDF
 */
function initPDFExport() {
    const exportBtn = document.getElementById('exportPDF');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToPDF);
    }
}

/**
 * Exporta la ficha técnica a PDF
 */
async function exportToPDF() {
    try {
        // Mostrar indicador de carga
        const exportBtn = document.getElementById('exportPDF');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Generando PDF...';
        exportBtn.disabled = true;

        // Obtener el contenedor de la ficha
        const fichaContainer = document.getElementById('fichaContainer');
        
        // Agregar clase para ocultar botones durante la captura
        fichaContainer.classList.add('pdf-export');
        
        // Esperar un poco para que se apliquen los estilos
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Configurar opciones para html2canvas
        const canvas = await html2canvas(fichaContainer, {
            scale: 2, // Mayor resolución
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: fichaContainer.scrollWidth,
            height: fichaContainer.scrollHeight
        });

        // Remover la clase después de la captura
        fichaContainer.classList.remove('pdf-export');

        // Crear PDF con jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Calcular dimensiones para ajustar a A4 horizontal
        const imgWidth = 297; // Ancho A4 horizontal en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Si la imagen es más alta que A4, ajustar
        let finalHeight = imgHeight;
        let finalWidth = imgWidth;
        
        if (imgHeight > 210) { // Alto máximo A4 horizontal
            finalHeight = 210;
            finalWidth = (canvas.width * finalHeight) / canvas.height;
        }

        // Centrar en la página
        const xOffset = (297 - finalWidth) / 2;
        const yOffset = (210 - finalHeight) / 2;

        // Agregar imagen al PDF
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            xOffset,
            yOffset,
            finalWidth,
            finalHeight
        );

        // Generar nombre de archivo con fecha
        const now = new Date();
        const fileName = `ficha-tecnica-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.pdf`;

        // Guardar el PDF
        pdf.save(fileName);

        // Restaurar botón
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;

        console.log('PDF exportado exitosamente');

    } catch (error) {
        console.error('Error al exportar PDF:', error);
        alert('Error al generar el PDF. Por favor inténtalo de nuevo.');
        
        // Restaurar botón en caso de error
        const exportBtn = document.getElementById('exportPDF');
        exportBtn.textContent = 'Exportar a PDF';
        exportBtn.disabled = false;
    }
}

/**
 * Inicializa la funcionalidad de filas dinámicas
 */
function initDynamicRows() {
    // Inicializar contadores para IDs únicos
    window.materialCounter = 1;
    window.costoCounter = 1;
    window.corteCounter = 1;
    window.materialMuestraCounter = 1;
}

/**
 * Agrega una nueva fila a la tabla de materiales
 */
function agregarFilaMateriales() {
    const tabla = document.getElementById('tablaMateriales').getElementsByTagName('tbody')[0];
    const numeroFila = tabla.rows.length + 1;
    
    const nuevaFila = tabla.insertRow();
    nuevaFila.innerHTML = `
        <td>${numeroFila}</td>
        <td><input type="text" class="input-celda" placeholder="Descripción"></td>
        <td><input type="text" class="input-celda" placeholder="Color"></td>
        <td><input type="text" class="input-celda" placeholder="Material"></td>
        <td><input type="text" class="input-celda" placeholder="Proveedor"></td>
        <td><input type="text" class="input-celda" placeholder="Cantidad"></td>
        <td><input type="text" class="input-celda" placeholder="Costo"></td>
    `;
    
    // Aplicar efectos hover y focus a los nuevos inputs
    aplicarEfectosInputs(nuevaFila);
}

/**
 * Agrega una nueva fila a la tabla de costos
 */
function agregarFilaCostos() {
    const tabla = document.getElementById('tablaCostos').getElementsByTagName('tbody')[0];
    const totalRow = tabla.querySelector('.total-row');
    const numeroFila = tabla.rows.length; // Sin contar la fila total
    
    const nuevaFila = tabla.insertRow(tabla.rows.length - 1); // Insertar antes de la fila total
    nuevaFila.innerHTML = `
        <td>${numeroFila}</td>
        <td><input type="text" class="input-celda" placeholder="Descripción"></td>
        <td><input type="text" class="input-celda" placeholder="Cantidad"></td>
        <td><input type="text" class="input-celda" placeholder="Precio"></td>
    `;
    
    aplicarEfectosInputs(nuevaFila);
}

/**
 * Agrega una nueva fila a la tabla de taller de corte
 */
function agregarFilaCorte() {
    const tabla = document.getElementById('tablaCorte').getElementsByTagName('tbody')[0];
    
    const nuevaFila = tabla.insertRow();
    nuevaFila.innerHTML = `
        <td class="color-cell">
            <input type="color" value="#FFFF00" class="color-picker">
        </td>
        <td><input type="number" value="0" class="input-numero"></td>
        <td><input type="number" value="0" class="input-numero"></td>
        <td><input type="number" value="0" class="input-numero"></td>
        <td><input type="number" value="0" class="input-numero"></td>
        <td><input type="number" value="0" class="input-numero"></td>
        <td><input type="number" value="0" class="input-numero"></td>
    `;
    
    // Inicializar color picker y eventos
    const colorPicker = nuevaFila.querySelector('.color-picker');
    colorPicker.style.backgroundColor = colorPicker.value;
    colorPicker.addEventListener('change', function() {
        this.style.backgroundColor = this.value;
    });
    
    // Agregar eventos para cálculo automático
    const inputs = nuevaFila.querySelectorAll('.input-numero');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotalPrendas);
    });
    
    aplicarEfectosInputs(nuevaFila);
    calculateTotalPrendas();
}

/**
 * Agrega un nuevo material a la muestra de materiales
 */
function agregarMaterial() {
    const grid = document.getElementById('materialesGrid');
    const materialId = `material${window.materialMuestraCounter++}`;
    const uploadId = `upload${materialId}`;
    
    const nuevoMaterial = document.createElement('div');
    nuevoMaterial.className = 'material-item';
    nuevoMaterial.innerHTML = `
        <div class="imagen-material" id="${materialId}">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjRmNGY0IiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj7wn5OFPC90ZXh0Pgo8L3N2Zz4K" alt="Material" class="material-preview">
            <input type="file" id="${uploadId}" accept="image/*" class="file-input" style="display: none;">
            <button class="upload-btn-small" onclick="document.getElementById('${uploadId}').click()">+</button>
        </div>
        <div class="material-description">
            <input type="text" placeholder="Descripción del material" class="input-material-desc">
        </div>
        <button class="btn-eliminar-material" onclick="eliminarMaterial(this)" title="Eliminar material">-</button>
    `;
    
    grid.appendChild(nuevoMaterial);
    
    // Configurar evento de subida de imagen
    const uploadInput = document.getElementById(uploadId);
    uploadInput.addEventListener('change', function(e) {
        handleImageUpload(e, materialId);
    });
    
    aplicarEfectosInputs(nuevoMaterial);
}

/**
 * Elimina la última fila de una tabla específica
 */
function eliminarUltimaFila(tablaId) {
    const tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    
    let filasNormales;
    if (tablaId === 'tablaCostos') {
        // Para tabla de costos, excluir la fila total
        filasNormales = Array.from(tabla.rows).filter(row => !row.classList.contains('total-row'));
    } else {
        filasNormales = Array.from(tabla.rows);
    }
    
    // Verificar que no sea la última fila
    if (filasNormales.length <= 1) {
        alert('Debe mantener al menos una fila en la tabla.');
        return;
    }
    
    // Eliminar la última fila normal
    const ultimaFila = filasNormales[filasNormales.length - 1];
    tabla.removeChild(ultimaFila);
    
    // Renumerar filas si es necesario
    if (tablaId === 'tablaMateriales' || tablaId === 'tablaCostos') {
        renumerarFilas(tablaId);
    }
    
    // Recalcular total si es tabla de corte
    if (tablaId === 'tablaCorte') {
        calculateTotalPrendas();
    }
}

/**
 * Elimina el último material de la muestra
 */
function eliminarUltimoMaterial() {
    const grid = document.getElementById('materialesGrid');
    
    // Verificar que no sea el último material
    if (grid.children.length <= 1) {
        alert('Debe mantener al menos un material en la muestra.');
        return;
    }
    
    // Eliminar el último elemento
    const ultimoMaterial = grid.lastElementChild;
    grid.removeChild(ultimoMaterial);
}


/**
 * Elimina un material de la muestra
 */
function eliminarMaterial(boton) {
    const materialItem = boton.closest('.material-item');
    const grid = document.getElementById('materialesGrid');
    
    // Verificar que no sea el último material
    if (grid.children.length <= 1) {
        alert('Debe mantener al menos un material en la muestra.');
        return;
    }
    
    grid.removeChild(materialItem);
}

/**
 * Renumera las filas de una tabla
 */
function renumerarFilas(tablaId) {
    const tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    const filas = Array.from(tabla.rows).filter(row => !row.classList.contains('total-row'));
    
    filas.forEach((fila, index) => {
        const numeroCell = fila.cells[0];
        numeroCell.textContent = index + 1;
    });
}

/**
 * Aplica efectos hover y focus a los inputs de una fila
 */
function aplicarEfectosInputs(elemento) {
    const inputs = elemento.querySelectorAll('.input-celda, .input-numero, .input-material-desc');
    inputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            if (!this.matches(':focus')) {
                this.style.backgroundColor = '#e8e8e8';
            }
        });
        
        input.addEventListener('mouseleave', function() {
            if (!this.matches(':focus')) {
                this.style.backgroundColor = '#f5f5f5';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.backgroundColor = '#ffffff';
            this.style.boxShadow = '0 0 3px rgba(0, 123, 204, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = '#f5f5f5';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Inicializa cálculos automáticos
 */
function initAutoCalculations() {
    // Calcular total de prendas en taller de corte
    const talleInputs = document.querySelectorAll('#tablaCorte .input-numero');
    
    talleInputs.forEach(input => {
        input.addEventListener('input', calculateTotalPrendas);
    });
    
    // Calcular total inicial
    calculateTotalPrendas();
}

/**
 * Calcula el total de prendas automáticamente
 */
function calculateTotalPrendas() {
    const talleInputs = document.querySelectorAll('#tablaCorte .input-numero');
    const totalInput = document.getElementById('totalPrendas');
    
    let total = 0;
    talleInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
    });
    
    if (totalInput) {
        totalInput.value = total;
    }
}

/**
 * Inicializa la funcionalidad de guardado y carga
 */
function initSaveLoad() {
    const guardarBtn = document.getElementById('guardarDatos');
    const cargarBtn = document.getElementById('cargarDatos');
    const archivoInput = document.getElementById('archivoCargar');
    
    if (guardarBtn) {
        guardarBtn.addEventListener('click', guardarFicha);
    }
    
    if (cargarBtn) {
        cargarBtn.addEventListener('click', function() {
            archivoInput.click();
        });
    }
    
    if (archivoInput) {
        archivoInput.addEventListener('change', cargarFicha);
    }
}

/**
 * Guarda todos los datos de la ficha en un archivo JSON
 */
async function guardarFicha() {
    try {
        const datosCompletos = {
            // Información general
            informacionGeneral: {
                nombreApellido: document.querySelector('.info-superior .campo-grupo:nth-child(1) input').value,
                usuario: document.querySelector('.info-superior .campo-grupo:nth-child(2) input').value,
                articulo: document.querySelector('.info-superior .campo-grupo:nth-child(3) input').value,
                rubro: document.querySelector('.info-superior .campo-grupo:nth-child(4) input').value,
                fichaProduccion: document.querySelector('.info-superior .campo-grupo:nth-child(5) input').value
            },
            
            // Descripción y organización
            descripcion: document.querySelector('.textarea-descripcion').value,
            organizacion: document.querySelector('.organizacion-campo input').value,
            
            // Tabla de materiales
            materiales: [],
            
            // Tabla de costos
            costos: [],
            
            // Tabla de taller de corte
            tallerCorte: [],
            
            // Muestra de materiales
            muestraMateriales: [],
            
            // Imágenes (como base64)
            imagenes: {}
        };
        
        // Guardar datos de la tabla de materiales
        const tablaMateriales = document.getElementById('tablaMateriales');
        const filasMateriales = tablaMateriales.querySelectorAll('tbody tr');
        
        filasMateriales.forEach((fila, index) => {
            const inputs = fila.querySelectorAll('.input-celda');
            if (inputs.length >= 6) {
                datosCompletos.materiales.push({
                    numero: index + 1,
                    descripcion: inputs[0].value,
                    color: inputs[1].value,
                    material: inputs[2].value,
                    proveedor: inputs[3].value,
                    cantidad: inputs[4].value,
                    costo: inputs[5].value
                });
            }
        });
        
        // Guardar datos de la tabla de costos
        const tablaCostos = document.getElementById('tablaCostos');
        const filasCostos = tablaCostos.querySelectorAll('tbody tr:not(.total-row)');
        
        filasCostos.forEach((fila, index) => {
            const inputs = fila.querySelectorAll('.input-celda');
            if (inputs.length >= 3) {
                datosCompletos.costos.push({
                    numero: index + 1,
                    descripcion: inputs[0].value,
                    cantidad: inputs[1].value,
                    precio: inputs[2].value
                });
            }
        });
        
        // Guardar fila total
        const totalInput = document.querySelector('.total-input');
        if (totalInput) {
            datosCompletos.totalProduccion = totalInput.value;
        }
        
        // Guardar datos del taller de corte
        const tablaCorte = document.getElementById('tablaCorte');
        const filasCorte = tablaCorte.querySelectorAll('tbody tr');
        
        filasCorte.forEach((fila, index) => {
            const colorPicker = fila.querySelector('.color-picker');
            const inputs = fila.querySelectorAll('.input-numero');
            
            if (colorPicker && inputs.length >= 6) {
                datosCompletos.tallerCorte.push({
                    color: colorPicker.value,
                    talles: {
                        xs: inputs[0].value,
                        s: inputs[1].value,
                        l: inputs[2].value,
                        m: inputs[3].value,
                        xl: inputs[4].value,
                        xxl: inputs[5].value
                    }
                });
            }
        });
        
        // Guardar total de prendas
        const totalPrendas = document.getElementById('totalPrendas');
        if (totalPrendas) {
            datosCompletos.totalPrendas = totalPrendas.value;
        }
        
        // Guardar muestra de materiales
        const materialesGrid = document.getElementById('materialesGrid');
        const itemsMateriales = materialesGrid.querySelectorAll('.material-item');
        
        itemsMateriales.forEach((item, index) => {
            const descripcionInput = item.querySelector('.input-material-desc');
            const imagen = item.querySelector('.material-preview');
            
            if (descripcionInput) {
                datosCompletos.muestraMateriales.push({
                    descripcion: descripcionInput.value,
                    imagen: imagen ? imagen.src : null
                });
            }
        });
        
        // Guardar imagen del vestido
        const imagenVestido = document.querySelector('#imagenVestido img');
        if (imagenVestido && imagenVestido.src && !imagenVestido.src.includes('data:image/svg+xml')) {
            datosCompletos.imagenes.vestido = imagenVestido.src;
        }
        
        // Preparar datos para guardar
        const dataStr = JSON.stringify(datosCompletos, null, 2);
        
        // Obtener nombre sugerido basado en los datos del formulario
        const articulo = datosCompletos.informacionGeneral.articulo || 'Sin-Articulo';
        const ahora = new Date();
        const fecha = `${ahora.getFullYear()}-${(ahora.getMonth() + 1).toString().padStart(2, '0')}-${ahora.getDate().toString().padStart(2, '0')}`;
        const nombreSugerido = `ficha-${articulo}-${fecha}`;
        
        // Intentar usar File System Access API si está disponible (navegadores modernos)
        if ('showSaveFilePicker' in window) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: `${nombreSugerido}.json`,
                    types: [{
                        description: 'Archivos de Ficha Técnica',
                        accept: {
                            'application/json': ['.json']
                        }
                    }]
                });
                
                const writable = await fileHandle.createWritable();
                await writable.write(dataStr);
                await writable.close();
                
                alert('✅ Ficha guardada exitosamente en la ubicación seleccionada.');
                return;
                
            } catch (err) {
                // Si el usuario cancela o hay error, usar método con modal
                if (err.name !== 'AbortError') {
                    console.warn('Error con File System Access API:', err);
                }
            }
        }
        
        // Mostrar modal personalizado para elegir nombre
        mostrarModalGuardar(nombreSugerido, dataStr);
        
    } catch (error) {
        console.error('Error al guardar la ficha:', error);
        alert('❌ Error al guardar la ficha. Por favor inténtalo de nuevo.');
    }
}

/**
 * Carga los datos de la ficha desde un archivo JSON
 */
function cargarFicha(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;
    
    if (archivo.type !== 'application/json') {
        alert('❌ Por favor selecciona un archivo .json válido.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            
            // Confirmar carga
            if (!confirm('⚠️ Esto reemplazará todos los datos actuales. ¿Continuar?')) {
                return;
            }
            
            // Cargar información general
            if (datos.informacionGeneral) {
                const info = datos.informacionGeneral;
                document.querySelector('.info-superior .campo-grupo:nth-child(1) input').value = info.nombreApellido || '';
                document.querySelector('.info-superior .campo-grupo:nth-child(2) input').value = info.usuario || '';
                document.querySelector('.info-superior .campo-grupo:nth-child(3) input').value = info.articulo || '';
                document.querySelector('.info-superior .campo-grupo:nth-child(4) input').value = info.rubro || '';
                document.querySelector('.info-superior .campo-grupo:nth-child(5) input').value = info.fichaProduccion || '';
            }
            
            // Cargar descripción y organización
            if (datos.descripcion !== undefined) {
                document.querySelector('.textarea-descripcion').value = datos.descripcion;
            }
            if (datos.organizacion !== undefined) {
                document.querySelector('.organizacion-campo input').value = datos.organizacion;
            }
            
            // Limpiar y cargar tabla de materiales
            if (datos.materiales && datos.materiales.length > 0) {
                const tablaMateriales = document.getElementById('tablaMateriales');
                const tbody = tablaMateriales.querySelector('tbody');
                tbody.innerHTML = '';
                
                datos.materiales.forEach((material, index) => {
                    const fila = tbody.insertRow();
                    fila.innerHTML = `
                        <td>${index + 1}</td>
                        <td><input type="text" value="${material.descripcion || ''}" class="input-celda"></td>
                        <td><input type="text" value="${material.color || ''}" class="input-celda"></td>
                        <td><input type="text" value="${material.material || ''}" class="input-celda"></td>
                        <td><input type="text" value="${material.proveedor || ''}" class="input-celda"></td>
                        <td><input type="text" value="${material.cantidad || ''}" class="input-celda"></td>
                        <td><input type="text" value="${material.costo || ''}" class="input-celda"></td>
                    `;
                    aplicarEfectosInputs(fila);
                });
            }
            
            // Limpiar y cargar tabla de costos
            if (datos.costos && datos.costos.length > 0) {
                const tablaCostos = document.getElementById('tablaCostos');
                const tbody = tablaCostos.querySelector('tbody');
                tbody.innerHTML = '';
                
                datos.costos.forEach((costo, index) => {
                    const fila = tbody.insertRow();
                    fila.innerHTML = `
                        <td>${index + 1}</td>
                        <td><input type="text" value="${costo.descripcion || ''}" class="input-celda"></td>
                        <td><input type="text" value="${costo.cantidad || ''}" class="input-celda"></td>
                        <td><input type="text" value="${costo.precio || ''}" class="input-celda"></td>
                    `;
                    aplicarEfectosInputs(fila);
                });
                
                // Agregar fila total
                const filaTotal = tbody.insertRow();
                filaTotal.className = 'total-row';
                filaTotal.innerHTML = `
                    <td colspan="3"><strong>Total x Prenda</strong></td>
                    <td><input type="text" value="${datos.totalProduccion || ''}" class="input-celda total-input"></td>
                `;
            }
            
            // Limpiar y cargar taller de corte
            if (datos.tallerCorte && datos.tallerCorte.length > 0) {
                const tablaCorte = document.getElementById('tablaCorte');
                const tbody = tablaCorte.querySelector('tbody');
                tbody.innerHTML = '';
                
                datos.tallerCorte.forEach((corte) => {
                    const fila = tbody.insertRow();
                    fila.innerHTML = `
                        <td class="color-cell">
                            <input type="color" value="${corte.color || '#FFFF00'}" class="color-picker">
                        </td>
                        <td><input type="number" value="${corte.talles.xs || 0}" class="input-numero"></td>
                        <td><input type="number" value="${corte.talles.s || 0}" class="input-numero"></td>
                        <td><input type="number" value="${corte.talles.l || 0}" class="input-numero"></td>
                        <td><input type="number" value="${corte.talles.m || 0}" class="input-numero"></td>
                        <td><input type="number" value="${corte.talles.xl || 0}" class="input-numero"></td>
                        <td><input type="number" value="${corte.talles.xxl || 0}" class="input-numero"></td>
                    `;
                    
                    // Configurar color picker
                    const colorPicker = fila.querySelector('.color-picker');
                    colorPicker.style.backgroundColor = colorPicker.value;
                    colorPicker.addEventListener('change', function() {
                        this.style.backgroundColor = this.value;
                    });
                    
                    // Configurar eventos de cálculo
                    const inputs = fila.querySelectorAll('.input-numero');
                    inputs.forEach(input => {
                        input.addEventListener('input', calculateTotalPrendas);
                    });
                    
                    aplicarEfectosInputs(fila);
                });
                
                calculateTotalPrendas();
            }
            
            // Cargar total de prendas
            if (datos.totalPrendas !== undefined) {
                const totalPrendas = document.getElementById('totalPrendas');
                if (totalPrendas) {
                    totalPrendas.value = datos.totalPrendas;
                }
            }
            
            // Limpiar y cargar muestra de materiales
            if (datos.muestraMateriales && datos.muestraMateriales.length > 0) {
                const materialesGrid = document.getElementById('materialesGrid');
                materialesGrid.innerHTML = '';
                
                datos.muestraMateriales.forEach((material, index) => {
                    const materialId = `material${index + 1}`;
                    const uploadId = `upload${materialId}`;
                    
                    const nuevoMaterial = document.createElement('div');
                    nuevoMaterial.className = 'material-item';
                    nuevoMaterial.innerHTML = `
                        <div class="imagen-material" id="${materialId}">
                            <img src="${material.imagen || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjRmNGY0IiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj7wn5OFPC90ZXh0Pgo8L3N2Zz4K'}" alt="Material" class="material-preview">
                            <input type="file" id="${uploadId}" accept="image/*" class="file-input" style="display: none;">
                            <button class="upload-btn-small" onclick="document.getElementById('${uploadId}').click()">+</button>
                        </div>
                        <div class="material-description">
                            <input type="text" value="${material.descripcion || ''}" class="input-material-desc">
                        </div>
                        <button class="btn-eliminar-material" onclick="eliminarMaterial(this)" title="Eliminar material">-</button>
                    `;
                    
                    materialesGrid.appendChild(nuevoMaterial);
                    
                    // Configurar evento de subida de imagen
                    const uploadInput = document.getElementById(uploadId);
                    uploadInput.addEventListener('change', function(e) {
                        handleImageUpload(e, materialId);
                    });
                    
                    aplicarEfectosInputs(nuevoMaterial);
                });
                
                window.materialMuestraCounter = datos.muestraMateriales.length + 1;
            }
            
            // Cargar imagen del vestido
            if (datos.imagenes && datos.imagenes.vestido) {
                const imagenVestido = document.querySelector('#imagenVestido img');
                if (imagenVestido) {
                    imagenVestido.src = datos.imagenes.vestido;
                }
            }
            
            alert('✅ Ficha cargada exitosamente.');
            
        } catch (error) {
            console.error('Error al cargar la ficha:', error);
            alert('❌ Error al cargar la ficha. Verifica que el archivo sea válido.');
        }
    };
    
    reader.readAsText(archivo);
    
    // Limpiar el input para permitir cargar el mismo archivo de nuevo
    event.target.value = '';
}

/**
 * Función auxiliar para guardar datos localmente (para futuras expansiones)
 */
function saveToLocalStorage() {
    const formData = {};
    
    // Guardar todos los inputs de texto
    const textInputs = document.querySelectorAll('input[type="text"], textarea, input[type="number"]');
    textInputs.forEach(input => {
        if (input.id) {
            formData[input.id] = input.value;
        }
    });
    
    // Guardar colores
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        if (input.id) {
            formData[input.id] = input.value;
        }
    });
    
    localStorage.setItem('fichaТecnica', JSON.stringify(formData));
    console.log('Datos guardados localmente');
}

/**
 * Función auxiliar para cargar datos desde localStorage (para futuras expansiones)
 */
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('fichaТecnica');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        Object.keys(formData).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = formData[id];
            }
        });
        
        console.log('Datos cargados desde localStorage');
    }
}

/**
 * Función para limpiar todos los campos (para futuras expansiones)
 */
function clearAllFields() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
        // Limpiar inputs de texto y números
        const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="number"]');
        inputs.forEach(input => {
            if (!input.classList.contains('keep-value')) {
                input.value = '';
            }
        });
        
        // Resetear colores a valores por defecto
        const colorInputs = document.querySelectorAll('input[type="color"]');
        colorInputs.forEach(input => {
            input.value = '#FFFF00'; // Color por defecto
            input.style.backgroundColor = input.value;
        });
        
        // Limpiar imágenes
        const images = document.querySelectorAll('.imagen-preview, .material-preview');
        images.forEach(img => {
            img.src = img.getAttribute('data-default') || img.src;
        });
        
        console.log('Todos los campos han sido limpiados');
    }
}

/**
 * Muestra el modal para elegir el nombre del archivo al guardar
 */
function mostrarModalGuardar(nombreSugerido, dataStr) {
    const modal = document.getElementById('modalGuardar');
    const inputNombre = document.getElementById('nombreArchivo');
    const btnConfirmar = document.getElementById('confirmarGuardar');
    const btnCancelar = document.getElementById('cancelarGuardar');
    const btnCerrar = document.querySelector('.modal-close');
    
    // Establecer nombre sugerido
    inputNombre.value = nombreSugerido;
    inputNombre.select();
    
    // Mostrar modal
    modal.style.display = 'flex';
    inputNombre.focus();
    
    // Función para cerrar modal
    function cerrarModal() {
        modal.style.display = 'none';
        // Limpiar event listeners
        btnConfirmar.replaceWith(btnConfirmar.cloneNode(true));
        document.getElementById('confirmarGuardar').addEventListener('click', () => confirmarGuardado());
    }
    
    // Función para confirmar guardado
    function confirmarGuardado() {
        const nombreArchivo = inputNombre.value.trim();
        if (!nombreArchivo) {
            alert('⚠️ Por favor ingresa un nombre para el archivo.');
            return;
        }
        
        const nombreCompleto = nombreArchivo.endsWith('.json') ? nombreArchivo : `${nombreArchivo}.json`;
        
        // Crear descarga
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreCompleto;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        cerrarModal();
        alert('✅ Ficha guardada exitosamente. El archivo se ha descargado a tu carpeta de descargas.');
    }
    
    // Event listeners
    btnConfirmar.addEventListener('click', confirmarGuardado);
    btnCancelar.addEventListener('click', cerrarModal);
    btnCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar con Escape
    function handleEscape(event) {
        if (event.key === 'Escape') {
            cerrarModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
    
    // Confirmar con Enter
    inputNombre.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            confirmarGuardado();
        }
    });
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });
}

/**
 * Función para validar campos requeridos (para futuras expansiones)
 */
function validateRequiredFields() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff0000';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Guardar automáticamente cada 30 segundos (para futuras expansiones)
setInterval(() => {
    saveToLocalStorage();
}, 30000);

// Cargar datos al inicializar (comentado para no interferir con valores por defecto)
// loadFromLocalStorage();
