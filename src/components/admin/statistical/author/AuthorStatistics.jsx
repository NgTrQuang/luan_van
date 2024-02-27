import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootService from '../../../../services/root.service';

const Authorstatistics = () => {
  const [authorCount, setAuthorCount] = useState(0);

  useEffect(() => {
    // Gọi API để lấy số lượng danh mục
    // axios.get('http://localhost:8089/api/v1/authors/count')
    //   .then(response => {
    //     setAuthorCount(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching author count:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.AuthorService.countAuthors();
        setAuthorCount(response.data);
      } catch (error) {
        console.log('Error axios author count:', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <div>
      {/* <h2>Thống kê số lượng tác giả</h2> */}
      <p>Số lượng tác giả hiện tại: {authorCount}</p>
    </div>
  );
};

export default Authorstatistics;
