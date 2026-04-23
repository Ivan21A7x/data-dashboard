import KPIGrid from "../components/KPI/KPIGrid";
import TemperatureChart from "../components/Chart/TemperatureChart";
import DataTable from "../components/Table/DataTable";
import Pagination from "../components/Table/Pagination";
import CitySelector from "../components/Selector/CitySelector";
import { useDashboardData } from "../hooks/useDashboardData";

function Dashboard() {
    const {
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
        handleSearch
    } = useDashboardData();

    if (!latest || !metrics) {
        return 
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 animate-pulse">Cargando dashboard...</p>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Weather Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Visualización de métricas climáticas en tiempo real
                    </p>
                </div>

                <KPIGrid latest={latest} metrics={metrics} />

                <CitySelector 
                    city={city} 
                    setCity={setCity} 
                    onSearch={handleSearch} 
                />

                <TemperatureChart data={chartData} />

                <DataTable data={tableData} />

                <Pagination
                    page={page}
                    total={total}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

export default Dashboard;