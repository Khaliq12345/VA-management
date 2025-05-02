<script setup lang="ts">
  import UserCard from './UserCard.vue';

  const props = defineProps({
    activeCreator: {
      type: Object,
    },
    users: {
      type: Object,
    },
    canWork: Boolean
  });
  
</script>

<template>
    <div class="mt-8">
      <div v-if="activeCreator" class="">
        <h2 class="text-lg mb-5">Working with ~ <span class="font-semibold " >{{ activeCreator['Model Assigned'] }}</span>  <UBadge class="bg-error-100 rounded-full align-top" :class="{'bg-primary-100': activeCreator.Strategy == 'F/U', 'bg-secondary-100': activeCreator.Strategy == 'Mass Comment'} " >{{activeCreator.Strategy}}</UBadge></h2>
        <UserCard v-for="user in users" :key="user.scraped_user.id" :user="user" />
      </div>
      <div v-else  class="">
        <h2 v-if="canWork" class="text-lg mb-5">Select a Creator profile to work with ~ From the <span class="font-semibold " > Sidebar Menu</span>  </h2>
        <h2 v-else class="text-lg mb-5 text-error-700">You're not in the right  ~  <span class="font-semibold " > Shifting Time </span>  </h2>
      </div>
      
    </div>
</template>
  

  
