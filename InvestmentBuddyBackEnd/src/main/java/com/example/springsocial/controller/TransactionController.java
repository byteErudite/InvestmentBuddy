package com.example.springsocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.Transaction;
import com.example.springsocial.service.TransactionService;

@CrossOrigin
@RestController
@RequestMapping(value = "/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@PostMapping
	public Transaction addTransaction(@RequestBody Transaction transaction) {
		return transactionService.addTransaction(transaction);
	}

	@GetMapping("/{userName}")
	public List<Transaction> getAllTransaction(@PathVariable("userName") String userName) {
		return transactionService.getAllTransaction(userName);
	}
}
