from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String)
    temperature = Column(Float)
    humidity = Column(Integer)
    weather = Column(String)
    timestamp = Column(Integer)