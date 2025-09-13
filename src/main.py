from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from src.settings import Settings

settings = Settings()


app = FastAPI(
    title="Omstu web-application",
    description="API for Web_application_Omstu",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
    allow_headers=[
        "Content-type",
        "Authorization",
        "Set-Cookie",
        "X-Requested-With",
    ],
    max_age=3600,
)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")
