import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Typography, Grid, Chip} from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import RootService from '../../../../services/root.service';

const CountInvoiceIsPaid = () => {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [invoicePaidCount, setInvoicePaidCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchSellStatistics = async () => {
    try {
      const [responseInvoice, responseInvoicePaid] = await Promise.all([
        // axios.get('http://localhost:8089/api/invoice/count'),
        // axios.get('http://localhost:8089/api/invoice/wasPay/count'),
        RootService.InvoiceService.countInvoices(),
        RootService.InvoiceService.countPaidInvoices(),
      ]);
      setInvoiceCount(responseInvoice.data);
      setInvoicePaidCount(responseInvoicePaid.data);

      console.log(responseInvoice.data);
      console.log(responseInvoicePaid.data);
    } catch (error) {
      setError('Lỗi khi lấy dữ liệu');
      console.log(error);
    }
  };

  useEffect(() => {
      fetchSellStatistics();
  }, []);
  // useEffect(() => {
  //   // Gọi API để lấy số lượng đơn hàng
  //   axios.get('http://localhost:8089/api/invoice/count')
  //     .then(response => {
  //       setInvoiceCount(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching invoice count:', error);
  //     });
  //   // Gọi API để lấy số lượng đơn hàng
  //   axios.get('http://localhost:8089/api/invoice/wasPay/count')
  //     .then(response => {
  //       setInvoicePaidCount(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching invoice count:', error);
  //     });
  // }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render
  const paymentPercentage = invoiceCount !== 0 ? Math.round((invoicePaidCount / invoiceCount) * 100) : 0;

  return (
    <>
      <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Đã thanh toán
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h5" color="inherit">
                {invoicePaidCount}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label={`${paymentPercentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack>
    </>
  );
};

export default CountInvoiceIsPaid;
