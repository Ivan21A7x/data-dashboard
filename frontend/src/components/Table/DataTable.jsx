const DataTable = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b">
                        <th>Ciudad</th>
                        <th>Temperatura</th>
                        <th>Humedad</th>
                        <th>Clima</th>
                        <th>Fecha</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td>{item.city}</td>
                            <td>{item.temperature}°C</td>
                            <td>{item.humidity}%</td>
                            <td>{item.weather}</td>
                            <td>
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