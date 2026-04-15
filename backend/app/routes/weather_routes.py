from fastapi import APIRouter, Query, Depends, HTTPException
from app.services.weather_service import get_weather_by_city
from app.database import SessionLocal
from app.models.weather import WeatherRecord
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.schemas.weather_schema import WeatherResponse, WeatherListResponse
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/external-weather")
def fetch_weather(city: str):
    return get_weather_by_city(city)


@router.get("/data", response_model=WeatherListResponse)
def get_all_data(
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=100),
    db: Session = Depends(get_db)
):
    offset = (page - 1) * limit

    total = db.query(WeatherRecord).count()

    records = db.query(WeatherRecord)\
        .order_by(WeatherRecord.timestamp.desc())\
        .offset(offset)\
        .limit(limit)\
        .all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": records
    }


@router.get("/metrics")
def get_metrics(
    db: Session = Depends(get_db)
):
    avg_temp = db.query(func.avg(WeatherRecord.temperature)).scalar()
    max_temp = db.query(func.max(WeatherRecord.temperature)).scalar()
    min_temp = db.query(func.min(WeatherRecord.temperature)).scalar()

    return {
        "average_temperature": round(avg_temp, 2) if avg_temp else 0,
        "max_temperature": round(max_temp, 2) if max_temp else 0,
        "min_temperature": round(min_temp, 2) if min_temp else 0
    }


@router.get("/metrics/by-day")
def get_metrics_by_day(
    db: Session = Depends(get_db)
):
    date_col = func.date(func.to_timestamp(WeatherRecord.timestamp))
    results = db.query(
        date_col.label("date"),
        func.avg(WeatherRecord.temperature).label("avg_temp"),
    ).group_by(
        date_col
    ).order_by(
        date_col
    ).all()

    return [
        {
            "date": str(row.date),
            "average_temperature": round(row.avg_temp, 2)
        }
        for row in results
    ]


@router.get("/metrics/by-day-full")
def get_full_metrics_by_day(
    db: Session = Depends(get_db)
):
    date_col = func.date(func.to_timestamp(WeatherRecord.timestamp))
    results = db.query(
        date_col.label("date"),
        func.avg(WeatherRecord.temperature).label("avg_temp"),
        func.max(WeatherRecord.temperature).label("max_temp"),
        func.min(WeatherRecord.temperature).label("min_temp")
    ).group_by(
        date_col
    ).order_by(
        date_col
    ).all()

    return [
        {
            "date": str(row.date),
            "average_temperature": round(row.avg_temp, 2),
            "max_temperature": round(row.max_temp, 2),
            "min_temperature": round(row.min_temp, 2)
        }
        for row in results
    ]


@router.get("/latest", response_model=WeatherResponse)
def get_latest(
    db: Session = Depends(get_db)
):
    record = db.query(WeatherRecord)\
        .order_by(WeatherRecord.timestamp.desc())\
        .first()

    if not record:
        raise HTTPException(status_code=404, detail="No data found")

    return record


@router.get("/filter", response_model=List[WeatherResponse])
def filter_data(
    city: str = None,
    min_temp: float = None,
    limit: int = Query(10, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(WeatherRecord)

    if city:
        query = query.filter(WeatherRecord.city == city)

    if min_temp is not None:
        query = query.filter(WeatherRecord.temperature >= min_temp)

    results = query\
        .order_by(WeatherRecord.timestamp.desc())\
        .limit(limit)\
        .all()

    return results