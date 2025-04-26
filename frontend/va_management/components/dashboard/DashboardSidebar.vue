<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  creators: {
      type: Object,
    },

    activeCreator: {
      type: Object,
      default:{}
    },
  });

const emit = defineEmits(['menu-item-clicked', 'close-sidebar']);

const isMobile = computed(() => {
  return window.innerWidth < 768; // Seuil pour considérer comme mobile (md breakpoint Tailwind)
});
</script>

<template>
  <div :class="{ 'py-4 pl-4 flex flex-col': isMobile, 'bg-gray-200 p-4 flex flex-col': !isMobile }">
    <div v-if="!isMobile" class="flex justify-center mb-4">
      <h3 class="ml-3 text-xl font-bold text-center ">DashBoard</h3>
        </div>
    <div  :class="{ 'items-center': isMobile }">
      <h3 class="ml-3 text-xl font-semibold text-center ">Creators List</h3>
    </div>
    <USeparator class="my-4 " color="neutral" size="md" />
    <nav class="flex-1 space-y-4">

      <UButton v-for="ceator in props.creators"   variant="ghost"   class="text-black hover:bg-gray-700 hover:text-white flex items-center py-2  rounded-lg w-full"
      :class="{ 'bg-gray-800 text-white': ceator.id == activeCreator.id }"   
      @click="$emit('menu-item-clicked', ceator)">
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="ml-3">{{ceator.name}}</span>
      </UButton>
     
      
    </nav>

  </div>
</template>


