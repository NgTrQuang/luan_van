import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import {
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Typography
} from '@mui/material';
import axios from 'axios';
import RootService from '../../services/root.service';
// import UpdateInvoiceAction from './UpdateInvoiceAction';

const columns = [
  // { id: 'invoiceId', label: 'Mã', minWidth: 50 },
  // { id: 'paymentMethod', label: 'Phương thức thanh toán', minWidth: 50 },
  { id: 'timeCreate', label: 'Thời gian tạo', minWidth: 100 },
  { id: 'totalPrice', label: 'Giá trị', minWidth: 100 },
  { id: 'wasPay', label: 'Trạng thái thanh toán', minWidth: 50 },
  { id: 'action', label: 'Trạng thái đơn hàng', minWidth: 50 },
  { id: 'address.fulladdress', label: 'Địa chỉ nhận hàng', minWidth: 200 },
  { id: 'actions', label: 'Thao tác', minWidth: 200 },
];

const UserProcessingInvoice = ({ user }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [invoices, setInvoices] = useState([]);

  // const [newAction, setNewAction] = useState(0); // Giả sử mặc định là 'Đang xử lý'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  //

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // const response = await axios.get(`http://localhost:8089/api/invoice/getPendingInvoicesByUserId/${user.userId}`);
        const response = await RootService.InvoiceService.getPendingInvoicesByUserId(user.userId);
        // Chuyển đổi dữ liệu khi nhận được từ API
        const formattedInvoices = response.data.map(convertInvoiceData);
        setInvoices(formattedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  // Chuyển đổi dữ liệu
  const convertInvoiceData = (invoice) => {
    return {
      ...invoice,
      // wasPay: invoice.wasPay === true ? 'Đã thanh toán' : 'Chưa thanh toán',
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

  const actionOptionsFailure = ['Đã hủy', 'Trả hàng'];

  const handleDeleteClick = async (invoiceId, currentAction) => {
    try {
      // console.log('Delete clicked for invoice with ID:', invoiceId);
      let newAction = currentAction;
      // Kiểm tra trạng thái của đơn hàng
      if (currentAction === "Đang xử lý") {
        // Thực hiện hành động "Đã hủy"
        console.log(`Cancel clicked for invoice with ID: ${invoiceId}`);
        newAction = actionOptionsFailure[0];
        console.log(`newAction: `, newAction);
      } else if (currentAction === "Đã nhận hàng") {
        // Thực hiện hành động "Trả hàng"
        console.log(`Return clicked for invoice with ID: ${invoiceId}`);
        newAction = actionOptionsFailure[1];
        console.log(`newAction: `, newAction);
      }
  
      // Gọi API hoặc thực hiện các hành động cần thiết để xóa đơn hàng
      // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${newAction}`);
      const response = await RootService.InvoiceService.updateInvoiceAction(invoiceId, newAction);

      // Cập nhật trạng thái trong danh sách invoices
      const updatedInvoices = invoices.map((invoice) => {
        if (invoice.invoiceId === invoiceId) {
          if (newAction === 'Trả hàng' || newAction === 'Đã hủy'){
            if (invoice.wasPay === 'Đã thanh toán'){
              return { ...invoice, action: newAction, wasPay: 'Chờ hoàn tiền' };
            } else
            return { ...invoice, action: newAction };
          }
        }
        // console.log('Converted Invoice:', invoice);
        return invoice;
      });

      setInvoices(updatedInvoices);
      setSnackbarSeverity('success');
      setSnackbarMessage('Cập nhật thành công!');
      console.log(`Delete clicked for invoice with ID: ${invoiceId}`);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };
  
  return (
    <>
    <Typography variant='h5' sx={{marginBottom: '16px'}}>Danh sách đơn hàng</Typography>
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
                    {column.id === 'address.fulladdress' && (
                      row.address.fulladdress
                    )}

                    {column.id !== 'address.fulladdress' && (
                      row[column.id]
                    )}

                    {column.id === 'actions' && (
                      <div>
                        { 
                          (row.action === "Đang xử lý" || row.action === "Đã nhận hàng") ? 
                          (<IconButton onClick={() => handleDeleteClick(row.invoiceId, row.action)}>
                            <DisabledByDefaultOutlinedIcon />
                          </IconButton>) : <></>
                        }
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </Paper>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
};

export default UserProcessingInvoice;
