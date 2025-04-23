from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Optional
from config.supabase import get_supabase

router = APIRouter(
    prefix="",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/get_users", response_model=List[Dict])
async def get_users(
    va_id: int,
    limit: int = 20,
    offset: int = 20
):
    try:
        #
        scraped_users = await get_from_supabase(va_id, limit, offset)
        # 
        table_id, base_id = await get_va_info(va_id)
        twenty_ig_usernames, twenty_creator_usernames = await get_creator_info_from_airtable(table_id, base_id, limit, offset)
        
        results = []
        for index in range(len(scraped_users) if len(scraped_users) < len(twenty_ig_usernames) else len(twenty_ig_usernames)):
            results.append(
                {
                    'creator_name': twenty_creator_usernames[index],
                    'ig_username': twenty_ig_usernames[index],
                    'scraped_user': scraped_users[index]
                }
            )

        return results
        
    except Exception as e:
        raise HTTPException(500, detail=str(e))



# Utils

async def get_va_info(va_id: int):
    table_id = "126gddjnfj"
    base_id = "yefvdy67"
    return table_id, base_id 

async def get_creator_info_from_airtable(table_id, base_id, limit, offset):
    return ['ig_username1', 'ig_username2'], ['creator_username1', 'creator_username2']
    
async def get_from_supabase(va_id: int, limit: int = 20, offset: int = 20):
    supabase= get_supabase() #Depends(get_supabase)
    
    # Récupérer 'creators' depuis va_table
    va_table_response = supabase.table("va_table").select("creators").eq("id", va_id).single().execute()
    va_table_data = va_table_response.data
    creators_value = va_table_data.get("creators")

    # Définir la date limite de 30 jours
    today = datetime.now(timezone.utc)
    thirty_days_ago = today - timedelta(days=30)

    # Récupérer les utilisateurs scrapés inactifs ou sans last_action
    condition = f"last_action.is.null,last_action.lt.{thirty_days_ago.isoformat()}"
    scraped_users_response = supabase.table("scraped_users").select("*").or_(condition).execute()
    scraped_users_data = scraped_users_response.data

    # Récupérer les user_id déjà présents dans interaction_table
    interaction_response = supabase.table("interaction_table").select("user_id").eq("original_username", creators_value).execute()
    interaction_user_ids = {item["user_id"] for item in interaction_response.data}

    # Filtrer les utilisateurs
    filtered_scraped_users = [
        user for user in scraped_users_data if user["user_id"] not in interaction_user_ids
    ]

    # print(f"✅ Utilisateurs filtrés récupérés : {len(filtered_scraped_users)}")
    return filtered_scraped_users