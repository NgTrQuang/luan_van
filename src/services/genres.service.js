import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/genres/';

const getAllGenres = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createGenre = (genre) => {
  return axios.post(API_URL, genre, { headers: authHeader() });
};

const getGenreById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const updateGenre = (id, genreDetails) => {
  return axios.put(API_URL + id, genreDetails, { headers: authHeader() });
};

const deleteGenre = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const countGenres = () => {
  return axios.get(API_URL + 'count', { headers: authHeader() });
};

const countBooksByGenre = () => {
  return axios.get(API_URL + 'countBooks', { headers: authHeader() });
};

const GenreService = {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
  countGenres,
  countBooksByGenre,
};

export default GenreService;
