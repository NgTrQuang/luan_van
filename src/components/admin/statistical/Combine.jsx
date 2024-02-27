import React from 'react';
import BookCountByGenre from './genres/BookCountByGenre';
// import GenreStatistics from './genres/GenreStatistics';
// import AuthorStatistics from './author/AuthorStatistics';
import BookCountByAuthor from './author/BookCountByAuthor';
// import CountInvoice from './invoice/CountInvoice';
// import CountInvoiceIsPaid from './invoice/CountInvoiceIsPaid';
import AnalyticEcommerce from './AnalyticEcommerce';
import InvoiceList from './invoice/InvoiceList';
import BestSellingBooksChart from './book/BestSellingBooksChart';
import { Grid } from '@mui/material';

const CombineBookByGenres = () => {
  return (
    <>
      {/* <h3>Thống kê tổng hợp</h3> */}
      <AnalyticEcommerce/>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <BookCountByGenre/>
        </Grid>
        <Grid item sm={6} xs={12}>
          <BookCountByAuthor/>
        </Grid>
      </Grid>
      <BestSellingBooksChart/>
      <InvoiceList/>
    </>
  );
};

export default CombineBookByGenres;
