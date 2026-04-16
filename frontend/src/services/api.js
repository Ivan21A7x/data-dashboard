import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// KPIs
export const getLatest = async () => {
    const res = await API.get("/latest");
    return res.data;
};

export const getMetrics = async () => {
    const res = await API.get("/metrics");
    return res.data;
};

// Chart
export const getMetricsByDay = async () => {
    const res = await API.get("/metrics_by_day-full");
    return res.data;
};

// Table
export const getData = async (page = 1, limit = 10) => {
    const res = await API.get(`/data?page=${page}&limit=${limit}`);
    return res.data;
};