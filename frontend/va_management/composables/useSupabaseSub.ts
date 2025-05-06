import { createClient } from '@supabase/supabase-js'
import { useSimpleVariables } from '~/composables/useSimpleVariables'

export function useSupabaseSub() {
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
    // Supabase
    const config = useRuntimeConfig();
    // Create a single supabase client for interacting with database
    const supabase = createClient(config.public.supabaseURL as any, config.public.supabaseKey as any)
    // Supabase Callback Handling
    const subscriptionCallback = async (payload: any) => {
        // Only the scraped_users table
        if (payload.table != "scraped_users" || payload.eventType != "UPDATE") {
            return;
        }
        // console.log('Change received !', payload)
        // If the payload.new is on the actual listing
        const userIndex = users.value.findIndex(
            (u: any) => u.scraped_user.id === payload.new.id
        );
        if (userIndex === -1) {
            return;
        }
        // Update our listing element with it's new value
        users.value[userIndex]['scraped_user'] = payload.new as never;
        // Filter -- and return when the element must still in the listing
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
        // 
        if (data.length > 0) {
            // remove element
            users.value.splice(userIndex, 1);
        }
    }
    // Subscription Starting
    const subscribeSupabaseChannel = () => {
        supabase
            .channel('room1')
            .on('postgres_changes', { event: '*', schema: '*' }, subscriptionCallback)
            .subscribe();

    }
    // 
    return {
        subscribeSupabaseChannel
    };
}