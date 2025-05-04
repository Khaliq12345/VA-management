import axios, { AxiosHeaders } from "axios";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const headers = getRequestHeaders(event);

    const params = {
        email: query.email,
    }

    // console.log(params)

    const config = useRuntimeConfig();
    const urlAPI = config.public.urlAPI;

    try {
        const response = await axios.get(urlAPI + event.path, {
          params: params,
          headers: headers as AxiosHeaders
        });
        return response.data;
      } catch (err) {
        console.error('Error:', err);
        return null;
    }

})