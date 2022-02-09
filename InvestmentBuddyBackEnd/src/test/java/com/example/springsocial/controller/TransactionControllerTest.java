package com.example.springsocial.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.model.Transaction;
import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.service.TransactionService;
import com.example.springsocial.service.UserScoreService;
import com.example.springsocial.util.Bank;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(value = UserScoreController.class)
@AutoConfigureMockMvc(addFilters = false)
public class TransactionControllerTest {
	
	@MockBean
	private TransactionService transactionService;
	
	@Autowired
	private MockMvc mockMvc;

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
	void testAddTransaction() throws Exception {

		String inputInJson = this.mapToJson(transaction1);
		String URL = "/transaction";

		Mockito.when(transactionService.addTransaction(Mockito.any(Transaction.class))).thenReturn(transaction1);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post(URL).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "Token").content(inputInJson).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(200, response.getStatus());
		String outputJson = response.getContentAsString();
		Assertions.assertThat(outputJson).isEqualTo(inputInJson);
		assertEquals(HttpStatus.OK.value(), response.getStatus());
	}

	private String mapToJson(Object object) throws JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(object);
	}
}
