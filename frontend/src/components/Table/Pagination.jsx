const Pagination = ({ page, total, limit, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;