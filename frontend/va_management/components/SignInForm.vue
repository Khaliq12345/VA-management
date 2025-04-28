<template>
    <div class="flex shadow-md content">
        <div class="bg-white p-8 w-96 flex items-center justify-center left-block">
            <form @submit.prevent="handleSubmit" class="w-full">
                <div v-if="error" class="error"><strong>{{ error }}</strong></div>
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
                <div class="flex justify-between items-center mb-4 text-sm">
                    <NuxtLink to="#" class="text-gray-500 hover:underline text-sm">Forgot Password ?</NuxtLink>
                    <UCheckbox v-model="rememberMe" label="Remember me" class="cursor-pointer" />
                </div>
                <div class="mt-[-10px]">
                    <NuxtLink to="/auth/sign-up" class="text-gray-500 hover:underline text-sm">Sign Up</NuxtLink>
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
                    >
                        Login
                    </UButton>
                </div>
            </form>
        </div>
        <div class="bg-gray-800 w-32 flex items-center justify-center font-bold text-white tracking-widest right-block">LOGIN</div>
    </div>
</template>


<script setup>

    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const isLoading = ref(false)
    const error = ref(null)

    const handleSubmit = async () => {
        if (!email.value || !password.value) {
            error.value = "Veuillez remplir tous les champs"
            return
        }

        try {
            isLoading.value = true
            error.value = null
            const { data, pending, err } = await useFetch("api/login", {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value,
                },
                immediate: false,
            })
            if (err.value) {
                console.error('Login failed:', error.value.data);
                return
            }
            console.log('Login success:', data.value);

            // localStorage.setItem('token', data.value.token);
        }
        catch(e) {
            console.log(`Une erreur s'est produite :${e}`)
        }
        finally {
            isLoading.value = false
            error.value = null
        }
    }

</script>


<style>

    .content {
        border-radius: 4px;
        overflow: hidden;
        height: 40vh;
    }

    /* :where(.i-lucide\:check) {
        background-color: white !important;
    } */

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

    .error {
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