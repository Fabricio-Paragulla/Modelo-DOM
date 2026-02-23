<script setup lang="ts">
import TextHighlighter from './components/TextHighlighter.vue';
import KanbanBoard from './components/KanbanBoard.vue';
</script>

<template>
  <main class="container">
    <header>
      <h1>Práctica 6.1: Modelo de Objetos del Documento</h1>
      <p>Desarrollo Web en Entorno Cliente - UD6</p>
    </header>

    <section class="exercise-section">
      <h2>Ejercicio 1: Subrayador de Apuntes (DOM API)</h2>
      <div class="exercise-content">
        <TextHighlighter />
      </div>
    </section>

    <hr class="separator" />

    <section class="exercise-section">
      <h2>Ejercicio 2: Tablero Kanban (Drag & Drop Nativo)</h2>
      <div class="exercise-content">
        <KanbanBoard />
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Fuente moderna */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.container {
  font-family: 'Inter', sans-serif;
  max-width: 1000px; /* Un poco más estrecho para mejor lectura */
  margin: 40px auto;
  padding: 2rem;
  color: #2c3e50; /* Color de texto oscuro para contraste */
}

header {
  text-align: center;
  margin-bottom: 4rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

header p {
  color: #64748b;
  font-size: 1.1rem;
}

h2 {
  color: #10b981; /* Verde esmeralda moderno */
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

h2::before {
  content: '';
  display: block;
  width: 6px;
  height: 24px;
  background: #10b981;
  border-radius: 4px;
}

.exercise-section {
  margin-bottom: 4rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px; /* Bordes más redondeados */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Sombra suave */
  border: 1px solid #f1f5f9;
}

.separator {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
  margin: 3rem 0;
}

.exercise-content {
  margin-top: 1.5rem;
}
</style>