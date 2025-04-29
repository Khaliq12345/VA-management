<template>
    <AuthenticateForm
        :mode="'sign-in'"
        :email="email"
        :password="password"
        :canSubmitForm="canSubmitForm"
        :isLoading="isLoading"
        :errorMsg="errorMsg"
        :onSubmit="handleSubmit"
    />
</template>


<script setup lang="ts">

    /* Déclaration des variables */
    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const isLoading: Ref<boolean> = ref(false)
    const errorMsg: Ref<string | null> = ref(null)

    /* Vérification de soumission du formulaire */
    const canSubmitForm = computed(() => email.value && password.value)

    const router = useRouter()

    /* Fonction de traitement pour authentifier un user */
    const handleSubmit = async () => {
        if (!email.value || !password.value) {
            errorMsg.value = "Veuillez remplir tous les champs"
            return
        }
        try {
            isLoading.value = true
            errorMsg.value = null
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
