import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventBus from "../../common/EventBus";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import "../../layout/header/header.css";
import imageBackground from "../../assets/logo/book.jpg"

import logo from "../../assets/logo/logo.png";
import CartItem from "../../components/cart/CartItem";
import { useCart } from "../../components/context/CartContext";
import AuthService from "../../services/auth.service";
import { useUser } from "../../components/context/UserContext";
import { Box, Container, Grid } from "@mui/material";
import Banner from './Banner';

const Header = () => {
  // console.log('currentUser', currentUser)
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [isCart, setIsCart] = useState(false);
  const { cartItems, setCartItems, isCart, setIsCart, countItems } = useCart();
  const { currentUser } = useUser();

  // const [onReStartCart, setOnReStartCart] = useState(false);

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    // console.log('user.id==='+user.id);

    if (currentUser) {
      // setUser(currentUser);
      // setUser(currentUser);
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setOpenBoard(true);
      setIsCart(true);
      // setOnReStartCart(true);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setOpenBoard(false);
    setIsCart(false);
    setCartItems([]);
  };
  return (
    <>
      {/* card form above */}

      <aside
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvas_cart"
        style={{ 
          backgroundImage: `url(${imageBackground})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      >
        {/* tabIndex dùng để xác định thứ tự điều hướng của các phần tử khi dùng phím tab
          trên trang web trình duyệt sẽ tập trung vào phần tử có tabIndex theo thứ tự
          sắp xếp tăng dần nếu trùng sẽ ưu tiên thứ tự xuất hiện trên html trước và sau */}
        <CartItem />
        {/* currentUser = {currentUser} cartItems = {cartItems} setCartItems = {setCartItems} isCart={isCart} */}
      </aside>

      {/* <header className="header-wrapper bg-dark"> */}
      <header className="section-header">
        <section className="header-main">
          <div className="container">
            <div className="row gy-3 align-items-center">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              {/* <div className="col-lg-2 col-sm-4 col-4"> */}
                {/* <a href="http://localhost:3000" className="navbar-brand"> */}
                <Link to={"/"} className="navbar-brand">
                  <img src={logo} alt="Avatar Logo" style={{ maxWidth: 120 }} />
                </Link>
                {/* </a> */}
              {/* </div> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Banner/>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <div className="order-lg-last col-lg-5 col-sm-8 col-8"> */}
                <div className="float-end">
                  {/* Nút dropdown responsive */}
                  <div className="dropdown d-sm-none">
                    <button
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      id="responsiveDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user"></i>
                      <style>
                        {`
                          #responsiveDropdown::after {
                            display: none !important;
                          }
                        `}
                      </style>
                    </button>
                    {openBoard ? (
                      <>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="responsiveDropdown"
                        >
                          <Link to="/profile" className="dropdown-item">
                            {`Xin chào, ${
                              currentUser.lastname.charAt(0).toUpperCase() +
                              currentUser.lastname.slice(1)
                            }`}
                          </Link>
                          <Link
                            to="/"
                            className="dropdown-item"
                            onClick={logOut}
                          >
                            Đăng xuất
                          </Link>
                        </div>
                        <a
                          data-bs-toggle="offcanvas"
                          href="#offcanvas_cart"
                          className="btn btn-light"
                        >
                          <i className="fa fa-shopping-cart">
                            <i
                              className="rhf-cart-count"
                              style={{ color: "blue" }}
                            >
                              {countItems}
                            </i>
                          </i>
                          <span className="ms-1 d-none d-sm-inline-block">
                            Giỏ hàng
                          </span>
                        </a>
                      </>
                    ) : (
                      <>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="responsiveDropdown"
                        >
                          <Link to="/login" className="dropdown-item">
                            Đăng nhập
                          </Link>
                          <Link to="/register" className="dropdown-item">
                            Đăng ký
                          </Link>
                        </div>
                        <a
                          data-bs-toggle="offcanvas"
                          href="#offcanvas_cart"
                          className="btn btn-light"
                        >
                          <i className="fa fa-shopping-cart">
                            <i
                              className="rhf-cart-count"
                              style={{ color: "blue" }}
                            >
                              {countItems}
                            </i>
                          </i>
                          <span className="ms-1 d-none d-sm-inline-block">
                            Giỏ hàng
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                  {/* Nút đăng nhập cho màn hình lớn */}
                  <div className="d-none d-sm-inline-block">
                    {openBoard ? (
                      <div>
                        <div className="btn btn-light">
                          <i className="fa fa-user"></i>
                          <Link to="/profile" className="btn-btn-light">
                            <span className="ms-1 d-none d-sm-inline-block">
                              {`Xin chào, ${
                                currentUser.lastname.charAt(0).toUpperCase() +
                                currentUser.lastname.slice(1)
                              }`}
                            </span>
                          </Link>
                        </div>
                        <div className="btn btn-light">
                          <Link to="/" className="">
                            <span
                              onClick={logOut}
                              className="ms-2 d-none d-sm-inline-block"
                            >
                              Đăng xuất
                            </span>
                          </Link>
                        </div>
                        <a
                          data-bs-toggle="offcanvas"
                          href="#offcanvas_cart"
                          className="btn btn-light"
                        >
                          <i className="fa fa-shopping-cart">
                            <i
                              className="rhf-cart-count"
                              style={{ color: "blue" }}
                            >
                              {countItems}
                            </i>
                          </i>
                          <span className="ms-1 d-none d-sm-inline-block">
                            Giỏ hàng
                          </span>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <div className="btn btn-light">
                          <i className="fa fa-user"></i>
                          <Link to="/login" className="btn-btn-light">
                            <span className="ms-1 d-none d-sm-inline-block">
                              Đăng nhập
                            </span>
                          </Link>
                        </div>
                        <div className="btn btn-light">
                          <Link to="/register" className="btn-btn-light">
                            <span className="ms-2 d-none d-sm-inline-block">
                              Đăng ký
                            </span>
                          </Link>
                        </div>
                        <a
                          data-bs-toggle="offcanvas"
                          href="#offcanvas_cart"
                          className="btn btn-light"
                        >
                          <i className="fa fa-shopping-cart">
                            <i
                              className="rhf-cart-count"
                              style={{ color: "blue" }}
                            >
                              0
                            </i>
                          </i>
                          <span className="ms-1 d-none d-sm-inline-block">
                            Giỏ hàng
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              {/* </div> */}
            </Grid>
          </Grid>
            </div>
          </div>
        </section>

        <nav className="navbar navbar-light bg-gray-light navbar-expand-lg">
          <div className="container">
            <button
              className="navbar-toggler border"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar_main"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar_main">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link ps-0" href="/">
                    Trang chủ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Thể loại
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"/books"} className="nav-link">
                    Sách
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Liên hệ
                  </a>
                </li>
                {/* <li className="nav-item dropdown">
                      <a className="dropdown-toggle nav-link" href="" data-bs-toggle="dropdown">
                          Khác
                      </a>
                      <ul className="dropdown-menu">
                          <li> <a className="dropdown-item" href="">Lựa chọn 1 </a> </li>
                          <li> <a className="dropdown-item" href="">Lựa chọn 2</a> </li>
                          <li> <a className="dropdown-item" href="">Lựa chọn 3</a> </li>
                      </ul>
                    </li> */}

                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Quản lý chủ cửa hàng
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Quản lý
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
