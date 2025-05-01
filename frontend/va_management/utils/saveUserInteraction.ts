import axios from 'axios';

// Save on supabase user interaction after the job is done
export const saveUserInteraction = async (data: any, headers: any) => {
  const config = useRuntimeConfig();
  const urlAPI = config.public.urlAPI;
  try {
    const response = await axios.get(urlAPI + '/save-interaction', {
      params: data,
      headers: headers
    });
    return response.data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
};


