import axios from 'axios'

/* Fonction pour appeller l'API d'authentification d'un user */
export const signInUser = async (email: string, password: string) => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL as string
  console.log(baseUrl)
  return axios.post(`${baseUrl}/login`, null, {
    params: {
      email: email,
      password: password,
    },
    headers: {
      'Accept': 'application/json'
    },
  })
}