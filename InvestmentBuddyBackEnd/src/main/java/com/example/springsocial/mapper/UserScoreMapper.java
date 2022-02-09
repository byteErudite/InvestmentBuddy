package com.example.springsocial.mapper;

import org.mapstruct.Mapper;

import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.entity.UserScoreEntity;
import com.example.springsocial.model.UserScoreDto;

@Mapper(componentModel = "spring")
public interface UserScoreMapper {
	
	default UserScoreDto toDto(UserScoreEntity userScoreEntity, UserEntity user) {
		UserScoreDto userScoreDto = new UserScoreDto();
		if (userScoreEntity != null) {
			userScoreDto.setId(userScoreEntity.getId());
			userScoreDto.setOverallScore(userScoreEntity.getOverallScore());
			userScoreDto.setRiskProfile(userScoreEntity.getRiskProfile());
			userScoreDto.setUserName(user.getName());
			userScoreDto.setAssessmentTaken(userScoreEntity.isAssessmentTaken());
		}
		return userScoreDto;
	}
	
	default UserScoreEntity toEntity(UserScoreDto userScoreDto) {
		UserScoreEntity userScoreEntity = new UserScoreEntity();
		userScoreEntity.setOverallScore(userScoreDto.getOverallScore());
		userScoreEntity.setRiskProfile(userScoreDto.getRiskProfile());
		userScoreEntity.setAssessmentTaken(true);
		return userScoreEntity;
	}
}
