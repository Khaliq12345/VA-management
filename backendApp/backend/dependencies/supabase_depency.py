from supabase.client import AsyncClient, create_async_client
from fastapi import Request, HTTPException
from backend.config import config


async def get_supabase_session() -> AsyncClient:
    # Initialize the Supabase client
    return await create_async_client(
        supabase_url=config.SUPABASE_URL, supabase_key=config.SUPABASE_KEY
    )


async def get_supabase_from_headers(request: Request) -> dict:
    access_token = request.headers.get("access_token")
    refresh_token = request.headers.get("refresh_token")

    if not access_token or not refresh_token:
        raise HTTPException(
            status_code=401, detail="Access or Refresh token missing in headers."
        )

    # Étape 1 : Créer le client avec la clé anonyme (obligatoire)
    supabase = await get_supabase_session()

    # Étape 2 : Restaurer la session utilisateur
    try:
        refreshed = await supabase.auth.set_session(access_token, refresh_token)
        new_session = refreshed.session
        access_token = new_session.access_token
        refresh_token = new_session.refresh_token
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
            raise HTTPException(status_code=401, detail="Invalid or expired tokens.")

    return {
        "supabase": supabase,
        "access_token": access_token,
        "refresh_token": refresh_token,
    }
