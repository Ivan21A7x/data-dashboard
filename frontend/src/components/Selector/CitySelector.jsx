const CitySelector = ({ city, setCity, onSearch }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 
            flex flex-col sm:flex-row gap-3">
            
            <input 
                type="text"
                placeholder="Buscar ciudad..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={onSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white 
                    px-5 py-2 rounded-lg font-medium 
                    transition-all duration-200"
            >
                Buscar
            </button>
        </div>
    );
}

export default CitySelector;