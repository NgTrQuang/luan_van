package com.springboot.luanvan.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Invoice;
import com.springboot.luanvan.models.User;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

	List<Invoice> findByUser_UserIdAndStatus(Long userId, boolean b);

	List<Invoice> findByUser_UserIdAndStatusAndWasPay(Long userId, boolean b, boolean c);

	Invoice findByUser_UserIdAndWasPay(Long user_id, boolean b);
	
	List<Invoice> findByUser_UserId(Long userId);
	
    List<Invoice> findByUser_UserIdAndWasPay(Long userId, String wasPay);
    
    List<Invoice> findByUser_UserIdAndAction(Long userId, String action);
    
    List<Invoice> findByUser_UserIdOrderByTimeCreateDesc(Long userId);
    
    List<Invoice> findByUser_UserIdAndWasPayAndActionOrderByTimeCreateDesc(Long userId, String wasPay, String action);
    
    @Query(value = "SELECT SUM(total_price) FROM invoice WHERE was_pay = 'Đã thanh toán'", nativeQuery = true)
    Double calculateTotalRevenue();
}
