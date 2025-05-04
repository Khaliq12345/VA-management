<template>
    <AuthenticateForm :mode="'sign-up'" :onSubmit=handleSubmit />
</template>

<script setup lang="ts">
/* Fonction de traitement pour enregistrer un user */
const handleSubmit = async (email: string, password: string, signUpApiKey: string) => {
    const router = useRouter()
    try {
        // console.log(signUpApiKey)
        const response = await $fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'api-key': signUpApiKey,
            },
            query: {
                email: email,
                password: password,
            },
        })
        // console.log('Register success:', response)
        router.push("/auth/sign-in")
    } catch (err: any) {
        console.error('Errors:', err.data);
    }
}

</script>
