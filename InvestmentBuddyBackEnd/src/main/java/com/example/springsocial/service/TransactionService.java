package com.example.springsocial.service;

import java.util.List;

import com.example.springsocial.model.Transaction;

public interface TransactionService {

	public Transaction addTransaction(Transaction transaction);
	
	public List<Transaction> getAllTransaction(String userName);
}
