export function useSimpleVariables() {

    // To Manage Page Loading
    const loadingData = ref(false);

    // To Show or Hide the Sidebar
    const isMobileSidebarOpen = ref(false);

    // Connected User Infos
    const loggedInUser = ref({}) as any;

    // List of Creators got on dashboard loaded - Users or the selected creator (active creator)
    const users = ref([]);
    const creators = ref([]);
    const activeCreator = ref();

    // Routing
    const route = useRoute()
    const router = useRouter()

    // Pagination Configs
    const limit = 20
    const airtableOffset: Ref<string | null> = ref(null)
    const currentPage = computed(() => parseInt(route.query.page?.toString() ?? "1") || 1)
    const offset = computed(() => (currentPage.value - 1) * limit)
    const hasNextPage = ref(true)


    return {
        loadingData,
        isMobileSidebarOpen,
        loggedInUser,
        users,
        creators,
        activeCreator,
        route,
        router,
        limit,
        airtableOffset,
        currentPage,
        offset,
        hasNextPage,
    }
}