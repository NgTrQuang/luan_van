// AdminRoutes.jsx
import React from 'react';
import { Route, Outlet, Routes } from 'react-router-dom';
import ErrorPage from '../components/admin/ErrorPage';
import BoardAdmin from '../components/admin/BoardAdmin';
import UpdateBook from '../components/admin/books/UpdateBook';
import ListBook from '../components/admin/books/ListBook';
import NewBook from '../components/admin/books/NewBook';
import GenreStatistics from '../components/admin/statistical/genres/GenreStatistics';
import Combine from '../components/admin/statistical/Combine';
import Invoices from '../components/admin/invoice/Invoices';
import UpdateInvoiceAction from '../components/admin/invoice/UpdateInvoiceAction';

const AdminRoute = ({ currentUser }) => {
  // Kiểm tra xem currentUser có tồn tại và có thuộc tính roles không
  if (!currentUser || !currentUser.roles) {
    return <ErrorPage />;
  }

  // Kiểm tra xem người dùng có quyền "ROLE_ADMIN" không
  const isAdmin = currentUser.roles.includes("ROLE_ADMIN");

  // Nếu không phải admin, có thể chuyển hướng hoặc hiển thị thông báo
  if (!isAdmin) {
    return <ErrorPage />;
  }

  return (
    <Routes>
      <Route path="/*" element={<BoardAdmin />} />
      <Route
        path="update-book/:bookId"
        element={<UpdateBook />}
      />
      <Route path="/books-all" 
        element={<ListBook/>}
      />
      <Route path="/newbook" element={<NewBook/>}/>
      <Route path="/statistical" element={<Combine/>}/>
      <Route path="/invoices" element={<Invoices/>}/>
      <Route path="/invoice/update" element={<UpdateInvoiceAction/>}/>
    </Routes>
  );
};

export default AdminRoute;
