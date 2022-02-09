package com.example.springsocial.service;

import com.example.springsocial.model.Reward;

public interface RewardService {

    public Reward getRewards(String userName);

    public void addRewards(Reward rewards);
}
