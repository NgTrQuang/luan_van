import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ currentPage, totalPages, onChangePage }) => {
  currentPage = isNaN(currentPage) ? 1 : currentPage;
  totalPages = isNaN(totalPages) ? 1 : totalPages;

  const handlePageChange = (event, page) => {
    event.preventDefault(); // Không cần thiết trong trường hợp này
    onChangePage(page);
    event.stopPropagation(); // Không cần thiết trong trường hợp này
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={(event, page) => handlePageChange(event, page)}
          boundaryCount={0} // đặt là 1 sẽ hiện cả 2 nút đầu và cuối (mặc định) nếu là 0 sẽ hiển thị 1 trong 2
        />
      </Stack>
    );
  };

  return <div>{totalPages >= 1 && renderPagination()}</div>;
};

export default PaginationComponent;
