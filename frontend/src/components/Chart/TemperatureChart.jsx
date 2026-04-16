import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const TemperatureChart = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-4 h-75">
            <h2 className="text-lg font-semibold mb-2">
                Temperatura promedio por día
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avg_temp" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;