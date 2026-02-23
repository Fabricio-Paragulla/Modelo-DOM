<script setup lang="ts">
import { ref } from 'vue';

interface Task {
    id: number;
    title: string;
    status: 'todo' | 'done';
}

// Estado inicial 
const tasks = ref<Task[]>([
    { id: 1, title: 'Aprender DOM', status: 'todo' },
    { id: 2, title: 'Configurar Vitest', status: 'todo' },
    { id: 3, title: 'Descansar', status: 'done' },
]);

// Handlers de Arrastre
const handleDragStart = (evt: DragEvent, task: Task) => {
    if (evt.dataTransfer) {
        // Guardamos el ID de la tarea que se está moviendo 
        evt.dataTransfer.setData('text/plain', task.id.toString());
        evt.dataTransfer.effectAllowed = 'move';
        
        // Feedback visual opcional
        (evt.target as HTMLElement).style.opacity = '0.5';
    }
};

const handleDragEnd = (evt: DragEvent) => {
  // Restaurar opacidad al terminar
    (evt.target as HTMLElement).style.opacity = '1';
};

// Handler de Drop
const handleDrop = (evt: DragEvent, newStatus: 'todo' | 'done') => {
    if (evt.dataTransfer) {
        // Recuperar el ID 
        const taskId = parseInt(evt.dataTransfer.getData('text/plain'));
        
        // Buscar la tarea y actualizar estado
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus; // Vue actualiza el DOM automáticamente al cambiar esto
        }
    }
};

// Permitir Drop 
const handleDragOver = (evt: DragEvent) => {
  //  Por defecto HTML no permite soltar elementos.
    evt.preventDefault(); 
};
</script>

<template>
    <div class="kanban-board">
        <div 
        class="column todo" 
        @dragover="handleDragOver" 
        @drop="handleDrop($event, 'todo')"
        >
        <h2>Pendientes</h2>
        <div 
            v-for="task in tasks.filter(t => t.status === 'todo')" 
            :key="task.id"
            class="card"
            draggable="true" 
            @dragstart="handleDragStart($event, task)"
            @dragend="handleDragEnd"
        >
            {{ task.title }}
        </div>
        </div>

        <div 
        class="column done" 
        @dragover="handleDragOver" 
        @drop="handleDrop($event, 'done')"
        >
        <h2>Hecho</h2>
        <div 
            v-for="task in tasks.filter(t => t.status === 'done')" 
            :key="task.id"
            class="card"
            draggable="true" 
            @dragstart="handleDragStart($event, task)"
            @dragend="handleDragEnd"
        >
            {{ task.title }}
        </div>
        </div>
    </div>
</template>

<style scoped>
.kanban-board {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Dos columnas iguales */
    gap: 2rem;
    align-items: start;
}

.column {
    background: #f1f5f9; /* Gris muy suave */
    padding: 1.5rem;
    border-radius: 12px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: background 0.2s;
}

.column h2 {
    font-size: 1.2rem;
    color: #475569;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Estilo específico para diferenciar columnas */
.column.todo { 
    border-top: 4px solid #f59e0b; 
}
.column.done { 
    border-top: 4px solid #10b981; 
}

.card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    cursor: grab;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    font-weight: 500;
    color: #334155;
}

.card:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.card:active {
    cursor: grabbing;
}

/* Clase que añadimos visualmente cuando se arrastra (opcional si la usaste en JS) */
.card.dragging {
    opacity: 0.4;
    border: 2px dashed #94a3b8;
    background: #f8fafc;
}

/* Feedback visual al pasar por encima de una columna */
.column:hover {
    background: #e2e8f0;
}
</style>