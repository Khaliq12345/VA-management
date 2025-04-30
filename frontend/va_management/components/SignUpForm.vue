<template>
    <AuthenticateForm
        :mode="'sign-up'"
        :onSubmit=handleSubmit
    />
</template>


<script setup lang="ts">
    import { signUpUser } from '~/utils/sign-up'


    /* Fonction de traitement pour enregistrer un user */
    const handleSubmit = async (email: string, password: string,signUpApiKey: string) => {
        const router = useRouter()
        const response = await signUpUser(email, password, signUpApiKey)
        console.log('Register success:', response)
        router.push("/auth/sign-in")
    }

</script>


<style>


</style>