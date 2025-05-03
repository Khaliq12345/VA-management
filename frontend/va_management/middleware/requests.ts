// middleware/requests.ts
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter() // pour la redirection
  const auth = useAuth() // récupère les tokens (DOIT être appelé DANS la fonction plugin)

  const $axios = nuxtApp.$axios as AxiosInstance

  $axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Mise à jour des tokens si présents dans les headers
      const newAccessToken = response.headers['access_token'] as string | undefined
      const newRefreshToken = response.headers['refresh_token'] as string | undefined

      if (newAccessToken && newRefreshToken) {
        auth.loggedInUser.value.access_token = newAccessToken
        auth.loggedInUser.value.refresh_token = newRefreshToken
      }

      return response
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Redirection propre sans loop
        if (router.currentRoute.value.path !== '/auth/sign-in') {
          await router.push('/auth/sign-in')
        }
      }

      return Promise.reject(error)
    }
  )
})
