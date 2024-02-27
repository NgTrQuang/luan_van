import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Card, CardMedia, Snackbar, Alert } from '@mui/material';
import { API_IMAGE } from '../../services/book.service';
import { useUser } from '../context/UserContext';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import RootService from '../../services/root.service';

function UserUpdateAvatar({ onUpdate }) {
    const { user, setUser } = useUser();

    const [selectedFile, setSelectedFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const updateUserAvatar = async (userId, profileImageId) => {
        try {
            // const response = await axios.put(`http://localhost:8089/api/user/updateUserAvatar/${userId}`, { profileImageId });
            const response = await RootService.UserService.updateUserAvatar(userId, profileImageId);
            // Xử lý phản hồi từ máy chủ nếu cần
            console.log('Cập nhật ảnh đại diện thành công', response.data);
            onUpdate(response.data);
            // return response.data;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi cập nhật ảnh đại diện:', error);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        // const formData = new FormData();
        // formData.append('file', selectedFile);

        try {
            // const response = await axios.post('http://localhost:8089/api/v1/images', formData);
            const response = await RootService.ImageService.uploadFile(selectedFile);

            if (response.status === 200) {
                const data = response.data;
                setUploadedImage(data);
                setSnackbarMessage('Tải lên thành công!');
                setOpenSnackbar(true);
                await updateUserAvatar(user.userId, response.data.idImage);
                setSelectedFile(null);
                return;
            } else {
                setSnackbarMessage('Lỗi khi tải lên ảnh.');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Lỗi khi tải lên ảnh.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <input id="fileInput" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }}/>
            <label htmlFor="fileInput" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FlipCameraIosIcon/>
                <Button variant="contained" onClick={handleUpload} disabled={!selectedFile}>
                    Tải lên
                </Button>
            </label>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default UserUpdateAvatar;
