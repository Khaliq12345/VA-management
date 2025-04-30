<template>
    <div class="flex shadow-md content">
        <div
            v-if="mode === 'sign-up'"
            class="bg-gray-800 w-32 flex items-center justify-center font-bold text-white tracking-widest right-block"
        >
            REGISTER
        </div>
        <div class="bg-white p-8 w-96 flex items-center justify-center left-block">
            <form @submit.prevent class="w-full">
                <div v-if="errorMsg" class="errorMsg"><strong>{{ errorMsg }}</strong></div>
                <div class="mb-4">
                    <UInput
                        v-model="email"
                        placeholder="Email"
                        icon="i-heroicons-user"
                        class="bg-gray-200 w-full"
                    />
                </div>
                <div class="mb-4">
                    <UInput
                        v-model="password"
                        type="password"
                        placeholder="********"
                        icon="i-heroicons-lock-closed"
                        class="bg-gray-200 w-full"
                    />
                </div>
                <div v-if="mode === 'sign-up'" class="mb-4">
                    <UInput
                        v-model="signUpApiKey"
                        placeholder="Clé API"
                        icon="i-heroicons-lock-closed"
                        class="bg-gray-200 w-full"
                    />
                </div>
                <div
                    v-if="isLoading"
                    class="btn-block"
                >
                    <div class="loader"></div>
                </div>
                <div v-else class="btn-block">
                    <UButton
                        variant="ghost"
                        type="submit"
                        @click="authSubmit"
                        class="tracking-widest font-light cursor-pointer"
                        v-bind:disabled="isLoading || !canSubmitForm"
                    >
                        {{ mode === "sign-in" ? "Login" : "Register" }}
                    </UButton>
                </div>
            </form>
        </div>
        <div
            v-if="mode === 'sign-in'"
            class="bg-gray-800 w-32 flex items-center justify-center font-bold text-white tracking-widest right-block"
        >
            LOGIN
        </div>
    </div>
</template>


<script setup lang="ts">

    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const signUpApiKey: Ref<string> = ref('')
    const isLoading: Ref<boolean> = ref(false)
    const errorMsg: Ref<string | null> = ref('')

    // /* Vérification de soumission du formulaire */
    const canSubmitForm = computed(() => !!email.value && !!password.value)

    const props = defineProps<{
        mode: 'sign-in' | 'sign-up'
        onSubmit: Function
    }>()

    /* Fonction de soumission du formulaire */
    async function authSubmit() {
        if (!email.value || !password.value) {
            errorMsg.value = "Veuillez remplir tous les champs"
            return
        }
        try {
            isLoading.value = true
            console.log('First', email.value, password.value, props.mode)
            await props.onSubmit(email.value, password.value, signUpApiKey.value)
        }
        catch (error) {
            console.error(`Une erreur s'est produite :${error}`)
            errorMsg.value = "Error lors du login, verifier vos inputs."
        }
        finally {
            isLoading.value = false
        }
    }

</script>


<style>

    .content {
        border-radius: 4px;
        overflow: hidden;
        min-height: 40vh;
    }

    input {
        color: black;
    }

    .btn-block {
        display: flex;
        justify-content: center;
    }

    .loader {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: solid 3px #1E3A89;
        border-top: 5px solid transparent;
        animation: spin 1s linear infinite;
    }

    .errorMsg {
        text-align: center;
        color: red;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 520px) {

        .content {
            display: block;
        }

        .left-block {
            height: 100%;
        }

        .right-block {
            display: none;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        form button {
            margin-top: 10px !important;
        }
    }

</style>