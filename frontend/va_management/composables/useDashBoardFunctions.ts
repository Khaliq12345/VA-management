import { createClient } from '@supabase/supabase-js'

export function useDashBoardFunctions() {
    // Supabase
    const config = useRuntimeConfig();
    // Create a single supabase client for interacting with your database
    const supabase = createClient(config.public.supabaseURL, config.public.supabaseKey)

    //const { fetchVaInfo } = useFetchVaInfos();
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
    const airtableOffset: Ref<string | null> = ref(null)
    const currentPage = computed(() => parseInt(route.query.page?.toString() ?? "1") || 1)
    const offset = computed(() => (currentPage.value - 1) * limit)
    const hasNextPage = ref(true)

    const subscriptionCallback = async (payload: any) => {
        // Only the scraped_users table
        if (payload.table != "scraped_users" || payload.eventType != "UPDATE") {
            return;
        }
        console.log('Change received !', payload)
        // If the payload.new is on the actual listing
        const userIndex = users.value.findIndex(
            (u: any) => u.scraped_user.id === payload.new.id
        );
        if (userIndex === -1) {
            return;
        }
        console.log('1 Matching user payload !', payload.new)
        // Update our listing element with it's new value
        users.value[userIndex]['scraped_user'] = payload.new as never;
        // Filter -- and return when the element must still in the listing
        console.log("last_action == null  : ", payload.new.last_action == null )
        console.log("more_than_30_days(payload.new.last_action)  : ", more_than_30_days(payload.new.last_action))
        // No Last Action
        if (payload.new.last_action == null) {
            return;
        }
        // Last Action, but not yet 30 days
        if (!more_than_30_days(payload.new.last_action)) {
            // remove element
            users.value.splice(userIndex, 1); 
            return;
        }
        // So Here we have last_action and already 30 days since then -- Check in interaction_table
        const { data, error } = await supabase
            .from('interaction_table')
            .select()
            .eq('user_id', payload.new.user_id)
            .eq('creator_username', activeCreator.value['Model Assigned'])
        if (error) {
            console.error("Error fetching interactions:", error);
            return;
        }
        console.log("interaction : ", data)
        // 
        if (data.length > 0) {
            // remove element
            users.value.splice(userIndex, 1); 
        }
    }

    const subscribeSupabaseChannel = () => {
        supabase
            .channel('room1')
            .on('postgres_changes', { event: '*', schema: '*' }, subscriptionCallback)
            .subscribe();

        console.log("Subscription Complete !")
    }

    const handleMenuItemClick = async (item: any) => {
        activeCreator.value = item;
        router.push({
            path: route.path,
            query: { creator: activeCreator.value['Model Assigned'], page: currentPage.value }
        })
        await loadUsers();
        //  
        if (users.value.length > 0) {
            subscribeSupabaseChannel()

        }
    };
    // 

    onMounted(async () => {
        loadingData.value = true;
        try {
            creators.value = await $fetch("/api/get-va-info", {
                params: {
                    va_email: loggedInUser.value.email
                },
                headers: {
                    'access_token': loggedInUser.value.access_token,
                    'refresh_token': loggedInUser.value.refresh_token
                }
            });
        } catch (err) {
            console.error('Errors:', err);
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
                query: { creator: route.query.creator, page: currentPage.value - 1 }
            })
            // loadUsers()
        }
    }

    function goToNextPage() {
        router.push({
            path: route.path,
            query: { creator: route.query.creator, page: currentPage.value + 1 }
        })
        //   loadUsers()
    }

    async function loadUsers() {
        console.log("Current page : ", currentPage.value)
        loadingData.value = true;
        try {
            let params = {
                creator_username: activeCreator.value['Model Assigned'],
                table_id: activeCreator.value.table_id,
                base_id: activeCreator.value.base_id,
                limit: limit,
                offset: offset.value,
                airtable_offset: airtableOffset.value
            };
            let headers = {
                'access_token': loggedInUser.value.access_token,
                'refresh_token': loggedInUser.value.refresh_token
            }
            const data = await $fetch('/api/get-scraped-users', {
                headers: headers,
                params: params,
            })
            console.log("Got Users :", data)

            users.value = data.results
            airtableOffset.value = data.airtable_offset

            // Si on reçoit moins d'utilisateurs que le limit, c'est qu'on est à la dernière page
            hasNextPage.value = users.value.length === limit
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
        isMobileSidebarOpen.value = false;
    }

    watch(() => route.query.page, loadUsers)

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