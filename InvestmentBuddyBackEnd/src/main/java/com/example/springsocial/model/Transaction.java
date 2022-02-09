package com.example.springsocial.model;

import java.util.Date;

import com.example.springsocial.util.Bank;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Transaction {

	private Long id;

	private Bank bankName;
	private String cardNumber;

	private Integer amountPaid;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date paymentDate;
	private String transactionType;
	private Integer rewardsEarned;
	private String status;
}
