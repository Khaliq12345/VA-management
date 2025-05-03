import axios, { AxiosHeaders } from "axios";

export default defineEventHandler(async (event) => {

  const query = getQuery(event);
  const headers = getRequestHeaders(event) as AxiosHeaders;

  const params = {
    user_id: query.user_id,
    creator_ig_username: query.creator_ig_username,
    creator_username: query.creator_username,
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