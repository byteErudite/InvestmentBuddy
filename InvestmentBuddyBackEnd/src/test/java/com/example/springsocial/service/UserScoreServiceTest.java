package com.example.springsocial.service;

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
import com.example.springsocial.mapper.UserScoreMapper;
import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.repository.UserScoreRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserScoreServiceTest {

	@Autowired
	private UserScoreService userScoreService;

	@Autowired
	private UserScoreMapper userScoreMapper;

	@MockBean
	private UserScoreRepository userScoreRepository;

	UserScoreDto score1;
	UserScoreDto score2;
	UserEntity user = null;

	@BeforeEach
	void setUp() {
		score1 = new UserScoreDto();
		score1.setAssessmentTaken(true);
		// score1.setId((long) 1);
		score1.setOverallScore(50);
		score1.setRiskProfile("Low");
		score1.setUserName("abcd");

		score2 = new UserScoreDto();
		score2.setAssessmentTaken(true);
		score2.setId((long) 2);
		score2.setOverallScore(62);
		score2.setRiskProfile("Moderate");
		score2.setUserName("abcd");

		user = new UserEntity();
		user.setName("abcd");
		user.setId(1L);

	}

	@Test
	public void addUserScoreTest() {

		Mockito.when(userScoreRepository.save(userScoreMapper.toEntity(score2)))
				.thenReturn(userScoreMapper.toEntity(score2));
		Assertions.assertEquals(score2, userScoreService.addUserRiskProfileScore(score2));
	}

	@Test
	void getUserScoreTest() {
		Long userId = 1L;
		Mockito.when(userScoreRepository.getUserScoreByUserId(userId)).thenReturn(userScoreMapper.toEntity(score1));
		Assertions.assertEquals(userScoreService.getUserRiskProfileScore("abcd"), score1);
	}

}
