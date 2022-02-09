package com.example.springsocial.model;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String userName;

    public AuthResponse(String accessToken,String userName) {
        this.accessToken = accessToken;
        this.userName=userName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setUserName(String userName)
    {
        this.userName=userName;
    }

    public String getUserName()
    {
        return this.userName;
    }
}
