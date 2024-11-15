import React from "react";

import { Pagination } from "react-bootstrap";

function Pageing({ items, itemPerPage, currentPage, setCurrentPage }) {
  const length = items.length === 0 ? 0 : items.length
  const pageNumbers = [];
  const firstPage = currentPage - 2 < 1 ? 1 : currentPage - 2;
  const lastPage =
    currentPage + 2 > Math.ceil(length / itemPerPage)
      ? Math.ceil(length / itemPerPage)
      : currentPage + 2;
  for (let i = firstPage; i <= lastPage; i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First
          onClick={() => setCurrentPage(firstPage)}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          hidden={currentPage === 1}
        />
        {pageNumbers}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          hidden={currentPage === lastPage}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(lastPage)}
        />
      </Pagination>
    </div>
  );
}

export default Pageing;
