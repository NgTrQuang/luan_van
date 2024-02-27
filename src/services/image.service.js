import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/v1/images/';

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...authHeader(),
    },
  });
};

const uploadMultipleFiles = (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  return axios.post(API_URL + 'many', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...authHeader(),
    },
  });
};

const downloadFile = (id) => {
  return axios.get(API_URL + id, {
    responseType: 'blob',
    headers: authHeader(),
  });
};

const getAllImages = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const deleteFile = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const ImageService = {
  uploadFile,
  uploadMultipleFiles,
  downloadFile,
  getAllImages,
  deleteFile,
};

export default ImageService;
