import React, { useState } from 'react';
import axios from 'axios';
// import UpLoadOneImage from '../images/UpLoadOneImage';
import { Container, Typography, Button, Card, CardMedia, Snackbar, Alert, Grid, Paper, Avatar, TextField } from '@mui/material';
import { API_IMAGE } from '../../services/book.service';
import { useUser } from '../context/UserContext';
import RootService from '../../services/root.service';

function UserInformationForm({ onUpdate, editing, setEditing }) {
    const { user, setUser } = useUser();
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
  
    // const onFileChange = (event) => {
    //   const file = event.target.files[0];
    //   setSelectedFile(file);
    // };

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         return;
    //     }
    
    //     const formData = new FormData();
    //     formData.append('file', selectedFile);
    
    //     try {
    //         const response = await axios.post('http://localhost:8089/api/v1/images', formData);
    
    //         if (response.status === 200) {
    //             const data = response.data;
    //             setUploadedImage(data);
    //             setSnackbarMessage('Tải lên thành công!');
    //             setOpenSnackbar(true);
    //         } else {
    //             setSnackbarMessage('Lỗi khi tải lên ảnh.');
    //             setOpenSnackbar(true);
    //         }
    //     } catch (error) {
    //         setSnackbarMessage('Lỗi khi tải lên ảnh.');
    //         setOpenSnackbar(true);
    //     }
    // };

    // const handleCloseSnackbar = () => {
    //     setOpenSnackbar(false);
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userResponse = {
            firstname: firstname,
            lastname: lastname,
            // email: email,
            // userProfile_id: uploadedImage ? uploadedImage.idImage : null
        }

        try {
            // const response = await axios.put(`http://localhost:8089/api/user/updateUserInformation/${user.userId}`, userResponse, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            const response = await RootService.UserService.updateUserInformation(user.userId, userResponse);
            onUpdate(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                        fullWidth
                        label="Họ"
                        variant="outlined"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        disabled={!editing}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        fullWidth
                        label="Tên"
                        variant="outlined"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        disabled={!editing}
                        />
                    </Grid>
        
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={!editing}
                            sx={{marginRight: "8px"}}
                        >
                            Cập nhật
                        </Button>
                        {editing ?
                            (<Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setEditing(!editing)}
                            >
                                Thoát
                            </Button>) : (<></>)
                        }
                    </Grid>
                </Grid>         
            </form>       
        </>
    );
}

export default UserInformationForm;
