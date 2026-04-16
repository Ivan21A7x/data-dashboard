import KPIGrid from "../components/KPI/KPIGrid";
import TemperatureChart from "../components/Chart/TemperatureChart";
import DataTable from "../components/Table/DataTable";
import Pagination from "../components/Table/Pagination";
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
    } = useDashboardData();

    if (!latest || !metrics) {
        return <p className="p-4">Cargando dashboard...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <KPIGrid latest={latest} metrics={metrics} />

            <TemperatureChart data={chartData} />

            <div className="max-w-7xl mx-auto space-y-6">
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