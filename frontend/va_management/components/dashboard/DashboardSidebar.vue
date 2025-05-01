<template>
  <div class="flex flex-col p-4 md:bg-gray-100 w-full md:w-4/12 lg:w-3/12">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-center w-full">Dashboard</h3>
      <UButton
        v-if="isMobile"
        icon="i-heroicons-x-mark"
        variant="ghost"
        @click="$emit('close-sidebar')"
      />
    </div>

    <div class="mb-2 w-full text-center">
      <h3 class="text-xl font-semibold">Creators List</h3>
    </div>

    <USeparator class="my-4" color="neutral" size="md" />

    <nav class="flex-1 space-y-4 w-full">
      <UButton
        v-for="creator in props.creators"
        :key="creator['Model Assigned']"
        variant="ghost"
        class="text-black hover:bg-gray-700 hover:text-white flex items-center py-2 px-3 rounded-lg w-full"
        :class="{ 'bg-gray-800 text-white': creator['Model Assigned'] === activeCreator['Model Assigned'] }"
        @click="$emit('menu-item-clicked', creator)"
      >
        <UIcon name="i-heroicons-users-20-solid" class="mr-2 w-5 h-5" />
        <span class="flex-1 text-left">{{ creator['Model Assigned'] }}</span>
        <UBadge
          class="rounded-full"
          :class="{
            'bg-primary-100': creator.Strategy === 'F/U',
            'bg-secondary-100': creator.Strategy === 'Mass Comment',
            'bg-error-100': !['F/U', 'Mass Comment'].includes(creator.Strategy)
          }"
        >
          {{ creator.Strategy }}
        </UBadge>
      </UButton>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const props = defineProps({
  creators: {
    type: Object,
    required: true
  },
  activeCreator: {
    type: Object,
    default: () => ({})
  },
})

const emit = defineEmits(['menu-item-clicked', 'close-sidebar'])

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
})

const isMobile = breakpoints.smaller('md')
</script>
