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

const  creators = ref([
  {
    id: 1, name: 'Alicei', active: true, users:
      [
        { id: 1, name: 'Alicei Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Alicei Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Alicei Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
  },
  { id: 2, name: 'Bae', active: false, users: 
    [
        { id: 1, name: 'Bae Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Bae Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Bae Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 3, name: 'TonyStr', active: false, users: 
    [
        { id: 1, name: 'TonyStr Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'TonyStr Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'TonyStr Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 4, name: 'Hafizer', active: false, users: 
    [
        { id: 1, name: 'Hafizer Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Hafizer Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Hafizer Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 5, name: 'Roller', active: false, users: 
    [
        { id: 1, name: 'Roller Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Roller Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Roller Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 6, name: 'BenFort', active: false, users: 
    [
        { id: 1, name: 'BenFort Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'BenFort Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'BenFort Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 7, name: 'Sokanaa', active: false, users: 
    [
        { id: 1, name: 'Sokanaa Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Sokanaa Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Sokanaa Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },
  { id: 8, name: 'Nuxtor', active: false, users: 
    [
        { id: 1, name: 'Nuxtor Durand', email: 'alice@example.com', status: 'active', lastLogin: '2023-05-10T12:00:00' },
        { id: 2, name: 'Nuxtor Martin', email: 'bob@example.com', status: 'pending', lastLogin: '2023-05-09T10:30:00' },
        { id: 3, name: 'Nuxtor Dupuis', email: 'claire@example.com', status: 'inactive', lastLogin: '2023-04-28T14:10:00' }
      ]
   },

]);

const activeCreator = ref(creators.value[0]);


const handleMenuItemClick = (item: any) => {
  activeCreator.value = item;
  isMobileSidebarOpen.value = false;
};

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


</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <DashboardSidebar class="hidden md:flex flex-shrink-0 w-3/12" :creators="creators" :activeCreator="activeCreator"
      @menu-item-clicked="handleMenuItemClick" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between md:justify-end">
          <!-- Mobile Button -->
          <UButton v-on:click="isMobileSidebarOpen = !isMobileSidebarOpen"
            class="bg-gray-100 hover:bg-gray-300 md:hidden cursor-pointer">
            <UIcon name="i-heroicons-bars-3-bottom-left-20-solid" class="mr-3 text-xl" />
            <h3 class="ml-3 text-lg font-semibold text-center ">Dashboard</h3>
          </UButton>
          <!-- LogOut -->
          <UButton color="secondary" variant="ghost" icon="i-heroicons-arrow-left-end-on-rectangle"
            class="text-error-500  hover:bg-gray-100 cursor-pointer">
            Log Out
          </UButton>

        </div>
      </header>

      <main class="flex-1 text-center overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div class="flex justify-center ">
          <!-- User Infos -->
          <div class="flex flex-col  ml-4">
            <span class="mr-4 text-2xl mb-3">Welcome, <span class="font-bold"> {{ loggedInUser.name }} </span> !</span>
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
        <DashboardContent :activeCreator="activeCreator" />

      </main>

      <UDrawer direction="left" inset v-model:open="isMobileSidebarOpen" class="w-8/12 sm:w-5/12">
        <template #title>
        </template>
        <template #description>
        </template>
        <template #header>
          <!-- <div class="flex justify-between">
            <h2 class="text-black font-semibold">DashBoard</h2>
            <UButton color="primary" class="cursor-pointer" variant="ghost" icon="i-heroicons-x-mark" @click="isMobileSidebarOpen = false" />
          </div> -->
        </template>
        <template #body>
          <DashboardSidebar :creators="creators" :activeCreator="activeCreator" @menu-item-clicked="handleMenuItemClick" @close-sidebar="isMobileSidebarOpen = false" />
        </template>
      </UDrawer>

    </div>
  </div>
</template>
