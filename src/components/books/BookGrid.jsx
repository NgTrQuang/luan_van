import React from "react";

import BookItem from './BookItem';
import styles from './bookstyles.module.css';

const BooksGrid = ({books, filterText, currentUser}) => {
  const foundBooks = [];  

  if(books && books.length > 0){
    books.forEach((book) => {
      if (book && book.bookName && !isNaN(book.bookId)) {
        if ((book.bookName && book.bookName.toLowerCase().indexOf(filterText.toLowerCase()) === -1)) {
          return;
        }
        // Correct! Key should be specified inside the array.
        foundBooks.push(<BookItem key={book.bookId} book={book} currentUser={currentUser}/> );
      }
    });
  }

  return (   
    <main className={styles.main_block}>
      <div style={{fontWeight: 'bold'}}> Số sản phẩm tìm thấy: {foundBooks.length}</div>
      <section className={styles.grid_container}>
        {foundBooks.length > 0 ? foundBooks : <p>Đang tải dữ liệu ...</p>}
      </section>

    </main>
 );
};

export default BooksGrid;
