package com.example.springsocial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springsocial.entity.CardEntity;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {

	public CardEntity findByNumber(String cardNumber);
	
	@Query("SELECT u FROM CardEntity u WHERE u.user.id = :userId and u.isDisable = false order by u.id desc")
    public List<CardEntity> getAllEnabledCardOFUser(@Param("userId") Long userId);
	
	@Query("SELECT u FROM CardEntity u WHERE u.number = :number and u.isDisable = true")
	public List<CardEntity> isCardDisabled(@Param("number") String number);
}

