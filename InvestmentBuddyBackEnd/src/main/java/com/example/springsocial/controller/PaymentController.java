package com.example.springsocial.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.CreateOrderRequest;
import com.example.springsocial.model.CreateOrderResponse;
import com.example.springsocial.service.PaymentService;


@RestController
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order")
    public CreateOrderResponse createOrder(@RequestBody CreateOrderRequest createOrderRequest) {
        CreateOrderResponse paymentObject = paymentService.createOrder(createOrderRequest);
        return paymentObject;
    }

    @GetMapping("/order")
    public List<CreateOrderResponse> getOrder() {
        System.out.println("Hello ");
        return paymentService.getAllOrder();
    }


    @PostMapping("/payment/{paymentId}")
    public void capturePayment(@PathVariable("paymentId") String paymentId) {
        paymentService.capturePayment(paymentId);
    }
}
