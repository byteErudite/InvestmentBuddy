package com.example.springsocial.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
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

import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.model.Card;
import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.service.CardService;
import com.example.springsocial.service.UserScoreService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(value = UserScoreController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CardControllerTest {

	@MockBean
	private CardService cardService;
	
	@Autowired
	private MockMvc mockMvc;
	
	Card card1;
	Card card2;
	UserEntity user = null;
	List<Card> cards = new ArrayList<>();
	
	@BeforeEach
	void setUp() {
		card1 = new Card();
		card1.setAmmountDue(1000.00);
		card1.setHolderName("abcd");
		card1.setCvv(123);
		card1.setUserName("abcd");
		card1.setNumber("12345");

		card2 = new Card();
		card2.setAmmountDue(1000.00);
		card2.setHolderName("abcd");
		card2.setCvv(123);
		card2.setUserName("abcd");
		card2.setNumber("12345");

		user = new UserEntity();
		user.setName("abcd");
		user.setId(1L);

		cards.add(card1);
		cards.add(card2);

	}
	
	@Test
	void testAddUserScore() throws Exception {

		String inputInJson = this.mapToJson(card1);
		String URL = "/card";

		Mockito.when(cardService.addCard(Mockito.any(Card.class))).thenReturn(card1);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.put(URL).accept(MediaType.APPLICATION_JSON)
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
