package com.example.springsocial.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.springsocial.model.UserScoreDto;
import com.example.springsocial.service.UserScoreService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RunWith(SpringRunner.class)
@WebMvcTest(value = UserScoreController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserScoreControllerTest {

	String Token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjIyNTMxNjMyLCJleHAiOjE2MjMzOTU2MzJ9.0xQXQ5HTj-Kmd6yzUzjoH_bUT1Je2V5S861YkDxVuINc3ibmT2IqIE-RJBrMTGgJtXswtKEFNLtrZ-iNYnj3kA";
	@MockBean
	private UserScoreService userScoreService;

	@Autowired
	private MockMvc mockMvc;

	UserScoreDto score1;
	UserScoreDto score2;

	@BeforeEach
	void setUp() {
		score1 = new UserScoreDto();
		score1.setAssessmentTaken(true);
		score1.setId((long) 1);
		score1.setOverallScore(50);
		score1.setRiskProfile("Low");

		score2 = new UserScoreDto();
		score2.setAssessmentTaken(true);
		score2.setId((long) 2);
		score2.setOverallScore(62);
		score2.setRiskProfile("Moderate");

	}

	@Test
	void testAddUserScore() throws Exception {

		String inputInJson = this.mapToJson(score1);
		String URL = "/userScore/";

		Mockito.when(userScoreService.addUserRiskProfileScore(Mockito.any(UserScoreDto.class))).thenReturn(score1);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post(URL).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", Token).content(inputInJson).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(200, response.getStatus());
		String outputJson = response.getContentAsString();
		Assertions.assertThat(outputJson).isEqualTo(inputInJson);
		assertEquals(HttpStatus.OK.value(), response.getStatus());
	}

	private String mapToJson(Object object) throws JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(object);
	}
}
