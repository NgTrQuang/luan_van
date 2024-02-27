package com.springboot.luanvan.security.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.stereotype.Service;

import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.CartItem;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.CartItemRequest;
import com.springboot.luanvan.payload.request.CartRequest;
import com.springboot.luanvan.repository.BookRepository;
import com.springboot.luanvan.repository.CartItemRepository;
import com.springboot.luanvan.repository.UserRepository;

@Service
public class CartItemServiceImpl implements CartItemService {
	@Autowired
	BookRepository bookRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	CartItemRepository cartItemRepository;

	@Override
	public List<CartItem> getCart(long userId) {
		return cartItemRepository.findByUser_UserIdAndStatusPay(userId, false);
	}

	@Override
	public CartItem createCartItem(CartRequest cartRequest) {
		CartItem cartItem = cartItemRepository.findByUser_UserIdAndBook_BookIdAndStatusPay(cartRequest.getUser_id(),
				cartRequest.getBook_id(), false);

		if (cartItem != null) {
			if (cartItem.getQuantity() + cartRequest.getQuantity() <= cartItem.getBook().getStock())
				cartItem.setQuantity(cartItem.getQuantity() + cartRequest.getQuantity());
			else
				throw new InvalidConfigurationPropertyValueException("Tràn kho!", cartItem.getBook().getStock(),
						"Số lượng đặt hàng vượt quá số lượng trong kho dự trữ của sản phẩm");

			return cartItemRepository.save(cartItem);
		} else {
			User user = userRepository.findById(cartRequest.getUser_id()).orElseThrow();
			Book product = bookRepository.findById(cartRequest.getBook_id()).orElseThrow();
			CartItem cartItem0 = new CartItem(user, product, cartRequest.getQuantity());

			return cartItemRepository.save(cartItem0);
		}
	}

	@Override
	public CartItem updateQuantityInCartItem(Long cartItemId, CartItemRequest cartItemRequest) {
		CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(
				() -> new InvalidConfigurationPropertyValueException("cartItemId", cartItemId, "Not Found"));
		
		if(cartItemRequest.getQuantity() == 0) {
			cartItemRepository.deleteById(cartItemId);
			return null;
		}
		if(cartItemRequest.getQuantity() > cartItem.getBook().getStock())
			throw new InvalidConfigurationPropertyValueException("Tràn kho!", cartItem.getBook().getStock(),
					"Số lượng đặt hàng vượt quá số lượng trong kho dự trữ của sản phẩm");
		
		cartItem.setQuantity(cartItemRequest.getQuantity());
		return cartItemRepository.save(cartItem);
	}

	@Override
	public void deleteCartItem(long cartItemId) {
		// TODO Auto-generated method stub
		if (cartItemRepository.findById(cartItemId).get().getCartItemId().equals(cartItemId)) {
			cartItemRepository.deleteById(cartItemId);
		} else
			throw new InvalidConfigurationPropertyValueException("cartItemId", cartItemId, "Not Found");
	}
}
