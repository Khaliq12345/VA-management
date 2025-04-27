<script lang="ts" setup>
import Loading from '../components/Loading.vue';
import axios from 'axios';

const route = useRoute()
const userId = ref()
const user = ref()
const error = ref("")
const loadingData = ref(false);
// 
const access_token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImdYMko4SzNjQ2JOd3pTSjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3F3bW9rbXZvaWN6YnhlcXZxY2NtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3OTBjZmU1NC1hODY3LTRiZmMtOTg2Yy1iM2FmNjRjODc1YzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ1NzcwNjE2LCJpYXQiOjE3NDU3NjcwMTYsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0NTc2NzAxNn1dLCJzZXNzaW9uX2lkIjoiYWY4MTE2MTEtNTZmOS00YTllLTg2NGMtZjBiMTNlODQ4NmY3IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.DSFBpkSijLAYorphzxn82PAlA9pJvGE8dmwo-eRunlM';
const refresh_token = 'n2ofvgsfdajk';
onMounted(async () => {
    user.value = JSON.parse(route.query.user as string);
    console.log("user : ", user);
    await beforeRouteEnter(route, {});
    loadingData.value = true
    setTimeout(() => {
        loadingData.value = false
    }, 5000)
})

const beforeRouteEnter = async (to: any, from: any) => {
    console.log('beforeRouteEnter -- status :', user.value.scraped_user.status);
    // 
    if (user.value.scraped_user.status == "active") {
        return null;
    }
    userId.value = to.query.id as string;
    console.log("User ID : ", userId)
    if (!userId) {
        error.value = "ID utilisateur manquant";
        return null;
    }
    loadingData.value = true;
    try {
        const response = await axios.get('http://127.0.0.1:8000/update-scraped-user-status', {
            params: {
                username: userId.value,
                status: "active",
            },
            headers: {
                access_token: access_token, refresh_token: refresh_token,
            }
        });
        console.log('Update Status :', response.data);
        return response.data.records;
    } catch (err) {
        console.error('Error:', err);
        return null;
    } finally {
        loadingData.value = false;
    }
};

const beforeRouteLeave = async (to: any, from: any) => {
    console.log('beforeRouteLeave');
    loadingData.value = true;
    try {
        const response = await axios.get('http://127.0.0.1:8000/update-scraped-user-status', {
            params: {
                username: userId.value,
                status: "not active",
            },
            headers: { access_token: access_token, refresh_token: refresh_token, }
        });
        console.log('Update Status :', response.data);
        return response.data.records;
    } catch (err) {
        console.error('Error:', err);
        return null;
    } finally {
        loadingData.value = false;
    }
};

const beforeRouteLeaveGuard = (to: any, from: any) => {
    return beforeRouteLeave(to, from);
};
// Enregistrement du garde de navigation beforeRouteLeave
onBeforeRouteLeave(beforeRouteLeaveGuard);


</script>

<template>
    <div class="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100  flex">

        <div class="flex-1 flex flex-col  overflow-hidden">
            <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between ">
                    <h3 class="ml-3 text-xl font-bold text-center ">DashBoard ~ Details</h3>
                    <!-- LogOut -->
                    <div class="text-end">
                        <ULink to="/dashboard" class="">
                            <UButton variant="ghost" icon="i-heroicons-arrow-uturn-left" @click=""
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
                            <span class="mr-4 text-2xl mb-3">Working with, <span class="font-bold"> {{
                                user.scraped_user.username }}
                                </span> !</span>
                            <p class="text-sm ">
                                Last Action since : <span class="font-bold">{{ user.scraped_user.last_action ?? " - - -"
                                    }} </span>
                            </p>
                            <p class="text-sm mt-2 mb-5">
                                Ig Username : <span class="font-bold">
                                    <UBadge class="bg-primary-100 rounded-full align-top">
                                        {{ user.ig_username }}</UBadge>
                                </span>
                            </p>

                            <!-- Actions -->
                            <USeparator label="Actions" class="my-5" />
                            <div v-if="user.scraped_user.status == 'active'" class="">
                                <UAlert title="No Possible Actions with this user, it's ongoing somewhere" color="error"
                                    variant="subtle" class="mt-2 mb-4 " :close="{
                                        color: 'white',
                                    }" close-icon="i-heroicons-x-mark" icon="i-heroicons-exclamation-triangle" :ui="{
                                        icon: 'size-5'
                                    }" />
                            </div>
                            <div class="mt-3 flex justify-center gap-x-8">
                                <a :href="user.scraped_user.ig_url" target="_blank">
                                    <UButton :disabled="user.scraped_user.status == 'active'" label="Visit to Interact"
                                        target="_blank"
                                        class="px-12 bg-primary-400 disabled:bg-primary-200 hover:bg-primary-300"
                                        icon="i-heroicons-eye" />
                                </a>
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
