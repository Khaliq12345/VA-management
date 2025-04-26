
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function statusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'pending': return 'bg-yellow-400'
    case 'inactive': return 'bg-red-500'
    default: return 'bg-gray-400'
  }
}

function goToDetail(id: number) {
  useRouter().push(`{ path: '/user-details', query: { id: user.id } }${id}`)
}

</script>


<template>
  <div class="my-4 text-start">
    <div :key="user.id" class="flex bg-white rounded shadow">
      <div :class="['w-1 rounded-l', statusColor(user.status)]"></div>
      <div class="pl-4 flex-1">
        <h3 class="text-lg font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
        <p class="text-sm text-gray-400">Last Action : {{ new Date(user.lastLogin).toLocaleDateString() }}</p>
        <div class="flex justify-end">
          <NuxtLink :to="{ path: '/user-details', query: { id: user.id } }" class="btn">
            <UButton variant="link" class="mt-2 cursor-pointer" >Show Details</UButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
