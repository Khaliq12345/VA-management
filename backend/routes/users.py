from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Annotated
from supabase import AsyncClient
from backend.dependencies.supabase_depency import get_supabase_session
from backend.services.supabase_service import (
    get_scraped_users_from_supabase,
    get_va_info,
)
from backend.services.airtable_service import (
    get_creator_info_from_airtable,
)
from itertools import cycle

router = APIRouter(
    prefix="",
    responses={404: {"description": "Not found"}},
)


@router.get("/get-scraped-users", response_model=List[Dict])
async def get_users(
    supabase: Annotated[AsyncClient, Depends(get_supabase_session)],
    va_id: int,
    limit: int = 20,
    offset: int = 0,
):
    try:
        # Récupérer les utilisateurs scrapés depuis Supabase
        scraped_users = await get_scraped_users_from_supabase(
            supabase=supabase, va_id=va_id, limit=limit, offset=offset
        )

        # Récupérer les informations de l'API Airtable
        table_id, base_id = await get_va_info(supabase, va_id)
        (
            ig_usernames,
            creator_usernames,
        ) = await get_creator_info_from_airtable(table_id, base_id, limit, offset)

        # Assign each scraped user to a creator account
        results = []
        if len(scraped_users) <= len(ig_usernames):
            for index in range(len(scraped_users)):
                results.append(
                    {
                        "creator_name": creator_usernames[index],
                        "ig_username": ig_usernames[index],
                        "scraped_user": scraped_users[index],
                    }
                )
        elif len(scraped_users) > len(ig_usernames):
            next_ig_usernames = cycle(ig_usernames)
            next_creator_usernames = cycle(creator_usernames)
            for index in range(len(scraped_users)):
                results.append(
                    {
                        "creator_name": next(next_creator_usernames),
                        "ig_username": next(next_ig_usernames),
                        "scraped_user": scraped_users[index],
                    }
                )

        return results

    except Exception as e:
        raise HTTPException(500, detail=str(e))
