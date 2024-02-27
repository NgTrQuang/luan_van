import React, { useState, useEffect } from "react";
// import ListBookComponent from "../components/ListBookComponent";
// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import UserService from "../../services/test.service";
import EventBus from "../../common/EventBus";
import { Link } from "react-router-dom";
import RootService from "../../services/root.service";
// import BookService from "../services/BookService";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  // const [books, setBooks] = useState([])


  useEffect(() => {
    RootService.TestService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    )
  //   BookService.getAllBooks().then(
  //   (response) => {
  //     setBooks(response.data);
  //   },
  //   (error) => {
  //     const _books =[
  //       (error.response && error.response.data) ||
  //       error.message ||
  //       error.toString()];

  //       setBooks(_books);
  //   }
  // )
  // 
}, []);

  //


  //

  return (
    <>
    <main className="container">
        <div id= 'wrapper'>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-left" href="/admin">
                {/* <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div> */}
                <div className="sidebar-brand-text mx-3">
                    <i className="fas fa-fw fa-solid fa-gauge-high" style={{color: "#aec2e5",}}></i>
                    {content}
                </div>
            </a>

            {/* <!-- Divider --> */}
            {/* <hr></hr> */}

            {/* <!-- Nav Item - Dashboard --> */}
            {/* <li className="nav-item active">
                <a className="nav-link" href="#">
                    <i className="fas fa-fw fa-solid fa-gauge-high" style={{color: "#aec2e5",}}></i>
                    <span>Quản lý</span></a>
            </li> */}
            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                Thống kê và báo cáo
            </div>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="/admin/statistical" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-thin fa-file" style={{color: "#a3bbe6",}}></i>
                    <span>Thống kê</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="/admin/books-all" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-light fa-chart-simple" style={{color: "#a3bbe6",}}></i>
                    <span>Báo cáo</span>
                </Link>
            </li>
            

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider"/>

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Tác vụ
            </div>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/admin/books-all" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-regular fa-book" style={{color: "#a3bbe6",}}></i>
                    <span>Sách</span>
                </Link>
                {/* <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div> */}
            </li>

            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-thin fa-id-badge" style={{color: "#a3bbe6",}}></i>
                    <span>Tác giả</span>
                </Link>
                {/* <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div> */}
            </li>

            {/* <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-thin fa-user" style={{color: "#a3bbe6",}}></i>
                    <span>Người dùng</span>
                </Link>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li> */}

            <li className="nav-item">
                <Link className="nav-link collapsed" to="/admin/invoices" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-regular fa-book" style={{color: "#a3bbe6",}}></i>
                    <span>Đơn hàng</span>
                </Link>
                {/* <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div> */}
            </li>

            {/* <!-- Divider --> */}
            {/* <hr className="sidebar-divider"/> */}

            {/* <!-- Heading --> */}
            {/* <div className="sidebar-heading">
                Addons
            </div> */}

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            {/* <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Login</a>
                        <a className="collapse-item" href="register.html">Register</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li> */}

            {/* <!-- Nav Item - Charts --> */}
            {/* <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li> */}

            {/* <!-- Nav Item - Tables --> */}
            {/* <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li> */}

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block"/>

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            {/* <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div> */}

            {/* <!-- Sidebar Message --> */}
            {/* <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div> */}
        </ul>
            
        </div>
    </main>
    </>
  );
};

export default BoardAdmin;
