import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import Chart from "chart.js/auto"; // giúp tự động phiên bản phù hợp
import GenreStatistics from './GenreStatistics';
import { Typography } from '@mui/material';
import RootService from '../../../../services/root.service';
// import 'chartjs-plugin-annotation';

const BookCountByGenre = () => {
  const [genreBookCounts, setGenreBookCounts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy số lượng sách theo từng danh mục
    // axios.get('http://localhost:8089/api/genres/countBooks')
    //   .then(response => {
    //     setGenreBookCounts(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching book counts by genre:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.GenreService.countBooksByGenre();
        setGenreBookCounts(response.data);
      } catch (error) {
        console.log('Error fetching book counts by genre:', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  const data = {
    labels: genreBookCounts.map(item => item[0]),
    datasets: [
      {
        label: 'Số lượng sách',
        data: genreBookCounts.map(item => item[1]),
        backgroundColor: ['rgb(137,180,132)', 'rgb(255,202,54)', 'rgb(243,187,208)', 'rgb(115,132,241)', 'rgb(52,168,83)', 'rgb(1,190,189)', 'rgb(234,67,53)'],
        borderColor: 'rgb(219,242,242)',
        borderWidth: 1,
      },
    ],
  };

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };
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
      <Doughnut data={data} options={options} />
      {/* <GenreStatistics/> */}
      <Typography variant="h6" gutterBottom style={{ fontStyle: 'italic', textAlign: 'center' }}>
        Số lượng sách trong mỗi danh mục (Biểu đồ Doughnut)
      </Typography>
    </>
  );
};

export default BookCountByGenre;
