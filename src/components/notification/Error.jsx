import React from 'react';
import { Alert, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const ErrorNotification = ({setIsNotification}) => {
    setIsNotification(false);
    const handleChangeButton = () => {
        setIsNotification(true);
    }
        return (
        <Alert
        severity={'error'}
        // action={null}
        sx={{
            display: 'flex',
            alignItems: 'center',
            // '.MuiAlert-icon': { display: 'none' },
        }}
        >
        <ErrorIcon
            sx={{
            fontSize: 64,
            marginRight: 2,
            color: 'error',
            }}
        />
        <div sx={{ flex: 1 }}>
            <Typography variant="h5">Đặt hàng thất bại.</Typography>
            <Typography variant="body1">Vui lòng kiểm tra lại các bước đặt hàng của bạn!</Typography>
        </div>
        <Link to={'http://localhost:8081/'}>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleChangeButton}>
                Trang chủ
            </Button>
        </Link>
        </Alert>
    );
};

export default ErrorNotification;
