package com.example.springsocial.mapper;

import org.mapstruct.Mapper;

import com.example.springsocial.entity.RewardEntity;
import com.example.springsocial.model.Reward;

@Mapper(componentModel = "spring")
public interface RewardMapper {

    default Reward toDto(RewardEntity rewardEntity, String userName) {

        Reward reward=new Reward();
        if (rewardEntity != null) {

            reward.setId(rewardEntity.getUserId());
            reward.setUserName(userName);
            reward.setTotalPointsInvested(rewardEntity.getTotalPointsInvested());
            reward.setTotalPointsEarned(rewardEntity.getTotalPointsEarned());
            reward.setNextMilestone(rewardEntity.getNextMilestone());
        }
        return reward;
    }
    
    default RewardEntity toEntity(Reward reward) {
        RewardEntity rewardEntity=new RewardEntity();
        if (reward != null) {
            rewardEntity.setId(reward.getId());
            rewardEntity.setTotalPointsInvested(reward.getTotalPointsInvested());
            rewardEntity.setTotalPointsEarned(reward.getTotalPointsEarned());
            rewardEntity.setNextMilestone(reward.getNextMilestone());
        }
        return rewardEntity;
    }
    
}
