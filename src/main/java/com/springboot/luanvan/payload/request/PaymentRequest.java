package com.springboot.luanvan.payload.request;

import javax.validation.constraints.NotNull;

import com.springboot.luanvan.models.CartItem;

import java.util.List;

public class PaymentRequest {
    @NotNull
    private String paymentMethod;

    @NotNull
    private Long user_id;

    @NotNull
    private Long address_id;

    @NotNull
    private List<CartItem> cartItems; // Danh sách các sản phẩm mà người dùng muốn mua

    public PaymentRequest() {
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getAddress_id() {
        return address_id;
    }

    public void setAddress_id(Long address_id) {
        this.address_id = address_id;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
