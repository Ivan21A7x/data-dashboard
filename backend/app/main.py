from fastapi import FastAPI
from app.routes import weather_routes
from app.database import engine, Base
from app.models import weather

app = FastAPI()

app.include_router(weather_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}

Base.metadata.create_all(bind=engine)