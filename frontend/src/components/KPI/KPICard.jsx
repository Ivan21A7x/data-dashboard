const KPICard = ({ title, value, unit }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            <span className="text-sm text-gray-500">{title}</span>
            <span className="text-3xl font-bold text-gray-800 mt-2">
                {value ?? "--"} {unit}
            </span>
        </div>
    );
};

export default KPICard;