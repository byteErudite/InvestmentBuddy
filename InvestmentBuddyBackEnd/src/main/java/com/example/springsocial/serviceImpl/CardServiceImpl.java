package com.example.springsocial.serviceImpl;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.mapper.CardMapper;
import com.example.springsocial.model.Card;
import com.example.springsocial.repository.CardRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.service.CardService;
import com.example.springsocial.util.Bank;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CardMapper cardMapper;

    public List<CardEntity> getAllCards() {
        return cardRepository.findAll();
    }

    public Card addCard(Card card) {
        if (Objects.isNull(card.getNumber()) || Objects.isNull(card.getCvv())) {
            throw new BadRequestException("Card number and cvv cannot be null.");
        }
        
        if (!cardRepository.isCardDisabled(card.getNumber()).isEmpty()) {
        	throw new BadRequestException("This Card is disabled Please enable it or Add new Card.");
        }
        
        if (cardRepository.findByNumber(card.getNumber()) != null) {
        	throw new BadRequestException("Same Card number cannot be added again.");
        }
      
        UserEntity user = userRepository.findByName(card.getUserName());
        if (Objects.isNull(user)) {
            throw new BadRequestException("Invalid user");
        }
        
        return cardMapper.toDto(cardRepository.save(cardMapper.toEntity(card, user, card.getBank())), user);
    }

    private Bank getRandomBank() {
        int index = (int) ((Math.random() * (4 - 1)) + 1);
        return getBank(index);
    }

    private Bank getBank(int index) {
        switch (index) {
            case 4: return Bank.CITI;
        }
        return null;
    }

	@Override
	public List<Card> getAllCards(String userName) {
		UserEntity user = userRepository.findByName(userName);
		List<CardEntity> cards = cardRepository.getAllEnabledCardOFUser(user.getId());
		if (Objects.nonNull(cards) && !Collections.isEmpty(cards)) {
		    cards.sort((CardEntity c1, CardEntity c2) -> c1.getId() > c2.getId() ? 1 : -1);
        }
		return cardMapper.toDtos(cards, user);
	}

	@Override
	public void disableCard(Long id) {

		Optional<CardEntity> card = cardRepository.findById(id);
		if (card.isPresent()) {
			var cardEntity = card.get();
			cardEntity.setDisable(true);
			cardRepository.save(cardEntity);
		}
	}

	@Override
	public void deleteCard(Long id) {

		Optional<CardEntity> card = cardRepository.findById(id);
		if (card.isPresent()) {
			cardRepository.delete(card.get());
		}
	}

}
