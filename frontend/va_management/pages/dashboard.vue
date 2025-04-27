<script setup lang="ts">
import { ref, onMounted } from 'vue';

import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue';
import DashboardContent from '../components/dashboard/DashboardContent.vue';
import Loading from '../components/Loading.vue';
import axios from 'axios';

const loadingData = ref(false);

// # Connected User
const loggedInUser = ref({
  name: 'Mary Joy Daet', // 
  email: 'mary_joy_daet@cuhvet.com', // 
  loginTime: new Date(),
  shiftTimeFrom: new Date(),
  shiftTimeTo: new Date(),
  access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ1NzcwNjE2LCJpYXQiOjE3NDU3NjcwMTYsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NTc2NzAxNn1dLCJzZXNzaW9uX2lkIjoiYWY4MTE2MTEtNTZmOS00YTllLTg2NGMtZjBiMTNlODQ4NmY3IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.DSFBpkSijLAYorphzxn82PAlA9pJvGE8dmwo-eRunlM',
   refresh_token: 'n2ofvgsfdajk'
});

// # For Sidebar
const isMobileSidebarOpen = ref(false);

// # Creators & User List
const users = ref([]);
const creators = ref([]);
const activeCreator = ref();

// # On click any sidebar item
const handleMenuItemClick = async (item: any) => {
  activeCreator.value = item;
  users.value = await getScrapedUsers();
  isMobileSidebarOpen.value = false;
};

// # Showing Date Format
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

onMounted(async () => {
  creators.value = await fetchVaInfo();
});


const fetchVaInfo = async () => {
  loadingData.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:8000/get-va-info', {
      params: {
        va_email: loggedInUser.value.email
      },
      headers: {
        'access_token': loggedInUser.value.access_token,
        'refresh_token': loggedInUser.value.refresh_token
      }
    });
    console.log('Got Data :', response.data);
    return response.data.records;
  } catch (err) {
    console.error('Error:', err);
    return null;
  } finally {
    loadingData.value = false;
  }
};

const getScrapedUsers = async () => {
  loadingData.value = true;
  const tres = {
    creator_username: activeCreator.value['Model Assigned'],
    table_id: activeCreator.value.table_id,
    base_id: activeCreator.value.base_id
  };
  console.log("Real params : ", tres);
  try {
    const response = await axios.get('http://127.0.0.1:8000/get-scraped-users', {
      params: {
        creator_username: "Bea", // activeCreator.value['Model Assigned'], 
        table_id: "tblP5lovqxPPtaVOc", // activeCreator.value.table_id, 
        base_id: "appuO8vqTQ9N0Gyvb" //activeCreator.value.base_id
      },
      headers: {
        'access_token': loggedInUser.value.access_token,
        'refresh_token': loggedInUser.value.refresh_token
      }
    });
    console.log('Got User Data :', response.data);
    return response.data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  } finally {
    loadingData.value = false;
  }
};


</script>

<template>
  <div class="min-h-screen  flex">
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


        <div v-if="loadingData" class="place-items-center place-content-center my-15">
          <Loading />
          <div class="container mx-auto p-4 text-center">
            <p>Loading Data ... </p>
          </div>
        </div>
        <div v-else class="">
          <!-- Dash Content -->
          <DashboardContent :activeCreator="activeCreator" :users="users" :can-work="creators.length != 0" />

        </div>


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
          <DashboardSidebar :creators="creators" :activeCreator="activeCreator" @menu-item-clicked="handleMenuItemClick"
            @close-sidebar="isMobileSidebarOpen = false" />
        </template>
      </UDrawer>

    </div>
  </div>
</template>
