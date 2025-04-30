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


<script setup lang="ts">
    import { signInUser } from '~/utils/sign-in'

    /* Déclaration des variables */
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMsg = ref('')

    /* Vérification de soumission du formulaire */
    const canSubmitForm = computed(() => !!email.value && !!password.value)

    const router = useRouter()

    /* Fonction de traitement pour authentifier un user */
    const handleSubmit = async () => {
        if (!email.value || !password.value) {
            errorMsg.value = "Veuillez remplir tous les champs"
            return
        }
        try {
            isLoading.value = true
            errorMsg.value = ''
            const response = await signInUser(email.value, password.value)
            console.log('Login success:', response.data)
            /* Stockage dans le local storage du navigateur */
            const sessionData = {
                access_token: response.data.session.access_token,
                token_type: response.data.session.token_type,
                refresh_token: response.data.session.refresh_token,
                email: response.data.session.email,
            };
            localStorage.setItem('session', JSON.stringify(sessionData));
            router.push('/')
        }
        catch(error: any) {
            /* Gestion des erreurs */
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
