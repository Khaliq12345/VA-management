<script setup lang="ts">
// Handle user Sign up
const handleSubmit = async (email: string, password: string, signUpApiKey: string) => {
    const router = useRouter()
    try {
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
        router.push("/auth/sign-in")
    } catch (err: any) {
        console.error('Errors:', err.data);
    }
}
</script>

<template>
    <AuthenticateForm :mode="'sign-up'" :onSubmit=handleSubmit />
</template>
