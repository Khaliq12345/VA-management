from fastapi import APIRouter, Depends, HTTPException, Request
from config import config
from backend.dependencies.supabase_depency import get_supabase_session

from supabase import AsyncClient

from typing import Annotated

router = APIRouter(
    prefix="",
    responses={404: {"description": "Not found"}},
)


@router.post("/login")
async def login(
    supabase: Annotated[AsyncClient, Depends(get_supabase_session)],
    email: str,
    password: str,
):
    try:
        response = await supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )
        return {
            "message": "Success !",
            "session": None
            if not response.session
            else {
                "access_token": response.session.access_token,
                "token_type": "bearer",
                "refresh_token": response.session.refresh_token,
            },
            # "user": response.user
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))


@router.post("/signup")
async def sign_up(
    supabase: Annotated[AsyncClient, Depends(get_supabase_session)],
    request: Request,
    email: str,
    password: str,
):
    #
    api_key = request.headers.get("api-key")
    if not api_key:
        raise HTTPException(status_code=400, detail="API Key is required in headers.")
    if api_key != config.SIGNUP_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key!")
    try:
        await supabase.auth.sign_up({"email": email, "password": password})
        return {
            "message": "Success !",
            # "session": None if not response.session else {"access_token": response.session.access_token, "token_type": "bearer", "refresh_token": response.session.refresh_token},
            # # "user": response.user
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
