import axios, { AxiosHeaders } from "axios";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const headers = getRequestHeaders(event);

    const params = {
        va_email: query.va_email,
    }

    // console.log(params)

    const config = useRuntimeConfig();
    const urlAPI = config.public.urlAPI;

    try {
        const response = await axios.get(urlAPI + event.path, {
          params: params,
          headers: headers as AxiosHeaders
        });
        return {
          'status' : response.status,
          'records' : response.data.records || []
        };
      } catch (err: any) {
        console.error('Error:', err);
        return  {
          'status' : err?.response?.status,
          'records' : null
        };;
    }

})