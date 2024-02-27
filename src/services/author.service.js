// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "http://localhost:8089/api/authors";

// const getAllAuthors = () => {
//     return axios.get(API_URL);
// };

// const createAuthor = () => {
//     return axios.post(API_URL, { headers: authHeader() });
// };

// const getAuthorById = (id) => {
//     return axios.get(API_URL + '/' + id, { headers: authHeader() });
// };

// const updateAuthor = (id) => {
//     return axios.put(API_URL + '/' + id, { headers: authHeader() });
// };

// const deleteAuthor = (id) => {
//     return axios.delete(API_URL + '/' + id, { headers: authHeader() });
// };

// const AuthorsService = {
//     getAllAuthors,
//     createAuthor,
//     getAuthorById,
//     updateAuthor,
//     deleteAuthor,
// };

// export default AuthorsService;
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/authors/';

const getAllAuthors = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createAuthor = (author) => {
  return axios.post(API_URL, author, { headers: authHeader() });
};

const getAuthorById = (authorId) => {
  return axios.get(API_URL + authorId, { headers: authHeader() });
};

const updateAuthor = (authorId, authorDetails) => {
  return axios.put(API_URL + authorId, authorDetails, { headers: authHeader() });
};

const deleteAuthor = (authorId) => {
  return axios.delete(API_URL + authorId, { headers: authHeader() });
};

const countAuthors = () => {
  return axios.get(API_URL + 'count', { headers: authHeader() });
};

const countBooksByAuthor = () => {
  return axios.get(API_URL + 'countBooks', { headers: authHeader() });
};

const AuthorService = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  countAuthors,
  countBooksByAuthor,
};

export default AuthorService;
