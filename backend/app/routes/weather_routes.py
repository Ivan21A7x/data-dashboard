from fastapi import APIRouter, Query
from app.services.weather_service import get_weather_by_city
from app.database import SessionLocal
from app.models.weather import WeatherRecord
from sqlalchemy import func
from app.schemas.weather_schema import WeatherResponse, WeatherListResponse
from typing import List
from sqlalchemy import func

router = APIRouter()

@router.get("/external-weather")
def fetch_weather(city: str):
    return get_weather_by_city(city)

@router.get("/data", response_model=WeatherListResponse)
def get_all_data(
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=100)
):
    db = SessionLocal()

    offset = (page - 1) * limit

    total = db.query(WeatherRecord).count()

    records = db.query(WeatherRecord)\
        .offset(offset)\
        .limit(limit)\
        .all()

    db.close()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": records
    }

@router.get("/metrics")
def get_metrics():
    db = SessionLocal()

    avg_temp = db.query(func.avg(WeatherRecord.temperature)).scalar()
    max_temp = db.query(func.max(WeatherRecord.temperature)).scalar()
    min_temp = db.query(func.min(WeatherRecord.temperature)).scalar()

    db.close()

    return {
        "average_temperature": avg_temp,
        "max_temperature": max_temp,
        "min_temperature": min_temp
    }

@router.get("/metrics/by-day")
def get_metrics_by_day():
    db = SessionLocal()

    results = db.query(
        func.date(func.to_timestamp(WeatherRecord.timestamp)).label("date"),
        func.avg(WeatherRecord.temperature).label("avg_temp"),
    ).group_by(
        func.date(func.to_timestamp(WeatherRecord.timestamp))
    ).all()

    db.close()

    return [
        {
            "date": str(row.date),
            "average_temperature": row.avg_temp
        }
        for row in results
    ]

@router.get("/filter", response_model=List[WeatherResponse])
def filter_data(city: str = None, min_temp: float = None):
    db = SessionLocal()

    query = db.query(WeatherRecord)

    if city:
        query = query.filter(WeatherRecord.city == city)

    if min_temp:
        query = query.filter(WeatherRecord.temperature >= min_temp)
    
    results = query.all()

    db.close()

    return results
