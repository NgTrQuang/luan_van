import React from 'react';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import CountInvoice from './invoice/CountInvoice';
import CountInvoiceIsPaid from './invoice/CountInvoiceIsPaid';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import UserStatistics from './user/UserStatistics';
import SellStatistics from './book/SellStatistics';
import GetTotalRevenue from './invoice/GetTotalRevenue';

const AnalyticEcommerce = () => (
  <Grid container spacing={2}>
     <Grid item sm={3} xs={12}>
      <Box sx={{ p: 2.25, border: '1px solid #e0e0e0', borderRadius: '16px' }}>
        {/* <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Tổng đơn hàng
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                <CountInvoice/>
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
        </Stack> */}
        <CountInvoiceIsPaid/>
        {/* <CountInvoice/> */}
        {/* <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            You made an extra{' '}
            <Typography component="span" variant="caption" sx={{ color: 'primary.main' }}>
              $20,000
            </Typography>{' '}
            this year
          </Typography>
        </Box> */}
      </Box>
    </Grid>
    {/* <Grid item sm={3} xs={12}>
      <Box sx={{ p: 2.25, border: '1px solid #e0e0e0', borderRadius: '16px' }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Đã thanh toán
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                <CountInvoiceIsPaid/>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label="15%"
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            You made an extra{' '}
            <Typography component="span" variant="caption" sx={{ color: 'primary.main' }}>
              $20,000
            </Typography>{' '}
            this year
          </Typography>
        </Box>
        <CountInvoiceIsPaid/>
      </Box>
    </Grid> */}
    {/* <Grid item sm={3} xs={12}>
      <Box sx={{ p: 2.25, border: '1px solid #e0e0e0', borderRadius: '16px' }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Số người dùng
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                <UserStatistics/>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label="15%"
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            You made an extra{' '}
            <Typography component="span" variant="caption" sx={{ color: 'primary.main' }}>
              $20,000
            </Typography>{' '}
            this year
          </Typography>
        </Box>
      </Box>
    </Grid> */}
    <Grid item sm={3} xs={12}>
      <Box sx={{ p: 2.25, border: '1px solid #e0e0e0', borderRadius: '16px' }}>
        {/* <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Sách đã bán
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                <SellStatistics/>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label="15%"
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack> */}
        <SellStatistics/>
        {/* <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            You made an extra{' '}
            <Typography component="span" variant="caption" sx={{ color: 'primary.main' }}>
              $20,000
            </Typography>{' '}
            this year
          </Typography>
        </Box> */}
      </Box>
    </Grid>
    <Grid item sm={3} xs={12}>
      <Box sx={{ p: 2.25, border: '1px solid #e0e0e0', borderRadius: '16px' }}>
        {/* <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            Sách đã bán
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                <SellStatistics/>
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="combined"
                color="primary"
                icon={<span style={{ fontSize: '0.75rem', color: 'inherit' }}><TrendingUpOutlinedIcon/></span>}
                label="15%"
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          </Grid>
        </Stack> */}
        <GetTotalRevenue/>
        {/* <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            You made an extra{' '}
            <Typography component="span" variant="caption" sx={{ color: 'primary.main' }}>
              $20,000
            </Typography>{' '}
            this year
          </Typography>
        </Box> */}
      </Box>
    </Grid>
  </Grid>
);

export default AnalyticEcommerce;
