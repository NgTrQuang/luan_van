package com.springboot.luanvan.security.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.client.RestTemplate;
import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import java.io.File;
import java.net.URL;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.CartItem;
import com.springboot.luanvan.models.Invoice;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.InvoiceRequest;
import com.springboot.luanvan.repository.AddressRepository;
import com.springboot.luanvan.repository.BookRepository;
import com.springboot.luanvan.repository.CartItemRepository;
import com.springboot.luanvan.repository.InvoiceRepository;
import com.springboot.luanvan.repository.UserRepository;

@Service
public class InvoiceServiceImpl implements InvoiceService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	InvoiceRepository invoiceRepository;
	@Autowired
	AddressRepository addressRepository;
	@Autowired
	CartItemService cartItemService;
	@Autowired
	CartItemRepository cartItemRepository;
	@Autowired
	BookRepository bookRepository;
	@PersistenceContext
    private EntityManager entityManager;
	@Autowired
	private JavaMailSender javaMailSender;
//	@Autowired
//	private RestTemplate restTemplate;
	RestTemplate restTemplate = new RestTemplate();
//	double totalPrice = 0;
	public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/src/main/resources/static/img/";
	//create invoice
//	@Override
//	public Invoice creatInvoice(InvoiceRequest invoiceRequest) {
//		Invoice invoice0 = invoiceRepository.findByUser_UserIdAndWasPay(invoiceRequest.getUser_id(), false);
//		if(invoice0!=null) return invoice0;
//		
//		List<CartItem> cartItems = cartItemService.getCart(invoiceRequest.getUser_id());
//		
//		if(cartItems.isEmpty()) throw new InvalidConfigurationPropertyValueException("Giỏ hàng", cartItems, "Giỏ hàng hiện đang rỗng!");
//		
//		User user = userRepository.findById(invoiceRequest.getUser_id()).orElseThrow();
//		Address address = addressRepository.findById(invoiceRequest.getAddress_id()).orElseThrow();
//
//		for (CartItem cartItem : cartItems) {
//			totalPrice += cartItem.getQuantity() * cartItem.getBook().getPrice();
//		}
//		
//		Invoice invoice = new Invoice(user, "", "", totalPrice, false, cartItems, address);
//		//timeCreate & paymentMethod gán "" vì chưa thanh toán thành công nên chưa thể tạo.
//		
//		invoiceRepository.save(invoice);
//		totalPrice = 0;
//
//		for (CartItem cartItem : cartItems) {
//			cartItem.setInvoice(invoice);
//			cartItemRepository.save(cartItem);
//		}
//
//		return invoice;
//	}
	
	// Hàm gửi email
	public void sendOrderConfirmationEmail(User user, Invoice invoice) throws MessagingException {
	    MimeMessage message = javaMailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

	    try {
	        // Thiết lập người gửi, người nhận và tiêu đề email
	        helper.setFrom("ngtrquangit@gmail.com");
	        helper.setTo(user.getEmail());
	        helper.setSubject("Xác nhận đơn hàng");

	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

	        // Chuyển đổi thành chuỗi với định dạng cụ thể
	        String formattedDate = invoice.getTimeCreate().format(formatter);
//	        String payStatus;
//        	if(invoice.isWasPay()) {
//        		payStatus = "Đã thanh toán"; 
//        	}else {
//        		payStatus = "Chưa thanh toán"; 
//			}

//	        String invoiceAction;
//        	if(invoice.getAction() == 0) {
//        		invoiceAction = "Đang xử lý"; 
//        	}else if (invoice.getAction() == 1) {
//        		invoiceAction = "Đã xác nhận"; 
//			}else if (invoice.getAction() == 2) {
//        		invoiceAction = "Đang vận chuyển"; 
//			}
//			else if (invoice.getAction() == 3) {
//        		invoiceAction = "Đã nhận hàng"; 
//			}else {
//				invoiceAction = "Đã hủy";
//			}
   
	        StringBuilder emailContentBuilder = new StringBuilder();
	        emailContentBuilder.append("<table width=\"100%\" style=\"border-collapse: collapse;\">");
	        emailContentBuilder.append("<tr>");
	        emailContentBuilder.append("<th style=\"text-align: left; padding: 8px;\">Tên sách</th>");
//	        emailContentBuilder.append("<th style=\"text-align: left; padding: 8px;\">Ảnh</th>");
	        emailContentBuilder.append("<th style=\"text-align: left; padding: 8px;\">Số lượng</th>");
	        emailContentBuilder.append("<th style=\"text-align: left; padding: 8px;\">Giá</th>");
	        emailContentBuilder.append("</tr>");
	        
	        String emailContent = "<h2 style='color: blue;'>Chào " + user.getFirstname() + " " + user.getLastname() + "</h2>"
	                + "<p>Đơn hàng của bạn đã được đặt thành công. Dưới đây là chi tiết đơn hàng:</p>"
	                + "<p>Mã đơn hàng: " + invoice.getInvoiceId() + "</p>"
	                + "<p>Ngày tạo: " + formattedDate + "</p>"
	                + "<p>Trạng thái thanh toán: " + invoice.getWasPay() + "</p>"
	                + "<p>Trạng thái đơn hàng: " + invoice.getAction() + "</p>"
	                + "<p>Địa chỉ nhận hàng: " + invoice.getAddress().getFulladdress() + "</p>";

	        for (CartItem cartItem : invoice.getCartItems()) {

//	        	FileSystemResource image = new FileSystemResource(new File("http://localhost:8089/api/v1/images/\" + cartItem.getBook().getImages().get(0).getIdImage())));
//	        	ResponseEntity<Resource> responseEntity = restTemplate.exchange("http://localhost:8089/api/v1/images/" + cartItem.getBook().getImages().get(0).getIdImage(), HttpMethod.GET, null, Resource.class); // Sử dụng RestTemplate để thực hiện yêu cầu GET
	        	ClassPathResource classPathResource = new ClassPathResource("static/img/" + cartItem.getBook().getImages().get(0).getNameImage());
//	        	String attachmentName = cartItem.getBook().getImages().get(0).getNameImage(); // Tên đính kèm
	        	helper.addAttachment(classPathResource.getFilename(), classPathResource);

	        	emailContentBuilder.append("<tr>");
	            emailContentBuilder.append("<td style=\"text-align: left; padding: 8px;\">" + cartItem.getBook().getBookName() + "</td>");
//	            emailContentBuilder.append("<td style=\"text-align: left; padding: 8px;\">" + "<img src='cid:" + classPathResource.getFilename() + "' alt='" + cartItem.getBook().getBookName() + "' style='width: 100px; max-width: 600px; height: auto;'/></td>");  // Thay thế bằng mô tả sản phẩm thực tế "<img src='" + UPLOAD_DIRECTORY + cartItem.getBook().getImages().get(0).getIdImage() + "' alt='" + cartItem.getBook().getBookName() + "' style='width: 100px; max-width: 600px; height: auto;'/>"
				emailContentBuilder.append("<td style=\"text-align: left; padding: 8px;\">" + cartItem.getQuantity() + "</td>");
	            emailContentBuilder.append("<td style=\"text-align: left; padding: 8px;\">" + cartItem.getBook().getPrice() + "</td>"); // Thay thế bằng giá sản phẩm thực tế
	            emailContentBuilder.append("</tr>");                 
	        }
	        emailContentBuilder.append("</table>");
	        
	        emailContent += emailContentBuilder.toString();
	        
	        emailContent += "<p>Tổng giá trị: " + String.format("%,.0f", invoice.getTotalPrice()) + "đ</p>";
	        
	        String emailHtml = "<!DOCTYPE html>\n"
	                + "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n"
	                + "<head>\n"
	                + "<meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n"
	                + "<meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n"
	                + "<meta http-equiv=\"X-UA-Compatible\" content=\"IE edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n"
	                + "<meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n"
	                + "<title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n"
	                + "<link href=\"https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700\" rel=\"stylesheet\">\n"
	                + "<style> <!-- Các khai báo CSS Reset ở đây --> </style>\n"
	                + "</head>\n"
	                + "<body width=\"100%\" style=\"margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;\">\n"
	                + "<center style=\"width: 100%; background-color: #f1f1f1;\">\n"
	                + "<div style=\"max-width: 600px; margin: 0 auto;\" class=\"email-container\">\n"
	                + emailContent // Chèn nội dung email của bạn ở đây
	                + "</div>\n"
	                + "</center>\n"
	                + "</body>\n"
	                + "</html>";

	        helper.setText(emailHtml, true);

	        // Gửi email
	        javaMailSender.send(message);
	    } catch (Exception e) {
	        // Xử lý lỗi nếu có
	        e.printStackTrace();
	    }
	}

	@Override
	public Invoice createInvoice(InvoiceRequest invoiceRequest) {
	    try {
	    	Invoice invoice = new Invoice();
		    List<CartItem> cartItems = new ArrayList<>();
		    double totalPrice = 0;

		    User user = userRepository.findById(invoiceRequest.getUser_id())
		            .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));
		    Address address = addressRepository.findById(invoiceRequest.getAddress_id())
		            .orElseThrow(() -> new IllegalArgumentException("Địa chỉ không tồn tại"));

		    for (CartItem cartItemRequest : invoiceRequest.getCartItems()) { //invoiceRequest.getCartItems()
		        CartItem cartItem = new CartItem();
		        Book book = bookRepository.findById(cartItemRequest.getBook().getBookId())
		                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại"));

		        cartItem.setBook(book);
		        cartItem.setQuantity(cartItemRequest.getQuantity());
		        cartItem.setInvoice(invoice);

		        cartItems.add(cartItem);

		        double quantity = cartItem.getQuantity();
		        double price = book.getPrice();
		        totalPrice += quantity * price;
		        // trừ số lượng sách khi đặt thành công
//		        book = cartItem.getBook();
				book.setStock(book.getStock() - cartItem.getQuantity());
				book.setSell(book.getSell() + cartItem.getQuantity());
				bookRepository.save(book);
		    }
		    LocalDateTime currentTime = LocalDateTime.now();

		    invoice.setCartItems(cartItems);
		    invoice.setUser(user);
		    invoice.setAddress(address);
		    invoice.setTotalPrice(totalPrice);
		    invoice.setPaymentMethod("COD");
		    invoice.setTimeCreate(currentTime);

		    invoiceRepository.save(invoice);
