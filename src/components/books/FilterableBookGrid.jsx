import React, { useState, useEffect } from "react";

import Search from './Search';
import BookGrid from './BookGrid';
import PaginationComponent from "../admin/books/Pagination";
import styles from '../books/bookstyles.module.css';
// import UserService from "../../services/user.service";
import RootService from "../../services/root.service";


const FilterableBookGrid = ({currentUser}) => {
  const [books, setBooks] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  // const status = false;

  useEffect(() => {
      RootService.BookService.getAllBooks(currentPage, pageSize).then(
      (res) => {
        setBooks(res.data.content);
        setTotalPages(res.data.totalPages);
        console.log(res.data);
      },
      (error) => {
        // const _books =[
        //   (error.res && error.res.data) ||
        //   error.message ||
        //   error.toString()];
        console.error(error);

          // setBooks(_books);
        setBooks([]);
      }
    );
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    //nên truyền 1 biến selectedPage thay vì even, value giá trị có thể sẽ bị NAN
    setCurrentPage(selectedPage-1);
  };

  const handleChangeFilterBooksByName = (bookName) => {
    setFilterName(bookName);
  }

  return ( 
    <main className={styles.main_block}>
      <Search filterText={filterName}
        onFilterTextChange={handleChangeFilterBooksByName}/> 
        
      <BookGrid books={books} 
        filterText={filterName} 
        currentUser={currentUser}
      /> 
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PaginationComponent totalPages={totalPages} 
          currentPage={currentPage + 1} 
          onChangePage={handlePageChange} />
      </div>
    </main>
 );
};

export default FilterableBookGrid;
