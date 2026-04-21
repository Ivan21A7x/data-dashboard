import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// KPIs
export const getLatest = async () => {
    const res = await API.get("/latest");
    return res.data;
};

// Metrics
export const getMetrics = async () => {
    const res = await API.get("/metrics");
    return res.data;
};

// Chart
export const getMetricsByDay = async (city) => {
    const url = city
    ? `/metrics/by-day-full?city=${city}`
    : `/metrics/by-day-full`;

    const res = await API.get(url);
    return res.data;
};

// Table
export const getData = async (page = 1, limit = 10) => {
    const res = await API.get(`/data?page=${page}&limit=${limit}`);
    return res.data;
};

// External API
export const fetchCityWeather = async (city) => {
    const res = await API.get(`/external-weather?city=${city}`);
    return res.data;
}
