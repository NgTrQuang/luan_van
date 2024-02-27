import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import UploadImage from '../../images/UploadImage';
import { useParams } from 'react-router-dom';
// import { API_IMAGE } from '../../../services/book.service';
import RootService from '../../../services/root.service';

function UpdateBook() {
  const { bookId } = useParams();

  // Khởi tạo các state để lưu thông tin sách
  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    description: '',
    price: '',
    stock: '',
    genreIds: [],
    authorIds: [],
    publishingPlaceId: null,
    imageNamesList: [],
  });

  // const [bookData, setBookData] = useState({})
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishingPlaces, setPublishingPlaces] = useState([]);
  const [idImage, setIdImage] = useState([]);

  const [isValidPrice, setIsValidPrice] = useState(true);
  const [isValidStock, setIsValidStock] = useState(true);
  // const [isValidBookName, setIsValidBookName] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Gọi API để lấy thông tin sách theo ID và cập nhật state
    const fetchBookInfo = async () => {
      try {
        const [bookResponse, authorsResponse, genresResponse, publishingPlacesResponse] = await Promise.all([
          // axios.get(`http://localhost:8089/api/v1/books/${bookId}`), // Lấy thông tin sách
          RootService.BookService.getBookById(bookId),
          // axios.get('http://localhost:8089/api/authors'), // Lấy danh sách tác giả
          RootService.AuthorService.getAllAuthors(),
          // axios.get('http://localhost:8089/api/genres'), // Lấy danh sách thể loại
          RootService.GenreService.getAllGenres(),
          // axios.get('http://localhost:8089/api/publishingPlaces'), // Lấy danh sách nhà xuất bản
          RootService.PublishingPlaceService.getAllPublishingPlaces(),
        ]);

        // Cập nhật state với thông tin sách và danh sách tác giả, thể loại, nhà xuất bản
        // setBookData(bookResponse.data);

        // Cập nhật state `bookInfo` với dữ liệu từ `bookData`
        setBookInfo({
          bookName: bookResponse.data.bookName || '',
          description: bookResponse.data.description || '',
          price: bookResponse.data.price || 0,
          stock: bookResponse.data.stock || 0,
          genreIds: (bookResponse?.data?.genres || []).map((genre) => genre.id) || [],
          authorIds: (bookResponse?.data?.authors || []).map((author) => author.id) || [],
          publishingPlaceId: bookResponse?.data?.publishingPlace
            ? bookResponse?.data?.publishingPlace?.id
            : null,
          imageNamesList: (bookResponse?.data?.images || []).map((image) => image.idImage) || [],
        });
        setIdImage((bookResponse?.data?.images || []).map((image) => image.idImage) || [])
        setAuthors(authorsResponse?.data);
        setGenres(genresResponse?.data);
        setPublishingPlaces(publishingPlacesResponse?.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sách:', error);
      }
    };
    fetchBookInfo();
  }, [bookId]);

  const showError = (message) => {
    // Hiển thị lỗi tại đây
    setErrorMessage(message);
  };

  const handleImageUpload = (uploadedImages) => {
    const imageNames = uploadedImages.map((image) => image.idImage);
    setBookInfo({ ...bookInfo, imageNamesList: [...bookInfo.imageNamesList, ...imageNames] });
  };

  const handleAuthorChange = (e) => {
    const selectedAuthorIds = e.target.value;
    setBookInfo({ ...bookInfo, authorIds: selectedAuthorIds });
  };

  const handleGenreChange = (e) => {
    const selectedGenreIds = e.target.value;
    setBookInfo({ ...bookInfo, genreIds: selectedGenreIds });
  };

  const isValidInput = () => {
    let isValid = true;

     // Kiểm tra tên sách
     if (!bookInfo.bookName.trim()) {
        showError('Vui lòng nhập tên sách.');
        isValid = false;
    }

    // Kiểm tra mô tả
    if (!bookInfo.description.trim()) {
        showError('Vui lòng nhập mô tả.');
        isValid = false;
    }

    // Kiểm tra giá và số lượng
    // parseFloat khác parseInt ở chỗ số 0 sẽ trả về true còn parseInt sẽ trả về lỗi không hợp lệ và chuyển về NaN
    const parsedPrice = parseFloat(bookInfo.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0 || bookInfo.price === '') {
        showError('Vui lòng nhập giá trị giá hợp lệ.');
        isValid = false;
    }

    const parsedStock = parseFloat(bookInfo.stock);
    if (isNaN(parsedStock) || parsedStock <= 0 || bookInfo.stock === '') {
        showError('Vui lòng nhập giá trị số lượng hợp lệ.');
        isValid = false;
    }

        // Kiểm tra Nhà Xuất Bản
    if (!bookInfo.publishingPlaceId) {
        showError('Vui lòng chọn Nhà Xuất Bản.');
        isValid = false;
    }

    // Kiểm tra Tác Giả
    if (!bookInfo?.authorIds || bookInfo?.authorIds.length === 0) {
        showError('Vui lòng chọn ít nhất một Tác Giả.');
        isValid = false;
    }

    // Kiểm tra Thể Loại
    if (!bookInfo?.genreIds || bookInfo?.genreIds.length === 0) {
        showError('Vui lòng chọn ít nhất một Thể Loại.');
        isValid = false;
    }

    // Kiểm tra Hình Ảnh
    if (bookInfo?.imageNamesList.length === 0) {
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

    const parsedPrice = bookInfo.price ? parseInt(bookInfo.price, 10) : null;
    const parsedStock = bookInfo.stock ? parseInt(bookInfo.stock, 10) : null;
    const parsedPublishingPlaceId = bookInfo.publishingPlaceId
      ? parseInt(bookInfo.publishingPlaceId, 10)
      : null;

    const updatedBook = {
      bookName: bookInfo.bookName,
      description: bookInfo.description,
      price: parsedPrice,
      stock: parsedStock,
      authorIds: bookInfo.authorIds,
      genreIds: bookInfo.genreIds,
      publishingPlaceId: parsedPublishingPlaceId,
      imageNamesList: bookInfo.imageNamesList,
    };

    try {
      // Gửi yêu cầu cập nhật thông tin sách qua API PUT
      // const response = await axios.put(
      //   `http://localhost:8089/api/v1/books/${bookId}`,
      //   updatedBook,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      const response = await RootService.BookService.updateBook(bookId, updatedBook);
      if (response.status >= 200 && response.status < 300) {
        // Sách đã được cập nhật thành công
        console.log('Sách đã được cập nhật!');
      } else {
        console.error('Có lỗi khi cập nhật sách.');
      }
    } catch (error) {
      console.error('Có lỗi khi gửi yêu cầu cập nhật:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Cập Nhật Sách</Typography>
      <form onSubmit={handleSubmit}>
        {/* Các trường nhập thông tin sách */}
        <TextField
          label="Tên Sách"
          variant="outlined"
          fullWidth
          value={bookInfo.bookName}
          onChange={(e) => setBookInfo({ ...bookInfo, bookName: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          label="Mô tả"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={bookInfo.description}
          onChange={(e) => setBookInfo({ ...bookInfo, description: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          label="Giá"
          variant="outlined"
          fullWidth
          type="number"
          value={bookInfo.price}
          onChange={(e) => {
            let inputValue = e.target.value;
            // Kiểm tra nếu giá trị nhập vào là số và không âm
            if (!isNaN(inputValue) && (inputValue >= 0 || inputValue === '')) {
                setBookInfo({ ...bookInfo, price: inputValue });
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
          label="Số lượng tồn"
          variant="outlined"
          fullWidth
          type="number"
          value={bookInfo.stock}
          onChange={(e) => {
            let inputValue = e.target.value;
            // Kiểm tra nếu giá trị nhập vào là số và không âm
            if (!isNaN(inputValue) && (inputValue >= 0 || inputValue === '')) {
              setBookInfo({ ...bookInfo, stock: inputValue })
              setIsValidStock(true); // Đánh dấu là giá trị hợp lệ
            } else {
              setIsValidPrice(false); // Đánh dấu là giá trị không hợp lệ
            }
          }}
          required
          margin="normal"
          error={!isValidStock} // Hiển thị lỗi nếu giá trị không hợp lệ
          helperText={isValidStock ? '' : 'số lượng không hợp lệ'}
        />
        {/* Dropdown hoặc autocomplete cho Nhà Xuất Bản */}
        <FormControl fullWidth variant="outlined" required margin="normal">
          <InputLabel id="publishing-place-label">Nhà Xuất Bản</InputLabel>
          <Select
            labelId="publishing-place-label"
            id="publishing-place"
            value={bookInfo.publishingPlaceId || ''}
            label="Nhà Xuất Bản"
            onChange={(e) => setBookInfo({ ...bookInfo, publishingPlaceId: e.target.value })}
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
            value={bookInfo.authorIds}
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
            value={bookInfo.genreIds}
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
        <UploadImage idImage={idImage} onUpload={handleImageUpload} />
        {/* Hiển thị các hình ảnh đã chọn */}
        {/* <List>
          {idImage.map((id, index) => (
            <ListItem key={index}> */}
              {/* <ListItemText primary={imageName} /> */}
              {/* <Avatar 
                alt="Hình ảnh" 
                sx={{
                  width: 100, // Điều chỉnh kích thước theo ý muốn
                  height: 100, // Điều chỉnh kích thước theo ý muốn
                }} 
                src={`${API_IMAGE}${id}`} 
              />
            </ListItem>
          ))} */}
        {/* </List> */}
        {hasError && errorMessage && (
        <Typography variant="body2" color="error" style={{ marginBottom: '16px' }}>
            {errorMessage}
        </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '16px' }}>
          Cập Nhật Sách
        </Button>
        <Link to="/admin/books-all">
            <Button variant="contained" color="primary" style={{ marginBottom: '16px' , marginLeft: '8px' }}>
            Trở về
            </Button>
        </Link>
      </form>
    </Container>
  );
}

export default UpdateBook;
