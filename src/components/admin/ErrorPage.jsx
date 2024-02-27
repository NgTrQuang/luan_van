// Import Alert component from MUI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorPage = () => {

    return (
        <>
        {/* Sử dụng Alert component của MUI */}
        <Alert
            severity="error"
            sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px', // Thêm padding để làm cho thông báo rộng hơn
            borderRadius: '10px', // Bo tròn góc
            backgroundColor: '#f8d7da', // Màu nền đỏ nhẹ
            color: '#721c24', // Màu chữ tối hơn
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Bóng đổ nhẹ
            marginBottom: '10px'
            }}
        >
            <ErrorIcon
            sx={{
                fontSize: 48, // Giảm kích thước của biểu tượng
                marginRight: '10px', // Tăng khoảng cách giữa biểu tượng và văn bản
                color: '#721c24', // Màu tối hơn cho biểu tượng
            }}
            />
            <div>
            <AlertTitle
                sx={{
                marginBottom: '10px', // Tăng khoảng cách giữa tiêu đề và nội dung
                fontSize: '20px', // Tăng kích thước của tiêu đề
                fontWeight: 'bold', // Đậm tiêu đề
                }}
            >
                Lỗi truy cập
            </AlertTitle>
            Đường dẫn không tồn tại
            </div>
        </Alert>
    </>
    );
};

export default ErrorPage;
