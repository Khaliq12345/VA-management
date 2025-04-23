from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.users import router as users_router
from api.auth import router as auth_router

app = FastAPI(
    title="VA Management API",
    description="API with required EndPoints - Structured",
    version="1.0.0",
    openapi_tags=[
        {"name": "Users", "description": "Gestion des utilisateurs"},
        # {"name": "Authentication", "description": "Authentification"},
    ]
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
app.include_router(users_router)
# app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)