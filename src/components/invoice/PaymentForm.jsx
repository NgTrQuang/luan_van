import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Button from '@mui/material/Button';

function PaymentForm({ promoCode, setPromoCode, paymentMethod, setPaymentMethod }) {

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    // Gửi dữ liệu promoCode và paymentMethod lên máy chủ hoặc xử lý theo nhu cầu của bạn.
  };

  return (
    <form>
      <TextField
        label="Mã khuyến mãi"
        variant="outlined"
        value={promoCode}
        onChange={handlePromoCodeChange}
      />
      <RadioGroup
        name="paymentMethod"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <FormControlLabel
          value="COD"
          control={<Radio />}
          label="Thanh toán trực tiếp"
        />
        <FormControlLabel
          value="VnPay"
          control={<Radio />}
          label="Thanh toán với VnPay"
        />
      </RadioGroup>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Gửi
      </Button> */}
    </form>
  );
}

export default PaymentForm;
