import axios from 'axios';

// Get Scraped Users after the connected VA has selected a creator
export const getScrapedUsers = async (data: any, headers: any) => {
  const config = useRuntimeConfig();
  const urlAPI = config.public.urlAPI;
  try {
    const response = await axios.get(urlAPI + '/get-scraped-users', {
      params: data,
      headers: headers
    });
    console.log('Got User Data :', response.data);
    return response.data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
};


