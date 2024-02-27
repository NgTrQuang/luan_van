import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/invoice/";

const createInvoice = (invoiceRequest) => {
  return axios.post(API_URL + "create", invoiceRequest, { headers: authHeader() });
};

const getAllInvoices = () => {
  return axios.get(API_URL + "getAllInvoices", { headers: authHeader() });
};

const getInvoicesByUserId = (userId) => {
  return axios.get(API_URL + `getInvoicesByUserId/${userId}`, { headers: authHeader() });
}

const getPaidInvoicesByUserId = (userId) => {
  return axios.get(API_URL + `getPaidInvoicesByUserId/${userId}`, { headers: authHeader() });
};

const getPendingInvoicesByUserId = (userId) => {
  return axios.get(API_URL + `getPendingInvoicesByUserId/${userId}`, { headers: authHeader() });
};

const getHistoryInvoicesByUserId = (userId) => {
  return axios.get(API_URL + `getHistoryInvoicesByUserId/${userId}`, { headers: authHeader() });
};

const getHistoryInvoicesByUserIdAndWasPayAndAction = (userId) => {
  return axios.get(API_URL + `getHistoryInvoicesByUserIdAndWasPayAndAction/${userId}`, { headers: authHeader() });
};

const getInvoice = (invoiceId) => {
  return axios.get(API_URL + `getInvoice/${invoiceId}`, { headers: authHeader() });
};

const updateInvoiceAction = (invoiceId, newAction) => {
  return axios.put(API_URL + `updateAction/${invoiceId}/${newAction}`, null, { headers: authHeader() });
};

const updateInvoiceActionToVnPay = (invoiceId, newAction) => {
  return axios.put(API_URL + `updateActionToVnPay/${invoiceId}/${newAction}`, null, { headers: authHeader() });
};

const updateActionAfterReceivedVnPay = (invoiceId, newAction) => {
  return axios.put(API_URL + `updateActionAfterReceived/${invoiceId}/${newAction}`, null, { headers: authHeader() });
};

const updateRefundStatus = (invoiceId) => {
  return axios.put(API_URL + `updateRefund/${invoiceId}`, null, { headers: authHeader() });
}

const countInvoices = () => {
  return axios.get(API_URL + "count", { headers: authHeader() });
};

const countPaidInvoices = () => {
  return axios.get(API_URL + "wasPay/count", { headers: authHeader() });
};

const getTotalRevenue = () => {
  return axios.get(API_URL + "total-revenue/count", { headers: authHeader() });
};

const InvoiceService = {
  createInvoice,
  getAllInvoices,
  getInvoicesByUserId,
  getPaidInvoicesByUserId,
  getPendingInvoicesByUserId,
  getHistoryInvoicesByUserId,
  getHistoryInvoicesByUserIdAndWasPayAndAction,
  getInvoice,
  updateInvoiceAction,
  updateInvoiceActionToVnPay,
  updateActionAfterReceivedVnPay,
  updateRefundStatus,
  countInvoices,
  countPaidInvoices,
  getTotalRevenue,
};

export default InvoiceService;
