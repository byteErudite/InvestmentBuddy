package com.example.springsocial.model;

import com.example.springsocial.util.Status;

import lombok.Data;

@Data
public class LoginResponse {
	private Status status;
	private String userToken;

}
