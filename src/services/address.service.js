import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/address/';

const getAllAddressByUser = (userId) => {
  return axios.get(API_URL + `getAllAddressByUser/${userId}`, { headers: authHeader() });
};

const getAllAddresses = () => {
  return axios.get(API_URL + 'allAddresses', { headers: authHeader() });
};

const getAddressById = (addressId) => {
  return axios.get(API_URL + addressId, { headers: authHeader() });
};

const createAddress = (addressRequest) => {
  return axios.post(API_URL + 'create', addressRequest, { headers: authHeader() });
};

const updateAddress = (addressId, addressRequest) => {
  return axios.put(API_URL + addressId, addressRequest, { headers: authHeader() });
};

const softDeleteAddressById = (addressId) => {
  return axios.delete(API_URL + addressId, { headers: authHeader() });
};

const hardDeleteAddressById = (addressId) => {
  return axios.delete(API_URL + `delete/${addressId}`, { headers: authHeader() });
};

const AddressService = {
  getAllAddressByUser,
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  softDeleteAddressById,
  hardDeleteAddressById,
};

export default AddressService;
