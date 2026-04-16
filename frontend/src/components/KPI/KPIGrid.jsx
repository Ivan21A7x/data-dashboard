import KPICard from "./KPICard";

const KPIGrid = ({ latest, metrics }) => {
    if (!latest || !metrics) return <p>Cargando KPIs...</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard title="Temp actual" value={latest.temperature} unit="°C" />
            <KPICard title="Promedio" value={metrics.avg_temp} unit="°C" />
            <KPICard title="Máxima" value={metrics.max_temp} unit="°C" />
            <KPICard title="Mínima" value={metrics.min_temp} unit="°C" />
        </div>
    );
};

export default KPIGrid;