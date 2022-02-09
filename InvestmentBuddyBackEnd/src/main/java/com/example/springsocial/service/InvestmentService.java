package com.example.springsocial.service;

import com.example.springsocial.entity.InvestmentEntity;
import com.example.springsocial.model.Investment;

import java.util.List;
import java.util.Set;

public interface InvestmentService {

    public List<Investment> getAllInvestments(String userName);

    public Investment addInvestment(InvestmentEntity investmentEntity);

    Set<String> getFunds(String userName);
}
