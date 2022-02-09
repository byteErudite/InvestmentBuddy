package com.example.springsocial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springsocial.entity.UserScoreEntity;

@Repository
public interface UserScoreRepository extends JpaRepository<UserScoreEntity, Long> {

	@Query("SELECT u FROM UserScoreEntity u WHERE u.loggedInUserId = :loggedInUserId")
    public UserScoreEntity getUserScoreByUserId(@Param("loggedInUserId") Long loggedInUserId);
}
