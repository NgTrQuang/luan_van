import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootService from '../../../../services/root.service';

const UserStatistics = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Gọi API để lấy số lượng danh mục
    // axios.get('http://localhost:8089/api/user/count')
    //   .then(response => {
    //     setUserCount(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching genre count:', error);
    //   });
    async function fetchData() {
      try {
        const response = await RootService.UserService.countUsers();
        setUserCount(response.data);
      } catch (error) {
        console.log('Error fetching genre count: ', error);
      }
    }
    fetchData();
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <>
      {userCount}
    </>
  );
};

export default UserStatistics;
