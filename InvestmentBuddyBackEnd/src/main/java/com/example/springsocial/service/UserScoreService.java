package com.example.springsocial.service;

import com.example.springsocial.model.UserScoreDto;

public interface UserScoreService {

	UserScoreDto addUserRiskProfileScore(UserScoreDto userScoreDto);
	
	UserScoreDto getUserRiskProfileScore(String userName);
}
