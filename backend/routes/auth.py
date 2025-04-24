from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from backend.dependencies.supabase_depency import get_supabase_session

from supabase import AsyncClient

from typing import Annotated

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/login")
async def login(
    supabase: Annotated[AsyncClient, Depends(get_supabase_session)],
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": form_data.username, "password": form_data.password}
        )
        return {"access_token": response.session.access_token, "token_type": "bearer"}
    except Exception:
        raise HTTPException(401, detail="Invalid credentials")
