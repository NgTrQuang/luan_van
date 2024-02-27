// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "http://localhost:8089/api/user/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {

//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

// const UserService = {
//   getPublicContent,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
// };

// export default UserService;
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/user/";

const getAllUsers = () => {
  return axios.get(API_URL + "getAll");
};

const getUserById = (userId) => {
  return axios.get(API_URL + userId);
};

const updateUserInformation = (userId, userInformationRequest) => {
  return axios.put(API_URL + "updateUserInformation/" + userId, userInformationRequest, { headers: authHeader() });
};

const updateUserAvatar = (userId, userAvatarRequest) => {
  return axios.put(API_URL + "updateUserAvatar/" + userId, userAvatarRequest, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  });
};

const updatePassword = (userId, passwordRequest) => {
  return axios.put(API_URL + "updatePassword/" + userId, passwordRequest, { headers: authHeader() });
};

const updateAddress = (addressId, addressRequest) => {
  return axios.put(API_URL + "updateAddress/" + addressId, addressRequest, { headers: authHeader() });
};

const softDeleteUser = (userId) => {
  return axios.delete(API_URL + userId, { headers: authHeader() });
};

const hardDeleteUser = (userId) => {
  return axios.delete(API_URL + "delete/" + userId, { headers: authHeader() });
};

const userReactivationById = (userId) => {
  return axios.put(API_URL + "reactivation/" + userId, {}, { headers: authHeader() });
};

const countUsers = () => {
  return axios.get(API_URL + "count", { headers: authHeader() });
};

const UserService = {
  getAllUsers,
  getUserById,
  updateUserInformation,
  updateUserAvatar,
  updatePassword,
  updateAddress,
  softDeleteUser,
  hardDeleteUser,
  userReactivationById,
  countUsers,
};

export default UserService;
