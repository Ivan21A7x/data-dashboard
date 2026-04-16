from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import weather_routes
from app.database import engine, Base
from app.models import weather

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}

Base.metadata.create_all(bind=engine)