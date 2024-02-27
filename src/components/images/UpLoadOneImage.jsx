import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Card, CardMedia, Snackbar, Alert } from '@mui/material';
import { API_IMAGE } from '../../services/book.service';
import RootService from '../../services/root.service';

function UploadImageWithPreview() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
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
        <Container>
            {/* <Typography variant="h6">Thay đổi avatar</Typography> */}
            <input type="file" accept="image/*" onChange={onFileChange} />
            <Button variant="contained" onClick={handleUpload} disabled={!selectedFile}>
                Tải lên
            </Button>
            {/* {uploadedImage && (
                <Card>
                    <CardMedia
                        component="img"
                        alt={uploadedImage.nameImage}
                        height="150"
                        width="150"
                        image={`${API_IMAGE}${uploadedImage.idImage}`}
                    />
                </Card>
            )} */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default UploadImageWithPreview;
