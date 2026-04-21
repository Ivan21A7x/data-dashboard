const CitySelector = ({ city, setCity, onSearch }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow flex gap-2 items-center">
            <input 
                type="text"
                placeholder="Buscar ciudad..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded px-3 py-2 w-full"
            />

            <button
                onClick={onSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Buscar
            </button>
        </div>
    );
}

export default CitySelector;