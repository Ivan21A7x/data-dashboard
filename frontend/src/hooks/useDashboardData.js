import { useEffect, useState } from "react";
import {
    getLatest,
    getMetrics,
    getMetricsByDay,
    getData,
    fetchCityWeather,
} from "../services/api";

export const useDashboardData = () => {
    const [latest, setLatest] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [city, setCity] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 10;

    const handleSearch = async () => {
        if (!city) return;

        try {
            await fetchCityWeather(city);

            // Refetch all data
            const metricsData = await getMetrics();
            setMetrics({
                avg_temp: metricsData.average_temperature,
                max_temp: metricsData.max_temperature,
                min_temp: metricsData.min_temperature,
            });

            const chart = await getMetricsByDay(city);
            setChartData(chart);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getLatest().then(setLatest);
        getMetrics().then((data) => {
            setMetrics({
                avg_temp: data.average_temperature,
                max_temp: data.max_temperature,
                min_temp: data.min_temperature,
            });
        });
        getMetricsByDay(city).then((data) => {
            const formatted = data.map((item) => ({
                ...item,
                avg_temp: item.average_temperature,
            }));
            
            setChartData(formatted);
        });
    }, [city]);

    useEffect(() => {
        getData(page, limit).then((res) => {
            setTableData(res.data);
            setTotal(res.total);
        });
    }, [page]);

    return {
        latest,
        metrics,
        chartData,
        tableData,
        page,
        total,
        limit,
        setPage,
        city,
        setCity,
        handleSearch,
    };
};