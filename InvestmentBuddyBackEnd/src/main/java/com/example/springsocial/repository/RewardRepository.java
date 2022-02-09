package com.example.springsocial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.springsocial.entity.RewardEntity;

@Repository
public interface RewardRepository extends JpaRepository<RewardEntity,Long> {
	
	public RewardEntity findByUserId(Long UserId);

}
