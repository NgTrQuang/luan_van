import React, { useEffect } from "react";
import cartService from "../../services/cart.service";
import { formatNumber } from '../../helpers/utils';
import { API_IMAGE } from "../../services/book.service";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import './cartitem.css';
import RootService from "../../services/root.service";

  const CartItem = () => {
    const { getTotalPrice, countItems, cartItems, setCartItems, isCart, setIsCart, deleteCartItem } = useCart();
    const { currentUser, user } = useUser();
    // console.log(isCart);
    useEffect(() => {
      // const id = currentUser.id; // Thay đổi userId tùy vào nhu cầu của bạn
      if (currentUser && cartItems.length === 0) { // && cartItems.length === 0
        // if(currentUser){
        RootService.CartItemService.getCart(currentUser.id) //currentUser.id
          .then((response) => {
            setCartItems(response.data);
            console.log(isCart);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, []);  // dependencies 

    // const total = cartItems.book.price * cartItems.quantity;

    const handleDeleteCartItem = (cartId) => {
      deleteCartItem(cartId);
    }

    // const getTotalPrice = () => {
    //   const total = cartItems.reduce((accumulator, cart) => {
    //     return accumulator + cart.book.price * cart.quantity;
    //   }, 0);
    //   return total;
    // };

    // const countItems = cartItems.reduce((acc, cart) => {
    //   acc += 1;
    //   return acc;
    // }, 0);

    // const handleLogout = () => {
    //   setCartItems([]);
    // }

  return (
    <div className="cart-item-container">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title"> 
          Giỏ hàng của bạn ({countItems}) 
        </h5>
        <button type="button" //nút đóng trên cùng
        className="btn-close text-reset" 
        data-bs-dismiss="offcanvas" aria-label="Close">
        </button>
      </div>
      <div className="offcanvas-body">
        
        
        {isCart ? ( // isCart
          <>
          {cartItems.length > 0 ? (
            <>
            {cartItems.map((cart) => ( 
            <figure key={cart.cartItemId} className="itemside mb-4">
              <div className="aside">
                <img src={`${API_IMAGE}${cart?.book?.images[0]?.idImage}`}
                className="border img-sm rounded" />
              </div>
              <figcaption className="info">
                <a href="#" className="btn btn-icon btn-light float-end" onClick={() => handleDeleteCartItem(cart.cartItemId)}>
                  <i className="fa fa-trash">
                  </i>
                </a>
                <p> {cart?.book?.bookName} </p>
                <span className="text-muted"> 
                  {formatNumber(cart?.book?.price)} x {cart.quantity} 
                </span> <br />
                <strong className="price"> 
                  {formatNumber(cart?.book?.price * cart.quantity)} 
                </strong>
              </figcaption>
            </figure>
            ))}
            <hr />
            <div className="mb-3">
              <Link to="/cart/detail" className="btn w-100 btn-success">
                Chi tiết giỏ hàng
              </Link>
            </div>
            </>
            ) : (
              <div className="mb-3">
                <p>Giỏ hàng của bạn đang trống.</p>
                {/* <img src={imageBackground} alt="Empty Cart" /> */}
                {/* Thêm nội dung khác thay thế tại đây */}
                {/* <Link to="/some-alternative-page" className="btn w-100 btn-primary">Điều hướng đến trang khác</Link> */}
              </div>
          )}
          </>
        ) : (
          <>
            <hr/>
            <div className="mb-3">
              <p>Đăng nhập để sử dụng giỏ hàng của bạn.</p>
              <Link to="/login" className="btn w-100 btn-success"> Đăng nhập </Link>
            </div>
          </>)
        }
        
        {/* <p className="mb-3 text-center"> 
          <img src="/images/payments.webp" height="22" />  
        </p> */}
      </div>
    </div>     
  );
}

export default CartItem;
