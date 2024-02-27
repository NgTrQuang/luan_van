import React, { useState } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import RootService from '../../../services/root.service';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UpdateInvoiceAction = ({ invoiceId, newAction }) => {
  // const [newAction, setNewAction] = useState(0); // Giả sử mặc định là 'Đang xử lý'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleUpdateAction = async () => {
    try {
      // const response = await axios.put(`http://localhost:8089/api/invoice/updateAction/${invoiceId}/${newAction}`);
      const response = await RootService.InvoiceService.updateInvoiceAction(invoiceId, newAction);
      setSnackbarSeverity('success');
      setSnackbarMessage(response.data.message);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error.response.data.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button onClick={handleUpdateAction} variant="contained" color="primary">
        <EditIcon/>
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateInvoiceAction;
