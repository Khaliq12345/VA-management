<template>
    <AuthenticateForm
        :mode="'sign-in'"
        :onSubmit=handleSubmit
    />
</template>


<script setup lang="ts">
    import { signInUser } from '~/utils/sign-in';


    /* Fonction de traitement pour authentifier un user */
    const handleSubmit = async (email: string, password: string) => {
        const router = useRouter()
        const response = await signInUser(email, password)
        console.log('Login success:', response)
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

</script>


<style>

</style>
