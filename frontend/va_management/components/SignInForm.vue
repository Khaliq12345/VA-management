<template>
    <AuthenticateForm :mode="'sign-in'" :onSubmit=handleSubmit />
</template>

<script setup lang="ts">
const { loggedInUser, updateLoggedInUserInfos } = useAuth()
/* Fonction de traitement pour authentifier un user */
const handleSubmit = async (email: string, password: string) => {
    const router = useRouter()
    const response = await $fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        query: {
            email: email,
            password: password,
        },
    })
    console.log('Login success : ', response)
    let tmp = loggedInUser.value
    tmp.access_token = response.session.access_token
    tmp.refresh_token = response.session.refresh_token
    // tmp.email = response.session.email
    updateLoggedInUserInfos(tmp)

    router.push('/dashboard')
}

</script>
