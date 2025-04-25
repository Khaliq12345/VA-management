<template>
  <div class="min-h-screen bg-gray-100 flex">
    <DashboardSidebar class="hidden md:flex flex-shrink-0 w-3/12" @menu-item-clicked="handleMenuItemClick" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between md:justify-end">
          <!-- Mobile Button -->
          <UButton v-on:click="isMobileSidebarOpen = !isMobileSidebarOpen"
            class="bg-primary-100 hover:bg-primary-300 md:hidden">
            <UIcon name="i-heroicons-bars-3-bottom-left-20-solid" class="mr-3 text-xl" />
            <h3 class="ml-3 text-lg font-semibold text-center ">Dashboard</h3>
          </UButton>
          <!-- LogOut -->
          <UButton color="secondary" variant="ghost" icon="i-heroicons-arrow-left-end-on-rectangle"
            class="text-error-500 cursor-pointer">
            Log Out
          </UButton>

        </div>
      </header>

      <main class="flex-1 text-center overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div class="flex justify-center ">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" size="xl" />
          <!-- User Infos -->
          <div class="flex flex-col text-start ml-4">
            <span class="mr-4 text-2xl">Welcome, <span class="font-bold"> {{ loggedInUser.name }} </span></span>
            <p class="text-sm">
              Logged In at : <span class="font-bold">{{ formatTime(loggedInUser.loginTime) }} </span>
            </p>
            <p class="text-sm">
              Shift Time : <span class="font-bold">From --> </span> {{ formatTime(loggedInUser.loginTime) }} -- <span
                class="font-bold">To --></span> {{ formatTime(loggedInUser.loginTime) }}
            </p>
          </div>
        </div>

        <!-- Dash Content -->
        <DashboardContent :key="componentKey" :activeMenuItem="activeMenuItem" />

      </main>

      <UDrawer direction="left" class="" v-model:open="isMobileSidebarOpen">
        <template #header>
          <div class="flex justify-end">
            <!-- <h2 class="text-black font-semibold">DashBoard</h2> -->
            <UButton color="primary" variant="ghost" icon="i-heroicons-x-mark" @click="isMobileSidebarOpen = false" />

          </div>
        </template>
        <template #body>
          <DashboardSidebar @menu-item-clicked="handleMenuItemClick" @close-sidebar="isMobileSidebarOpen = false" />
        </template>
      </UDrawer>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue';
import DashboardContent from '../components/dashboard/DashboardContent.vue';


const loggedInUser = ref({
  name: 'John Doe', // 
  loginTime: new Date(),
  shiftTimeFrom: new Date(),
  shiftTimeTo: new Date(),
});

// const currentTime = ref(formatTime(new Date()));
const isMobileSidebarOpen = ref(false);
const activeMenuItem = ref('Summer');
const componentKey = ref(0); //

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  // setInterval(() => {
  //   currentTime.value = formatTime(new Date());
  // }, 1000);
});

const handleMenuItemClick = (item: string) => {
  activeMenuItem.value = item;
  isMobileSidebarOpen.value = false;
  componentKey.value++; // 
};
</script>

<style scoped>
/*  */
</style>