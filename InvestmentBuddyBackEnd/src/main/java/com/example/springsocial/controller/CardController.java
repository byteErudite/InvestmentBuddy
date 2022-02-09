package com.example.springsocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.Card;
import com.example.springsocial.service.CardService;

@RestController
@RequestMapping(value = "/card")
@CrossOrigin
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping(value = "/{userName}")
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("userName") String userName) {
        return new ResponseEntity<>(cardService.getAllCards(userName), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Card> addCard(@RequestBody Card card) {
        return new ResponseEntity<>(cardService.addCard(card), HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public void disableCard(@PathVariable("id") Long id) {
        cardService.disableCard(id);
    }
    
    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable("id") Long id) {
        cardService.deleteCard(id);
    }
}
