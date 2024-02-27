// import React,  { Fragment, useState, useEffect } from "react";
// import React, {Fragment} from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import AuthService from "./services/auth.service";

import Home from "../src/layout/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import FilterableBookGrid from "./components/books/FilterableBookGrid";
import BookDetails from "./components/books/BookDetails";
import Profile from "./components/auth/Profile";
//import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/moderator/BoardModerator";
import BoardAdmin from "./components/admin/BoardAdmin";

// import EventBus from "./common/EventBus";

import Header from "../src/layout/header/Header";
import ListBook from "./components/admin/books/ListBook";
import UpdateBook from "./components/admin/books/UpdateBook";
import Address from "./components/address/Address";
// import DeleteBook from "./components/admin/books/DeleteBook";
import NewBook from "./components/admin/books/NewBook";
import Footer from "../src/layout/footer/Footer";
import Image from "./components/images/Image";
import UploadImage from "./components/images/UploadImage";
// import CreateCartItem from "./components/cart/CreateCartItem";
// import { CartProvider } from "./components/context/CartContext";
import CartItemDetails from "./components/cart/CartItemDetails"
import Invoice from "./components/invoice/Invoice";
import UserAddressList from "./components/address/UserAddressList";
import AddressById from "./components/address/AddressById";
import AddressAll from "./components/address/AddressAll";
import UpdateAdressUser from "./components/user/UpdateAddressUser";
import UpLoadOneImage from "./components/images/UpLoadOneImage";
import ResponsePayment from "./components/invoice/ResponsePayment";
import Successfullly from "./components/notification/Successfully";
import Error from "./components/notification/Error";
import AdminRoute from "./route/AdminRoute";

const currentUser = AuthService.getCurrentUser();
// const [cartItems, setCartItems] = useState([]);

const App = () => {

const [isNotification, setIsNotification] = useState(true);

  return (
    // <UserProvider value={currentUser}>   
    <>
    {isNotification && <Header currentUser={currentUser} />}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<FilterableBookGrid currentUser={currentUser}/>} />
          <Route path="/books/:bookId" element={<BookDetails currentUser={currentUser}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile currentUser={currentUser}/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          {/* <Route path="/admin" element={<BoardAdmin/>}/> */}
          <Route path="/admin/*" element={<AdminRoute currentUser={currentUser}/>} />
          <Route path="/cart/detail" element={<CartItemDetails/>} />
          <Route path="/address" element={<Address/>}/>
          {/* <Route path="/books-all" element={<ListBook/>}/> */}
          {/* <Route path="/newbook" element={<NewBook/>}/> */}
          {/* <Route path="/update-book/:bookId" element={<UpdateBook/>}/> */}
          <Route path="/image/:imageId" element={<Image/>}/>
          <Route path="/avatar" element={<UpLoadOneImage/>}/>
          <Route path="/image/create" element={<UploadImage/>}/>
          <Route path="/invoice" element={<Invoice/>}/>
          <Route path="/address_to_user" element={<UserAddressList/>}/>
          <Route path="/address_detail" element={<AddressById/>}/>
          <Route path="/address_all" element={<AddressAll/>}/>
          <Route path="/update_address_user" element={<UpdateAdressUser/>}/>
          <Route path="/payment_success" element={<ResponsePayment/>}/>
          {/* <Route path="/paymentform" element={<PaymentForm/>}/> */}
          <Route path="/successfully" element={<Successfullly setIsNotification={setIsNotification}/>}/>
          <Route path="/error" element={<Error setIsNotification={setIsNotification}/>}/>
        </Routes>
      </div>
      {isNotification && <Footer />}
      {/* <Test /> */}
    </>
    // </UserProvider>
  );
};

export default App;
