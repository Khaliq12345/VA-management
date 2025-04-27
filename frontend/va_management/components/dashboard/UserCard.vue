
<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function statusColor(status: string) {
  return 'bg-gray-800';
  // switch (status) {
  //   case 'not active': return 'bg-green-500'
  //   case 'active': return 'bg-red-500'
  //   default: return 'bg-gray-400'
  // }
}

function goToUserDetails() {
  console.log("user", props.user)
  navigateTo({
    path: '/user-details',
    query: { id: props.user.scraped_user.username }, // Optionnel : pour l'URL
    state: { user: props.user } // Transmet l'objet complet
  });
}

</script>


<template>
  <div class="my-4 text-start">
    <div :key="user.scraped_user.id" class="flex bg-white rounded shadow">
      <div :class="['w-1 rounded-l', statusColor(user.scraped_user.status)]"></div>
      <div class="pl-4 flex-1">
        <h3 class="text-lg font-semibold">{{ user.scraped_user.username }}</h3>
        <p class="text-sm text-gray-500">Created At : {{ user.scraped_user.created_at }}</p>
        <p class="text-sm text-gray-400">Last Action : {{ user.scraped_user.last_action ?? " - - - " }}</p>
        <div class="flex justify-end">
          <NuxtLink :to="{ path: '/user-details', query: { id: user.scraped_user.username, user: JSON.stringify(user)  }}" class="btn">
            <UButton variant="link" class="mt-2 cursor-pointer" >Show Details</UButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
