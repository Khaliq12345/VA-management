<template>
    <div class="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100  flex">

        <div class="flex-1 flex flex-col  overflow-hidden">
            <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between ">
                    <h3 class="ml-3 text-xl font-bold text-center ">DashBoard ~ Details</h3>
                    <!-- LogOut -->
                    <div class="text-end">
                <ULink to="/dashboard"  class="" >
              <UButton  variant="ghost" icon="i-heroicons-arrow-uturn-left" @click=""
                class=" cursor-pointer">
                Back
              </UButton>
            </ULink>
            <UButton color="secondary" variant="ghost" icon="i-heroicons-arrow-left-end-on-rectangle"
                        class="text-error-500  hover:bg-gray-100 cursor-pointer">
                        Log Out
                    </UButton>
              </div>
                    

                </div>
            </header>
            <UContainer class="mt-8">
                <main class="flex-1 text-center justify-center overflow-y-auto p-4">
                    <div v-if="loadingData" class="place-items-center place-content-center my-15">
                        <Loading />
                        <div class="container mx-auto p-4 text-center">
                            <p>Loading Data ... </p>
                        </div>
                    </div>
                    <div v-else class="flex justify-center ">
                        <!-- User Infos -->
                        <div v-if="user" class="flex flex-col  ml-4">
                            <span class="mr-4 text-2xl mb-3">Working with, <span class="font-bold"> {{ user.name }}
                                </span> !</span>
                            <p class="text-sm ">
                                Last Action since : <span class="font-bold">{{ user.latsAction }} </span>
                            </p>
                            <p class="text-sm mt-2 mb-5">
                                Strategy : <span class="font-bold">
                                    <UBadge class="bg-error-100 rounded-full align-top"
                                        :class="{ 'bg-primary-100': user.strategy == 'F/U', 'bg-secondary-100': user.strategy == 'M-Comment' }">
                                        {{ user.strategy }}</UBadge>
                                </span>
                            </p>

                            <!-- Actions -->
                            <USeparator label="Actions" class="my-5" />
                            <div v-if="user.status != 'active'" class="">
                                <UAlert title="No Possible Actions with this user, it's ongoing somewhere" color="error"
                                    variant="subtle" class="mt-2 mb-4 " :close="{
                                        color: 'white',
                                    }" close-icon="i-heroicons-x-mark" icon="i-heroicons-exclamation-triangle" :ui="{
                                        icon: 'size-5'
                                    }" />
                            </div>
                            <div class="mt-3 flex justify-center gap-x-8">
                                <UButton :disabled="user.status != 'active'" label="Visit"
                                    class="px-8 bg-primary-400 disabled:bg-primary-200 hover:bg-primary-300"
                                    icon="i-heroicons-eye" />

                                <UButton :disabled="user.status != 'active'" label="Follow"
                                    class="px-8 bg-orange-400 disabled:bg-orange-200 hover:bg-orange-300"
                                    icon="i-heroicons-arrow-up-tray" />

                            </div>

                            <UAlert title="Once you're done, just leave this page" color="warning" variant="outline"
                                class="mt-8 mb-4 " :close="{
                                    color: 'white',
                                }" close-icon="i-heroicons-x-mark" icon="i-heroicons-exclamation-triangle" :ui="{
                                    icon: 'size-5'
                                }" />
                        </div>
                        <div v-else-if="error">
                            <p>Erreur: {{ error }}</p>
                        </div>
                    </div>
                </main>
            </UContainer>


        </div>
    </div>

</template>

<script lang="ts" setup>
import Loading from '../components/Loading.vue';

const route = useRoute()
const router = useRouter()
const user = ref();
const error = ref("")

const loadingData = ref(false);

// Like Before to Load
onMounted(async () => {
    loadingData.value = true
    setTimeout(() => {
        loadingData.value = false
    }, 5000)
    const userId = route.query.id as string
    if (!userId) {
        error.value = "ID utilisateur manquant"
        return
    }
    try {
        console.log("Got user id : ", userId);
        // # Then Update status to "ongoing"
        // await $fetch(`/api/users/${userId}`, {
        //     method: 'PATCH',
        //     body: { status: 'ongoing' }
        // })
        // # Get User Details
        // user.value = await $fetch(`/api/users/${userId}`)
        user.value = { id: 1, name: 'BenFort Durand', strategy: 'F/U', email: 'alice@example.com', status: 'active', latsAction: '2023-05-10T12:00:00' }
    } catch (err) {
        error.value = "Erreur lors du chargement des détails"
        console.error(err)
    }
})

// Like BeforeRouteLeave
router.beforeEach((to, from, next) => {
    if (from.path === '/user-details') {
        const userId = route.query.id as string
        console.log("leaving the route ... user id = ", userId);
        // # Then Update Status to active
        // if (userId) {
        //     $fetch(`/api/users/${userId}`, {
        //         method: 'PATCH',
        //         body: { status: 'active' }
        //     }).catch(err => {
        //         console.error("Erreur lors de la réinitialisation du statut:", err)
        //     })
        // }
    }
    next()
})

// router.af
</script>