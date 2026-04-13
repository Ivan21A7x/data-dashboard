import os
import requests
from dotenv import load_dotenv
from app.database import SessionLocal
from app.models.weather import WeatherRecord

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

def get_weather_by_city(city: str):

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }
    
    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return {
            "error": "Failed to fetch data",
            "status_code": response.status_code,
            "details": response.text
        }
    
    data = response.json()
    
    weather_data = { 
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "weather": data["weather"][0]["description"],
        "timestamp": data["dt"]
    }

    db = SessionLocal()

    new_record = WeatherRecord(**weather_data)

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    db.close()

    return weather_data
