from supabase import Client, create_client
from config.settings import settings  # ton fichier de config

_supabase_client: Client | None = None

def get_supabase() -> Client:
    global _supabase_client
    if _supabase_client is None:
        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
            raise RuntimeError("Supabase configuration is missing.")
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _supabase_client