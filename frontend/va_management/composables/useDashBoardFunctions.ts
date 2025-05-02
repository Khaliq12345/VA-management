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
    const route = useRoute()
    const router = useRouter()
    // Configuration
    // Nombre d'utilisateurs par page
    const limit = 20
    const currentPage = computed(() => parseInt(route.query.page?.toString()??"1") || 1)
    const offset = computed(() => (currentPage.value - 1) * limit)
    const hasNextPage = ref(true)
    const handleMenuItemClick = async (item: any) => {
        activeCreator.value = item;
        router.push({
            path: route.path,
            query: { creator:  activeCreator.value['Model Assigned'], page: currentPage.value}
          })
          loadUsers()
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
    


// Navigation entre pages
function goToPrevPage() {
  if (currentPage.value > 1) {
    router.push({
      path: route.path,
      query: {creator: route.query.creator, page: currentPage.value - 1 }
    })
    loadUsers()
  }
}

function goToNextPage() {
  router.push({
    path: route.path,
    query: {creator: route.query.creator, page: currentPage.value + 1 }
  })
  loadUsers()
}

async function loadUsers() {
        loadingData.value = true;
        try {
            let data = {
                creator_username: activeCreator.value['Model Assigned'],
                table_id: activeCreator.value.table_id,
                base_id: activeCreator.value.base_id,
                limit: limit,
                offset: offset.value
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            console.log("data :", data)
            users.value = await getScrapedUsers(data, headers);
            // Si on reçoit moins d'utilisateurs que le limit, c'est qu'on est à la dernière page
            hasNextPage.value = users.value.length === limit
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
        isMobileSidebarOpen.value = false;
}

// watch(() => route.query.page, loadUsers)

    return {
currentPage,
hasNextPage,
goToPrevPage,
        goToNextPage,
        loadingData,
        isMobileSidebarOpen,
        users,
        creators,
        activeCreator,
        handleMenuItemClick,
    };
}