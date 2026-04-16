import { useEffect, useState } from "react";
import {
    getLatest,
    getMetrics,
    getMetricsByDay,
    getData,
} from "../services/api";

export const useDashboardData = () => {
    const [latest, setLatest] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 10;

    useEffect(() => {
        getLatest().then(setLatest);
        getMetrics().then((data) => {
            setMetrics({
                avg_temp: data.average_temperature,
                max_temp: data.max_temperature,
                min_temp: data.min_temperature,
            });
        });
        getMetricsByDay().then((data) => {
            const formatted = data.map((item) => ({
                ...item,
                avg_temp: item.average_temperature,
            }));
            
            setChartData(formatted);
        });
    }, []);

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
    };
};