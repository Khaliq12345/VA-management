import axios from "axios";
import type { AxiosHeaders } from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event); 
  const headers = getRequestHeaders(event);
  const config = useRuntimeConfig();
  const urlAPI = config.public.urlAPI;

  const params = {
    email: query.email,
    password: query.password,
  };


  try {
    const response = await axios.post(urlAPI + event.path, null, {
      params: params, // 
      headers: headers as AxiosHeaders,
    });

    return response.data; // 


  } catch (err: any) {
    console.error("Erreur lors de l'appel à l'API distante :", err?.message);
    return createError({
      statusCode: err?.response?.status || 500,
      statusMessage: err?.response?.data?.message || "Erreur serveur",
    });
  }
});
