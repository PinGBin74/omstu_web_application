from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from src.cars.handlers import router as cars_router
from src.dealer.handlers import router as dealers_router
from src.settings import Settings

settings = Settings()


app = FastAPI(
    title="Omstu web-application",
    description="API for Web_application_Omstu",
    version="0.1.0",
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.CORS_ORIGINS,
#     allow_credentials=True,
#     # allow_methods=["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
#     allow_headers=[ *
#         # "Content-type",
#         # "Authorization",
#         # "Set-Cookie",
#         # "X-Requested-With",
#     ],
#     max_age=3600,
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Backend is running", "version": "0.1.0"}

# ДОБАВЬТЕ ЭТОТ ЭНДПОИНТ для тестирования CORS
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    """Handle OPTIONS requests for CORS preflight"""
    return {}


app.include_router(cars_router)
app.include_router(dealers_router)
