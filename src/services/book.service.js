// // import axios from 'axios';
// import httpCommon from '../helpers/http-common';

// const API_IMAGE = `http://localhost:8089/api/v1/images/`
// export { API_IMAGE };

// const getAllBooks = (page, size) => {
//     return httpCommon.get(
//         `/books?page=${page}&size=${size}`,
//         {
//             params: {
//             page: page,
//             size: size
//             }
//         }
//     );
// };

// const createBook = (book) => {
//     return httpCommon.post("/create", book);
// }
// // return httpCommon.get(BOOK_API_BASE_URL + '/' , bookId); " , " tạo đường dẫn hoàn chỉnh
// const getBookById = (bookId) => {
//     return httpCommon.get(`/books/${bookId}`, bookId);
// }

// const updateBook = (bookId, data) => {
//     return httpCommon.put(`/books/update/${bookId}`, data);
// }

// const deleteBook = (bookId) => {
//     return httpCommon.put(`/books/delete/${bookId}`, bookId);
// }

// const BookService = {
//     getAllBooks,
//     createBook,
//     getBookById,
//     updateBook,
//     deleteBook
// }


// export default BookService;

import axios from 'axios';
import authHeader from './auth-header';

const API_IMAGE = `http://localhost:8089/api/v1/images/`
export { API_IMAGE };

const API_URL = 'http://localhost:8089/api/v1/books/';

const getAllBooks = (page, size, status) => {
  return axios.get(API_URL, {
    headers: authHeader(),
    params: { page, size, status }
  });
};

const createBook = (bookRequest) => {
  return axios.post(API_URL, bookRequest, { headers: authHeader() });
};

const getBookById = (bookId) => {
  return axios.get(API_URL + bookId, { headers: authHeader() });
};

const updateBook = (bookId, bookRequest) => {
  return axios.put(API_URL + bookId, bookRequest, { headers: authHeader() });
};

const deleteBookByStatus = (bookId) => {
  return axios.put(API_URL + `delete/${bookId}`, null, { headers: authHeader() });
};

const deleteBook = (bookId) => {
  return axios.delete(API_URL + bookId, { headers: authHeader() });
};

const getSellStatistics = () => {
  return axios.get(API_URL + 'sell-statistics', { headers: authHeader() });
};

const getAllStatistics = () => {
  return axios.get(API_URL + 'all-statistics', { headers: authHeader() });
};

const getBestSellingBooks = () => {
  return axios.get(API_URL + 'best-selling-books', { headers: authHeader() });
};

const BookService = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBookByStatus,
  deleteBook,
  getSellStatistics,
  getAllStatistics,
  getBestSellingBooks,
};

export default BookService;
