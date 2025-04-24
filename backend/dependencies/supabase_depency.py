from supabase.client import AsyncClient, create_async_client
from fastapi import Request, HTTPException, Response
from supabase import create_async_client
from backend.config import config
from typing import Tuple

async def get_supabase_from_headers(request: Request) -> Tuple:
    access_token = request.headers.get("access_token")
    refresh_token = request.headers.get("refresh_token")

    if not access_token or not refresh_token:
        raise HTTPException(status_code=401, detail="Access or Refresh token missing in headers.")

    # Créer le client avec un token JWT
    supabase = await create_async_client(config.SUPABASE_URL, access_token)
    try:
        user = await supabase.auth.get_user()
    except Exception:
        # Essayer de refresh
        try:
            refreshed_session = await supabase.auth.refresh_session(refresh_token)
            access_token = refreshed_session.session.access_token
            refresh_token = refreshed_session.session.refresh_token
            supabase = await create_async_client(config.SUPABASE_URL, access_token)
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid or expired tokens.")

    return supabase, access_token, refresh_token

async def get_supabase_session() -> AsyncClient:
    # Initialize the Supabase client
    return await create_async_client(
        supabase_url=config.SUPABASE_URL, supabase_key=config.SUPABASE_KEY
    )
