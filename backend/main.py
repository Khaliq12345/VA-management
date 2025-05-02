import sys

sys.path.append(".")  # Add the parent directory to the path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.users import router as users_router
from backend.routes.auth import router as auth_router

from backend.config import config

from backend.services.supabase_service import subscribe_to_channel

app = FastAPI(
    title="VA Management API",
    description="API with required EndPoints - Structured",
    version="1.0.0",
    on_startup=[subscribe_to_channel],
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(prefix="/api", router=auth_router, tags=["Authentication"])
app.include_router(prefix="/api", router=users_router, tags=["Scraped Users"])


@app.post("/api/webhook")
async def receive_webhook(request: Request):
    json_data = await request.json()
    print(json_data)
    return json_data


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "__main__:app",
        host="127.0.0.1",
        port=8000,
        reload=True if config.APP_ENV == "development" else False,
    )
