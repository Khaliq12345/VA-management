from supabase import AsyncClient, create_async_client
from datetime import datetime, timedelta, timezone
from dateparser import parse
from config import config
import httpx


def handle_changes(payload: dict):
    headers = {
        "content-type": "application/json",
    }
    httpx.post(
        "http://127.0.0.1:8000/webhook",
        headers=headers,
        json=payload,
    )


async def subscribe_to_channel():
    supabase = await create_async_client(
        supabase_url=config.SUPABASE_URL, supabase_key=config.SUPABASE_KEY
    )
    await (
        supabase.channel("room1")
        .on_postgres_changes("*", schema="*", callback=handle_changes)
        .subscribe()
    )
    print("Subscribed!!")


async def get_scraped_users_from_supabase(
    supabase: AsyncClient, creator_username: int, limit: int = 20, offset: int = 0
):
    # Définir la date limite de 30 jours
    today = datetime.now(timezone.utc)
    thirty_days_ago = today - timedelta(days=30)

    # Récupérer les utilisateurs scrapés inactifs ou sans last_action
    condition = f"last_action.is.null,last_action.lt.{thirty_days_ago.isoformat()}"
    scraped_users_response = await (
        supabase.table("scraped_users")
        .select("*, interaction_table(*)")
        .eq("interaction_table.creator_username", creator_username)
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


async def save_interaction_supabase(
    supabase: AsyncClient, creator_ig_username: str, user_id: str, creator_username: str
):
    # Run the function defined in postgres
    await supabase.rpc(
        "save_interaction_fn",
        {
            "creator_ig_username_input": creator_ig_username,
            "user_id_input": user_id,
            "creator_username_input": creator_username,
            "last_action_date": parse("now").isoformat(),
        },
    ).execute()
    return True
