import React, { useState, useEffect } from 'react';
import { parse, format, differenceInMilliseconds } from 'date-fns';
// import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import EditIcon from '@mui/icons-material/Edit';
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
import RootService from '../../../services/root.service';
// import UpdateInvoiceAction from './UpdateInvoiceAction';

const columns = [
  { id: 'invoiceId', label: 'Mã', minWidth: 50 },
  { id: 'paymentMethod', label: 'Phương thức thanh toán', minWidth: 50 },
  { id: 'timeCreate', label: 'Thời gian tạo', minWidth: 100 },
  { id: 'receivedTime', label: 'Thời gian thanh toán', minWidth: 100},
  { id: 'totalPrice', label: 'Giá trị', minWidth: 100 },
  { id: 'wasPay', label: 'Trạng thái thanh toán', minWidth: 50 },
  { id: 'action', label: 'Trạng thái đơn hàng', minWidth: 50 },
  { id: 'address.fulladdress', label: 'Địa chỉ nhận hàng', minWidth: 200 },
  { id: 'actions', label: 'Thao tác', minWidth: 200 },
];

const Invoices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
        // const response = await axios.get('http://localhost:8089/api/invoice/getAllInvoices');
        const response = await RootService.InvoiceService.getAllInvoices();
        // Chuyển đổi dữ liệu khi nhận được từ API
        const formattedInvoices = response.data.map(convertInvoiceData);
        setInvoices(formattedInvoices);
        console.log(response.data);
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

  // change action
  const actionOptions = ['Đang xử lý', 'Đã xác nhận', 'Đang vận chuyển', 'Đã nhận hàng', 'Lỗi sản phẩm'];

  const handleEditClick = async (invoiceId, currentAction, paymentMethod) => {
    // Xử lý khi nút "Sửa" được nhấn
    console.log('Edit clicked for invoice with ID:', invoiceId);
    console.log('Edit clicked for action with ID:', currentAction);
    console.log('Edit clicked for payment method with ID:', paymentMethod);
    try {
      if (currentAction === "Lỗi sản phẩm") {
        // Thực hiện hành động "Đã hủy"
        console.log(`Cancel clicked for invoice with ID: ${invoiceId}`);
        currentAction = actionOptions[0];
        console.log(`currentAction to new: `, currentAction);
      }
      // Tìm chỉ số của currentAction trong mảng actionOptions
      const currentActionIndex = actionOptions.indexOf(currentAction);
 
      // Tính chỉ số của trạng thái tiếp theo
      const nextActionIndex = (currentActionIndex + 1) % actionOptions.length;
      const nextActionString = actionOptions[nextActionIndex];
      // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${nextActionString}`);
      if(paymentMethod === 'COD') {
        const response = await RootService.InvoiceService.updateInvoiceAction(invoiceId, nextActionString);
        // Cập nhật trạng thái trong danh sách invoices
        const updatedInvoices = invoices.map((invoice) => {
          if (invoice.invoiceId === invoiceId) {
            if (nextActionString === 'Đã nhận hàng'){
              const receivedTimeTemp = response.data.receivedTime ? format(new Date(response.data.receivedTime), 'dd/MM/yyyy HH:mm:ss') : '';
              return { ...invoice, action: nextActionString, wasPay: 'Đã thanh toán', receivedTime: receivedTimeTemp};
            }
            else
              return { ...invoice, action: nextActionString };
          }
          // console.log('Converted Invoice:', invoice);
          return invoice;
        });
        setInvoices(updatedInvoices);
        setSnackbarSeverity('success');
        setSnackbarMessage('Cập nhật thành công!');
      }
      if (paymentMethod === 'VnPay') {
        // if (currentAction === actionOptionsFailure[1]){
        //   const responseRefund = await RootService.InvoiceService.updateInvoiceActionToVnPay(invoiceId, currentAction);
        //   const updatedInvoices = invoices.map((invoice) => {
        //     if (invoice.invoiceId === invoiceId) {
        //       return { ...invoice, action: "Đã nhận hàng" };
        //     }
        //     // console.log('Converted Invoice:', invoice);
        //     return invoice;
        //   });
        //   setInvoices(updatedInvoices);
        //   setSnackbarSeverity('success');
        //   setSnackbarMessage('Cập nhật thành công!');
        // }else {
          await RootService.InvoiceService.updateInvoiceActionToVnPay(invoiceId, nextActionString);
          // Cập nhật trạng thái trong danh sách invoices
          const updatedInvoices = invoices.map((invoice) => {
            if (invoice.invoiceId === invoiceId) {
                return { ...invoice, action: nextActionString };
            }
            // console.log('Converted Invoice:', invoice);
            return invoice;
          });
          setInvoices(updatedInvoices);
          setSnackbarSeverity('success');
          setSnackbarMessage('Cập nhật thành công!');
        // }
      }
     
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Cập nhật thất bại');
    } finally {
      setSnackbarOpen(true);
    }
  };

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
  
      if(paymentMethod === "COD"){
        // Gọi API hoặc thực hiện các hành động cần thiết để xóa đơn hàng
        // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${newAction}`);
        await RootService.InvoiceService.updateInvoiceAction(invoiceId, newAction);

        // Cập nhật trạng thái trong danh sách invoices
        const updatedInvoices = invoices.map((invoice) => {
          if (invoice.invoiceId === invoiceId) {
            if (newAction === actionOptionsFailure[0]){
              // if (invoice.wasPay === 'Đã thanh toán'){
              //   return { ...invoice, action: newAction, wasPay: 'Chờ hoàn tiền' };
              // } else
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
  
  // const handleRefundClick = async (invoiceId, currentAction) => {
  //   // Xử lý khi nút "Xóa" được nhấn
  //   console.log('Refund clicked for invoice with ID:', invoiceId);
  //   console.log('Refund clicked for action with ID:', currentAction);
  //   let newAction = currentAction;
  //   try {
  //     // Thực hiện các hành động cần thiết để xử lý hoàn tiền
  //     // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/Hoàn tiền`);
  //     const response = await RootService.InvoiceService.updateRefundStatus(invoiceId);
      
  //     // Cập nhật trạng thái trong danh sách invoices
  //     const updatedInvoices = invoices.map((invoice) => {
  //       if (invoice.invoiceId === invoiceId) {
  //         return { ...invoice, action: newAction, wasPay: 'Đã hoàn tiền' };
  //       }
  //       return invoice;
  //     });
  
  //     setInvoices(updatedInvoices);
  //     setSnackbarSeverity('success');
  //     setSnackbarMessage('Hoàn tiền thành công!');
  //   } catch (error) {
  //     setSnackbarSeverity('error');
  //     setSnackbarMessage('Hoàn tiền thất bại');
  //   } finally {
  //     setSnackbarOpen(true);
  //   }
  // };

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
            ).map((row) => (
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
                          <MenuItem value="Chưa thanh toán">Chưa thanh toán</MenuItem>,
                          <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>,
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
                          <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>,
                          <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>,
                          <MenuItem value="Đang vận chuyển">Đang vận chuyển</MenuItem>,
                          <MenuItem value="Đã nhận hàng">Đã nhận hàng</MenuItem>,
                          <MenuItem value="Đã hủy">Đã hủy</MenuItem>,
                        ]}
                      </Select>
                    )} */}

                    {column.id === 'address.fulladdress' && (
                      row.address.fulladdress
                    )}

                    {column.id !== 'address.fulladdress' && (
                      row[column.id]
                    )}

                    {column.id === 'actions' && (
                      <div>
                        { (row.action !== "Đã nhận hàng" && row.action !== "Đã hủy" && row.action !== "Trả hàng") ? (
                          <IconButton onClick={() => handleEditClick(row.invoiceId, row.action, row.paymentMethod)}>
                            <EditIcon />
                            {/* <UpdateInvoiceAction invoiceId={row.invoiceId} newAction={row.action}/> */}
                          </IconButton>
                          ) : <></>
                        }
                        {/* && isWithin24Hours(row.receivedTime) */}
                        { ((row.action === "Đang xử lý" && row.paymentMethod === "COD") 
                        || ((row.action === "Đã nhận hàng" && row.paymentMethod === "VnPay") && isWithin24Hours(row.receivedTime))) ? 
                          (<IconButton onClick={() => handleDeleteClick(row.invoiceId, row.action, row.paymentMethod, row.receivedTime)}>
                            <DisabledByDefaultOutlinedIcon />
                          </IconButton>) : <></>
                        }
                        {/* { ((row.action === "Đã hủy" && row.wasPay === "Chờ hoàn tiền")) ?
                          (<IconButton onClick={() => handleRefundClick(row.invoiceId, row.action)}>
                          <EditIcon />
                          </IconButton>) : <></>
                        } */}
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
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
};

export default Invoices;
