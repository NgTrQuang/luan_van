import React, { useState, useEffect } from "react";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { API_IMAGE } from "../../../services/book.service";
import PaginationComponent from "./Pagination";
import { useNavigate } from 'react-router-dom';
// import BookService from "../../../services/book.service";
import DeleteBook from "./DeleteBook";
import RootService from "../../../services/root.service";

function ListBook () {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    // Fetch data here using the Material-UI component
    // Update state as needed
    RootService.BookService.getAllBooks(currentPage, pageSize).then((res) => {
      setBooks(res.data.content);
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    }).catch(error => console.log(error));
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage - 1);
  };

  const editBook = (id) => {
    navigate(`/admin/update-book/${id}`);
  };

  const handleOpenModal = (bookId) => {
    setModalState((prevState) => ({
      ...prevState,
      [bookId]: true,
    }));
    console.log('Đã mở')
  };

  const handleCloseModal = (bookId) => {
    setModalState((prevState) => ({
      ...prevState,
      [bookId]: false,
    }));
    console.log('Đã đóng');
  };

  return (
    <>
    {/* <div> */}
      <Typography variant="h5" align="center" gutterBottom>
        Danh sách sách
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/admin/newbook" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </div>
      <br />
      <div>
        <TableContainer component={Paper} elevation={2}>
          <Table sx={{ minWidth: 650 }} aria-label="book table">
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên sách</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Tác vụ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow 
                  key={book.bookId}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5", /* Màu nền khi hover */
                      cursor: "pointer", /* Thay đổi hình con trỏ */
                    },
                  }}
                >
                  <TableCell>{book.bookId}</TableCell>
                  <TableCell>{book.bookName}</TableCell>
                  <TableCell>
                    {book.images?.[0]?.idImage ? (
                      <img
                        className="Avatar"
                        width={40}
                        height={40}
                        src={`${API_IMAGE}${book.images[0].idImage}`}
                        alt={book.bookName}
                      />
                    ) : (
                      "Không có hình ảnh"
                    )}
                  </TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editBook(book.bookId)} color="info" sx={{ "&:hover": { backgroundColor: "#17a2b8" } }}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenModal(book.bookId)} color="error" sx={{ "&:hover": { backgroundColor: "#dc3545" } }}>
                      <RiDeleteBin6Line />
                    </IconButton> 
                    {/* Modal */}
                    {modalState[book.bookId] && (
                      <div>
                        <DeleteBook bookId={book.bookId} onClose={() => handleCloseModal(book.bookId)} />
                        {/* Thêm nút Đóng ở đây */}
                      </div>
                    )}                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            marginTop: '16px', // Khoảng cách từ phía trên
            marginBottom: '16px', // Khoảng cách từ phía dưới
            display: 'flex',
            justifyContent: 'flex-end', // Đặt justify-content sang phải
          }}
        >
        <PaginationComponent 
          totalPages={totalPages} 
          currentPage={currentPage + 1} 
          onChangePage={handlePageChange} 
        />
        </div>
      </div>
    {/* </div> */}
    </>
  );
};

export default ListBook;
