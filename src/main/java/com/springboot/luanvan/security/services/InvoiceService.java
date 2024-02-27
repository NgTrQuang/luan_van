package com.springboot.luanvan.security.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.Invoice;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.InvoiceRequest;

@Component
public interface InvoiceService {
	Invoice getInvoice(Long invoiceId);

	List<Invoice> getAllInvoices();

//	List<Invoice> getAllUserInvoices(Long userId);
//
//	List<Invoice> getAllInvoicesPaySuccessByUser(Long userId);
	
	List<Invoice> getInvoicesByUserId(Long userId);
	
	List<Invoice> getPaidInvoicesByUserId(Long userId);
	
	List<Invoice> getPendingInvoicesByUserId(Long userId);
	
	List<Invoice> getHistoryInvoicesByUserId(Long userId);
	
	List<Invoice> getHistoryInvoicesByUserIdAndWasPayAndAction(Long userId);

	Invoice createInvoice(InvoiceRequest invoiceRequest);

	void softDeleteInvoiceById(Long invoiceId);

	void hardDeleteInvoiceById(Long invoiceId);

	Optional<Invoice> updateProductsInInvoice(Invoice invoice, Long userId);

	Optional<Invoice> updateAddressInInvoice(Invoice invoice, Address address);

	Optional<Invoice> setPaymentSuccess(Invoice invoice); //, String paymentMethod, Long userId

	Invoice invoiceReactivationById(Long invoiceId);
	
	Invoice updateInvoiceAction(Long invoiceId, String newAction);
	
	Invoice updateInvoiceActionToVnPay(Long invoiceId, String newAction);
	
	Invoice updateInvoiceActionAfterReceived(Long invoiceId, String newAction);
	
	Invoice updateRefundStatus(Long invoiceId);
	
	//Thống kê số lượng đơn hàng
	Long countInvoices();
	
//	//Doanh thu từ đơn hàng
//	Double totalRevenue();
//	
	//Số lượng đơn hàng đã thanh toán
	Long countPaidInvoices();
//
	Double getTotalRevenue();
//	//Top N đơn hàng có giá trị cao nhất
//	List<Invoice> findTopNByOrderByTotalPriceDesc(int n);
//
//	//Danh sách đơn hàng trong khoảng thời gian cụ thể
//	List<Invoice> findByTimeCreateBetween(LocalDateTime startTime, LocalDateTime endTime);
//
//	//Danh sách đơn hàng của một người dùng cụ thể
//	List<Invoice> findByUser(User user);
//	
//	//Danh sách đơn hàng theo phương thức thanh toán
//	List<Invoice> findByPaymentMethod(String paymentMethod);


}
