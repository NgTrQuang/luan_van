import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNumber } from '../../helpers/utils';
import { API_IMAGE } from "../../services/book.service";
import { Card, CardContent, Checkbox, Box, Typography, Button, Alert } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import CheckedItems from './CheckedItems';

const ChiTietCartItem = () => {
    const { cartItems, deleteCartItem, calculateTotalPrice, selectedItems } = useCart();
    // const [checkedItems, setCheckedItems] = useState({});

    // const handleCheckboxChange = (cartItemId) => {
    //     setSelectedItems((prevSelectedItems) => ({
    //         ...prevSelectedItems,
    //         [cartItemId]: !prevSelectedItems[cartItemId],
    //     }));
    // };

    return (
        <>
        <h2>Chi tiết giỏ hàng</h2>
        <Card>
            {cartItems.map((cart) => (
            <CardContent style={{ display: 'flex', alignItems: 'center' }} key={cart.cartItemId}>
                {/* <Checkbox
                    checked={false || checkedItems[cart.cartItemId]}
                    onChange={() => handleCheckboxChange(cart.cartItemId)}
                    inputProps={{
                        'aria-label': `Select product ${cart.cartItemId}`,
                    }}
                /> */}
                <CheckedItems cart={cart}/>
                <Box display="flex" alignItems="center" style={{ flex: 1, marginLeft: '16px' }}>
                    <img src={`${API_IMAGE}${cart?.book?.images[0]?.idImage}`} alt={cart?.book?.bookName} style={{width: '100px', height: '100px'}}/>
                    <div>
                    <Typography variant='h7'>
                        <h5>{cart?.book?.bookName}</h5>
                        <p>Giá: {formatNumber(cart?.book?.price)}</p>
                        <p>Số lượng: {cart.quantity}</p>
                        <p>Tổng: {formatNumber(cart?.book?.price * cart.quantity)}</p>
                        {/* <p>{selectedItems}</p> */}
                    </Typography>
                    </div>
                </Box>
                <Button
                    variant="outlined"
                    // color="primary" // Sử dụng màu cho lỗi hoặc "secondary" tùy vào theme của bạn
                    onClick={() => deleteCartItem(cart.cartItemId)}
                >
                    <FaTrash />
                </Button>  
            </CardContent>
            ))}
            <Typography variant='h6' style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}>Tổng cộng: {formatNumber(calculateTotalPrice)}</Typography> 
        </Card>
        <Link to="/invoice"><Button variant="contained" color="primary" sx={{marginBottom: '8px', marginTop: '8px'}}>Mua hàng</Button></Link>
        </>
    );
};

export default ChiTietCartItem;
