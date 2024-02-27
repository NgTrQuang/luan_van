package com.springboot.luanvan.controllers;

//import java.util.HashMap;
import java.util.List;
//import java.util.Map;

//import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.models.CartItem;
import com.springboot.luanvan.payload.request.CartItemRequest;
import com.springboot.luanvan.payload.request.CartRequest;
import com.springboot.luanvan.payload.response.MessageResponse;
import com.springboot.luanvan.repository.UserRepository;
import com.springboot.luanvan.security.services.CartItemService;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartItemController {
	@Autowired
	CartItemService cartService;
	
	@Autowired
	UserRepository userRepository;

	@GetMapping("/getCart/{userId}")
//	@PreAuthorize("hasRole('CARTITEM_NORMAL_ACCESS')")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")  // bat buoc co
	public ResponseEntity<?> getCart(@PathVariable("userId") Long userId) {
		try {
			List<CartItem> cartItems = cartService.getCart(userId);
			System.out.println(userId);
			return new ResponseEntity<>(cartItems, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// tạo giỏ hàng với user_id, book_id và quantity
	@PostMapping(value = "/", consumes = { "*/*" })
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CARTITEM_NORMAL_ACCESS')")
	public ResponseEntity<CartItem> createCartItem(@Valid @RequestBody CartRequest cartRequest) {
		return new ResponseEntity<>(cartService.createCartItem(cartRequest), HttpStatus.CREATED);
	}
	
	// update giỏ hàng với số lượng từ CartItemRequest
	@PutMapping(value = "/{cartItemId}", consumes = { "*/*" })
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CARTITEM_NORMAL_ACCESS')")
	public ResponseEntity<CartItem> updateQuantityInCartItem(@PathVariable("cartItemId") Long cartItemId,
			@RequestBody @Valid CartItemRequest cartItemRequest) {
		return new ResponseEntity<>(cartService.updateQuantityInCartItem(cartItemId, cartItemRequest), HttpStatus.CREATED);
	}

	// xóa giỏ hàng
	@DeleteMapping(value = "/delete/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CARTITEM_NORMAL_ACCESS')")
	public ResponseEntity<MessageResponse> hardDeleteCartItem(@PathVariable("id") Long id) {
		try {
			cartService.deleteCartItem(id);
			System.out.print("delete = true");
			return new ResponseEntity<>(null ,HttpStatus.OK);			
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
