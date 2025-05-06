<script setup lang="ts">
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardContent from '../components/dashboard/DashboardContent.vue'
import PaginationControls from '../components/dashboard/PaginationControls.vue'
import Loading from '../components/Loading.vue'
import { useDashBoardFunctions } from '~/composables/useDashBoardFunctions'

const loggedInUser = ref({}) as any;


onMounted(async () => {
  loggedInUser.value = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    loginTime: localStorage.getItem('loginTime'),
    shiftTimeFrom: localStorage.getItem('shiftTimeFrom'),
    shiftTimeTo: localStorage.getItem('shiftTimeTo'),
  }
})

const {
  currentPage,
  hasNextPage,
  goToPrevPage,
  goToNextPage,
  loadingData,
  isMobileSidebarOpen,
  users,
  creators,
  activeCreator,
  handleMenuItemClick,
  handleLogout
} = useDashBoardFunctions()

</script>

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="hidden md:block md:w-4/12 lg:w-3/12">
      <DashboardSidebar :creators="creators" :activeCreator="activeCreator" @menu-item-clicked="handleMenuItemClick" />
    </div>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden w-full ">
      <!-- Header -->
      <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between md:justify-end">
          <!-- Mobile Menu Button -->
          <UButton @click="isMobileSidebarOpen = true" :disabled="isMobileSidebarOpen"
            class="bg-gray-100 hover:bg-gray-300 md:hidden cursor-pointer">
            <UIcon name="i-heroicons-bars-3-bottom-left-20-solid" class="mr-3 text-xl" />
            <h3 class="ml-3 text-lg font-semibold text-center">Dashboard</h3>
          </UButton>

          <!-- LogOut -->
          <UButton color="secondary" @click="handleLogout" variant="ghost"
            icon="i-heroicons-arrow-left-end-on-rectangle" class="text-error-500 hover:bg-gray-100 cursor-pointer">
            Log Out
          </UButton>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 text-center overflow-y-auto p-4 sm:p-6 lg:p-8">
        <!-- User Infos -->
        <div class="flex justify-center">
          <ClientOnly>
            <div class="flex flex-col ml-4">
              <span class="mr-4 text-2xl mb-3">
                Welcome, <span class="font-bold"> {{ loggedInUser.name }} </span> !
              </span>
              <p class="text-sm">
                Logged In at : <span class="font-bold">{{ loggedInUser.loginTime }}</span>
              </p>
              <p class="text-sm my-3">
                Shift Time : <span class="font-bold">From --> </span>
                {{ loggedInUser.shiftTimeFrom }} --
                <span class="font-bold">To --></span>
                {{ loggedInUser.shiftTimeTo }}
              </p>
            </div>
            <template #fallback>
              <p class="text-sm">Loading time...</p>
            </template>
          </ClientOnly>
        </div>
        <!-- Page Content -->
        <div v-if="loadingData" class="place-items-center place-content-center my-15">
          <Loading />
          <div class="container mx-auto p-4 text-center">
            <p>Loading Data ...</p>
          </div>
        </div>
        <div v-else>
          <DashboardContent :activeCreator="activeCreator" :users="users" :can-work="creators.length != 0" />
          <!-- Pagination -->
          <PaginationControls v-if="users.length != 0" :current-page="currentPage" :has-next-page="hasNextPage"
            @prev="goToPrevPage" @next="goToNextPage" />
        </div>
      </main>
    </div>
    
    <!-- Mobile Drawer Sidebar -->
    <UDrawer direction="left" v-model:open="isMobileSidebarOpen" class="w-10/12 sm:w-6/12">
      <template #title>
      </template>
      <template #description>
      </template>
      <template #body>
        <DashboardSidebar :creators="creators" :activeCreator="activeCreator" @menu-item-clicked="handleMenuItemClick"
          @close-sidebar="isMobileSidebarOpen = false" />
      </template>
    </UDrawer>
  </div>
</template>
