import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import Authorstatistics from './AuthorStatistics';
import RootService from '../../../../services/root.service';
// import 'chartjs-plugin-annotation';

const BookCountByAuthor = () => {
  const [authorBookCounts, setAuthorBookCounts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy số lượng sách theo từng danh mục
    // axios.get('http://localhost:8089/api/authors/countBooks')
    //   .then(response => {
    //     setAuthorBookCounts(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching book counts by author:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.AuthorService.countBooksByAuthor();
        setAuthorBookCounts(response.data);
      } catch (error) {
        console.log('Error axios book counts by author: ', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  const data = {
    labels: authorBookCounts.map(item => item[0]),
    datasets: [
      {
        label: 'Số lượng sách',
        data: authorBookCounts.map(item => item[1]),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Ẩn trục x
      },
      y: {
        display: false, // Ẩn trục y
      },
    },
  };

  return (
    <>
      <Radar data={data} options={options} />
      {/* <Authorstatistics/> */}
      <Typography variant="h6" gutterBottom style={{ fontStyle: 'italic', textAlign: 'center' }}>
        Số lượng sách trong mỗi tác giả (Biểu đồ cột)
      </Typography>
    </>
  );
};

export default BookCountByAuthor;
