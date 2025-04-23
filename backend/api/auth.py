from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from config.supabase import get_supabase

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), supabase=Depends(get_supabase)):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": form_data.username,
            "password": form_data.password
        })
        return {
            "access_token": response.session.access_token,
            "token_type": "bearer"
        }
    except Exception:
        raise HTTPException(401, detail="Invalid credentials")