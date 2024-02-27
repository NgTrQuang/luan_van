import React, { createContext, useContext, useState, useMemo } from 'react';
import cartService from "../../services/cart.service";
import RootService from '../../services/root.service';

// Tạo một Context cho giỏ hàng
const CartContext = createContext();

// Tạo một Provider cho giỏ hàng
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  //checked item
  const [checkedItems, setCheckedItems] = useState({});

  // Hàm gọi cập nhật lại giỏ hàng
  const fetchCartData = async (userId) => {
    try {
      if (userId) {
        const response = await RootService.CartItemService.getCart(userId);
        setCartItems(response.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm gọi xóa giỏ hàng
  const deleteCartItem = async (cartId) => {
    try {
      if (cartId) {
        await RootService.CartItemService.deleteCartItem(cartId);
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.cartItemId !== cartId));
        // if (cartItems.length === 0){
        //   setIsCart(false);
        // }
      }else {
        console.log('Xóa thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa mục giỏ hàng:', error);
    }
  };

  // const getTotalPrice = () => {
  //   const total = cartItems.reduce((accumulator, cart) => {
  //     return accumulator + cart.book.price * cart.quantity;
  //   }, 0);
  //   return total;
  // }; 

  // const calculateTotalPrice = useMemo(() => {
  //   return cartItems.reduce((accumulator, cart) => {
  //     if (selectedItems[cart.cartItemId]) {
  //       accumulator += cart.book.price * cart.quantity;
  //     }
  //     return accumulator;
  //   }, 0);
  // }, [cartItems, selectedItems]);
  
  const calculateTotalPrice = useMemo(() => {
    const selectedCartItems = cartItems.filter(cartItem => selectedItems[cartItem.cartItemId]);
    return selectedCartItems.map(cartItem => cartItem.book.price * cartItem.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }, [cartItems, selectedItems]);

  const countItems = cartItems.reduce((acc, cart) => {
    acc += 1;
    return acc;
  }, 0);

  return (
    <CartContext.Provider value={{ checkedItems, setCheckedItems, selectedItems, setSelectedItems, calculateTotalPrice, countItems, fetchCartData, deleteCartItem, cartItems, setCartItems, isCart, setIsCart }}> 
      {children}
    </CartContext.Provider>
  );
}

// Hook để sử dụng giỏ hàng trong các thành phần
export function useCart() {
  return useContext(CartContext);
}
