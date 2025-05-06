export default defineEventHandler(async (event) => {

  const query = getQuery(event);
  const headers = getRequestHeaders(event);

  const params = {
    creator_username: query.creator_username,
    table_id: query.table_id,
    base_id: query.base_id,
    limit: query.limit,
    offset: query.offset
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