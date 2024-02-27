import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Banner = () => {
  const text = "“Sách phá vỡ xiềng xích của thời gian và là minh chứng rõ ràng cho việc con người có thể tạo ra điều kỳ diệu.” – Carl Sagan";

  return (
    <>
    <Typography
      variant="subtitle1"
      textAlign="center"
      width="100%"
      sx={{
        position: 'relative',
        animation: 'slide linear 10s infinite',
        fontStyle: 'italic', // Thêm kiểu nghiêng
        fontWeight: 'bold', // Thêm độ đậm
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Thêm bóng chữ
        '@keyframes slide': {
            '0%': { opacity: 1, transform: 'translateX(-5%)' },
            '25%': { opacity: 1, transform: 'translateX(-20%)'},
            '50%': { opacity: 1, transform: 'translateX(25%)'},
            '75%': { opacity: 1, transform: 'translateX(0%)'},
            '100%': { opacity: 0, transform: 'translateX(25%)' },
        },
      }}
    >
      {text}
    </Typography>
    </>
  );
};

export default Banner;
