// xử lý dữ liệu địa chỉ đầu vào toàn quốc

import React, { useState, useEffect } from 'react';
import { Alert, FormControl, InputLabel, Select, MenuItem, Button, TextField, Grid } from '@mui/material';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import RootService from '../../services/root.service';

const UpdateAdressUser = ({onUpdate, editingAddress, setEditingAddress}) => {
    const { user } = useUser();
    
    // const specificAddressTran = getFirstPartBeforeThirdLastComma((user.addresses[user.addresses.length - 1]?.address).toString());

    // const parts = user.addresses[user.addresses.length - 1]?.address.split(', ');

    // // Lấy ba phần tử đầu tiên của mảng
    // const firstTwoParts = parts.slice(0, 3);

    // // Chuyển mảng thành chuỗi bằng dấu phẩy và khoảng trắng
    // const firstString = firstTwoParts.join(', ');

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [specificAddress, setSpecificAddress] = useState(
        (user?.addresses && user.addresses.length > 0 && user.addresses[user.addresses.length - 1]?.address) ? 
        (user?.addresses[user?.addresses?.length - 1]?.address).toString() : ''); //getFirstPartBeforeThirdLastComma(user.addresses[user.addresses.length - 1]?.address)
    const [phoneNumber, setPhoneNumber] = useState(
        (user?.addresses && user.addresses.length > 0 && user.addresses[user.addresses.length - 1]?.address) ? 
        (user?.addresses[user?.addresses?.length - 1]?.phone).toString() : '');  //user.addresses[user.addresses.length - 1]?.phone
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [addressData, setAddressData] = useState(null);

    useEffect(() => {
        // console.log(user.addresses[user.addresses.length - 1]?.address);
        console.log(user);

        // const firstPart = getFirstPartBeforeThirdLastComma(user.addresses[user.addresses.length - 1]?.address);
        // setSpecificAddress(firstPart);
        // setPhoneNumber(user.addresses[user.addresses.length - 1]?.phone);
        // Tải dữ liệu từ API
        fetch('https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tree.json')
        .then((response) => response.json())
        .then((data) => {
            // Biến đổi dữ liệu thành cấu trúc phù hợp cho AddressSelector
            const transformedData = transformDataForAddressSelector(data, selectedProvince, selectedDistrict);
            setAddressData(transformedData);
            // console.log(transformedData['92']);
        })
        .catch((error) => {
            console.error('Lỗi khi tải dữ liệu từ API: ', error);
        });
    }, [selectedProvince, selectedDistrict]); // Chạy một lần khi component được tạo

    // Hàm biến đổi dữ liệu từ API thành cấu trúc dữ liệu phù hợp cho AddressSelector
    const transformDataForAddressSelector = (inputData, selectedProvince, selectedDistrict) => {
        const transformedData = { ...inputData };
    
        if (selectedProvince) {
        // Lọc các tỉnh/thành phố
        transformedData[selectedProvince] = { ...inputData[selectedProvince] };
    
        console.log("selectedProvince "+selectedProvince)
        if (selectedDistrict) {
            // Lọc các quận/huyện
            transformedData[selectedProvince][selectedDistrict] = { ...inputData[selectedProvince][selectedDistrict] };
        }
    }
  
    return transformedData;
    };

    // Lấy danh sách tỉnh/thành phố
    const provinces = addressData ? Object.values(addressData) : [];

    // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
    const getDistricts = (selectedProvince, addressData) => {
        if (selectedProvince && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen']) {
        return Object.values(addressData[selectedProvince]['quan-huyen']);
        }
        return [];
    };
  
    // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
    const getWards = (selectedProvince, selectedDistrict, addressData) => {
        if (selectedProvince && selectedDistrict && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen'][selectedDistrict] && addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']) {
        return Object.values(addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']);
        }
        return [];
    };
  
    // Sử dụng hàm để lấy danh sách quận/huyện và xã/phường
    const districts = getDistricts(selectedProvince, addressData);
    const wards = getWards(selectedProvince, selectedDistrict, addressData);
  
    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    
        // Kiểm tra số điện thoại với regex
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumberRegex.test(value)) {
            setPhoneNumberError('Số điện thoại chỉ được chứa các chữ số.');
        } else {
            setPhoneNumberError(null); // Xóa lỗi nếu số điện thoại hợp lệ
        }
    }

    const handleSubmit = async () => {
        if (!user) {
            console.error("Lỗi: user không tồn tại.");
            return;
        }        
        let shippingAddress = {};
        if(specificAddress === '' || !phoneNumber){
            setError("Lối khi nhập dữ liệu hãy kiểm tra và thử lại.");
            return;
        }

        if (addressData && selectedProvince && selectedDistrict && selectedWard) {
            shippingAddress = {
                provinceSwap: addressData[selectedProvince]["name"],
                districtSwap: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["name"],
                wardSwap: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["xa-phuong"][selectedWard]["name"],
                addressName: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["xa-phuong"][selectedWard]["path_with_type"]
            };
            // Tạo một đối tượng địa chỉ để gửi lên API
            const addressRequest = {
                user_id: user.userId,  // Thay 123 bằng user_id thực tế
                phone: phoneNumber,
                // addressName: `${specificAddress}, ${shippingAddress.wardSwap}, ${shippingAddress.districtSwap}, ${shippingAddress.provinceSwap}`,  // Đây có thể là tên địa chỉ cụ thể
                addressName: specificAddress,
                fullAddress: `${specificAddress}, ${shippingAddress.addressName}`
                // Các trường thông tin địa chỉ khác nếu cần
            };

            // Gọi API để tạo địa chỉ
            // axios.put(`http://localhost:8089/api/address/${user?.addresses[user?.addresses?.length - 1]?.addressId}`, addressRequest)
            //     .then((response) => {
            //         console.log("Địa chỉ đã được tạo: ", response.data);
            //         setSuccess('Địa chỉ đã được cập nhật thành công.');
            //         setError(null);
            //         // setUser(response.data);
            //         onUpdate(response.data);
            //     })
            //     .catch((error) => {
            //         console.error("Lỗi khi tạo địa chỉ: ", error);
            //         setError("Vui lòng chọn đầy đủ thông tin địa chỉ trước khi lưu.");
            //     });
            try {
                const response = await RootService.UserService.updateAddress(user?.addresses[user?.addresses?.length - 1]?.addressId, addressRequest);
                console.log("Địa chỉ đã được cập nhật: ", response.data);
                setSuccess('Địa chỉ đã được cập nhật thành công.');
                setError(null);
                // setUser(response.data);
                onUpdate(response.data);
            } catch (error) {
                console.error("Lỗi khi tạo địa chỉ: ", error);
                setError("Vui lòng chọn đầy đủ thông tin địa chỉ trước khi lưu.");
            }
        } else {
            console.log("Vui lòng chọn đầy đủ thông tin địa chỉ trước khi lưu.");
        }
    };

    return (
        <>
            <Grid item xs={12}>
            <FormControl fullWidth style={{marginBottom: "8px", marginTop: "8px"}}>
                <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                <Select
                    labelId="province-label"
                    id="province-select"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                >
                    <MenuItem value="">Chọn tỉnh/thành phố</MenuItem>
                    {provinces.map((province) => (
                        <MenuItem key={province.code} value={province.code}>
                        {province.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: "8px", marginTop: "8px"}}>
                <InputLabel id="district-label">Quận/Huyện</InputLabel>
                <Select
                labelId="district-label"
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                <MenuItem value="">Chọn quận/huyện</MenuItem>
                {districts.map((district) => (
                    <MenuItem key={district.code} value={district.code}>
                    {district.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            <FormControl fullWidth style={{marginBottom: "8px", marginTop: "8px"}}>
                <InputLabel id="ward-label">Phường/Xã</InputLabel>
                <Select
                labelId="ward-label"
                id="ward-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                >
                <MenuItem value="">Chọn phường/xã</MenuItem>
                {wards.map((ward) => (
                    <MenuItem key={ward.code} value={ward.code}>
                    {ward.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Alert severity="warning">Địa chỉ cụ thể giúp người bán có thể giao hàng đến tận tay của bạn.</Alert>
            <TextField
                style={{marginBottom: "8px", marginTop: "8px"}}
                fullWidth
                label="Địa chỉ cụ thể"
                variant="outlined"
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
            />

            {phoneNumberError  && (
                <Alert severity="error">{phoneNumberError}</Alert>        
            )}
            <TextField
                style={{marginBottom: "8px", marginTop: "8px"}}
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                // onKeyPress={(e) => {
                //     const charCode = e.which || e.keyCode;
                //     // Kiểm tra xem ký tự là số hoặc không phải phím số (làm phìa trên bàn phím)
                //     if (charCode < 48 || charCode > 57) {
                //         e.preventDefault(); // Ngăn người dùng nhập ký tự không hợp lệ
                //     }
                // }}
            />
            {error && (
                <Alert severity="error">{error}</Alert>        
            )}
            {success && (
                <Alert severity="success">{success}</Alert>        
            )}
            </Grid>
            <Grid item xs={12}>
                <Button
                    sx={{marginRight: "8px"}}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleSubmit()
                    }}
                    disabled={!editingAddress}
                >
                    Lưu
                </Button>
                {editingAddress ?
                    (<Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingAddress(!editingAddress)}
                    >
                        Thoát
                    </Button>) : (<></>)
                }
            </Grid>
        </>
    );
};

export default UpdateAdressUser;