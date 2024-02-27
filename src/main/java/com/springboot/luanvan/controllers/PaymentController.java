package com.springboot.luanvan.controllers;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.config.VnpayConfig;
import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.CartItem;
import com.springboot.luanvan.models.Invoice;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.InvoiceRequest;
import com.springboot.luanvan.payload.request.PaymentRequest;
import com.springboot.luanvan.payload.response.MessageResponse;
import com.springboot.luanvan.repository.AddressRepository;
import com.springboot.luanvan.repository.BookRepository;
import com.springboot.luanvan.repository.InvoiceRepository;
import com.springboot.luanvan.repository.UserRepository;
import com.springboot.luanvan.security.services.InvoiceService;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	@Autowired
	InvoiceRepository invoiceRepository;
	@Autowired
	InvoiceService invoiceService;
	@Autowired
	BookRepository bookRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AddressRepository addressRepository;
	
	Invoice invoiceTemp = new Invoice();
	Long userId0 = 0L;
//	String urlReturnFE = "http://localhost:8081/";

	@PostMapping("/pay/{invoiceId}")
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('PAYMENT_NORMAL_ACCESS')")
	public String pay(HttpServletRequest req, @PathVariable("invoiceId") Long invoiceId, @Valid @RequestBody PaymentRequest paymentRequest)
			throws ServletException, IOException {

		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow();
		invoiceTemp = invoice;	
//		userId0 = paymentRequest.getUser_id();
		
		if (paymentRequest.getPaymentMethod().equals("VnPay")) {
			String vnp_Version = "2.1.0";
			String vnp_Command = "pay";
			String vnp_OrderInfo = "Thanh toán đơn hàng";
			String orderType = "topup";
			String bankCode = req.getParameter("bankCode");
			String vnp_TxnRef = VnpayConfig.getRandomNumber(8);
			String vnp_IpAddr = VnpayConfig.getIpAddress(req);
			String vnp_TmnCode = VnpayConfig.vnp_TmnCode;

			Map vnp_Params = new HashMap<>();
			vnp_Params.put("vnp_Version", vnp_Version);
			vnp_Params.put("vnp_Command", vnp_Command);
			vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
			vnp_Params.put("vnp_Amount", String.valueOf((int) invoice.getTotalPrice() * 100));
			vnp_Params.put("vnp_CurrCode", "VND");

//			String bank_code = "";
			if (bankCode != null && !bankCode.isEmpty()) {
				vnp_Params.put("vnp_BankCode", bankCode);
			}

			vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
			vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
			vnp_Params.put("vnp_OrderType", orderType);

			String locate = "vn";
//			vnp_Params.put("vnp_Locale", locate);
			if (locate != null && !locate.isEmpty()) {
	            vnp_Params.put("vnp_Locale", locate);
	        } else {
	            vnp_Params.put("vnp_Locale", "vn");
	        }
			vnp_Params.put("vnp_ReturnUrl", VnpayConfig.vnp_Returnurl);
			vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
			Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
			String vnp_CreateDate = formatter.format(cld.getTime());

			vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
			cld.add(Calendar.MINUTE, 15);
			String vnp_ExpireDate = formatter.format(cld.getTime());
			// Add Params of 2.1.0 Version
			vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

			// Build data to hash and querystring
			List fieldNames = new ArrayList(vnp_Params.keySet());
			Collections.sort(fieldNames);
			StringBuilder hashData = new StringBuilder();
			StringBuilder query = new StringBuilder();
			Iterator itr = fieldNames.iterator();
			while (itr.hasNext()) {
				String fieldName = (String) itr.next();
				String fieldValue = (String) vnp_Params.get(fieldName);
				if ((fieldValue != null) && (fieldValue.length() > 0)) {
					// Build hash data
					hashData.append(fieldName);
					hashData.append('=');
					hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
					// Build query
					query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
					query.append('=');
					query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
					if (itr.hasNext()) {
						query.append('&');
						hashData.append('&');
					}
				}
			}
			String queryUrl = query.toString();
			String vnp_SecureHash = VnpayConfig.hmacSHA512(VnpayConfig.vnp_HashSecret, hashData.toString());
			queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
			String paymentUrl = VnpayConfig.vnp_PayUrl + "?" + queryUrl;

			invoiceTemp.setPaymentMethod("VnPay");
			System.out.println(paymentUrl);
			
// => trả ra đường dẫn đưa đi thanh toán Vnpay
			return paymentUrl;
		}
		else {
// => trả ra đường dẫn trả về lỗi tại đây
			return "Tìm không thấy phương thức thanh toán đã đưa vào!";
		}
	}

	@PostMapping("/create_invoice_w_vnpay")
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> createInvoiceWithVnPay(HttpServletRequest req, 
			@Valid @RequestBody PaymentRequest paymentRequest)
			throws ServletException, IOException {

//		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow();
//		invoice0 = invoice;	
//		userId0 = paymentRequest.getUser_id();
		Invoice invoice = new Invoice();
		invoiceTemp = invoice;
		
		List<CartItem> cartItems = new ArrayList<>();
	    double totalPrice = 0;
	    
	    Long userId = paymentRequest.getUser_id();
	    if (userId == null) {
	        return ResponseEntity.badRequest().body("user_id không được để trống");
	    }
	    User user = userRepository.findById(paymentRequest.getUser_id())
	            .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));
	    Long addressId = paymentRequest.getAddress_id();
	    if (addressId == null) {
	        return ResponseEntity.badRequest().body("address_id không được để trống");
	    }
	    Address address = addressRepository.findById(paymentRequest.getAddress_id())
	            .orElseThrow(() -> new IllegalArgumentException("Địa chỉ không tồn tại"));
	    
	    for (CartItem cartItemRequest : paymentRequest.getCartItems()) { //invoiceRequest.getCartItems()
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
	    }
	    LocalDateTime currentTime = LocalDateTime.now();

	    invoice.setCartItems(cartItems);
	    invoice.setUser(user);
	    invoice.setAddress(address);
	    invoice.setTotalPrice(totalPrice);
