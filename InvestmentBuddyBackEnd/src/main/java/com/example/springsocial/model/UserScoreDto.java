package com.example.springsocial.model;

import lombok.Data;

@Data
public class UserScoreDto {

	private Long id;
	
	private Integer overallScore;
	private String riskProfile;
	private String userName;
	private boolean isAssessmentTaken;
}
