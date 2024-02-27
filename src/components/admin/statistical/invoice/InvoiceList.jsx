import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import axios from 'axios';
import RootService from '../../../../services/root.service';

const columns = [
  { id: 'invoiceId', label: 'Mã', minWidth: 50 },
  { id: 'paymentMethod', label: 'Phương thức thanh toán', minWidth: 50 },
  { id: 'timeCreate', label: 'Thời gian tạo', minWidth: 100 },
  { id: 'totalPrice', label: 'Giá trị', minWidth: 100 },
  { id: 'wasPay', label: 'Trạng thái thanh toán', minWidth: 50 },
  { id: 'action', label: 'Trạng thái đơn hàng', minWidth: 50 },
  { id: 'address.fulladdress', label: 'Địa chỉ nhận hàng', minWidth: 200 },
  // { id: 'actions', label: 'Thao tác', minWidth: 200 },
];

const InvoiceList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // const response = await axios.get('http://localhost:8089/api/invoice/getAllInvoices');
        const response = await RootService.InvoiceService.getAllInvoices();
        // Chuyển đổi dữ liệu khi nhận được từ API
        const formattedInvoices = response.data.map(convertInvoiceData);
        setInvoices(formattedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  // const actionMapping = {
  //   0: 'Đang xử lý',
  //   1: 'Đã xác nhận',
  //   2: 'Đang vận chuyển',
  //   3: 'Đã nhận hàng',
  //   4: 'Đã hủy',
  // };

  // Chuyển đổi dữ liệu
  const convertInvoiceData = (invoice) => {
    return {
      ...invoice,
      wasPay: invoice.wasPay === true ? 'Đã thanh toán' : 'Chưa thanh toán',
      action: invoice.action,
      timeCreate: format(new Date(invoice.timeCreate), 'dd/MM/yyyy HH:mm:ss'),
      totalPrice: invoice.totalPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }),
    };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event, index, columnName) => {
    const newInvoices = [...invoices];
    newInvoices[index][columnName] = event.target.value;
    setInvoices(newInvoices);
  };

  // const handleEditClick = (invoiceId) => {
  //   // Xử lý khi nút "Sửa" được nhấn
  //   console.log('Edit clicked for invoice with ID:', invoiceId);
  // };

  // const handleDeleteClick = (invoiceId) => {
  //   // Xử lý khi nút "Xóa" được nhấn
  //   console.log('Delete clicked for invoice with ID:', invoiceId);
  // };

  return (
    <Paper sx={{marginBottom: '16px'}}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : convertInvoiceData(invoices)
            ).map((row, index) => (
              <TableRow key={row.invoiceId}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {/* {column.id === 'wasPay' && (
                      <Select
                        value={row[column.id]} // Chuyển đổi sang kiểu string
                        onChange={(event) => handleStatusChange(event, index, column.id)}
                        displayEmpty
                      >
                        {[
                          <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>,
                          <MenuItem value="Chưa thanh toán">Chưa thanh toán</MenuItem>,
                        ]}
                      </Select>
                    )} */}

                    {/* {column.id === 'action' && (
                      <Select
                        value={row[column.id]} // Chuyển đổi sang kiểu string
                        onChange={(event) => handleStatusChange(event, index, column.id)}
                        displayEmpty
                      >
                        {[
                          <MenuItem value="Đã nhận hàng">Đã nhận hàng</MenuItem>,
                          <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>,
                        ]}
                      </Select>
                    )} */}

                    {column.id === 'address.fulladdress' ? (
                      row.address.fulladdress
                    ): (row[column.id])}

                    {/* {column.id !== 'wasPay' && column.id !== 'action' && column.id !== 'address.fulladdress' && (
                      row[column.id]
                    )} */}

                    {/* {column.id === 'actions' && (
                      <div>
                        <IconButton onClick={() => handleEditClick(row.invoiceId)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(row.invoiceId)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </Paper>
  );
};

export default InvoiceList;
