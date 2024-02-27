// import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../helpers/utils';
import styles from './bookstyles.module.css';
import { API_IMAGE } from '../../services/book.service';
import BookDetails from './BookDetails';
import { useState } from 'react';
// Correct! There is no need to specify the key here:

// const [bookDetail, setBookDetail] = useState({});
const BookItem = ({book, currentUser}) => {
    return (        
        <div>
        <Link to={`/books/${book.bookId}`} className="card" style={{margin: 15}}>
            {/* , display: 'inline-block', textAlign: 'center' */}
            {/* <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a> */}
            <div className={styles.image_zoom}>
                <img 
                    src={(book?.images && book?.images?.length > 0) ? `${API_IMAGE}${book?.images[0]?.idImage}` : 'default-image.jpg'} 
                    alt="Cover" 
                    style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }} 
                />
            </div>
            <p>{book.bookName}</p>
            <h5 className="text-start">{formatNumber(book.price)}</h5>
            {/* <div className="text-end"> */}
                {/* https://codesandbox.io/s/react-router-book-detail-pages-dynamic-links-tmcjc?file=/src/Books.js */}
                
                {/* {currentUser ? (
                    <button className={styles.btn_grad}>
                        <a className="fa fa-shopping-cart"></a>
                        <Link  to="#" > Thêm vào giỏ</Link>
                    </button>
                ) : ( 
                    <button className={styles.btn_grad}>
                        <a className="fa fa-shopping-cart "></a>
                        <Link  to="/login" > Thêm vào giỏ</Link>
                    </button>
                )
                } */}
               

                {/* { //JSX and conditional: https://www.codecademy.com/learn/fecp-react-part-i/modules/fecp-jsx/cheatsheet
                    isInCart(book) && 
                    <button 
                    onClick={() => increase(book)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(book) && 
                    <button 
                    onClick={() => addBook(book)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                } */}
                
            {/* </div> */}
        </Link>
        </div>
     );
}
 
export default BookItem;