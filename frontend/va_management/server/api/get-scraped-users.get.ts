import axios, { AxiosHeaders } from "axios";

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
    const response = await axios.get(urlAPI + event.path, {
      params: params,
      headers: headers
    });
    return response.data
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
})