<script setup lang="ts">
  import { ref, computed } from 'vue';

  import UserCard from './UserCard.vue';

  const props = defineProps({
    activeCreator: {
      type: Object,
      default:{}
    },
  });
</script>

<template>
    <div class="mt-8">
      <!-- <UBadge class="font-bold rounded-full">Badge</UBadge> -->
      <h2 class="text-2xl font-semibold mb-4">Users For {{ props.activeCreator.name }}</h2>
      <UserCard v-for="user in props.activeCreator.users" :key="user.id" :user="user" />
    </div>
</template>
  

  
