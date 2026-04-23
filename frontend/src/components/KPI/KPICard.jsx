const KPICard = ({ title, value, unit }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 
            hover:shadow-md transition-all duration-200">
            
            <p className="text-sm text-gray-500">{title}</p>
            
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
                {value ?? "--"}
                <span className="text-lg ml-1 text-gray-500">{unit}</span>
            </p>
        </div>
    );
};

export default KPICard;