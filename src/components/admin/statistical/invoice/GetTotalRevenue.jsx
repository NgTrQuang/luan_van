import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Typography, Grid, Chip} from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import RootService from '../../../../services/root.service';

const GetTotalRevenue = () => {
//   const [invoiceCount, setInvoiceCount] = useState(0);
  const [invoiceRevenueCount, setInvoiceRevenueCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellStatistics = async () => {
        try {
            const responseInvoiceRevenue = await RootService.InvoiceService.getTotalRevenue();
            setInvoiceRevenueCount(responseInvoiceRevenue.data);
            console.log("Response from API:", responseInvoiceRevenue.data);
        } catch (error) {
            setError('Lỗi khi lấy dữ liệu');
            console.error("Error fetching data:", error);
        }
    };

    fetchSellStatistics();
}, []);

  return (
    <>
      <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Tổng doanh thu
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h5" color="inherit">
                {invoiceRevenueCount} VND
              </Typography>
            </Grid>
            {/* <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label={`${paymentPercentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid> */}
          </Grid>
        </Stack>
    </>
  );
};

export default GetTotalRevenue;
