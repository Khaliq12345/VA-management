import axios from 'axios'

/* Fonction pour appeller l'API d'enregistrement d'un user */
export const signUpUser = async (email: string, password: string, signUpApiKey: string) => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL as string

  return axios.post(`${baseUrl}/signup`, null, {
    params: {
      email: email,
      password: password,
    },
    headers: {
      'Accept': 'application/json',
      'api-key': signUpApiKey,
    },
  })
}