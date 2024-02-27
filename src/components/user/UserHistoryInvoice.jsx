// import React, { useState, useEffect } from 'react';
// import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import axios from 'axios';

// const UserHistoryInvoice = ({ userId }) => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8089/api/invoice/getHistoryInvoicesByUserId/${userId}`);
//         setInvoices(response.data);
//       } catch (error) {
//         console.error('Error fetching invoices:', error);
//       }
//     };

//     fetchInvoices();
//   }, [userId]);

//   return (
//     <Paper>
//       <Typography variant="h5" sx={{ marginBottom: '16px' }}>
//         Lịch sử đơn hàng
//       </Typography>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Mã đơn hàng</TableCell>
//               <TableCell>Thời gian tạo</TableCell>
//               <TableCell>Phương thức thanh toán</TableCell>
//               <TableCell>Giá trị</TableCell>
//               {/* Thêm các cột khác nếu cần */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {invoices.map((invoice) => (
//               <TableRow key={invoice.invoiceId}>
//                 <TableCell>{invoice.invoiceId}</TableCell>
//                 <TableCell>{invoice.timeCreate}</TableCell>
//                 <TableCell>{invoice.paymentMethod}</TableCell>
//                 <TableCell>{invoice.totalPrice}</TableCell>
//                 {/* Thêm các ô khác nếu cần */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// export default UserHistoryInvoice;

import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import RootService from '../../services/root.service';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { parse, format, differenceInMilliseconds } from 'date-fns';
// import UpdateInvoiceAction from './UpdateInvoiceAction';

const columns = [
//   { id: 'invoiceId', label: 'Mã', minWidth: 50 },
  { id: 'paymentMethod', label: 'Phương thức thanh toán', minWidth: 50 },
  { id: 'timeCreate', label: 'Thời gian tạo', minWidth: 100 },
  { id: 'receivedTime', label: 'Thời gian thanh toán', minWidth: 100},
  { id: 'totalPrice', label: 'Giá trị', minWidth: 100 },
  { id: 'wasPay', label: 'Trạng thái thanh toán', minWidth: 50 },
  { id: 'action', label: 'Trạng thái đơn hàng', minWidth: 50 },
  { id: 'address.fulladdress', label: 'Địa chỉ nhận hàng', minWidth: 200 },
  { id: 'actions', label: 'Thao tác', minWidth: 200 },
];

