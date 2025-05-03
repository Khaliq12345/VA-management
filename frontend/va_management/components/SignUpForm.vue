<template>
    <AuthenticateForm
        :mode="'sign-up'"
        :onSubmit=handleSubmit
    />
</template>

<script setup lang="ts">
    /* Fonction de traitement pour enregistrer un user */
    const handleSubmit = async (email: string, password: string, signUpApiKey: string) => {
        const router = useRouter()
        let params = {
      email: email,
      password: password,
    }
    let headers = {
      'Accept': 'application/json',
      'api-key': signUpApiKey,
    }
    const response = await $fetch('/api/signup', {
        headers: headers,
        params: params,
    })
        console.log('Register success:', response)
        router.push("/auth/sign-in")
    }

</script>
