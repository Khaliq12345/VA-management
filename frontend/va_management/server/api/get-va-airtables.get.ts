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
      const rawResponse = await $fetch.raw(event.path, {
        baseURL: urlAPI,
        method: 'GET',
        params: params,
        headers: headers as HeadersInit,
      }) as any;
      
      // console.log(rawResponse); 
      
      return {
        status: rawResponse.status,
        records: rawResponse._data.records || [],
      };
      } catch (err: any) {
        console.error('Error:', err);
        return  {
          'status' : err?.response?.status,
          'records' : null
        };;
    }

})