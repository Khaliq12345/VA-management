
export function useUserDetailsFunctions() {
    const route = useRoute()
    const userId = ref()
    const user = ref()
    const error = ref("")
    const loadingData = ref(false);
    const {
        userInfos,
        updateUserInfos,
      } = useUserInfos()
    const { loggedInUser } = useAuth()
    // 
    onMounted(async () => {
        // user.value = JSON.parse(route.query.user as string);
        user.value = userInfos.value
        await beforeRouteEnter(route, {});
    })
    
    const beforeRouteEnter = async (to: any, from: any) => {
        if (user.value.scraped_user.status == "active") {
            return null;
        }
        userId.value = to.query.id as string;
        console.log("User ID : ", userId)
        if (!userId) {
            error.value = "Missing Username";
            return null;
        }
        loadingData.value = true;
        try {
            let data = {
                username: userId.value,
                    status: "active",
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            var response = await updateScrapedUser(data, headers);
            console.log('Update Status :', response);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
    };
    
    const beforeRouteLeave = async (to: any, from: any) => {
        console.log('beforeRouteLeave');
        loadingData.value = true;
        try {
            let data = {
                username: userId.value,
                    status: "not active",
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            var response = await updateScrapedUser(data, headers);
            console.log('Update Status :', response);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
    };

    const saveInteraction = async () => {
        loadingData.value = true;
        try {
            let data = {
                username: user.value.scraped_user.user_id,
                creator_ig_username: user.value.ig_username,
                creator_username: user.value.creator_name,
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            var response = await saveUserInteraction(data, headers);
            console.log('Save Interaction :', response);
            navigateTo({
                path: '/dashboard',
              });
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
    };
    
    const beforeRouteLeaveGuard = (to: any, from: any) => {
        return beforeRouteLeave(to, from);
    };
    onBeforeRouteLeave(beforeRouteLeaveGuard);
    // 
    return {
        user,
        error,
        loadingData,
        saveInteraction
    };
}