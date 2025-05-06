export default defineEventHandler(async (event) => {

  const query = getQuery(event);
  const headers = getRequestHeaders(event);

  const params = {
    user_id: query.user_id,
    status: query.status,
  }

  const config = useRuntimeConfig();
  const urlAPI = config.public.urlAPI;

  try {
    const response = await $fetch(event.path, {
      baseURL: urlAPI,
      method: 'GET',
      params: params, // 
      headers: headers as HeadersInit,
    });
    return response
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
})