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
      <h2 class="text-lg mb-5">Working with ~ <span class="font-semibold " >{{ props.activeCreator.name }}</span>  <UBadge class="bg-error-100 rounded-full align-top" :class="{'bg-primary-100': props.activeCreator.strategy == 'F/U', 'bg-secondary-100': props.activeCreator.strategy == 'M-Comment'} " >{{props.activeCreator.strategy}}</UBadge></h2>
      <UserCard v-for="user in props.activeCreator.users" :key="user.id" :user="user" />
    </div>
</template>
  

  
