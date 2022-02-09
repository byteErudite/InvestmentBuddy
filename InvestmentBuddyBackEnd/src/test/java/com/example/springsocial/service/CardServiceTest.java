package com.example.springsocial.service;

import java.util.ArrayList;
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

import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.mapper.CardMapper;
import com.example.springsocial.model.Card;
import com.example.springsocial.repository.CardRepository;
import com.example.springsocial.util.Bank;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CardServiceTest {

	@Autowired
	private CardService cardService;

	@MockBean
	private CardRepository cardRepository;

	@Autowired
	private CardMapper cardMapper;

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
	void addCardTest() {

		Mockito.when(cardRepository.save(cardMapper.toEntity(card2, user, Bank.CITI)))
				.thenReturn(cardMapper.toEntity(card2, user, Bank.CITI));
		Assertions.assertEquals(card2, cardService.addCard(card2));
	}

	@Test
	void getAllCardTest() {
		Long userId = 1L;
		Mockito.when(cardRepository.getAllEnabledCardOFUser(userId)).thenReturn(cardMapper.toEntitiess(cards, user));
		Assertions.assertEquals(cardService.getAllCards("abcd"), cards);
	}
}
