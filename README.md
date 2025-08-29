# Generador de Ficha Técnica

Sistema web para crear fichas técnicas de producción textil con funcionalidades avanzadas de gestión y exportación.

## 🚀 Características

- **Diseño Profesional**: Layout A4 landscape optimizado para impresión
- **Gestión Dinámica**: Agregar/eliminar filas en tablas de materiales, costos y taller de corte
- **Subida de Imágenes**: Bocetos, delanteros, traseros y muestras de materiales
- **Guardado Avanzado**: Selección de ubicación y nombre de archivo
- **Exportación PDF**: Documentos limpios sin elementos de interfaz
- **Funcionamiento Offline**: No requiere conexión a internet

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica y responsive
- **CSS3**: Grid, Flexbox, animaciones y media queries
- **JavaScript Vanilla**: Lógica completa sin dependencias externas
- **html2canvas**: Captura de pantalla para PDF
- **jsPDF**: Generación de documentos PDF

## 📁 Estructura del Proyecto

```
/
├── index.html          # Aplicación principal
├── style.css           # Estilos y diseño
├── script.js           # Lógica y funcionalidades
├── .gitignore          # Archivos excluidos del repositorio
└── README.md           # Este archivo
```

## 🚦 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ClaudioVilas/Generador-de-Ficha-Tecnica.git
   cd Generador-de-Ficha-Tecnica
   ```

2. **Abrir en navegador**:
   - Doble clic en `index.html`
   - O usar un servidor local:
     ```bash
     python3 -m http.server 8080
     ```

3. **Usar la aplicación**:
   - Completa los campos de información general
   - Sube imágenes arrastrando o haciendo clic
   - Agrega materiales y costos con los botones +/-
   - Guarda tu trabajo en formato JSON
   - Exporta a PDF cuando esté listo

## 💾 Funcionalidades de Guardado

### Guardado Avanzado (v1.1.0)
- **Navegadores Modernos**: Diálogo nativo para elegir ubicación
- **Navegadores Clásicos**: Modal elegante para nombrar archivo
- **Nombres Inteligentes**: Sugerencias automáticas basadas en datos

### Formatos Soportados
- **JSON**: Para guardar/cargar proyectos
- **PDF**: Para documentos finales

## 🎨 Funcionalidades Principales

### Gestión de Materiales
- Tabla dinámica con descripción, color, material, proveedor, cantidad y costo
- Agregar/eliminar filas dinámicamente
- Cálculos automáticos

### Taller de Corte
- Configuración por talles (XS, S, M, L, XL, XXL)
- Selector de colores
- Cálculo automático de total de prendas

### Muestra de Materiales
- Subida de imágenes de materiales
- Gestión visual de muestras
- Organización en grid responsive

## 🖥️ Compatibilidad

- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Sistemas**: Windows, macOS, Linux
- **Dispositivos**: Desktop y tablet (optimizado para desktop)

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o sugerencias, por favor abre un issue en este repositorio.

---

**Desarrollado con ❤️ para la industria textil**
