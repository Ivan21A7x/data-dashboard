import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

const TemperatureChart = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-90 pb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Temperatura por día
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    
                    <Tooltip />

                    <Line 
                        type="monotone" 
                        dataKey="average_temperature" 
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Promedio"
                    />

                    <Line 
                        type="monotone" 
                        dataKey="max_temperature" 
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Máxima"
                    />

                    <Line 
                        type="monotone" 
                        dataKey="min_temperature" 
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Mínima"
                    />
                </LineChart>

                <Legend />
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;