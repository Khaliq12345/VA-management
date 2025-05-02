<template>
    <div class="pagination-controls">
      <button 
        @click="$emit('prev')" 
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Précédent
      </button>
      <span class="current-page">Page {{ currentPage }}</span>
      <button 
        @click="$emit('next')" 
        :disabled="!hasNextPage"
        class="pagination-button"
      >
        Suivant
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    hasNextPage: {
      type: Boolean,
      required: true
    }
  })
  
  defineEmits(['prev', 'next'])
  </script>
  
  <style scoped>
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .pagination-button {
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .pagination-button:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  
  .current-page {
    font-weight: bold;
  }
  </style>