import React, { useState, useEffect } from 'react';
import RootService from '../../services/root.service';

function OrderSuccessComponent() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:8089/api/payment/returnFromVnpay');
        const response = await RootService.PaymentService.returnFromVnpay();
        if (response.status === 200) {
          const data = await response.json();
          setInvoiceData(data);
        } else {
          throw new Error('Failed to retrieve order information');
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (invoiceData) {
    return (
      <div>
        <h1>Order Success!</h1>
        {/* <p>Order ID: {invoiceData.orderId}</p>
        <p>Total Amount: {invoiceData.totalAmount}</p> */}
        {/* Render other order details as needed */}
      </div>
    );
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default OrderSuccessComponent;
