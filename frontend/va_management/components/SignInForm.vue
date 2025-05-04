<template>
    <AuthenticateForm :mode="'sign-in'" :onSubmit=handleSubmit />
</template>

<script setup lang="ts">
// const { loggedInUser, updateLoggedInUserInfos } = useAuth()
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
    // // // console.log('Login success 455 : ', response)
     
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
    // // // console.log('Got Va_infos : ', response2)
    // // // console.log('Got Va_iName : ', response2["Name"])

    // const sessionData = {
    //         access_token: response.data.session.access_token,
    //         token_type: response.data.session.token_type,
    //         refresh_token: response.data.session.refresh_token,
    //         email: response.data.session.email,
    //     };
    //     localStorage.setItem('session', JSON.stringify(sessionData));

    localStorage.setItem('access_token', response.session.access_token);
    localStorage.setItem('refresh_token', response.session.refresh_token);
    localStorage.setItem('email', response.session.email);
    localStorage.setItem('name', response2["Name"]);
    localStorage.setItem('loginTime', new Date().toDateString());
    localStorage.setItem('shiftTimeFrom', response2["Shift Start"]);
    localStorage.setItem('shiftTimeTo', response2["Shift End"]);



    // let tmp = loggedInUser.value
    // tmp.access_token = response.session.access_token
    // tmp.refresh_token = response.session.refresh_token
    // tmp.name = response2["Name"]
    // tmp.email = response2["Email"]
    // tmp.loginTime = new Date().toDateString()
    // tmp.shiftTimeFrom = response2["Shift Start"]
    // tmp.shiftTimeTo = response2["Shift End"]
    // updateLoggedInUserInfos(tmp)

    router.push('/dashboard')
}

</script>