const UserHistoryInvoice = ({ user }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [invoices, setInvoices] = useState([]);

  // const [newAction, setNewAction] = useState(0); // Giả sử mặc định là 'Đang xử lý'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // const handleUpdateAction = async () => {
  //   try {
  //     const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${newAction}`);
  //     setSnackbarSeverity('success');
  //     setSnackbarMessage(response.data.message);
  //   } catch (error) {
  //     setSnackbarSeverity('error');
  //     setSnackbarMessage(error.response.data.message);
  //   } finally {
  //     setSnackbarOpen(true);
  //   }
  // };

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
        // const response = await axios.get(`http://localhost:8089/api/invoice/getHistoryInvoicesByUserIdAndWasPayAndAction/${user.userId}`);
        // const response = await RootService.InvoiceService.getHistoryInvoicesByUserIdAndWasPayAndAction(user.userId);
        const response = await RootService.InvoiceService.getHistoryInvoicesByUserId(user.userId);
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
      // wasPay: invoice.wasPay === true ? 'Đã thanh toán' : 'Chưa thanh toán',
      timeCreate: invoice.timeCreate ? format(new Date(invoice.timeCreate), 'dd/MM/yyyy HH:mm:ss') : '',
      receivedTime: invoice.receivedTime ? format(new Date(invoice.receivedTime), 'dd/MM/yyyy HH:mm:ss') : '',
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

  // const handleStatusChange = (event, index, columnName) => {
  //   const newInvoices = [...invoices];
  //   newInvoices[index][columnName] = event.target.value;
  //   setInvoices(newInvoices);
  // };

  const actionOptionsFailure = ['Đã hủy', 'Lỗi sản phẩm'];
  
  const isWithin24Hours = (receivedTime) => {
    // Sử dụng hàm differenceInMilliseconds để tính toán sự chênh lệch giữa hai thời điểm
    
    const currentTime = new Date();
    console.log('currentTime:', currentTime);
    const receivedTimeObj = parse(receivedTime, 'dd/MM/yyyy HH:mm:ss', new Date());
    console.log('receivedTime:', receivedTimeObj);
    const timeDiffInSeconds = Math.abs(differenceInMilliseconds(currentTime, receivedTimeObj)/1000); // Chênh lệch thời gian tính bằng giây
    console.log('Số giây chênh lệch:', timeDiffInSeconds);
    console.log('Điều kiện:', 24 * 3600);
    console.log('Điều kiện:', timeDiffInSeconds <= 24 * 3600);
    
    return timeDiffInSeconds <= 24 * 3600;
  };

  const handleDeleteClick = async (invoiceId, currentAction, paymentMethod, receivedTime) => {
    try {
      // console.log('Delete clicked for invoice with ID:', invoiceId);
      let newAction = currentAction;
      // Kiểm tra trạng thái của đơn hàng
      if (currentAction === "Đang xử lý") {
        // Thực hiện hành động "Đã hủy"
        console.log(`Cancel clicked for invoice with ID: ${invoiceId}`);
        newAction = actionOptionsFailure[0];
        console.log(`newAction: `, newAction);
      } 
      // else if (currentAction === "Đã nhận hàng") {
      //   // Thực hiện hành động "Trả hàng"
      //   console.log(`Return clicked for invoice with ID: ${invoiceId}`);
      //   newAction = actionOptionsFailure[1];
      //   console.log(`newAction: `, newAction);
      // }
  
      // Gọi API hoặc thực hiện các hành động cần thiết để xóa đơn hàng
      // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${newAction}`);
      if (paymentMethod === "COD"){
        await RootService.InvoiceService.updateInvoiceAction(invoiceId, newAction);
        // Cập nhật trạng thái trong danh sách invoices
        const updatedInvoices = invoices.map((invoice) => {
          if (invoice.invoiceId === invoiceId) {
            if (newAction === 'Trả hàng')
              return { ...invoice, action: newAction, wasPay: 'Chờ hoàn tiền' };
            else
              return { ...invoice, action: newAction };
          }
          // console.log('Converted Invoice:', invoice);
          return invoice;
        });
  
        setInvoices(updatedInvoices);
        setSnackbarSeverity('success');
        setSnackbarMessage('Cập nhật thành công!');
        console.log(`Delete clicked for invoice with ID: ${invoiceId}`);
      }
      if(paymentMethod === "VnPay" && isWithin24Hours(receivedTime)){
        await RootService.InvoiceService.updateActionAfterReceivedVnPay(invoiceId, newAction);
        // Cập nhật trạng thái trong danh sách invoices
        const updatedInvoicesToVnPay = invoices.map((invoice) => {
          if (invoice.invoiceId === invoiceId) {
            if (newAction === "Đã nhận hàng"){
              return { ...invoice, action: actionOptionsFailure[1] };
            }     
          }
          // console.log('Converted Invoice:', invoice);
          return invoice;
        });
        setInvoices(updatedInvoicesToVnPay);
        setSnackbarSeverity('success');
        setSnackbarMessage('Cập nhật thành công!');
        console.log(`Delete clicked for invoice with ID: ${invoiceId}`);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };
  
  // const handleDeleteClick = (invoiceId) => {
  //   // Xử lý khi nút "Xóa" được nhấn
  // };

  return (
    <>
    {/* <Typography variant='h5' sx={{marginBottom: '16px'}}>Lịch sử đơn hàng</Typography> */}
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
                        {/* { (row.action !== "Đã nhận hàng" && row.action !== "Đã hủy" && row.action !== "Trả hàng") ? (
                          <IconButton onClick={() => handleEditClick(row.invoiceId, row.action)}>
                            <EditIcon />
                          </IconButton>
                          ) : <></>
                        } */}
                        { ((row.action === "Đang xử lý" && row.paymentMethod === "COD") 
                        || ((row.action === "Đã nhận hàng" && row.paymentMethod === "VnPay") && isWithin24Hours(row.receivedTime))) ? 
                          (<IconButton onClick={() => handleDeleteClick(row.invoiceId, row.action, row.paymentMethod, row.receivedTime)}>
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

export default UserHistoryInvoice;
