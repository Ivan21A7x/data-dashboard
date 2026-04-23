const DataTable = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">Ciudad</th>
                        <th className="px-4 py-3 text-left">Temperatura</th>
                        <th className="px-4 py-3 text-left">Humedad</th>
                        <th className="px-4 py-3 text-left">Clima</th>
                        <th className="px-4 py-3 text-left">Fecha</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr 
                            key={item.id} 
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-3">{item.city}</td>
                            <td className="px-4 py-3">{item.temperature}°C</td>
                            <td className="px-4 py-3">{item.humidity}%</td>
                            <td className="px-4 py-3 capitalize">{item.weather}</td>
                            <td className="px-4 py-3 text-gray-500">
                                {new Date(item.timestamp * 1000).toLocaleDateString()}{" "}
                                {new Date(item.timestamp * 1000).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;