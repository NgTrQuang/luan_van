import React, { useState, useCallback } from 'react';
import { Card, CardMedia, Container, Typography, List, ListItem } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import RootService from '../../services/root.service';

function UploadImage({ onUpload }) {

    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageTemps, setImageTemp] = useState([]);

    const dropzoneStyle = {
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop: '16px',
    };

    // const handleUpload = (images) => {
    //     // Xử lý danh sách các hình ảnh đã tải lên từ component ImageUpload
    //     // setUploadedImages(images);
    //     // Giữ lại các phần tử cũ và thêm phần tử mới vào mảng
    //     setUploadedImages((prevImages) => [...prevImages, ...images]);
    //     console.log(uploadedImages);
    
    //     // Gọi prop onUpload để truyền dữ liệu về hình ảnh đã tải lên lên component cha (NewBook)
    //     if (onUpload) {
    //       onUpload(images);
    //     }
    // };

    const handleUpload = useCallback((images) => {
        setUploadedImages((prevImages) => [...prevImages, ...images]);
        console.log(uploadedImages);
    
        // Gọi prop onUpload để truyền dữ liệu về hình ảnh đã tải lên lên component cha (NewBook)
        if (onUpload) {
            onUpload(images);
        }
    }, [onUpload, uploadedImages]); // Thêm dependencies nếu cần

    const onDrop = useCallback(async (acceptedFiles) => {
        setImageTemp(acceptedFiles);
        // Xử lý danh sách các tệp đã chấp nhận
        // acceptedFiles.forEach((file) => {
        // // Tạo một đối tượng FormData để gửi dữ liệu tệp lên máy chủ
        // const formData = new FormData();
        // formData.append('files', file);

        // // Gửi tệp lên máy chủ (sử dụng API endpoint tải lên ảnh)
        // fetch('http://localhost:8089/api/v1/images/many', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //     // Xử lý kết quả trả về từ máy chủ (danh sách các hình ảnh đã tải lên)
        //     handleUpload(data);
        //     // console.error(data);
        //     })
        //     .catch((error) => {
        //     console.error('Lỗi khi tải ảnh lên:', error);
        //     });
        // });
        try {
            const uploadResponse = await RootService.ImageService.uploadMultipleFiles(acceptedFiles);
      
            // Assuming the response structure is an array of image data
            const imageData = uploadResponse.data;
      
            handleUpload(imageData);
          } catch (error) {
            console.error('Error uploading images:', error);
          }
    }, [handleUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // accept: '*/*', // Chấp nhận tất cả các loại hình ảnh
    });

    return (
        <Container> {/* Sử dụng lớp CSS đã được định nghĩa */}
            <Typography variant="h6">Tải lên hình ảnh</Typography>
            <div {...getRootProps()} style={dropzoneStyle}> {/* Sử dụng lớp CSS đã được định nghĩa */}
                <input {...getInputProps()} />
                <Typography variant="body2">Kéo và thả hình ảnh hoặc nhấp để chọn hình ảnh</Typography>
            </div>
            <Typography variant="h6">Danh sách hình ảnh được chọn:</Typography>
            <List> {/* Sử dụng lớp CSS đã được định nghĩa */}
                {/* {uploadedImages.map((image, index) => (
                <ListItem key={index}> 
                    <ListItemText primary={image.nameImage} />
                </ListItem>
                ))} */}
                {/* {renderUploadedFiles()} */}

                {imageTemps.map((file, index) => (
                <ListItem key={index}>
                    <Card 
                        sx={{
                            marginRight: '10px',
                            marginBottom: '10px',
                        }}
                        >
                    <CardMedia
                        component="img"
                        alt={file.name}
                        height="150"
                        width="150"
                        image={URL.createObjectURL(new Blob([file], { type: file.type }))}
                    />
                    </Card>
                </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default UploadImage;
