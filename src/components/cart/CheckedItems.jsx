import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Checkbox } from '@mui/material';

function CheckedItems({ cart }) {
    // const [checkedItems, setCheckedItems] = useState({});
    const { checkedItems, setCheckedItems, selectedItems, setSelectedItems } = useCart();

    const handleCheckboxChange = (cartItemId) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [cartItemId]: !prevSelectedItems[cartItemId],
        }));
    };

    return (
        <Checkbox
            checked={selectedItems[cart.cartItemId] || false }
            onChange={() => handleCheckboxChange(cart.cartItemId)}
            inputProps={{
                'aria-label': `Select product ${cart.cartItemId}`,
            }}
        />
    );
}

export default CheckedItems;