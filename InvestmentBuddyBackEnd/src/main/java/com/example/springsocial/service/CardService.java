package com.example.springsocial.service;

import java.util.List;

import com.example.springsocial.model.Card;

public interface CardService {
	
	public List<Card> getAllCards(String userName);
	
    public Card addCard(Card card);
    
    public void disableCard(Long id);
    
    public void deleteCard(Long id);
}
