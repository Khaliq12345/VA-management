from supabase.client import AsyncClient, create_async_client

from config import config


async def get_supabase_session() -> AsyncClient:
    # Initialize the Supabase client
    return await create_async_client(
        supabase_url=config.SUPABASE_URL, supabase_key=config.SUPABASE_KEY
    )
