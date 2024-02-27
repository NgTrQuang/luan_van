package com.springboot.luanvan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByUser_UserId(long userId);
//	List<CartItem> findByUser(User user);

	CartItem findByUser_UserIdAndBook_BookIdAndStatusPay(long user_id, long product_id, Boolean status);//???

	List<CartItem> findByUser_UserIdAndStatusPay(long userId, boolean b);
}
