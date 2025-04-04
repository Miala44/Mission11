interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage, //webPageNum
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
      {/* Dropdown to select the number of results per page */}
      <label className="form-label fw-bold">
        Results per page:
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => onPageSizeChange(Number(p.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
      <br />

      {/* Pagination Controls */}
      <button
        className="btn btn-primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page number buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          className="btn btn-outline-primary mx-1"
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
