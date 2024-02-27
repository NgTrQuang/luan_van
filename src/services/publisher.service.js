import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/publishingPlaces/";

const getAllPublishingPlaces = () => {
  return axios.get(API_URL , { headers: authHeader() });
};

const getPublishingPlaceById = (id) => {
  return axios.get(API_URL + id , { headers: authHeader() });
};

const createPublishingPlace = (publishingPlace) => {
  return axios.post(API_URL, publishingPlace, { headers: authHeader() });
};

const updatePublishingPlace = (id, updatedPublishingPlace) => {
  return axios.put(API_URL + id, updatedPublishingPlace, { headers: authHeader() });
};

const deletePublishingPlace = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const PublishingPlaceService = {
  getAllPublishingPlaces,
  getPublishingPlaceById,
  createPublishingPlace,
  updatePublishingPlace,
  deletePublishingPlace,
};

export default PublishingPlaceService;
