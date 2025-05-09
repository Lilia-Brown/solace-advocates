export default function PaginationControls({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-button"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
