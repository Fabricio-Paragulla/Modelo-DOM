# PRÁCTICA 6.1: MODELO DE OBJETOS DEL DOCUMENTO (DOM)

Este repositorio contiene la resolución de la Práctica 6.1 de la asignatura Desarrollo Web en Entorno Cliente (UD6). El proyecto demuestra el dominio sobre el Modelo de Objetos del Documento (DOM) utilizando Vue 3 (Composition API), TypeScript y Vite.

El objetivo principal es resolver problemas complejos de interfaz operando directamente con las APIs nativas del navegador, prescindiendo de librerías externas.

## EJERCICIOS Y FUNCIONALIDADES

### Ejercicio 1: Subrayador de Apuntes (DOM API)

Una herramienta que permite al usuario seleccionar texto de un párrafo y resaltarlo utilizando diferentes colores, interactuando directamente con el árbol de nodos.

- **API Selection y Range**: Uso de `window.getSelection()` y `getRangeAt()` para capturar la interacción del usuario de forma precisa.
- **Manipulación de Nodos**: Creación dinámica de elementos (`document.createElement`) y envoltura de texto en tiempo real (`surroundContents()`).
- **Persistencia de Texto**: Lógica de borrado al hacer doble clic, que elimina el nodo de estilo (`<span>`) pero reinserta los nodos de texto hijos al documento principal (`insertBefore`, `removeChild`).

### Ejercicio 2: Tablero Kanban (Drag & Drop Nativo)

Un gestor de tareas simplificado (tipo Trello) construido estrictamente sobre la API nativa Drag & Drop de HTML5.

- **Eventos Nativos**: Implementación y gestión de los eventos `dragstart`, `dragover`, `drop` y `dragend`.
- **Transferencia de Datos**: Uso eficiente del objeto `dataTransfer` para pasar identificadores de tareas entre columnas.
- **Prevención de Comportamientos por Defecto**: Uso estratégico de `event.preventDefault()` en la fase de `dragover` para habilitar zonas de caída válidas, asegurando compatibilidad cruzada entre navegadores.
- **Integración Reactiva**: Combinación de eventos puros del DOM con la reactividad de Vue; el cambio de estado de la tarea dispara automáticamente la re-renderización de la lista.

## STACK TECNOLÓGICO

- Frontend: Vue 3 (SFC + Composition API)
- Lenguaje: TypeScript
- Bundler: Vite
- Testing: Vitest + JSDOM

## INSTALACIÓN Y EJECUCIÓN

Asegúrate de tener Node.js instalado en tu equipo.

1. Clonar el repositorio:

```bash
git clone <URL-DE-TU-REPOSITORIO>
cd modelo-dom
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

(El proyecto estará disponible localmente, por defecto en http://localhost:5173/)

## PRUEBAS UNITARIAS (VITEST)

Se ha implementado una suite de pruebas para verificar la correcta manipulación del DOM y el manejo de eventos, utilizando jsdom como entorno simulado.

Para ejecutar las pruebas, introduce el siguiente comando en la terminal:

```bash
npm run test
```

- **Highlighter.test.ts**: Simula el objeto de selección nativo (Mocking) para comprobar que la lógica inyecta correctamente los nodos CSS en el DOM y que estos desaparecen al hacer doble clic.
- **Kanban.test.ts**: Al no existir un Drag & Drop completo en JSDOM, se instancian eventos manuales (DragEvent) con dataTransfer personalizado para validar que el sistema procesa bien las caídas (drops) y actualiza el array de estado subyacente.

## AUTOR

Fabricio Paragulla - Desarrollo Web en Entorno Cliente - UD6
