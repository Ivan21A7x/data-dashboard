const Pagination = ({ page, total, limit, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button 
                onClick={() => onPageChange(page - 1)} 
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border text-sm 
                   disabled:opacity-40 hover:bg-gray-100 transition"
            >
                Prev
            </button>

            <span className="text-sm text-gray-600">
                Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border text-sm 
                   disabled:opacity-40 hover:bg-gray-100 transition"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;