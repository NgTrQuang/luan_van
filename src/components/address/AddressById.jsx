import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import RootService from '../../services/root.service';

const AddressDetail = () => {
  const [address, setAddress] = useState(null);
  const { currentUser, setCurrenUser } = useUser();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        // const response = await axios.get(`http://localhost:8089/api/address/${2}`);
        const response = await RootService.AddressService.getAllAddressByUser(2);
        setAddress(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API lấy thông tin địa chỉ:', error);
      }
    };

    fetchAddress();
  }, [currentUser]);

  return (
    <div>
      {address ? (
        <div>
          <h2>Thông tin địa chỉ</h2>
          <div>Tên địa chỉ: {address.addressName}</div>
          <div>Số điện thoại: {address.phone}</div>
          {/* Hiển thị các trường khác của địa chỉ */}
        </div>
      ) : (
        <div>Địa chỉ không tồn tại hoặc có lỗi trong quá trình lấy dữ liệu.</div>
      )}
    </div>
  );
};

export default AddressDetail;