//	    invoice.setPaymentMethod("COD");
	    invoice.setTimeCreate(currentTime);
	    invoice.setReceivedTime(currentTime);
		
		if (paymentRequest.getPaymentMethod().equals("VnPay")) {
			String vnp_Version = "2.1.0";
			String vnp_Command = "pay";
			String vnp_OrderInfo = "Thanh toán đơn hàng";
			String orderType = "topup";
			String bankCode = req.getParameter("bankCode");
			String vnp_TxnRef = VnpayConfig.getRandomNumber(8);
			String vnp_IpAddr = VnpayConfig.getIpAddress(req);
			String vnp_TmnCode = VnpayConfig.vnp_TmnCode;

			Map vnp_Params = new HashMap<>();
			vnp_Params.put("vnp_Version", vnp_Version);
			vnp_Params.put("vnp_Command", vnp_Command);
			vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
			vnp_Params.put("vnp_Amount", String.valueOf((int) invoice.getTotalPrice() * 100));
			vnp_Params.put("vnp_CurrCode", "VND");

//			String bank_code = "";
			if (bankCode != null && !bankCode.isEmpty()) {
				vnp_Params.put("vnp_BankCode", bankCode);
			}

			vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
			vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
			vnp_Params.put("vnp_OrderType", orderType);

			String locate = "vn";
//			vnp_Params.put("vnp_Locale", locate);
			if (locate != null && !locate.isEmpty()) {
	            vnp_Params.put("vnp_Locale", locate);
	        } else {
	            vnp_Params.put("vnp_Locale", "vn");
	        }
			vnp_Params.put("vnp_ReturnUrl", VnpayConfig.vnp_Returnurl);
			vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
			Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
			String vnp_CreateDate = formatter.format(cld.getTime());

			vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
			cld.add(Calendar.MINUTE, 15);
			String vnp_ExpireDate = formatter.format(cld.getTime());
			// Add Params of 2.1.0 Version
			vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

			// Build data to hash and querystring
			List fieldNames = new ArrayList(vnp_Params.keySet());
			Collections.sort(fieldNames);
			StringBuilder hashData = new StringBuilder();
			StringBuilder query = new StringBuilder();
			Iterator itr = fieldNames.iterator();
			while (itr.hasNext()) {
				String fieldName = (String) itr.next();
				String fieldValue = (String) vnp_Params.get(fieldName);
				if ((fieldValue != null) && (fieldValue.length() > 0)) {
					// Build hash data
					hashData.append(fieldName);
					hashData.append('=');
					hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
					// Build query
					query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
					query.append('=');
					query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
					if (itr.hasNext()) {
						query.append('&');
						hashData.append('&');
					}
				}
			}
			String queryUrl = query.toString();
			String vnp_SecureHash = VnpayConfig.hmacSHA512(VnpayConfig.vnp_HashSecret, hashData.toString());
			queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
			String paymentUrl = VnpayConfig.vnp_PayUrl + "?" + queryUrl;

			invoice.setPaymentMethod("VnPay");
			System.out.println(paymentUrl);
			
// => trả ra đường dẫn đưa đi thanh toán Vnpay
			return ResponseEntity.ok(new HashMap<String, Object>() {{
			    put("invoice", invoice);
			    put("message", paymentUrl);
			}});
		}
		else {
// => trả ra đường dẫn trả về lỗi tại đây
			return new ResponseEntity<>("Tìm không thấy phương thức thanh toán đã đưa vào!", HttpStatus.BAD_REQUEST);
		}
	}

	
	@GetMapping("/returnFromVnpay")
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> returnFromVnpay(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Đã vào đây thành công!");
		try {
			Map fields = new HashMap();
			for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
				String fieldName = URLEncoder.encode((String) params.nextElement(),
						StandardCharsets.US_ASCII.toString());
				String fieldValue = URLEncoder.encode(request.getParameter(fieldName),
						StandardCharsets.US_ASCII.toString());
				if ((fieldValue != null) && (fieldValue.length() > 0)) {
					fields.put(fieldName, fieldValue);
				}
			}

			String vnp_SecureHash = request.getParameter("vnp_SecureHash");
			if (fields.containsKey("vnp_SecureHashType")) {
				fields.remove("vnp_SecureHashType");
			}
			if (fields.containsKey("vnp_SecureHash")) {
				fields.remove("vnp_SecureHash");
			}

			// Check checksum
			String signValue = VnpayConfig.hashAllFields(fields);
			if (signValue.equals(vnp_SecureHash)) {
				boolean checkOrderId = true; // vnp_TxnRef exists in your database
				boolean checkAmount = true; // vnp_Amount is valid (Check vnp_Amount VNPAY returns compared to the
											// amount of the code (vnp_TxnRef) in the Your database).
				boolean checkOrderStatus = true; // PaymnentStatus = 0 (pending)

				if (checkOrderId) {
					if (checkAmount) {
						if (checkOrderStatus) {
							if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
//	=> giao dịch thành công
								System.out.println("Đã vào 1, giao dịch thành công!");
								// Here Code update PaymnentStatus = 1 into your Database
//								Invoice invoice = invoiceRepository.findById(invoiceTemp.getInvoiceId()).orElseThrow();
//								Invoice invoice = invoiceRepository.save(invoiceTemp);
								try {
//									invoiceService.setPaymentSuccess(invoice, invoiceTemp.getPaymentMethod(), userId0);
									invoiceService.setPaymentSuccess(invoiceTemp);
//									String htmlResponse = "<html><body><h1>Giao dịch thành công</h1><button><a href=\"http://localhost:8081/\" style=\"text-decoration: none;\">Trở về trang chủ</a></button></body></html>";
									String htmlResponse = "http://localhost:8081/successfully";
									response.sendRedirect(htmlResponse);
									return new ResponseEntity<>(null, HttpStatus.OK);
								} catch (Exception e) {
									String htmlResponse = "http://localhost:8081/error";
									response.sendRedirect(htmlResponse);
									// TODO: handle exception
									return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
								}

							} else {
//	=> giao dịch thất bại
								System.out.println("Đã vào 2, giao dịch thất bại!");
								// Here Code update PaymnentStatus = 2 into your Database
								System.out.println("Tại chỗ này gán lệnh trả về trang giao dịch thất bại!");
								String htmlResponse = "http://localhost:8081/error";
								response.sendRedirect(htmlResponse);
								// TODO: handle exception
								return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
							}
						} else {

							System.out.print("{\"RspCode\":\"02\",\"Message\":\"Order already confirmed\"}");
						}
					} else {
						System.out.print("{\"RspCode\":\"04\",\"Message\":\"Invalid Amount\"}");
					}
				} else {
					System.out.print("{\"RspCode\":\"01\",\"Message\":\"Order not Found\"}");
				}
			} else {
				System.out.print("{\"RspCode\":\"97\",\"Message\":\"Invalid Checksum\"}");
			}
		} catch (Exception e) {
			System.out.print("{\"RspCode\":\"99\",\"Message\":\"Unknow error\"}");
		}

		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
