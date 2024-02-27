import React, { useState, useEffect } from 'react';
// import BookService from "../../services/book.service";
import { useParams } from "react-router-dom";
import { formatNumber } from '../../helpers/utils';
import "../books/book.module.css";
import BookStock from './BookStock';
import { API_IMAGE } from '../../services/book.service';
import CreateCartItem from '../cart/CreateCartItem';
import RootService from '../../services/root.service';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

const BookDetails = () => {

  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(bookId);

  // const handleChangeBookDetails = (bookId) => {
  //     setBookDetail(bookId);
  // }

  // const [stock, setStock] = useState(200);

  const handleStockChange = (event) => {
    if(event && event.target && event.target.value){
      const newStockValue = parseInt(event.target.value);
      setQuantity(newStockValue);
    }
  };

  useEffect(() => {
    // call API to get product detail by productId
    const fetchBookDetails = async () => {
      try {
        const response = await RootService.BookService.getBookById(bookId);
        setBookDetail(response.data);
        console.log(response.data);
        console.log(bookId);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchBookDetails();
  }, [bookId]);

  // const countStock = bookDetail.stock.reduce((acc, cart) => {
  //   acc += 1;
  //   return acc;
  // }, 0);
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return ( 
    <>  
      <section className="padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-lg-6">
              <article className="gallery-wrap"> 
                <div className="img-big-wrap img-thumbnail">
                  <div data-fslightbox-type="image" > 
                    <img src={bookDetail?.images && bookDetail?.images?.length > 0 ? `${API_IMAGE}${bookDetail?.images[0]?.idImage}` : 'default-image.jpg'} alt="Cover" />
                  </div>
                </div>
                <div className="thumbs-wrap">                 
                  {bookDetail?.images && bookDetail?.images?.length > 0 ?
                    bookDetail.images.map((image, index) => (
                      // <div key={index} data-fslightbox-type="image"  className="item-thumb"> 
                      //   <img 
                      //     // key={image.idImage}
                      //     src={`${API_IMAGE}${bookDetail?.images[index]?.idImage}`}
                      //     alt={image.nameImage}
                      //   />
                      // </div>
                    <div
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="item-thumb"
                    >
                      <img
                        src={`${API_IMAGE}${bookDetail?.images[index]?.idImage}`}
                        alt={image.nameImage}
                      />
                    </div>
                  )) : (
                    // <a data-fslightbox-type="image" href="/" className="item-thumb"> 
                    //   Không tồn tại ảnh
                    // </a>
                    <div className="item-thumb">
                      Không tồn tại ảnh
                    </div>
                  )}
                </div>
                {/* {isOpen && (
                  <Lightbox
                    mainSrc={`${API_IMAGE}${bookDetail?.images[photoIndex]?.idImage}`}
                    nextSrc={`${API_IMAGE}${bookDetail?.images[(photoIndex + 1) % bookDetail?.images.length]?.idImage}`}
                    prevSrc={`${API_IMAGE}${bookDetail?.images[(photoIndex + bookDetail?.images.length - 1) % bookDetail?.images.length]?.idImage}`}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                      setPhotoIndex((photoIndex + bookDetail?.images.length - 1) % bookDetail?.images.length)
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % bookDetail?.images.length)
                    }
                  />
                )}  */}
              </article>    
                </aside>
                <main className="col-lg-6">
                    <article className="ps-lg-3">
                    <h4 className="title text-dark">{bookDetail.bookName} </h4>
                    <h6 className="title text-dark" style={{fontStyle: 'italic'}}>Tác giả: {(bookDetail?.authors?.length > 0) ? bookDetail.authors[0].name : ""} </h6>
                    <h6 className="title text-dark">Nhà xuất bản: {bookDetail?.publishingPlace?.name} </h6>
                    <div className="rating-wrap my-4">
                       
                    <b className="label-rating text-warning">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>               
                      5.0
                    </b>
                    
                    <i className="dot"></i>
                      <span className="label-rating text-muted"> 
                        Đã bán {200 - bookDetail.stock} 
                      </span>
                      <i className="dot"></i>
                    <span className="label-rating text-success">Số lượng còn ({bookDetail.stock})</span>
                    </div> 
                                    
                    <div className="mb-3"> 
                      <var className="h5">{formatNumber(bookDetail.price)}</var> 
                    </div> 
                    <hr/>
                
                    <div className="row mb-4">
                      <div className="col-md-4 col-6 mb-3">
                      <label className="form-label d-block">Số lượng</label>
                      <BookStock stock={bookDetail.stock} quantity={quantity} setQuantity={setQuantity} onStockChange={handleStockChange}></BookStock>
                      </div> 
                    </div> 
                
                    {/* <a href="/createcartitem" className="btn  btn-primary"> <i className="me-1 fa fa-shopping-cart"></i> Thêm vào giỏ </a> */}
                    <CreateCartItem bookId={bookId} quantity={quantity} setQuantity={setQuantity}/>
                    
                    
                    </article> 
                </main> 
                </div> 
                <h2><i>Giới thiệu</i></h2>
                <p className='overview-expandable'>{bookDetail.description}</p> 
                </div> 
                </section>                 
        </>
 );
}

export default BookDetails;