package com.example.springsocial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springsocial.entity.InvestmentEntity;

@Repository
public interface InvestmentRepository extends JpaRepository<InvestmentEntity, Long> {
	
	public List<InvestmentEntity> findByUserId(Long UserId);
}
