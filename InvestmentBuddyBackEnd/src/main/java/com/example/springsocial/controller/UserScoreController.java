package com.example.springsocial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.service.UserScoreService;

@RestController
@RequestMapping("/userScore")
public class UserScoreController {

	@Autowired
	private UserScoreService userScoreService;

    @PostMapping("/")
    public UserScoreDto addUserScore(@RequestBody UserScoreDto userScoreDto) {
    	return userScoreService.addUserRiskProfileScore(userScoreDto);
    }
    
    @GetMapping("/{userName}")
    public UserScoreDto getUserScore(@PathVariable("userName") String userName) {
    	return userScoreService.getUserRiskProfileScore(userName);
    }
}
