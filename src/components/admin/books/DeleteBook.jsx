import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, Button, Tooltip } from "@mui/material";
import RootService from '../../../services/root.service';

function DeleteBook({ bookId, onClose }) {
  const [message, setMessage] = useState('');

  const handleDeleteSoft = async () => {
    // Gửi yêu cầu HTTP để xóa mềm sách
    // axios
    //   .put(`http://localhost:8089/api/v1/books/delete/${bookId}`)
    try {
      // Gửi yêu cầu HTTP để xóa mềm sách
      // const response = await axios.put(`http://localhost:8089/api/v1/books/delete/${bookId}`);
      const response = await RootService.BookService.deleteBookByStatus(bookId);
      setMessage(`Xóa mềm sách thành công!`);
    } catch (error) {
      setMessage(`Lỗi: ${error.response.data.message}`);
    }
  };

  const handleDeletePermanent = async () => {
    // Gửi yêu cầu HTTP để xóa vĩnh viễn sách
    // axios
    //   .delete(`http://localhost:8089/api/v1/books/${bookId}`)
    //   .then((response) => {
    //     setMessage(`Xóa vĩnh viễn sách thành công!`);
    //   })
    //   .catch((error) => {
    //     setMessage(`Lỗi: ${error.response.data.message}`);
    //   });
    try {
      const response = await RootService.BookService.deleteBook(bookId);
      setMessage(`Xóa vĩnh viễn sách thành công!`)
    } catch (error) {
      setMessage(`Lỗi không thể xóa khi tồn tại đơn hàng: ${error.response.data.message}`)
    }
      // onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <h2>Xóa Sách</h2>
        <div>
          <label>Mã Sách: {bookId}</label>
        </div>
        <div>
          <Button onClick={handleDeleteSoft} variant="contained" color="primary">
            Ẩn
          </Button>
          <Button onClick={handleDeletePermanent} variant="contained" color="secondary">
            Xóa
          </Button>
        </div>
        <Tooltip title={message}>{message}</Tooltip>
        <Button onClick={onClose}>Đóng</Button>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBook;
