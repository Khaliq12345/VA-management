import { useSimpleVariables } from '~/composables/useSimpleVariables'
import { useSupabaseSub } from '~/composables/useSupabaseSub'

export function useDashBoardFunctions() {
    // Simple Variables
    const {
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
    } = useSimpleVariables();
    // SupaBase Subscription
    const {subscribeSupabaseChannel} = useSupabaseSub();
    // When VA click on any Creator name from the sidebar
    const handleMenuItemClick = async (item: any) => {
        activeCreator.value = item;
        router.push({
            path: route.path,
            query: { creator: activeCreator.value['Model Assigned'], page: "1" }
        })
        airtableOffset.value = null
        await loadUsers();
    };
    // On Mounted -- when the page load up
    onMounted(async () => {
        loadingData.value = true;
        try {
            let headers = {
                'access_token': localStorage.getItem('access_token'),
                'refresh_token': localStorage.getItem('refresh_token')
            }
            let response = await $fetch("/api/get-va-airtables", {
                params: {
                    va_email: localStorage.getItem('email')
                },
                headers: headers as any
            }) as any;
            console.log('response status : ', response['status']);
            if (response['status'] == 401) {
                navigateTo('/auth/sign-in')
                return;
            }
            creators.value = response['records']
        } catch (err) {
            console.error('Errors:', err);
        } finally {
            loadingData.value = false;
        }
        // Set Connected User Infos to show on Dashboard
        loggedInUser.value = {
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            loginTime: localStorage.getItem('loginTime'),
            shiftTimeFrom: localStorage.getItem('shiftTimeFrom'),
            shiftTimeTo: localStorage.getItem('shiftTimeTo'),
        }
    });
    // Navigation Between Pages
    // Previous Page
    function goToPrevPage() {
        if (currentPage.value > 1) {
            router.push({
                path: route.path,
                query: { creator: route.query.creator, page: currentPage.value - 1 }
            })
            // loadUsers()
        }
    }
    // Next Page
    function goToNextPage() {
        router.push({
            path: route.path,
            query: { creator: route.query.creator, page: currentPage.value + 1 }
        })
        //   loadUsers()
    }
    // Load Users whether on a creator name picked or after changing page
    async function loadUsers() {
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
                'access_token': localStorage.getItem('access_token'),
                'refresh_token': localStorage.getItem('refresh_token')
            }
            const data = await $fetch('/api/get-scraped-users', {
                headers: headers as any,
                params: params,
            }) as any
            users.value = data.results
            airtableOffset.value = data.airtable_offset
            // We are on the last page when no more users are received 
            hasNextPage.value = users.value.length !== 0
            // supabase Subscription
            if (users.value.length > 0) {
                subscribeSupabaseChannel()
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            loadingData.value = false;
        }
        isMobileSidebarOpen.value = false;
    }
    // Logout Function
    function handleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/auth/sign-in')
    }
    // Reload Users as soon as we change page
    watch(() => route.query.page, loadUsers)
    // 
    return {
        loggedInUser,
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
        handleLogout
    };
}