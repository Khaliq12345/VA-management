<script setup lang="ts">
const route = useRoute()

const {
  userInfos,
  updateUserInfos,
} = useUserInfos()

const { loggedInUser } = useAuth()

const loadingData = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function statusColor(status: string) {
  return status == "active" ? 'bg-error-800' : 'bg-success-800';
}

// function goToUserDetails() {
//   updateUserInfos(props.user);
//   navigateTo({
//     path: '/user-details',
//     query: { from: route.fullPath, id: props.user.scraped_user.user_id },
//   });
// }

// Interaction
const saveInteraction = async () => {
        loadingData.value = true;
        try {
            var response = await $fetch("/api/save-interaction", {
                params: {
                    user_id: props.user.scraped_user.user_id,
                    creator_ig_username: props.user.ig_username,
                    creator_username: props.user.creator_name,
                },
                headers: {
                    'access_token': loggedInUser.value.access_token,
                    'refresh_token': loggedInUser.value.refresh_token
                } 
            });
            console.log('nteraction Saved :', response);
            // 
        } catch (err) {
            console.error('Errors:', err);
        } finally {
            loadingData.value = false;
        }

    };

</script>


<template>
  <div class="my-4 text-start">
    <div :key="user.scraped_user.id" class="flex bg-gray-100 rounded shadow">
      <div :class="['w-1 rounded-l', statusColor(user.scraped_user.status)]"></div>
      <div class="pl-4 flex-1">
        <div class="flex justify-between">
          <h3 class="text-lg font-semibold">{{ user.scraped_user.username }} </h3>
          <a :href="user.scraped_user.profile_link" target="_blank">
            <UButton :disabled="user.scraped_user.status == 'active'" label="Visit to Interact" target="_blank"
              class="px-3 bg-warning-300 disabled:bg-warning-100 hover:bg-warning-200" icon="i-heroicons-eye" />
          </a>
        </div>
        <p class="text-sm text-gray-500">Created At : {{ user.scraped_user.created_at }}</p>
        <p class="text-sm text-gray-800">Status : {{ user.scraped_user.status }}</p>
        <div class="flex justify-between ">
          <p class="text-sm text-gray-500">Last Action : {{ user.scraped_user.last_action ?? " - - - " }}</p>
          <p class="text-sm text-gray-500">Related Account : <span class="font-bold">
              <UBadge class="bg-primary-100 rounded-full align-top">
                {{ user.ig_username }}</UBadge>
            </span> </p>
        </div>

        <div class="flex justify-end">
          <!-- <NuxtLink :to="{ path: '/user-details', query: { id: user.scraped_user.username, user: JSON.stringify(user)  }}" class="btn"> -->
          <!-- <UButton variant="link" @click="goToUserDetails()" class="mt-2 cursor-pointer" >Show Details</UButton> -->
          <!-- </NuxtLink> -->
        </div>
        <!--  -->
        <div class="my-4  text-center">
          <UButton :loading="loadingData" :disabled="user.scraped_user.status == 'active'" @click="saveInteraction"
            class="px-12 w-1/2 justify-center bg-primary-300 disabled:bg-primary-100 hover:bg-primary-200"
            icon="i-heroicons-shield-check"> ~ Done ~ </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
