from fastapi import FastAPI
from app.routers.auth import router as auth_router
from starlette.middleware.sessions import SessionMiddleware
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WeatherSphere Backend",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "WeatherSphere Backend is Running 🚀"
    }