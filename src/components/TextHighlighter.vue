<script setup lang="ts">
import { ref } from 'vue';

const currentColor = ref<string>('yellow');
const contentArea = ref<HTMLElement | null>(null);

// Función 1: Subrayar Selección
const highlightSelection = () => {
    const selection = window.getSelection();
    
    // Validaciones de seguridad
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);

    if (contentArea.value && !contentArea.value.contains(range.commonAncestorContainer)) {
        alert("Por favor, selecciona texto dentro del párrafo.");
        return;
    }

    // Si la selección está colapsada (no hay texto seleccionado), salimos
    if (selection.toString().length === 0) return;

    // Creación del nodo SPAN
    const span = document.createElement('span');
    // Usamos clases dinámicas según el color elegido
    span.className = `highlight-${currentColor.value}`; 
    
    try {
        // La magia del DOM: envuelve el contenido del rango en el nuevo nodo
        range.surroundContents(span); // 
        
        // Limpiamos la selección visual para que el usuario vea el resultado
        selection.removeAllRanges();
    } catch (e) {
        console.error("No se puede subrayar una selección que cruza múltiples nodos complejos.", e);
    }
};

// Función 2: Eliminar Subrayado
const removeHighlight = (event: Event) => {
    const target = event.target as HTMLElement; // 

    // Verificamos si hicimos doble click en un SPAN de subrayado
    if (target.tagName === 'SPAN' && target.classList.value.includes('highlight-')) {
        
        // Lógica de manipulación de nodos para eliminar el texto 
        const parent = target.parentNode;
        
        if (parent) {
            // Movemos los hijos del span (el texto) antes del span
            while (target.firstChild) {
                parent.insertBefore(target.firstChild, target);
            }
            // Eliminamos el span vacío
            parent.removeChild(target);
        }
    }
};
</script>

<template>
    <div>
        <div class="toolbar">
            <button @click="currentColor = 'yellow'" aria-label="Color Amarillo"></button>
            <button @click="currentColor = 'green'" aria-label="Color Verde"></button>
            <button @click="currentColor = 'pink'" aria-label="Color Rosa"></button>
            <button @click="highlightSelection" aria-label="Subrayar">Subrayar</button>
        </div>
        <div ref="contentArea" @dblclick="removeHighlight">
            Texto de ejemplo para subrayar
        </div>
    </div>
</template>

<style scoped>
.highlighter-app {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.toolbar {
    display: flex;
    gap: 1rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    align-items: center;
    justify-content: center;
}

/* Botones de colores circulares */
button[aria-label^="Color"] {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
}

button[aria-label^="Color"]:hover {
    transform: scale(1.1);
}

button.active {
    border-color: #333;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Botón de acción principal */
.action-btn {
    background-color: #333;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-left: auto; /* Empuja el botón a la derecha */
    transition: background 0.2s;
}

.action-btn:hover {
    background-color: #000;
}

/* Área de texto tipo "Documento" */
.text-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #334155;
    padding: 2rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    min-height: 150px;
}

/* Asegurar que los estilos dinámicos se vean bien */
:deep(.highlight-yellow) { 
    background-color: #fef08a; 
    padding: 2px 0; 
}

:deep(.highlight-green) { 
    background-color: #bbf7d0;
    padding: 2px 0; 
}

:deep(.highlight-pink) { 
    background-color: #fbcfe8; 
    padding: 2px 0; 
}

button[aria-label="Color Amarillo"] {
  background-color: #facc15; /* Amarillo intenso */
  border: 1px solid #eab308;
}

button[aria-label="Color Verde"] {
    background-color: #4ade80; /* Verde intenso */
    border: 1px solid #22c55e;
}

button[aria-label="Color Rosa"] {
    background-color: #f472b6; /* Rosa intenso */
    border: 1px solid #e879f9;
}

/* Ajuste visual para cuando un color está seleccionado (activo) */
button.active[aria-label="Color Amarillo"] { 
    box-shadow: 0 0 0 3px #fef08a; 
}

button.active[aria-label="Color Verde"] { 
    box-shadow: 0 0 0 3px #bbf7d0; 
}

button.active[aria-label="Color Rosa"] { 
    box-shadow: 0 0 0 3px #fbcfe8; 
}

</style>