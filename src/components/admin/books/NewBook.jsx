import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import UploadImage from '../../images/UploadImage';
import RootService from '../../../services/root.service';

function NewBook() {
    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); // Khởi tạo giá trị là ''
    const [stock, setStock] = useState(''); // Khởi tạo giá trị là ''
    const [genreIds, setGenreIds] = useState([]); // Khởi tạo là một mảng trống
    const [authorIds, setAuthorIds] = useState([]); // Khởi tạo là một mảng trống
    const [publishingPlaceId, setPublishingPlaceId] = useState(null); // Khởi tạo là null
    const [imageNamesList, setImageNamesList] = useState([]); // Khởi tạo là một mảng trống
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [publishingPlaces, setPublishingPlaces] = useState([]);
    const [isValidPrice, setIsValidPrice] = useState(true);
    const [isValidStock, setIsValidStock] = useState(true);
    // const [isValidBookName, setIsValidBookName] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

  // Axios danh sách nhà xuất bản, tác giả và thể loại từ API để hiển thị trong các dropdown hoặc autocomplete fields

    useEffect(() => {
        // Gọi API để lấy danh sách nhà xuất bản và cập nhật state
        // Gọi API để lấy danh sách tác giả và cập nhật state
        // Gọi API để lấy danh sách thể loại và cập nhật state
        const fetchData = async () => {
            try {
            const [authorsResponse, genresResponse, publishingPlacesResponse] = await Promise.all([
                // axios.get('http://localhost:8089/api/v1/authors'), // Lấy danh sách tác giả
                // axios.get('http://localhost:8089/api/v1/genres'),  // Lấy danh sách thể loại
                // axios.get('http://localhost:8089/api/v1/publishingPlaces'),  // Lấy danh sách nhà xuất bản
                RootService.AuthorService.getAllAuthors(),
                RootService.GenreService.getAllGenres(),
                RootService.PublishingPlaceService.getAllPublishingPlaces(),
            ]);
    
            // Cập nhật state sau khi lấy dữ liệu
            setAuthors(authorsResponse.data);
            setGenres(genresResponse.data);
            setPublishingPlaces(publishingPlacesResponse.data);
            } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);

    const showError = (message) => {
        // Hiển thị lỗi tại đây
        setErrorMessage(message);
    };
  
    const handleImageUpload = (uploadedImages) => {
        const imageNames = uploadedImages.map((image) => image.idImage);
        // setImageNamesList(imageNames);
        setImageNamesList((prevImages) => [...prevImages, ...imageNames]);
    }

    const handleAuthorChange = (e) => {
        // xử lý bình thường
        // if (authorIds) {
        // const selectedAuthorIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        // setAuthorIds(selectedAuthorIds);
        // }
        // xử lý ở MUI
        const selectedAuthorIds = e.target.value;
        setAuthorIds(selectedAuthorIds);
    };

    const handleGenreChange = (e) => {
        // if (GenreIds) {
        // const selectedGenreIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        // setGenreIds(selectedGenreIds);
        // }
        const selectedGenreIds = e.target.value;
        setGenreIds(selectedGenreIds);
    };

    const isValidInput = () => {
        let isValid = true;
    
         // Kiểm tra tên sách
         if (!bookName.trim()) {
            showError('Vui lòng nhập tên sách.');
            isValid = false;
        }

        // Kiểm tra mô tả
        if (!description.trim()) {
            showError('Vui lòng nhập mô tả.');
            isValid = false;
        }

        // Kiểm tra giá và số lượng
        // parseFloat khác parseInt ở chỗ số 0 sẽ trả về true còn parseInt sẽ trả về lỗi không hợp lệ và chuyển về NaN
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0 || price === '') {
            showError('Vui lòng nhập giá trị giá hợp lệ.');
            isValid = false;
        }

        const parsedStock = parseFloat(stock);
        if (isNaN(parsedStock) || parsedStock <= 0 || stock === '') {
            showError('Vui lòng nhập giá trị số lượng hợp lệ.');
            isValid = false;
        }
    
            // Kiểm tra Nhà Xuất Bản
        if (!publishingPlaceId) {
            showError('Vui lòng chọn Nhà Xuất Bản.');
            isValid = false;
        }

        // Kiểm tra Tác Giả
        if (!authorIds || authorIds.length === 0) {
            showError('Vui lòng chọn ít nhất một Tác Giả.');
            isValid = false;
        }

        // Kiểm tra Thể Loại
        if (!genreIds || genreIds.length === 0) {
            showError('Vui lòng chọn ít nhất một Thể Loại.');
            isValid = false;
        }

        // Kiểm tra Hình Ảnh
        if (imageNamesList.length === 0) {
            showError('Vui lòng tải lên ít nhất một Hình Ảnh.');
            isValid = false;
        }
        // Thêm các điều kiện kiểm tra khác nếu cần
    
        return isValid;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidInput()) {
            setHasError(true);
            return;
        }

        setHasError(false);
        setErrorMessage(''); // Clear errorMessage
        // if (!isValidPrice || !isValidStock) {
        //     console.log(price);
        //     console.log(stock);
        //     console.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        //     return;
        // }

        const parsedPrice = price ? parseInt(price, 10) : null;
        const parsedStock = stock ? parseInt(stock, 10): null;
        const parsedPublishingPlaceId = publishingPlaceId ? parseInt(publishingPlaceId, 10) : null;

        const bookRequest = {
            bookName,
            description,
            price: parsedPrice,
            stock: parsedStock,
            authorIds,
            genreIds,
            publishingPlaceId: parsedPublishingPlaceId,
            imageNamesList
        };
        console.log(bookRequest);

    // Gọi API để tạo sách mới
    try {
        // const response = await axios.post('http://localhost:8089/api/v1/books', bookRequest, {
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        // });
        const response = await RootService.BookService.createBook(bookRequest);
        if (response.status >= 200 && response.status < 300) {
        // Sách đã được tạo thành công
        console.log('Sách đã được tạo!');
        // Xóa hoặc làm sạch các trường trên form để chuẩn bị cho sách tiếp theo
        setBookName('');
        setDescription('');
        setPrice('');
        setStock('');
        setAuthorIds([]);
        setGenreIds([]);
        setPublishingPlaceId(null);
        setImageNamesList([]);
      } else {
        console.error('Có lỗi khi tạo sách.');
      }
    } catch (error) {
      console.error('Có lỗi khi gửi yêu cầu:', error);
    }
  }
  
  return (
    <Container>
        <Typography variant="h4">Thêm Sách Mới</Typography>
        <form onSubmit={handleSubmit}>
        {/* Các trường nhập thông tin sách */}
        <TextField
            label="Tên Sách"
            variant="outlined"
            fullWidth
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            margin="normal"
            // error={!isValidBookName}
            // helperText={!isValidBookName && bookName.trim() !== '' ? 'Vui lòng nhập tên sách.' : ''}
        />
        <TextField
            label="Mô tả"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="normal"
        />
        <TextField
            label="Giá"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            // onChange={(e) => setPrice(e.target.value)}
            onChange={(e) => {
                let inputValue = e.target.value;
                // Kiểm tra nếu giá trị nhập vào là số và không âm
                if (!isNaN(inputValue) && (inputValue >= 0 || inputValue === '')) {
                    setPrice(inputValue);
                    setIsValidPrice(true); // Đánh dấu là giá trị hợp lệ
                } else {
                  setIsValidPrice(false); // Đánh dấu là giá trị không hợp lệ
                }
            }}
            required
            margin="normal"
            error={!isValidPrice} // Hiển thị lỗi nếu giá trị không hợp lệ
            helperText={isValidPrice ? '' : 'Giá không hợp lệ'}
        />
        <TextField
            label="Số lượng"
            variant="outlined"
            fullWidth
            type="number"
            value={stock}
            onChange={(e) => {
                let inputValue = e.target.value;
                // Kiểm tra nếu giá trị nhập vào là số và không âm
                if (!isNaN(inputValue) && (inputValue >= 0 || inputValue === '')) {
                    setStock(inputValue);
                    setIsValidStock(true); // Đánh dấu là giá trị hợp lệ
                } else {
                    setIsValidStock(false); // Đánh dấu là giá trị không hợp lệ
                }
            }}
            // inputProps={{ min: "0" }}  // Đặt giá trị tối thiểu
            required
            margin="normal"
            error={!isValidStock} // Hiển thị lỗi nếu giá trị không hợp lệ
            helperText={isValidStock ? '' : 'Số lượng không hợp lệ'}
        />
        {/* Dropdown hoặc autocomplete cho Nhà Xuất Bản */}
        <FormControl fullWidth variant="outlined" required margin="normal">
            <InputLabel id="publishing-place-label">Nhà Xuất Bản</InputLabel>
            <Select
                labelId="publishing-place-label"
                id="publishing-place"
                value={publishingPlaceId}
                label="Nhà Xuất Bản"
                onChange={(e) => setPublishingPlaceId(e.target.value)}
            >
                <MenuItem value="">
                <em>Chọn Nhà Xuất Bản</em>
                </MenuItem>
                {publishingPlaces.map((place) => (
                <MenuItem key={place.id} value={place.id}>
                    {place.name}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
        {/* Dropdown hoặc checkbox cho Tác Giả */}
        <FormControl fullWidth variant="outlined" required margin="normal">
            <InputLabel id="author-label">Tác Giả</InputLabel>
            <Select
                multiple
                labelId="author-label"
                id="author"
                value={authorIds}
                label="Tác Giả"
                onChange={handleAuthorChange}
            >
                {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                    {author.name}
                </MenuItem>
                ))}
            </Select>
        </FormControl>

        {/* Dropdown hoặc checkbox cho Thể Loại */}
        <FormControl fullWidth variant="outlined" required margin="normal">
            <InputLabel id="genre-label">Thể Loại</InputLabel>
            <Select
                multiple
                labelId="genre-label"
                id="genre"
                value={genreIds}
                label="Thể Loại"
                onChange={handleGenreChange}
            >
                {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
        {/* Trường để tải lên hình ảnh */}
        {/* <input type="file" accept="image/*" multiple onChange={handleImageChange} required /> */}
        <UploadImage onUpload={handleImageUpload}/>

        {/* Hiển thị các hình ảnh đã chọn */}
        {/* <List>
            {imageNamesList.map((imageName, index) => (
                <ListItem key={index}>
                <ListItemText primary={imageName} />
                </ListItem>
            ))}
        </List> */}
        {hasError && errorMessage && (
        <Typography variant="body2" color="error" style={{ marginBottom: '16px' }}>
            {errorMessage}
        </Typography>
        )}

        {/* <button type="submit">Tạo Sách</button> */}
        <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '16px' }}>
            Tạo Sách
        </Button>
        <Link to="/admin/books-all">
            <Button variant="contained" color="primary" style={{ marginBottom: '16px', marginLeft: '8px' }}>
            Trở về
            </Button>
        </Link>
      </form>
    </Container>
  );
}

export default NewBook;