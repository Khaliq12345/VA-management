export function useDashBoardFunctions() {
    const { fetchVaInfo } = useFetchVaInfos();
    const { loggedInUser } = useAuth()
    // To Manage Page Loading
    const loadingData = ref(false);
    // To Show or Hide the Sidebar
    const isMobileSidebarOpen = ref(false);
    // List of Creators got on dashboard loaded - Users or the selected creator (active creator)
    const users = ref([]);
    const creators = ref([]);
    const activeCreator = ref();
    // When the VA pick a creator name to work with
    const handleMenuItemClick = async (item: any) => {
        activeCreator.value = item;
        loadingData.value = true;
        try {
            let data = {
                creator_username: activeCreator.value['Model Assigned'],
                table_id: activeCreator.value.table_id,
                base_id: activeCreator.value.base_id
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            users.value = await getScrapedUsers(data, headers);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
        isMobileSidebarOpen.value = false;
    };
    // 
    onMounted(async () => {
        loadingData.value = true;
        try {
            creators.value = await fetchVaInfo();
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
    });
    // 
    return {
        loadingData,
        isMobileSidebarOpen,
        users,
        creators,
        activeCreator,
        handleMenuItemClick,
    };
}