//		    updateProductsInInvoice(invoice, invoice.getUser().getUserId());
		    sendOrderConfirmationEmail(user, invoice);

		    return invoice;
		} catch (MessagingException e) {
			e.printStackTrace();
	        // Xử lý lỗi khi gửi email
	        // Trả về thông báo hoặc thực hiện xử lý lỗi phù hợp
	        return null;
		}
		
	}

	@Override
	public Invoice getInvoice(Long invoiceId) {
		return invoiceRepository.findById(invoiceId).orElseThrow();
	}

	@Override
	public List<Invoice> getAllInvoices() {
		return invoiceRepository.findAll();
	}

//	@Override
//	public List<Invoice> getAllUserInvoices(Long userId) {
//		return invoiceRepository.findByUser_UserIdAndStatus(userId, true);
//	}
//	
//	@Override
//	public List<Invoice> getAllInvoicesPaySuccessByUser(Long userId) {
//		return invoiceRepository.findByUser_UserIdAndStatusAndWasPay(userId, true, true);
//	}
	
	public List<Invoice> getInvoicesByUserId(Long userId) {
        return invoiceRepository.findByUser_UserId(userId);
    }

    public List<Invoice> getPaidInvoicesByUserId(Long userId) {
        return invoiceRepository.findByUser_UserIdAndWasPay(userId, "Đã thanh toán");
    }

    public List<Invoice> getPendingInvoicesByUserId(Long userId) {
        return invoiceRepository.findByUser_UserIdAndAction(userId, "Đang xử lý");
    }
    
    public List<Invoice> getHistoryInvoicesByUserId(Long userId) {
        return invoiceRepository.findByUser_UserIdOrderByTimeCreateDesc(userId);
    }

    public List<Invoice> getHistoryInvoicesByUserIdAndWasPayAndAction(Long userId) {
        return invoiceRepository.findByUser_UserIdAndWasPayAndActionOrderByTimeCreateDesc(userId, "Đã thanh toán", "Đã nhận hàng");
    }
    
	@Override
	public void softDeleteInvoiceById(Long invoiceId) {
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow();
		if (invoiceRepository.findById(invoiceId).get().getInvoiceId().equals(invoiceId)) {
			invoice.setStatus(false);
			invoiceRepository.save(invoice);
		} else
			throw new InvalidConfigurationPropertyValueException("invoiceId", invoiceId, "Not Found");
	}
	
	@Override
	public void hardDeleteInvoiceById(Long invoiceId) {
		
		if (invoiceRepository.findById(invoiceId).get().getInvoiceId().equals(invoiceId)) {
			invoiceRepository.deleteById(invoiceId);
		} else
			throw new InvalidConfigurationPropertyValueException("invoiceId", invoiceId, "Not Found");
	}

	@Override
	public Optional<Invoice> updateProductsInInvoice(Invoice invoice, Long userId) {
		List<CartItem> listCartItem = cartItemService.getCart(userId);

		double totalPrice = 0;
		for (CartItem cartItem : listCartItem) {
			cartItem.setInvoice(invoice);
			totalPrice += cartItem.getQuantity() * cartItem.getBook().getPrice();
			cartItemRepository.save(cartItem);
		}
		invoice.setTotalPrice(totalPrice);
//		totalPrice = 0;
		return Optional.of(invoice);
	}

	@Override
	public Optional<Invoice> updateAddressInInvoice(Invoice invoice, Address address) {
		invoice.setAddress(address);
		invoiceRepository.save(invoice);
		return Optional.of(invoice);
	}
	
	@Override
	public Optional<Invoice> setPaymentSuccess(Invoice invoice) {
//	public Optional<Invoice> setPaymentSuccess(Invoice invoice, String paymentMethod, Long userId) {

//		LocalDateTime now = LocalDateTime.now();
//		int year = now.getYear();
//		int month = now.getMonthValue();
//		int day = now.getDayOfMonth();
//		int hour = now.getHour();
//		int minute = now.getMinute();
//		String timeString = day + "-" + month + "-" + year + " " + hour + ":" + minute; old
		
//		invoice.setPaymentMethod(paymentMethod);
		invoice.setWasPay("Đã thanh toán");
//		invoice.setTimeCreate(timeString);
		invoiceRepository.save(invoice);
		
		User user = invoice.getUser();
		List<CartItem> listCartItem = invoice.getCartItems();
		Book book = new Book();
		
		for (CartItem cartItem : listCartItem) {
			cartItem.setStatusPay(true);
			cartItemRepository.save(cartItem);
			
			book = cartItem.getBook();
			book.setStock(book.getStock() - cartItem.getQuantity());
			book.setSell(book.getSell() + cartItem.getQuantity());
			bookRepository.save(book);
		};
		
		try {
			sendOrderConfirmationEmail(user, invoice);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return Optional.of(invoice);
	}

	@Override
	public Invoice invoiceReactivationById(Long invoiceId) {
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
				() -> new InvalidConfigurationPropertyValueException("invoiceId", invoiceId, "Not found"));
		invoice.setStatus(true);
		return invoiceRepository.save(invoice);
	}
	
	// cap nhat trang thai với thanh toán trực tiếp
	@Override
	public Invoice updateInvoiceAction(Long invoiceId, String newAction) {
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
				() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
    // Kiểm tra nếu trạng thái mới là "Đã nhận hàng"
		if("COD".equals(invoice.getPaymentMethod())) {
			if ("Đã nhận hàng".equals(newAction)) {
	           	// Đặt wasPay là "Đã thanh toán"
	           	invoice.setWasPay("Đã thanh toán");
	           	invoice.setReceivedTime(LocalDateTime.now());
			}
       
			if ("Đã hủy".equals(newAction)) {
//			if (invoice.getWasPay().equals("Đã thanh toán")) {
//      		    invoice.setWasPay("Chờ hoàn tiền");
      		    List<CartItem> listCartItem = invoice.getCartItems();
      		    Book book = new Book();
  	   		
  	   			for (CartItem cartItem : listCartItem) {
  	   			cartItem.setStatusPay(false);
  	   			cartItemRepository.save(cartItem);
  	   			
	  	   			book = cartItem.getBook();
	  	   			book.setStock(book.getStock() + cartItem.getQuantity());
	  	   			book.setSell(book.getSell() - cartItem.getQuantity());
	  	   			bookRepository.save(book);
     			};
			}
		}

		invoice.setAction(newAction);
		return invoiceRepository.save(invoice);
    }
	
	// Cập nhật trạng thái với thanh toán trực tuyến
	@Override
	public Invoice updateInvoiceActionToVnPay(Long invoiceId, String newAction){
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
				() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
		if ("VnPay".equals(invoice.getPaymentMethod())) {
			if ("Lỗi sản phẩm".equals(newAction)) {
				invoice.setAction("Đã xác nhận");
			} else {
				invoice.setAction(newAction);
			}
		}
		
		return invoiceRepository.save(invoice);
	}
	// Cập nhật trạng thái sau thanh toán (cho VnPay Lỗi sản phẩm)
	public Invoice updateInvoiceActionAfterReceived(Long invoiceId, String newAction){
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
				() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
		if ("VnPay".equals(invoice.getPaymentMethod())) {
			if ("Đã nhận hàng".equals(newAction)) {
				invoice.setAction("Lỗi sản phẩm");
			} else {
				invoice.setAction(newAction);
			}
		}
		
		return invoiceRepository.save(invoice);
	}
	
	// Chức năng trả hàng
	public void processReturnAfter24Hours(Long invoiceId, String newAction) {
		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
				() -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));
		// Kiểm tra nếu trạng thái mới là "Đã nhận hàng"
       if ("Đã nhận hàng".equals(newAction)) {
           	// Đặt wasPay là "Đã thanh toán"
           	invoice.setWasPay("Đã thanh toán");
           	invoice.setReceivedTime(LocalDateTime.now());
       }
       if ("Trả hàng".equals(newAction)) {
    	   
    	   	if (invoice.getReceivedTime() != null) {
    	        LocalDateTime currentTime = LocalDateTime.now();
    	        LocalDateTime receivedTime = invoice.getReceivedTime();
    	        Duration duration = Duration.between(receivedTime, currentTime);
    	        long hours = duration.toHours();
    	        if (hours <= 24) {
    	        	invoice.setWasPay("Chờ hoàn tiền");
    	    	   	
    		   		List<CartItem> listCartItem = invoice.getCartItems();
    		   		Book book = new Book();
    		   		
    		   		for (CartItem cartItem : listCartItem) {
    		   			cartItem.setStatusPay(false);
    		   			cartItemRepository.save(cartItem);
    		   			
    		   			book = cartItem.getBook();
    		   			book.setStock(book.getStock() + cartItem.getQuantity());
    		   			book.setSell(book.getSell() - cartItem.getQuantity());
    		   			bookRepository.save(book);
    		   		};
    	        }
    	   	}
       	}
	}
	
	@Override
	public Invoice updateRefundStatus(Long invoiceId) {
	    Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(
	        () -> new EntityNotFoundException("Invoice not found with id: " + invoiceId));

	    // Kiểm tra nếu trạng thái là "Chờ hoàn tiền" thì cập nhật thành "Đã hoàn tiền"
	    
	    if ("Chờ hoàn tiền".equals(invoice.getWasPay())) {
	        invoice.setWasPay("Đã hoàn tiền");
	        return invoiceRepository.save(invoice);
	    } else {
	        // Trạng thái hiện tại không phù hợp với yêu cầu
	        throw new IllegalStateException("Invalid invoice state for refund: " + invoice.getWasPay());
	    }
	}
	
	// Thống kê
	// Trong InvoiceRepositoryImpl (hoặc có thể sử dụng @Query trong repository)
	@Override
	public Long countInvoices() {
	    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	    CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
	    Root<Invoice> root = criteriaQuery.from(Invoice.class);
	    criteriaQuery.select(criteriaBuilder.count(root));
	    return entityManager.createQuery(criteriaQuery).getSingleResult();
	}

	@Override
	public Long countPaidInvoices() {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	    CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
	    Root<Invoice> root = criteriaQuery.from(Invoice.class);
	    criteriaQuery.select(criteriaBuilder.count(root));
	    criteriaQuery.where(criteriaBuilder.equal(root.get("wasPay"), "Đã thanh toán")); // Thêm điều kiện đơn hàng đã thanh toán wasPay là thuộc tính tạo bởi Spring
	    return entityManager.createQuery(criteriaQuery).getSingleResult();
	}
	
	@Override
	public Double getTotalRevenue() {
        return invoiceRepository.calculateTotalRevenue();
    }
}
