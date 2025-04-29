<template>
    <div class="flex shadow-md content">
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
                        @click="handleSubmit"
                        class="tracking-widest font-light cursor-pointer"
                        v-bind:disabled="isLoading || !canSubmitForm"
                    >
                        Login
                    </UButton>
                </div>
            </form>
        </div>
        <div class="bg-gray-800 w-32 flex items-center justify-center font-bold text-white tracking-widest right-block">LOGIN</div>
    </div>
</template>


<script setup>
    import axios from 'axios'

    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMsg = ref(null)
    const canSubmitForm = computed(() => email.value && password.value)

    const router = useRouter()

    const baseUrl = useRuntimeConfig().public.API_BASE_URL

    const handleSubmit = async () => {
        if (!email.value || !password.value) {
            errorMsg.value = "Veuillez remplir tous les champs"
            return
        }
        try {
            isLoading.value = true
            errorMsg.value = null
            const response = await axios.post(`${baseUrl}/login`, null, {
                params: {
                    email: email.value,
                    password: password.value
                },
                headers: {
                    'Accept': 'application/json'
                }
            })
            console.log('Login success:', response.data)
            localStorage.setItem('access-token', response.data.session.access_token);
            router.push('/')
        }
        catch(error) {
            if (error.response) {
                const msg = error.response.data?.message || error.response.data?.error || error.response.data?.detail || ''
                console.error(`Une erreur s'est produite :${error.response.data}`)
                if (msg.includes('Invalid login credentials')) {
                    errorMsg.value = "Les identifiants fournis ne correspondent pas à nos enregistrements."
                }
                else if (msg.includes('Email not found')) {
                    errorMsg.value = "Cet email n'est associé à aucun compte"
                }
                else if (msg.includes('Your email is not verified')) {
                    errorMsg.value = "Veuillez vérifier votre adresse e-mail"
                }
                else if (msg.includes('Email not confirmed')) {
                    errorMsg.value = "Veuillez vérifier votre adresse e-mail"
                }
                else {
                    errorMsg.value = "Une erreur s'est produite lors de la connexion"
                }
                throw new Error(msg || 'Erreur inconnue')
            }
            else {
                console.error(`Une erreur s'est produite :${error.message}`)
            }
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

    .error {
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