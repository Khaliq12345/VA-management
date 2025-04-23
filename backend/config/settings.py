from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    APP_ENV: str = "dev"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()