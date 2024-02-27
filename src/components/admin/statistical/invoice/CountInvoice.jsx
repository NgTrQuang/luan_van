import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Typography, Grid, Chip} from '@mui/material';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import RootService from '../../../../services/root.service';

const CountInvoice = () => {
  const [invoiceCount, setInvoiceCount] = useState(0);

  useEffect(() => {
    // Gọi API để lấy số lượng đơn hàng
    // axios.get('http://localhost:8089/api/invoice/count')
    //   .then(response => {
    //     setInvoiceCount(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching invoice count:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.InvoiceService.countInvoices();
        setInvoiceCount(response.data);
      } catch (error) {
        console.log('Error fetching invoice count:', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <>
      <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Tổng đơn hàng
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                {invoiceCount}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="warning"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingDownOutlinedIcon/></span>}
                label="15%"
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack>
    </>
  );
};

export default CountInvoice;
