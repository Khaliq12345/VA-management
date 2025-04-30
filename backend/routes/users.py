from fastapi import APIRouter, Depends, HTTPException, Request, Response
from typing import List, Dict, Annotated
from backend.dependencies.supabase_depency import get_supabase_from_headers, AsyncClient
from backend.services.supabase_service import (
    get_scraped_users_from_supabase,
    save_interaction_supabase,
)
from backend.services.airtable_service import (
    get_creators_info_from_airtable,
    get_va_aritables,
)
from itertools import cycle
from datetime import datetime

router = APIRouter(
    prefix="",
    responses={404: {"description": "Not found"}},
)


@router.get("/get-scraped-users", response_model=List[Dict])
async def get_users(
    session: Annotated[dict, Depends(get_supabase_from_headers)],
    request: Request,
    response: Response,
    creator_username: str,
    table_id: str,
    base_id: str,
    limit: int = 20,
    offset: int = 0,
):
    # Renvoyer les nouveaux tokens dans la réponse si refresh a eu lieu
    response.headers["access_token"] = session["access_token"]
    response.headers["refresh_token"] = session["refresh_token"]

    try:
        # Récupérer les utilisateurs scrapés depuis Supabase
        scraped_users = await get_scraped_users_from_supabase(
            supabase=session["supabase"],
            creator_username=creator_username,
            limit=limit,
            offset=offset,
        )

        # # Récupérer les informations de l'API Airtable
        # table_id, base_id = await get_va_info(session["supabase"], va_id)
        (
            ig_usernames,
            creator_usernames,
        ) = await get_creators_info_from_airtable(
            creator_username, table_id, base_id, limit, offset
        )

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


@router.get("/save-interaction", response_model=Dict)
async def save_interaction(
    session: Annotated[dict, Depends(get_supabase_from_headers)],
    request: Request,
    response: Response,
    creator_ig_username: str,
    username: str,
    creator_username: str,
):
    # Renvoyer les nouveaux tokens dans la réponse si refresh a eu lieu
    response.headers["access_token"] = session["access_token"]
    response.headers["refresh_token"] = session["refresh_token"]

    try:
        # Update and Insert in Supabase
        await save_interaction_supabase(
            session["supabase"], creator_ig_username, username, creator_username
        )
        return {"message": "Success !"}

    except Exception as e:
        raise HTTPException(500, detail=str(e))


@router.get("/get-va-info", response_model=Dict)
async def get_va_info_route(
    session: Annotated[dict, Depends(get_supabase_from_headers)],
    request: Request,
    response: Response,
    va_email: str,
):
    # Renvoyer les nouveaux tokens dans la réponse si refresh a eu lieu
    response.headers["access_token"] = session["access_token"]
    response.headers["refresh_token"] = session["refresh_token"]

    try:
        # Récupérer les informations de l'API Airtable
        records = await get_va_aritables(session["supabase"], va_email)
        return {"records": records}

    except Exception as e:
        raise HTTPException(500, detail=str(e))


@router.get("/update-scraped-user-status", response_model=Dict)
async def update_scraped_user(
    session: Annotated[dict, Depends(get_supabase_from_headers)],
    request: Request,
    response: Response,
    username: str,
    status: str,
):
    # Renvoyer les nouveaux tokens dans la réponse si refresh a eu lieu
    response.headers["access_token"] = session["access_token"]
    response.headers["refresh_token"] = session["refresh_token"]
    supabase: AsyncClient = session["supabase"]
    try:
        # Update the status of the scraped user
        await (
            supabase.table("scraped_users")
            .update({"status": status})
            .eq("username", username)
            .execute()
        )
        return {"message": "success"}

    except Exception as e:
        raise HTTPException(500, detail=str(e))
