<template>
  <div :class="{ 'py-4 pl-4 flex flex-col': isMobile, 'border-r-2 border-black p-6 flex flex-col': !isMobile }">
    <div v-if="isMobile" class="flex justify-end mb-4">
      <!-- <UButton icon="i-heroicons-x-mark-20-solid" color="primary" variant="ghost" @click="$emit('close-sidebar')" /> -->
    </div>
    <div class="mb-8" :class="{ 'items-center': isMobile }">
      <h3 class="ml-3 text-xl font-semibold text-center ">Creators List</h3>
    </div>
    <nav class="flex-1 space-y-4">

      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'Summer')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">Summer</span>
      </UButton>
      <!--  -->
      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'Bae')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">Bae</span>
      </UButton>
      <!--  -->
      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'TonyStr')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">TonyStr</span>
      </UButton>
      <!--  -->
      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'Hafizer')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">Hafizer</span>
      </UButton>
      <!--  -->
      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'Roller')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">Roller</span>
      </UButton>
      <!--  -->
      <UButton variant="ghost" color="secondary" class="flex items-center p-2 rounded-lg hover:bg-gray-100"
        active-class="bg-primary-50 text-primary-600 hover:bg-primary-50" @click="$emit('menu-item-clicked', 'BenFort')">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">BenFort</span>
      </UButton>
      
    </nav>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['menu-item-clicked', 'close-sidebar']);

const isMobile = computed(() => {
  return window.innerWidth < 768; // Seuil pour considérer comme mobile (md breakpoint Tailwind)
});
</script>

<style scoped>
/* Styles spécifiques au sidebar si nécessaire */
</style>