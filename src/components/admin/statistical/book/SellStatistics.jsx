import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Stack, Typography, Grid, Chip} from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import RootService from '../../../../services/root.service';

function SellStatistics() {
    const [totalSell, setTotalSell] = useState(0);
    const [total, setTotal] = useState(0);
    const [errorAll, setErrorAll] = useState(null);

    const fetchSellStatistics = async () => {
        try {
            const [responseAll, responseSell] = await Promise.all([
                // axios.get('http://localhost:8089/api/v1/books/all-statistics'),
                // axios.get('http://localhost:8089/api/v1/books/sell-statistics'),
                RootService.BookService.getAllStatistics(),
                RootService.BookService.getSellStatistics(),
            ]);
        
            setTotal(responseAll.data);
            setTotalSell(responseSell.data);
        
            console.log(responseAll.data);
            console.log(responseSell.data);
        } catch (error) {
            setErrorAll('Lỗi khi lấy dữ liệu');
            console.log(errorAll);
        }
    };
    
    useEffect(() => {
        fetchSellStatistics();
    }, []);

    const paymentPercentage = total !== 0 ? Math.round((totalSell / total) * 100) : 0;
    return (
        <>
            {/* {error ? (
                <>{error}</>
            ) : (
                <>{totalSell}</>
            )} */}
            <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                Sách đã bán
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                <Typography variant="h5" color="inherit">
                    {totalSell}
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
}

export default SellStatistics;
