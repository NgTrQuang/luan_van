import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.service";
import { useCart } from '../context/CartContext';
import { Button } from '@mui/material';
import RootService from '../../services/root.service';

const CreateCartItem = ({ bookId, quantity, setQuantity }) => {
  const currentUser = AuthService.getCurrentUser();

  const { cartItems, setCartItems, isCart, setIsCart, fetchCartData } = useCart();

  // const [userId, setUserId] = useState(null); // Sử dụng state để lưu trữ userId
//   const [bookId, setBookId] = useState(''); // Sử dụng state để lưu trữ bookId
  const [message, setMessage] = useState('');
  // console.log(currentUser);
  // console.log(currentUser.id);
  // console.log(userId);
  console.log(bookId);
  console.log(quantity);


  const handleCreateCartItem = async () => {
    // Kiểm tra dữ liệu đầu vào
    // if (!currentUser || !bookId || !quantity || quantity < 1) {
    if(!currentUser || !bookId || !quantity || quantity < 1){
      window.location.href = '/login';
      setMessage('Vui lòng cung cấp thông tin hợp lệ.');
      return console.error(message);
    }
    // setUserId(currentUser.id);
    // console.log(currentUser.id);
    
    const cartRequest = {
      user_id: currentUser.id,
      book_id: bookId,
      quantity,
    };

    try {
      // Gọi API để tạo một mục giỏ hàng mới
      // const response = await axios.post('http://localhost:8089/api/cart/', {
      //   user_id: currentUser.id,
      //   book_id: bookId,
      //   quantity,
      // });

      const response = await RootService.CartItemService.createCartItem(cartRequest);
      console.log(response.data);

      // setCartItems()
      if (response.status === 201) {
        // Xử lý khi tạo thành công
        setMessage('Sản phẩm đã được thêm vào giỏ hàng.');
        setQuantity(1); // Xóa quantity sau khi thêm vào giỏ hàng
      }
      fetchCartData(currentUser.id);
    } catch (error) {
      // Xử lý khi có lỗi
      setMessage('Lỗi: Không thể thêm sản phẩm vào giỏ hàng.');
    }
    console.log(message);
    // console.log(userId);
    console.log(bookId);
    console.log(quantity);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateCartItem}>Thêm vào giỏ</Button>
      {/* <p>{message}</p> */}
    </div>
  );
}

export default CreateCartItem;
