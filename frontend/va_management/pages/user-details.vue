<script lang="ts" setup>
import Loading from '../components/Loading.vue';
import { useUserDetailsFunctions } from '~/composables/useUserDetailsFunctions';

const
    {
        user,
        error,
        loadingData,
        saveInteraction,
        goBack
    } = useUserDetailsFunctions();
</script>

<template>
    <div class="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100  flex">

        <div class="flex-1 flex flex-col  overflow-hidden">
            <header class="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between ">
                    <h3 class="ml-3 text-xl font-bold text-center ">DashBoard ~ Details</h3>
                    <!-- LogOut -->
                    <div class="text-end">
                        <!-- <ULink to="/dashboard" class=""> -->
                            <UButton variant="ghost" icon="i-heroicons-arrow-uturn-left" @click="goBack"
                                class=" cursor-pointer">
                                Back
                            </UButton>
                        <!-- </ULink> -->
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
                                        class="px-12 bg-warning-400 disabled:bg-warning-200 hover:bg-warning-300"
                                        icon="i-heroicons-eye" />
                                </a>
                            </div>

                            <UAlert title="Once you're done, just click on the 'Done' button and leave this page"
                                color="warning" variant="outline" class="mt-8 mb-4 " :close="{
                                    color: 'white',
                                }" close-icon="i-heroicons-x-mark" icon="i-heroicons-exclamation-triangle" :ui="{
                                    icon: 'size-5'
                                }" />

                            <div class="mt-3 flex justify-center gap-x-8">
                                <UButton :loading="loadingData" :disabled="user.scraped_user.status == 'active'" label=" ~ Done ~ " @click="saveInteraction()"
                                    class="px-12 bg-primary-400 disabled:bg-primary-200 hover:bg-primary-300"
                                    icon="i-heroicons-shield-check" />
                            </div>
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
