// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import axios from 'axios';
import RootService from '../../services/root.service';

const UserContext = createContext();

export function UserProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  // const getFirstPartBeforeThirdLastComma = (inputString) => {
  //   if (typeof inputString === 'string') {
  //       const parts = inputString.split(', ');
  //       const thirdLastCommaIndex = parts.length - 4;
  //       const firstPart = parts.slice(0, thirdLastCommaIndex).join(', ');
  //       return firstPart;
  //   }
  //   return ''; // Return a default value if inputString is not a string
  // }

  const fetchUserData = async () => {
    if (currentUser && currentUser.id) {
      try {
        // const response = await axios.get(`http://localhost:8089/api/user/${currentUser.id}`);
        const response = await RootService.UserService.getUserById(currentUser.id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);


  // useEffect(() => {
  //   // Thử lấy thông tin người dùng từ localStorage
    
  //   // if (storedUser) {
  //   //   setCurrentUser(JSON.parse(storedUser));
  //   //   const id = JSON.parse(storedUser).id; // Lấy id từ storedUser
  //   //   setUserId(id); // Lưu id vào state userId

  //   //   // Sử dụng id để gọi API lấy thông tin người dùng
  //   //   axios.get(`http://localhost:8089/api/user/${id}`)
  //   //     .then((response) => {
  //   //       // Xử lý dữ liệu từ response nếu cần
  //   //       // const userData = response.data;
  //   //       // Lưu thông tin người dùng vào state currentUser
  //   //       setCurrentUser(response.data);
  //   //     })
  //   //     .catch((error) => {
  //   //       // Xử lý lỗi nếu cần
  //   //       console.error('Lỗi khi gọi API lấy thông tin người dùng:', error);
  //   //     });
  //   // }

  // }, []);

  return (
    <UserContext.Provider value={{ currentUser, user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
