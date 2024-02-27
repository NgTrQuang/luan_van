// BestSellingBooksChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import RootService from '../../../../services/root.service';

const BestSellingBooksChart = () => {
    const [bestSellingBooks, setBestSellingBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestSellingBooks = async () => {
            try {
                // const response = await axios.get('http://localhost:8089/api/v1/books/best-selling-books');
                const response = await RootService.BookService.getBestSellingBooks();
                setBestSellingBooks(response.data);
            } catch (error) {
                setError('Lỗi khi lấy dữ liệu');
            }
        };

        fetchBestSellingBooks();
    }, []);

    const chartData = {
        labels: bestSellingBooks.map((book) => book.bookName),
        datasets: [
            {
                label: 'Số lượng bán',
                data: bestSellingBooks.map((book) => book.sell),
                fill: true,
                tension: 0.3,
                backgroundColor: 'rgb(255,202,54)',
                borderColor: 'rgb(13,110,253)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
          x: {
            display: true,
            grid: {
              display: false, // Ẩn các ô (grid lines) trên trục x
            },
          },
          y: {
            display: true,
            grid: {
              display: false, // Ẩn các ô (grid lines) trên trục y
            },
          },
        },
      };
      

    return (
        <>
            <h4>Biểu đồ 5 quyển sách bán chạy nhất</h4>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                <Line data={chartData} options={chartOptions} />
                </>
            )}
        </>
    );
};

export default BestSellingBooksChart;
