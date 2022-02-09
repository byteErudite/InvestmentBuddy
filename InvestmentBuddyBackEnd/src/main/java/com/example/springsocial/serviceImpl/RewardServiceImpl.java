package com.example.springsocial.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springsocial.mapper.RewardMapper;
import com.example.springsocial.model.Reward;
import com.example.springsocial.repository.RewardRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.service.RewardService;

@Service
public class RewardServiceImpl implements RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RewardMapper rewardMapper;

    @Override
    public Reward getRewards(String userName) {
        Long userId = userRepository.findByName(userName).getId();
        var rewardEntity = rewardRepository.findByUserId(userId);
        return rewardMapper.toDto(rewardEntity, userName);
    }


    @Override
    public void addRewards(Reward reward) {
        var rewardEntity = rewardMapper.toEntity(reward);
        rewardRepository.save(rewardEntity);
    }

}
