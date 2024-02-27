import sell_book_1 from "../../assets/images/sell_book_1.webp";
import React, { useState, useEffect } from "react";

    function Home (){
    return (
        <div className="home-section">          
            <section className="section-intro pt-3">
                <div className="container">
                    <div className="row gx-3">
                        <main className="col-lg-9">
                            <article className="card-banner p-5 bg-primary" style={{height: "350px"}}>
                                <img src={sell_book_1} alt="" style={{width: 400}} className="ms-1 d-none d-sm-inline-block"/>    
                                <div className="card-body text-center" style={{maxWidth: "500px"}}>
                                <h2 className="text-white">Sản phẩm tuyệt vời <br /> với giao dịch tốt nhất </h2>
                                <p className="text-white">Cho dù bạn có tiến xa đến đâu trong sự tinh tế của mình với tư cách là một nhà thiên văn học nghiệp dư, luôn là chính bạn.</p>
                                <a href="#" className="btn btn-primary" style={{backgroundColor: "#01bebd"}}> Xem thêm </a>
                                </div>
                            </article>
                        </main>
                        <aside className="col-lg-3">
                            <article className="card-banner h-100" style={{backgroundColor: "#5bc1e2"}}>
                                <div className="card-body text-center">
                                    <h5 className="mt-3 text-white">Quà tặng tuyệt vời</h5>
                                    <p className="text-white">Không cần biết bạn đang ở mức độ nào trong sự tinh tế của mình sách là quà tặng ý nghĩa với người bên cạnh bạn.</p>
                                    <a href="#" className="btn btn-outline-light mb-3"> Xem thêm </a>
                                </div>
                            </article>
                        </aside>
                    </div> 
                </div> 
            </section>

            {/* <section className="padding-top">
            <div className="container">
                <nav className="row gy-4 row-cols-xl-8 row-cols-sm-4 row-cols-3">
                <div className="col">
                    <a href="#" className="item-link text-center">
                        <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/sofa.svg" />
                        </span>
                    <span className="text"> Interior items </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/ball.svg" />
                        </span>
                    <span className="text"> Sport and travel </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/diamond.svg" />
                    </span>
                    <span className="text"> Jewellery </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/watch.svg" />
                    </span>
                    <span className="text"> Accessories </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/car.svg" />
                    </span>
                    <span className="text"> Automobiles </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/homeitem.svg" />
                    </span>
                    <span className="text"> Home items </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/music.svg" />
                        </span>
                    <span className="text"> Musical items </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/book.svg" />
                        </span>
                    <span className="text"> Books, reading </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/toy.svg" />
                    </span>
                    <span className="text"> Kid's toys </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/animal.svg" />
                    </span>
                    <span className="text"> Pet items </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/shirt.svg" />
                    </span>
                    <span className="text"> Men’s clothing </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/shoe-man.svg" />
                    </span>
                    <span className="text"> Men’s clothing </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/phone.svg" />
                    </span>
                    <span className="text"> Smartphones </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/fix.svg" />
                    </span>
                    <span className="text"> Tools </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/education.svg" />
                    </span>
                    <span className="text"> Education </span>
                    </a>
                </div> 
                <div className="col">
                    <a href="#" className="item-link text-center">
                    <span className="icon mb-2 icon-sm rounded"> 
                            <img width="32" height="32" src="images/icons/category-svg-blue/warehouse.svg" />
                    </span>
                    <span className="text"> Other items </span>
                    </a>
                </div> 
                </nav>
            </div>	
            </section> */}
           
          
            <section className="padding-y">
            <div className="container">

                <header className="section-heading">
                    <h3 className="section-title text-center">Sản phẩm mới</h3>
                </header> 

                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <span className="topbar"> <span className="badge bg-danger"> Mới </span> </span>
                                <img height="250" className="mix-blend-multiply" src="/images/items/cafecungtony.jpg" /> 
                                
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">96.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Cafe cùng Tony</a>
                                <small className="text-muted">Tony Morning</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <span className="topbar"> <span className="badge bg-warning"> Bán chạy </span> </span>
                                <img height="250" className="mix-blend-multiply" src="/images/items/harrypottervabaoboituthan.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">198.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Harry Potter và bảo bối tử thần</a>
                                <small className="text-muted">J. K. Rowling</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/hoangtube.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">86.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Hoàng tử bé</a>
                                <small className="text-muted">Antoine de Saint-Exupéry</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/muonkiepnhansinh.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">99.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Muôn kiếp nhân sinh</a>
                                <small className="text-muted">John Vu (Nguyen Phong)</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/neubiettramnamlahuuhan.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">105.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Nếu biết trăm năm là hữu hạn</a>
                                <small className="text-muted">Phạm Lữ Ân</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/nghidongiansongdonthuan.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">139.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Nghĩ đơn giản sống đơn thuần</a>
                                <small className="text-muted">Tolly Burkan</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/nghigiaulamgiau-thinkandgrowrich.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">199.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Nghĩ giàu làm giàu</a>
                                <small className="text-muted">Napoleon Hill</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/she.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">299.000 ₫</strong> 
                                <a href="#" className="title text-truncate">She</a>
                                <small className="text-muted">H.Rider Haggard</small>
                            </figcaption>
                        </figure>
                    </div> 
                </div> 

            </div> 
            </section>
           


            
            <section>
            <div className="container">
                <article className="card p-4" style={{backgroundColor: "var(--bs-primary)"}}>
                <div className="row align-items-center">
                    <div className="col"> 
                    <h4 className="mb-0 text-white">Sản phẩm và thương hiệu tốt nhất trong cửa hàng</h4>
                    <p className="mb-0 text-white-50">Sản phẩm phù hợp cho bạn và bạn bè</p>
                    </div>
                    <div className="col-auto"> <a className="btn btn-warning" style={{backgroundColor: "#01bebd"}} href="#">Khám phá</a> </div>
                </div>
                </article>
            </div> 
            </section>         
          
            <section className="padding-y">
            <div className="container">

                <header className="section-heading">
                    <h3 className="section-title text-center">Gợi ý cho bạn</h3>
                </header> 

                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/hanhtrinhvephuongdong.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">270.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Hành trình về Phương Đông</a>
                                <small className="text-muted">Baird T. Spalding</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/7thoiquenhieuqua.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">250.000 ₫</strong> 
                                <a href="#" className="title text-truncate">7 thói quen hiệu quả</a>
                                <small className="text-muted">Stephen R. Covey</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/hieuvetraitim.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">159.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Hiểu về trái tim</a>
                                <small className="text-muted">Minh Niệm</small>
                            </figcaption>
                        </figure>
                    </div> 

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <figure className="card-product-grid">
                            <a href="#" className="img-wrap rounded bg-gray-light"> 
                                <img height="250" className="mix-blend-multiply" src="/images/items/docvibatkyai.jpg" /> 
                            </a>
                            <figcaption className="pt-2">
                                <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                <strong className="price">67.000 ₫</strong> 
                                <a href="#" className="title text-truncate">Đọc vị bất kỳ ai</a>
                                <small className="text-muted">David J.Lieberman</small>
                            </figcaption>
                        </figure>
                    </div> 
                </div> 

            </div> 
            </section>
        </div>     
       
    );
}

export default Home;