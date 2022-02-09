package com.example.springsocial.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.entity.UserScoreEntity;
import com.example.springsocial.mapper.UserScoreMapper;
import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.repository.UserScoreRepository;
import com.example.springsocial.service.UserScoreService;

import java.util.Objects;

@Service
public class UserScoreServiceimpl implements UserScoreService {

	@Autowired
	private UserScoreRepository userScoreRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserScoreMapper userScoreMapper;
	
	@Override
	public UserScoreDto addUserRiskProfileScore(UserScoreDto userScoreDto) {
		
		var userScoreEntity = userScoreMapper.toEntity(userScoreDto);
		UserEntity user = userRepository.findByName(userScoreDto.getUserName());
		if (user != null) {
			userScoreEntity.setLoggedInUserId(user.getId());
			UserScoreEntity existingScore = userScoreRepository.getUserScoreByUserId(user.getId());
			if (existingScore != null) {
				userScoreRepository.delete(existingScore);
			}
		}
		UserScoreEntity savedUserScore = userScoreRepository.save(userScoreEntity);
		return userScoreMapper.toDto(savedUserScore, user);
	}

	

	@Override
	public UserScoreDto getUserRiskProfileScore(String userName) {
		UserEntity user = userRepository.findByName(userName);
		if (Objects.isNull(user)) {
			return new UserScoreDto();
		}
		UserScoreEntity	userScore = userScoreRepository.getUserScoreByUserId(user.getId());
		return userScoreMapper.toDto(userScore, user);
	}

}
