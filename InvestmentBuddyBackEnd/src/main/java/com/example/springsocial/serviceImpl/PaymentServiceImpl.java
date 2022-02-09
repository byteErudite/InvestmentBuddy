package com.example.springsocial.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.example.springsocial.model.CreateOrderRequest;
import com.example.springsocial.model.CreateOrderResponse;
import com.example.springsocial.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentServiceImpl implements PaymentService {

	private RazorpayClient client;

	/**
	 * add your secretId and secretValue you got from your RazorPay account.
	 */
	private static final String SECRET_ID = "rzp_test_5BzocREST9Wvie";
	private static final String SECRET_KEY = "e76EbRKsNo2SEXrzewdHYe2r";

	public PaymentServiceImpl() throws RazorpayException {
		this.client = new RazorpayClient(SECRET_ID, SECRET_KEY);
	}

	public CreateOrderResponse createOrder(CreateOrderRequest createOrderRequest) {
		var createOrderResponse = new CreateOrderResponse();
		System.out.println(createOrderRequest.getOrderAmmount());
		try {
			var orderRequest = new JSONObject();
			orderRequest.put("amount", createOrderRequest.getOrderAmmount()); // amount in the smallest currency unit
			orderRequest.put("currency", "USD");
			orderRequest.put("receipt", "order_rcptid_11");
			orderRequest.put("partial_payment", true);
			var order = client.Orders.create(orderRequest);
			
	
			createOrderResponse.setId(order.get("id"));
			createOrderResponse.setAmount(order.get("amount"));
			createOrderResponse.setCurrency(order.get("currency"));
		} catch (RazorpayException e) {
			// Handle Exception
			System.out.println(e.getMessage());
		}
		return createOrderResponse;
	}

	public List<CreateOrderResponse> getAllOrder() {

		List<CreateOrderResponse>  ordersData  = new ArrayList<>();
		List<Order> orders = new ArrayList<>();
		try {
			var orderRequest = new JSONObject();

			// supported option filters (from, to, count, skip)
			orderRequest.put("count", 2);
			orderRequest.put("skip", 1);

			 orders = client.Orders.fetchAll(orderRequest);

			System.out.println("orders List == " + orders.toString());
		} catch (RazorpayException e) {
			// Handle Exception
			System.out.println(e.getMessage());
		}
		for (Order order : orders) {
			var createOrderResponse = new CreateOrderResponse();
			createOrderResponse.setId(order.get("id"));
			createOrderResponse.setAmount(order.get("amount"));
			createOrderResponse.setCurrency(order.get("currency"));
			ordersData.add(createOrderResponse);
		}
		return ordersData;
	}

	public void capturePayment(String paymentId) {
		try {
			JSONObject captureRequest = new JSONObject();
			captureRequest.put("amount", "10000");
			captureRequest.put("currency", "INR");

			Payment payment = client.Payments.capture(paymentId, captureRequest);
			System.out.println("payment=====" + payment.toString());
		} catch (RazorpayException e) {
			// Handle Exception
			System.out.println(e.getMessage());
		}
	}
}
