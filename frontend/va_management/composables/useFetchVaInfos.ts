// UseFetch Function to Get VA Infos including creators
export const useFetchVaInfos = () => {
    const config = useRuntimeConfig();
    const urlAPI = config.public.urlAPI;
    const { loggedInUser } = useAuth()
  
    const fetchVaInfo = async () => {
        try {
          const response = await $fetch(urlAPI + '/get-va-info', {
            params: {
              va_email: loggedInUser.value.email
            },
            headers: {
              'access_token': loggedInUser.value.access_token,
              'refresh_token': loggedInUser.value.refresh_token
            }
          });
          const r = response as any;
          console.log("Response Got : ", r);
          return r.records || [];
        } catch (err) {
          console.error('Fetch error:', err);
          return [];
        }
      };
  
    return {
      fetchVaInfo
    };
  };