import React from 'react';
import { Alert, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const Successfullly = ({setIsNotification}) => {
    setIsNotification(false);
    const handleChangeButton = () => {
        setIsNotification(true);
    }
        return (
        <Alert
        severity={'success'}
        // action={null}
        sx={{
            display: 'flex',
            alignItems: 'center',
            // '.MuiAlert-icon': { display: 'none' },
        }}
        >
        <CheckCircleIcon
            sx={{
            fontSize: 64,
            marginRight: 2,
            color: 'success',
            }}
        />
        <div sx={{ flex: 1 }}>
            <Typography variant="h5">Chúc mừng bạn đã đặt hàng thành công.</Typography>
            <Typography variant="body1">Vui lòng check mail để biết thêm thông tin về đơn hàng của bạn!</Typography>
        </div>
        <Link to={'http://localhost:8081/'}>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleChangeButton}>
                Trang chủ
            </Button>
        </Link>
        </Alert>
    );
};

export default Successfullly;
