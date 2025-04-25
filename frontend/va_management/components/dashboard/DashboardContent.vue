<template>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">{{ getPageTitle }}</h2>
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';

  import UserCard from './UserCard.vue';
  
  const props = defineProps({
    activeMenuItem: {
      type: String,
      default: '',
    },
  });
  
  const users = ref([
  { id: 1, name: 'Alice Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
    { id: 3, name: 'Claire Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
    // 
  ]);
  
  const getPageTitle = computed(() => {
    return `Users For ${props.activeMenuItem}`
   
  });
  </script>
  
  <style scoped>
  /* Styles spécifiques au contenu si nécessaire */
  </style>