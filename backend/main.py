import sys

sys.path.append(".")  # Add the parent directory to the path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.users import router as users_router

from backend.config import config

app = FastAPI(
    title="VA Management API",
    description="API with required EndPoints - Structured",
    version="1.0.0",
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
app.include_router(users_router, tags=["Scraped Users"])
# app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "__main__:app",
        host="0.0.0.0",
        port=8000,
        reload=True if config.APP_ENV == "development" else False,
    )
