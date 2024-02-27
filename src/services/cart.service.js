// import axios from "axios";
// import authHeader from "./auth-header";

// // const API_URL = "http://localhost:8089/api/cart/";


// // const getCart = (userId) => {
// //     return axios.get(`${API_URL}getCart/${userId}`, { headers: authHeader() });
// // };

// // const cartService = {
// //     getCart
// // };

// const API_URL = "http://localhost:8089/api/cart/";

// const getCart = (id) => {
// //   const accessToken = localStorage.getItem('accessToken');
// //   const config = {
// //     headers: { Authorization: `Bearer ${accessToken}` },
// //   };
//   return axios.get(`${API_URL}getCart/${id}`, { headers: authHeader() });
// };
// // const cartRequest = {userId : 1, bookId : 1, quantity : 1};
// const createCartItem = (userId, bookId, quantity) => {
//   return axios
//     .post(`${API_URL}`, { 
//       headers: authHeader(),
//       userId,
//       bookId,
//       quantity
//     });
// }

// // const login = async (username, password) => {
// //   return axios
// //     .post(API_URL + "signin", {
// //       username,
// //       password
// //     })
// //     .then((response) => { {/** nếu accessToken tồn tại localStorage(lưu dữ liệu dưới dạng key value ở máy user) gán lưu dữ liệu cho user với chuỗi nhận vào*/}
// //       if (response.data.accessToken) {
// //         localStorage.setItem("user", JSON.stringify(response.data));
// //       }
// //       return response.data;
// //     });
// // };

// // Hàm để xóa một mục giỏ hàng dựa trên id
// const deleteCartItem = async (itemId) => {
//   try {
//     const response = await axios.delete(`http://localhost:8089/api/cart/delete/${itemId}`);
//     if (response.status >= 200 && response.status <= 300) {
//       console.log('Xóa thành công');
//     } else {
//       console.log('Xóa thất bại');
//     }
//   } catch (error) {
//     console.error('Lỗi khi gọi API xóa mục giỏ hàng:', error);
//   }
// };

// const cartService = {
//   getCart,
//   createCartItem,
//   deleteCartItem
// };

// // export default cartService;

// export default cartService;

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8089/api/cart/';

const getCart = (userId) => {
  return axios.get(API_URL + `getCart/${userId}`, { headers: authHeader() });
};

const createCartItem = (cartRequest) => {
  return axios.post(API_URL, cartRequest, { headers: authHeader() });
};

const updateQuantityInCartItem = (cartItemId, cartItemRequest) => {
  return axios.put(API_URL + `${cartItemId}`, cartItemRequest, { headers: authHeader() });
};

const deleteCartItem = (cartItemId) => {
  return axios.delete(API_URL + `delete/${cartItemId}`, { headers: authHeader() });
};

const CartItemService = {
  getCart,
  createCartItem,
  updateQuantityInCartItem,
  deleteCartItem,
};

export default CartItemService;
