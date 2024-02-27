import React, { useState } from 'react';

const BookStock = ({ stock, quantity, setQuantity, onStockChange }) => {
  // const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if(quantity && quantity >= 2){
        setQuantity(quantity - 1);
        onStockChange(quantity - 1);
    }
  }

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      onStockChange(quantity + 1);
    }
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= stock) {
      setQuantity(value);
      onStockChange(value);
    }
  }

  return (
    // <div>
    //   <button onClick={handleDecrease}>-</button>
    //   <input type="number" value={quantity} onChange={handleQuantityChange} />
    //   <button onClick={handleIncrease}>+</button>
    // </div>
    // <div className="row mb-4">
    // <div className="col-md-4 col-6 mb-3">
    // <label className="form-label d-block">Số lượng</label>
    <div className="input-group input-spinner">
        <button className="btn btn-icon btn-light" onClick={handleDecrease}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z"></path>
            </svg>
        </button>
        <input className="form-control text-center" placeholder="" value={quantity} onChange={handleQuantityChange}/>
        <button className="btn btn-icon btn-light" onClick={handleIncrease}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
        </button>
    </div>   
  );
}

export default BookStock;
{/* </div> 
    <AddCart userId={currentUser} product={bookDetail.bookId} stock={bookDetail.stock}></AddCart>
    </div> */}