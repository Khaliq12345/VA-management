from supabase import AsyncClient
from datetime import datetime, timedelta, timezone


async def get_scraped_users_from_supabase(
    supabase: AsyncClient, va_id: int, limit: int = 20, offset: int = 0
):
    # Récupérer 'creators' depuis va_table
    va_table_response = (
        await supabase.table("va_table")
        .select("creator")
        .eq("id", va_id)
        .single()
        .execute()
    )
    va_table_data = va_table_response.data
    creator_value = va_table_data.get("creator")

    # Définir la date limite de 30 jours
    today = datetime.now(timezone.utc)
    thirty_days_ago = today - timedelta(days=30)

    # Récupérer les utilisateurs scrapés inactifs ou sans last_action
    condition = f"last_action.is.null,last_action.lt.{thirty_days_ago.isoformat()}"
    scraped_users_response = await (
        supabase.table("scraped_users")
        .select("*, interaction_table(*)")
        .eq("interaction_table.creator_username", creator_value)
        .or_(condition)
        .limit(limit)
        .offset(offset)
        .execute()
    )

    # Filtrer les utilisateurs
    filtered_scraped_users = [
        user for user in scraped_users_response.data if not user["interaction_table"]
    ]

    # print(f"✅ Utilisateurs filtrés récupérés : {len(filtered_scraped_users)}")
    return filtered_scraped_users


async def get_va_info(supabase: AsyncClient, va_id: int):
    # Récupérer 'table_id' et 'base_id' depuis va_table
    va_table_response = (
        await supabase.table("va_table")
        .select("table_id, base_id")
        .eq("id", va_id)
        .single()
        .execute()
    )
    va_table_data = va_table_response.data
    table_id = va_table_data.get("table_id")
    base_id = va_table_data.get("base_id")
    return table_id, base_id
