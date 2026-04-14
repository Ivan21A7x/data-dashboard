from typing import List
from pydantic import BaseModel

class WeatherResponse(BaseModel):
    id: int
    city: str
    temperature: float
    humidity: int
    weather: str
    timestamp: int

    class Config:
        from_attributes = True

class WeatherListResponse(BaseModel):
    total: int
    page: int
    limit: int
    data: List[WeatherResponse]