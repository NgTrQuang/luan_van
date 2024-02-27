import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/payment/";

// const pay = (invoiceId, paymentRequest) => {
//   return axios.post(API_URL + `pay/${invoiceId}`, paymentRequest);
// };

const createInvoiceWithVnPay = (paymentRequest) => {
  return axios.post(API_URL + "create_invoice_w_vnpay", paymentRequest, {timeout: 300000});
};

// const returnFromVnpay = () => {
//   return axios.get(API_URL + "returnFromVnpay");
// };

const PaymentService = {
  // pay,
  createInvoiceWithVnPay,
  // returnFromVnpay,
};

export default PaymentService;
