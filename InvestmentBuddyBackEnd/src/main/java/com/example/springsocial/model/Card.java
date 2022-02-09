package com.example.springsocial.model;

import java.util.Date;

import com.example.springsocial.util.Bank;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class Card {

	private Long id;

	private String userName;
	private String number;
	private String holderName;

	private Bank bank;

	private Integer cvv;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date expiry;
	
	private boolean isDisable;
	
	private Double ammountDue;
	private Double minAmmountDue;
}
