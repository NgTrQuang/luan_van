import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';

const AddressSelector = () => {
    const [selectedProvince] = useState('92'); // Đặt giá trị tỉnh/thành phố mặc định là "Cần Thơ"
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [addressData, setAddressData] = useState(null);

    useEffect(() => {
        // Tải dữ liệu từ API
        fetch('https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tree.json')
            .then((response) => response.json())
            .then((data) => {
                // Biến đổi dữ liệu thành cấu trúc phù hợp cho AddressSelector
                const transformedData = transformDataForAddressSelector(data, selectedProvince, selectedDistrict);
                setAddressData(transformedData);
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu từ API: ', error);
            });
    }, [selectedProvince, selectedDistrict]); // Chạy một lần khi component được tạo

    // Hàm biến đổi dữ liệu từ API thành cấu trúc dữ liệu phù hợp cho AddressSelector
    const transformDataForAddressSelector = (inputData, selectedProvince, selectedDistrict) => {
        const transformedData = { ...inputData };
    
        if (selectedProvince) {
            // Lọc các quận/huyện
            if (selectedDistrict) {
                transformedData[selectedProvince][selectedDistrict] = { ...inputData[selectedProvince][selectedDistrict] };
            }
        }
  
        return transformedData;
    };

    // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
    const getDistricts = (selectedProvince, addressData) => {
        if (addressData  && selectedProvince && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen']) {
            return Object.values(addressData[selectedProvince]['quan-huyen']);
        }
        return [];
    };
  
    // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
    const getWards = (selectedProvince, selectedDistrict, addressData) => {
        if (addressData && selectedProvince && selectedDistrict && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen'][selectedDistrict] && addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']) {
            return Object.values(addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']);
        }
        return [];
    };
  
    // Sử dụng hàm để lấy danh sách quận/huyện và xã/phường
    const districts = getDistricts(selectedProvince, addressData);
    const wards = getWards(selectedProvince, selectedDistrict, addressData);
  
    return (
        <>
            <FormControl fullWidth style={{ marginBottom: '8px' }}>
                <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                <Select
                    labelId="province-label"
                    id="province-select"
                    value={selectedProvince}
                    // onChange={(e) => setSelectedProvince(e.target.value)}
                    disabled
                    IconComponent={null}
                >
                    <MenuItem value="92" >Cần Thơ</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginBottom: '8px' }}>
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
    
            <FormControl fullWidth style={{ marginBottom: '8px' }}>
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
    
            {/* <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    // Xử lý dữ liệu đã chọn ở đây
                    console.log("Tỉnh/Thành phố:", selectedProvince);
                    console.log("Quận/Huyện:", selectedDistrict);
                    console.log("Phường/Xã:", selectedWard);
                }}
            >
                Lưu
            </Button> */}
        </>
    );
};

export default AddressSelector;
