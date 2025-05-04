<template>
    <AuthenticateForm :mode="'sign-in'" :onSubmit=handleSubmit />
</template>

<script setup lang="ts">
/* Fonction de traitement pour authentifier un user */
const handleSubmit = async (email: string, password: string) => {
    const router = useRouter()
    // 
    // Login
    // 
    const response = await $fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        params: {
            email: email,
            password: password,
        },
    })
     
    // 
    // Get VA_Infos
    // 
    const response2 = await $fetch("/api/get-va-info", {
        params: {
            email: response.session.email
        },
        headers: {
            'access_token': response.session.access_token,
            'refresh_token': response.session.refresh_token
        }
    });

    localStorage.setItem('access_token', response.session.access_token);
    localStorage.setItem('refresh_token', response.session.refresh_token);
    localStorage.setItem('email', response.session.email);
    localStorage.setItem('name', response2["Name"]);
    localStorage.setItem('loginTime', new Date().toDateString());
    localStorage.setItem('shiftTimeFrom', response2["Shift Start"]);
    localStorage.setItem('shiftTimeTo', response2["Shift End"]);

    router.push('/dashboard')
}

</script>
