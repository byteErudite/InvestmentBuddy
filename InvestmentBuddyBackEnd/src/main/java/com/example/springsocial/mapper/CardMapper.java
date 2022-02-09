package com.example.springsocial.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.model.Card;
import com.example.springsocial.util.Bank;

@Mapper(componentModel = "spring")
public interface CardMapper {

	default CardEntity toEntity(Card card, UserEntity user, Bank bankName) {
		CardEntity cardEntity = new CardEntity();
		cardEntity.setNumber(card.getNumber());
		cardEntity.setBank(bankName);
		cardEntity.setHolderName(card.getHolderName());
		cardEntity.setCvv(card.getCvv());
		cardEntity.setExpiry(card.getExpiry());
		cardEntity.setUser(user);
		cardEntity.setAmmountDue(card.getAmmountDue());
		return cardEntity;
	}

	default Card toDto(CardEntity cardEntity, UserEntity user) {
		Card card = new Card();
		card.setId(cardEntity.getId());
		card.setBank(cardEntity.getBank());
		card.setHolderName(cardEntity.getHolderName());
		card.setCvv(cardEntity.getCvv());
		card.setExpiry(cardEntity.getExpiry());
		card.setNumber(cardEntity.getNumber());
		card.setUserName(user.getName());
		card.setAmmountDue(cardEntity.getAmmountDue());
		card.setMinAmmountDue((cardEntity.getAmmountDue() * 10) / 100);
		return card;
	}

	default List<Card> toDtos(List<CardEntity> cardEntities, UserEntity user) {
		List<Card> cards = new ArrayList<>();
		for (CardEntity cardEntity : cardEntities) {
			cards.add(toDto(cardEntity, user));
		}
		return cards;
	}

	default List<CardEntity> toEntitiess(List<Card> cards, UserEntity user) {
		List<CardEntity> cardEntities = new ArrayList<>();
		for (Card card : cards) {
			cardEntities.add(toEntity(card, user, Bank.CITI));
		}
		return cardEntities;
	}
}
