import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNumber } from '../../helpers/utils';
import { API_IMAGE } from "../../services/book.service";
import { Card, CardContent, Box, Typography, Button, Grid, TextField } from '@mui/material';
// import Address from '../address/Address';
import { useUser } from '../context/UserContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckoutButton from './CheckoutButton';
import PaymentForm from './PaymentForm';

const Invoice = () => {
    const { checkedItems, cartItems, selectedItems, calculateTotalPrice } = useCart();
    const { user } = useUser();
    const selectedCartItems = cartItems.filter(cartItem => selectedItems[cartItem.cartItemId]);

    const [promoCode, setPromoCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');

    return (
        // <>
        //     <Typography variant="h5" style={{ marginBottom: "8px", marginTop: "8px" }}><LocationOnIcon/> Địa chỉ nhận hàng</Typography>
        //     {/* <Address/> */}
        //     <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "8px" }}>
        //         <Grid item xs={6}>
        //             <Typography variant="body1">
        //             Số điện thoại: {user?.addresses[user?.addresses?.length - 1]?.phone}
        //             </Typography>
        //         </Grid>
        //         <Grid item xs={6}>
        //             <Typography variant="body1">
        //             Địa chỉ giao hàng: {user?.addresses[user?.addresses?.length - 1]?.fulladdress}
        //             </Typography>
        //         </Grid>
        //     </Grid>
            
        //     <Card  style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}>
        //     <Grid container>
        //     <Grid item xs={8}>
        //         {selectedCartItems.map((cart) => (
        //         <CardContent style={{ display: 'flex', alignItems: 'center' }} key={cart.cartItemId}>
        //             <Box display="flex" alignItems="center" style={{ flex: 1, marginLeft: '16px' }}>
        //                 <img src={`${API_IMAGE}${cart.book.images[0].idImage}`} alt={cart.book.bookName} style={{width: '100px', height: '100px'}}/>
        //                 <div>
        //                 <Typography variant='h7'>
        //                     <h5>{cart.book.bookName}</h5>
        //                     <p>Giá: {formatNumber(cart.book.price)}</p>
        //                     <p>Số lượng: {cart.quantity}</p>
        //                     <p>Tổng: {formatNumber(cart.book.price * cart.quantity)}</p>
        //                 </Typography>
        //                 </div>
        //             </Box>
        //         </CardContent>
        //         ))}
        //         </Grid>
        //         {/* <CardContent>
        //             <PaymentForm/>
        //         </CardContent>
        //         <Typography variant='h6' style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}>Tổng cộng: {formatNumber(calculateTotalPrice)}</Typography> */}
        //             <Grid item xs={4}>
        //                 <PaymentForm />
        //                 <Typography variant='h6' style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}>Tổng cộng: {formatNumber(calculateTotalPrice)}</Typography>
        //                 <CheckoutButton selectedCartItems={selectedCartItems} />                   
        //             </Grid>
        //         </Grid>
        //     </Card>
        //     {/* <Link to="#">
        //         <Button variant="contained" color="primary" sx={{marginBottom: '8px', marginTop: '8px'}}>Thanh toán</Button>
        //     </Link> */}
        // </>
        <>
        <Typography variant="h5" style={{ marginBottom: "8px", marginTop: "8px" }}><LocationOnIcon/> Địa chỉ nhận hàng</Typography>
            {/* <Address/> */}
            <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "8px" }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                    Số điện thoại: {user?.addresses[user?.addresses?.length - 1]?.phone}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                    Địa chỉ giao hàng: {user?.addresses[user?.addresses?.length - 1]?.fulladdress}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ marginBottom: "8px", marginTop: "8px" }}>
                <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                    {selectedCartItems.map((cart) => (
                        <CardContent style={{ display: 'flex', alignItems: 'center' }} key={cart.cartItemId}>
                            <Box display="flex" alignItems="center" style={{ flex: 1, marginLeft: '16px' }}>
                                <img src={`${API_IMAGE}${cart.book.images[0].idImage}`} alt={cart.book.bookName} style={{ width: '100px', height: '100px' }}/>
                                <div>
                                    <Typography variant='h7'>
                                        <h5>{cart.book.bookName}</h5>
                                        <p>Giá: {formatNumber(cart.book.price)}</p>
                                        <p>Số lượng: {cart.quantity}</p>
                                        <p>Tổng: {formatNumber(cart.book.price * cart.quantity)}</p>
                                    </Typography>
                                </div>
                            </Box>
                        </CardContent>
                    ))}
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PaymentForm promoCode={promoCode} setPromoCode={setPromoCode} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                    <Typography variant='h6' style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}>Tổng cộng: {formatNumber(calculateTotalPrice)}</Typography>
                    <CheckoutButton selectedCartItems={selectedCartItems} paymentMethod={paymentMethod} />
                </Grid>
            </Grid>
{/* <Card style={{ marginBottom: "8px", marginTop: "8px", marginLeft: "8px" }}> */}
    
{/* </Card> */}

        </>
    );
};

export default Invoice;
