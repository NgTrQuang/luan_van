package com.springboot.luanvan.security.services;

import java.util.List;
import org.springframework.stereotype.Component;

import com.springboot.luanvan.models.CartItem;
import com.springboot.luanvan.payload.request.CartItemRequest;
import com.springboot.luanvan.payload.request.CartRequest;

@Component
public interface CartItemService {
	CartItem createCartItem(CartRequest cartRequest);
	
	void deleteCartItem(long cartItemId);
	
	List<CartItem> getCart(long userId);

	CartItem updateQuantityInCartItem(Long cartItemId, CartItemRequest cartItemRequest);
}
