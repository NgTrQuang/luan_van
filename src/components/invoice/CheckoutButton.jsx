import React, { useState }from 'react';
import axios from 'axios';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Box, CircularProgress, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import RootService from '../../services/root.service';

const CheckoutButton = ( { selectedCartItems, paymentMethod } ) => {
  const { checkedItems, cartItems, selectedItems, calculateTotalPrice } = useCart();
  const { user } = useUser();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if(successMessage !== ''){
      window.location.href = "http://localhost:8081/";
    }
    if(error === 'Người dùng chưa có địa chỉ hãy thêm địa chỉ.'){
      window.location.href = "http://localhost:8081/profile"
    }
  };

  // Tạo hàm xử lý tạo đơn hàng ở đây
  const handleCheckout = async () => {
    // Thực hiện logic tạo đơn hàng (có thể gọi API ở đây)
    setIsProcessing(true); // Bắt đầu xử lý
    // Kiểm tra xem user có tồn tại không
    if (!user) {
      setError('Không tìm thấy thông tin người dùng.');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    // Kiểm tra xem user.addresses có tồn tại và có ít nhất một địa chỉ không
    if (!user.addresses || user.addresses.length === 0) {
      setError('Người dùng chưa có địa chỉ hãy thêm địa chỉ.');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    if (selectedCartItems.length === 0) {
      setError('Chưa có sản phẩm được lựa chọn');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    if (selectedCartItems.some(item => !item.quantity || item.quantity > item.book.stock)) {
      setError('Vượt quá số lượng sản phẩm có trong kho');
      setOpen(true);
      setIsProcessing(false);
      return;
    }

    // // Lấy địa chỉ cuối cùng của người dùng
    // const lastAddress = user.addresses[user.addresses.length - 1];

    // // Kiểm tra xem lastAddress có tồn tại không
    // if (!lastAddress) {
    //   setIsProcessing(false);
    //   return <p>Không tìm thấy thông tin địa chỉ cuối cùng của người dùng.</p>;
    // }
    const requestData = {
      user_id: user.userId, // Thay đổi giá trị user_id tùy theo người dùng
      address_id: user?.addresses[user?.addresses?.length - 1].addressId, // Thay đổi giá trị address_id tùy theo địa chỉ người dùng
      cartItems: selectedCartItems
    };

    // Gửi yêu cầu API bằng Axios
    // axios.post('http://localhost:8089/api/invoice/create', requestData)
    //   .then(response => {
    //     // Xử lý kết quả API (Invoice object)
    //     console.log('Kết quả thanh toán:', response.data);
    //     // Thực hiện các xử lý khác theo kết quả
    //     if (response.data) {
    //       // Hiển thị thông báo thành công
    //       setSuccessMessage('Đặt hàng thành công!');
    //       setOpen(true);
    //       // Kết thúc xử lý
    //       setIsProcessing(false);
    //       // window.location.href = "http://localhost:8081/";
    //     } else {
    //       setError('Đã xảy ra lỗi khi tạo đơn hàng.');
    //       // Kết thúc xử lý
    //       setOpen(true);
    //       setIsProcessing(false);
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Lỗi:', error);
    //     setOpen(true);
    //     setError('Đặt hàng thất bại hãy kiểm tra lại các bước.');
    //     setIsProcessing(false);
    //   });

      try {
        const response = await RootService.InvoiceService.createInvoice(requestData);
        console.log('Kết quả thanh toán:', response.data);
        // Thực hiện các xử lý khác theo kết quả
        if (response.data) {
          // Hiển thị thông báo thành công
          setSuccessMessage('Đặt hàng thành công!');
          setOpen(true);
          // Kết thúc xử lý
          setIsProcessing(false);
          // window.location.href = "http://localhost:8081/";
        } else {
          setError('Đã xảy ra lỗi khi tạo đơn hàng.');
          // Kết thúc xử lý
          setOpen(true);
          setIsProcessing(false);
        }
      } catch (error) {
        console.log('Lỗi:', error);
        setOpen(true);
        setError('Đặt hàng thất bại hãy kiểm tra lại các bước.');
        setIsProcessing(false);
      }

    // Sau khi tạo đơn hàng thành công, bạn có thể thực hiện các hành động cần thiết, ví dụ: 
    // - Đặt trạng thái giỏ hàng về rỗng
    // - Hiển thị thông báo thành công

    // Ví dụ:
    // resetCart();
    // showSuccessNotification();
  };

  const handleCheckoutToPay = async () => {
    // Kiểm tra xem user có tồn tại không
    if (!user) {
      setError('Không tìm thấy thông tin người dùng.');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    // Kiểm tra xem user.addresses có tồn tại và có ít nhất một địa chỉ không
    if (!user.addresses || user.addresses.length === 0) {
      setError('Người dùng chưa có địa chỉ hãy thêm địa chỉ.');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    if (selectedCartItems.length === 0) {
      setError('Chưa có sản phẩm được lựa chọn');
      // Kết thúc xử lý
      setOpen(true);
      setIsProcessing(false);
      return
    }

    if (selectedCartItems.some(item => !item.quantity || item.quantity > item.book.stock)) {
      setError('Vượt quá số lượng sản phẩm có trong kho');
      setOpen(true);
      setIsProcessing(false);
      return;
    }

    const requestData = {
      user_id: user.userId, // Thay đổi giá trị user_id tùy theo người dùng
      address_id: user?.addresses[user?.addresses?.length - 1].addressId, // Thay đổi giá trị address_id tùy theo địa chỉ người dùng
      cartItems: selectedCartItems,
      paymentMethod: paymentMethod
    };
    // axios.post('http://localhost:8089/api/payment/create_invoice_w_vnpay', requestData)
    //   .then(response => {
    //     // Xử lý kết quả API (Invoice object)
    //     console.log('Kết quả thanh toán:', response.data);
    //     window.location.href = response.data.message;
    //     // Thực hiện các xử lý khác theo kết quả
    //     // if (response.data && response.data.message) {
    //     //   // Hiển thị thông báo thành công
    //     //   setSuccessMessage('Đặt hàng thành công!');
    //     //   // Thực hiện các hành động khác nếu cần
    //     //   // resetCart(); // Đặt trạng thái giỏ hàng về rỗng
    //     // } else {
    //     //   setError('Đã xảy ra lỗi khi tạo đơn hàng.');
    //     // }
    // })
    // .catch(error => {
    //     console.error('Lỗi:', error);
    //     setOpen(true);
    //     setError('Đặt hàng thất bại hãy kiểm tra lại các bước.');
    // });

    try {
      const response = await RootService.PaymentService.createInvoiceWithVnPay(requestData);
      console.log('Kết quả thanh toán:', response.data);
      window.location.href = response.data.message;
    } catch (error) {
      console.log('Lỗi:', error);
      setOpen(true);
      setError('Đặt hàng thất bại hãy kiểm tra lại các bước.');
    }
  };

  return (
    // <Link to="/">
    <>
      {successMessage ? 
        (open && (
          <Alert severity="success" onClose={handleClose}>
            {successMessage}
          </Alert>
        )) : <></>
      }
      {error ? 
        (open && (
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        )) : <></>
      }
      <Box display="flex" alignItems="center" flexDirection="column">
        {isProcessing && <CircularProgress size={24} thickness={4} color="secondary" />}
        <Button
          variant="contained"
          color="primary"
          onClick={paymentMethod === "COD" ? handleCheckout : handleCheckoutToPay}
          sx={{ marginBottom: '8px', marginTop: '8px' }}
          disabled={isProcessing}
        >
          Thanh toán
        </Button>
      </Box>
    </>
    // </Link>
  );
};

export default CheckoutButton;
