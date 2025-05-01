import axios from 'axios';

// Update the Scraped User's Status when entering or leaving the details-page
export const updateScrapedUser = async (data: any, headers: any) => {
  const config = useRuntimeConfig();
  const urlAPI = config.public.urlAPI;
  try {
    const response = await axios.get(urlAPI + '/update-scraped-user-status', {
      params: data,
      headers: headers
    });
    return response.data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
};


