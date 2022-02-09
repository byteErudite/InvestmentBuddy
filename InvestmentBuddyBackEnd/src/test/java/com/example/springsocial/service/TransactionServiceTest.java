package com.example.springsocial.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.mapper.TransactionMapper;
import com.example.springsocial.model.Transaction;
import com.example.springsocial.repository.TransactionRepository;
import com.example.springsocial.util.Bank;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TransactionServiceTest {

	@Autowired
	private TransactionService transactionService;
	
	@MockBean
	private TransactionRepository transactionRepository;

	@Autowired
	private TransactionMapper transactionMapper;

	Transaction transaction1;
	Transaction transaction2;
	UserEntity user = null;
	List<Transaction> transactions;
	CardEntity card = null;

	@BeforeEach
	void setUp() {
		transactions = new ArrayList<>();
		transaction1 = new Transaction();
		transaction1.setAmountPaid(1000);
		transaction1.setBankName(Bank.BOA);
		transaction1.setCardNumber("12345");
		transaction1.setPaymentDate(new Date());
		transaction1.setStatus("Success");
		transaction1.setRewardsEarned(100);

		transaction2 = new Transaction();
		transaction2.setAmountPaid(1000);
		transaction2.setBankName(Bank.BOA);
		transaction2.setCardNumber("12345");
		transaction2.setPaymentDate(new Date());
		transaction2.setStatus("Success");
		transaction2.setRewardsEarned(100);

		user = new UserEntity();
		user.setName("abcd");
		user.setId(1L);

		transactions.add(transaction1);
		transactions.add(transaction2);

		card = new CardEntity();
		card.setAmmountDue(1000.00);
		card.setHolderName("abcd");
		card.setCvv(123);
		card.setNumber("12345");
	}

	@Test
	void addTransactionTest() {

		Mockito.when(transactionRepository.save(transactionMapper.toEntity(transaction2, card, 100)))
				.thenReturn(transactionMapper.toEntity(transaction2, card, 100));
		Assertions.assertEquals(transaction2, transactionService.addTransaction(transaction2));
	}

	@Test
	void getAllTransactionTest() {
		Long userId = 1L;
		Mockito.when(transactionRepository.findAll()).thenReturn(transactionMapper.toEntities(transactions, card));
		Assertions.assertEquals(transactionService.getAllTransaction("abcd"), transactions);
	}
}
