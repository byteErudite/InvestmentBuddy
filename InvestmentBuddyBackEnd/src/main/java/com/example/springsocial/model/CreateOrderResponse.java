package com.example.springsocial.model;

import java.util.List;

import lombok.Data;

@Data
public class CreateOrderResponse {

	public String id;
	public String entity;
	public int amount;
	public int amount_paid;
	public int amount_due;
	public String currency;
	public String receipt;
	public String status;
	public int attempts;
	public List<Object> notes;
	public int created_at;
}
