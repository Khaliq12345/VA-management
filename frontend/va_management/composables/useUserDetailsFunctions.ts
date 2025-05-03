
export function useUserDetailsFunctions() {
    const route = useRoute()
    const router = useRouter()
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
        console.log("user Infos : ", userInfos.value)
        user.value = userInfos.value
        await beforeRouteEnter(route, {});
    })
    // 
    function goBack() {
        // Return to previous page
        const returnPath = route.query.from?.toString() || '/dashboard'
        router.push(returnPath)
    }
    //   

    const beforeRouteEnter = async (to: any, from: any) => {
        if (user.value.scraped_user.status == "active") {
            return null;
        }
        userId.value = to.query.id as string;
        console.log("User ID : ", userId)
        console.log("Scraped User : ", user.value.scraped_user)
        if (!userId) {
            error.value = "Missing Username";
            return null;
        }
        loadingData.value = true;
        try {
            var response = await $fetch("/api/update-scraped-user-status", {
                params: {
                    user_id: userId.value,
                    status: "active",
                },
                headers: {
                    'access_token': loggedInUser.value.access_token,
                    'refresh_token': loggedInUser.value.refresh_token
                }
            });
            console.log('Update Status :', response);
        } catch (err) {
            console.error('Errors:', err);
        } finally {
            loadingData.value = false;
        }
    };

    const beforeRouteLeave = async (to: any, from: any) => {
        console.log('beforeRouteLeave');
        loadingData.value = true;
        try {
            var response = await $fetch("/api/update-scraped-user-status", {
                params: {
                    user_id: userId.value,
                    status: "not active",
                },
                headers: {
                    'access_token': loggedInUser.value.access_token,
                    'refresh_token': loggedInUser.value.refresh_token
                }
            });
            console.log('Update Status :', response);
        } catch (err) {
            console.error('Errors:', err);
        } finally {
            loadingData.value = false;
        }
    };

    const saveInteraction = async () => {
        loadingData.value = true;
        try {
            var response = await $fetch("/api/save-interaction", {
                params: {
                    user_id: user.value.scraped_user.user_id,
                    creator_ig_username: user.value.ig_username,
                    creator_username: user.value.creator_name,
                },
                headers: {
                    'access_token': loggedInUser.value.access_token,
                    'refresh_token': loggedInUser.value.refresh_token
                }
            });
            console.log('Update Status :', response);
            // 
            goBack()
        } catch (err) {
            console.error('Errors:', err);
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
        saveInteraction,
        goBack
    };
}