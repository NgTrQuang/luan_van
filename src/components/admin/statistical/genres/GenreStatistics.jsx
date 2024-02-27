import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootService from '../../../../services/root.service';

const GenreStatistics = () => {
  const [genreCount, setGenreCount] = useState(0);

  useEffect(() => {
    // Gọi API để lấy số lượng danh mục
    // axios.get('http://localhost:8089/api/v1/genres/count')
    //   .then(response => {
    //     setGenreCount(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching genre count:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.GenreService.countGenres();
        setGenreCount(response.data);
      } catch (error) {
        console.log('Error fetching genre count:', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <div>
      {/* <h2>Thống kê số lượng danh mục</h2> */}
      <p>Số lượng danh mục hiện tại: {genreCount}</p>
    </div>
  );
};

export default GenreStatistics;
