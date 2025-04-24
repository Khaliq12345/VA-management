from supabase.client import AsyncClient, create_async_client
from fastapi import Request, HTTPException, Response
from supabase import create_async_client
from backend.config import config
from typing import Tuple


async def get_supabase_from_headers(request: Request) -> Tuple[AsyncClient, str, str]:
    access_token = request.headers.get("access_token")
    refresh_token = request.headers.get("refresh_token")

    if not access_token or not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Access or Refresh token missing in headers."
        )

    # Étape 1 : Créer le client avec la clé anonyme (obligatoire)
    supabase = await create_async_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    # Étape 2 : Restaurer la session utilisateur
    try:
        await supabase.auth.set_session(access_token, refresh_token)
        await supabase.auth.get_user()  # Vérifie si la session est encore valide
    except Exception:
        # Étape 3 : Si la session est expirée, tenter de la refresh
        try:
            refreshed = await supabase.auth.refresh_session(refresh_token)
            new_session = refreshed.session
            access_token = new_session.access_token
            refresh_token = new_session.refresh_token

            # Refaire la session avec les nouveaux tokens
            await supabase.auth.set_session(access_token, refresh_token)
        except Exception:
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired tokens."
            )

    return supabase, access_token, refresh_token

async def get_supabase_session() -> AsyncClient:
    # Initialize the Supabase client
    return await create_async_client(
        supabase_url=config.SUPABASE_URL, supabase_key=config.SUPABASE_KEY
    )
