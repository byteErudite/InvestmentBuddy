package com.example.springsocial.service;

import java.util.List;

import com.example.springsocial.model.CreateOrderRequest;
import com.example.springsocial.model.CreateOrderResponse;

public interface PaymentService {

    CreateOrderResponse createOrder(CreateOrderRequest createOrderRequest);
    List<CreateOrderResponse> getAllOrder();
    void capturePayment(String paymentId);
}
