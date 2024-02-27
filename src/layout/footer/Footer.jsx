// import CartItem from "../../components/CartItem";

function Footer() {
    return (
     
       <div className="footer-section">
         <footer className="section-footer bg-white border-top">
            
         <section className="padding-y-sm bg-gray-light">
            <div className="container">
                <div className="row gy-3 align-items-center">
                    <div className="col-md-4">
                    {/* <form>
                        <div className="input-group">
                        <input className="form-control" type="text" placeholder="Email" />
                        <button className="btn btn-primary" type="submit"> Đăng ký  </button>
                        </div> 
                    </form> */}
                    </div>
                    <div className="col-md-8">
                    <nav className="float-lg-end">
                        <a className="btn btn-icon btn-light" title="Facebook" target="_blank" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-icon btn-light" title="Instagram" target="_blank" href="#"><i className="fab fa-instagram"></i></a>
                        <a className="btn btn-icon btn-light" title="Youtube" target="_blank" href="#"><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-icon btn-light" title="Twitter" target="_blank" href="#"><i className="fab fa-twitter"></i></a>
                    </nav>
                    </div>
                </div> 
            </div>
            </section>

            <div className="container">
            <section className="footer-main padding-y">
                <div className="row">
                <aside className="col-12 col-sm-12 col-lg-3">
                    <article className="me-lg-4">
                    <p className="mt-3"> &copy; 2023 quangb1910436@student.ctu.edu.vn, Giảng viên hướng dẫn: vdlinh@ctu.edu.vn. <br /> Cảm ơn nguồn từ Bezkoder.</p>
                    </article>
                </aside>
                {/* <aside className="col-6 col-sm-4 col-lg-2">
                    <h6 className="title">Store</h6>
                    <ul className="list-menu mb-4">
                    <li> <a href="#">About us</a></li>
                    <li> <a href="#">Find store</a></li>
                    <li> <a href="#">Categories</a></li>
                    <li> <a href="#">Blogs</a></li>
                    </ul>
                </aside> */}
                <aside className="col-6 col-sm-4 col-lg-2">
                    <h6 className="title">Thông tin về chúng tôi</h6>
                    <ul className="list-menu mb-4">
                    <li> <a href="#">Là website bán hàng đáng tin cậy với mọi thể loại sách yêu thích được các đọc giả ưu tiên hàng đầu.</a></li>
                    </ul>
                </aside>
                <aside className="col-6 col-sm-4  col-lg-2">
                    <h6 className="title">Hỗ trợ</h6>
                    <ul className="list-menu mb-4">
                    <li> <a href="#"> Trung tâm hỗ trợ </a></li>
                    <li> <a href="#"> Tài liệu </a></li>
                    <li> <a href="#"> Khôi phục tài khoản </a></li>
                    <li> <a href="#"> Giỏ hàng </a></li>
                    </ul>
                </aside>
                {/* <aside className="col-12 col-sm-12 col-lg-4">
                    <h6 className="title">Bản tin</h6>
                    <p>Giữ liên lạc với các bản cập nhật mới nhất về các sản phẩm và ưu đãi của chúng tôi. </p>
            
                    <form className="mb-4">
                    <div className="input-group">
                        <input className="form-control mr-2" type="text" placeholder="Email" />
                        <button className="btn btn-primary" type="submit">
                        Tham gia
                        </button>
                    </div>
                    </form>
                </aside> */}
                </div> 
            </section>  
            
            <section className="footer-bottom d-flex justify-content-lg-between border-top">
                <div>
                <i className="fab fa-lg fa-cc-visa"></i>
                <i className="fab fa-lg fa-cc-mastercard"></i>
                <i className="fa-regular fa-credit-card fa-lg"></i>
                {/* <i className="fab fa-lg fa-cc-paypal"></i> */}
                </div>
                {/* <nav className="dropup">
                    <button className="dropdown-toggle btn d-flex align-items-center py-0" type="button" data-bs-toggle="dropdown">
                    <img src="/images/flag-usa.webp" className="me-2" height="20" /> 
                    <span>English</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#">Russian</a></li>
                    <li><a className="dropdown-item" href="#">Arabic</a></li>
                    <li><a className="dropdown-item" href="#">Spanish</a></li>
                    </ul>
                </nav> */}
                
            </section>
            </div>
            </footer>             
       </div>
      
       
    );
}

export default Footer;