import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext'
import RootService from '../../services/root.service';

const UserAddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // const response = await axios.get(`http://localhost:8089/api/address/getAllAddressByUser/${currentUser.id}`);
        const response = await RootService.AddressService.getAllAddressByUser(currentUser.id);
        setAddresses(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API lấy danh sách địa chỉ:', error);
      }
    };
    fetchAddresses();
  }, [currentUser]);

  return (
    <div>
      <h2>Danh sách địa chỉ của người dùng</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.addressId}>
            <div>Tên địa chỉ: {address.address}</div>
            <div>Số điện thoại: {address.phone}</div>
            {/* Hiển thị các trường khác của địa chỉ */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAddressList;
