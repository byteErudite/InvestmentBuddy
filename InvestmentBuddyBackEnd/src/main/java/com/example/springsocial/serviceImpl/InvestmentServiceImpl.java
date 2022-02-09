package com.example.springsocial.serviceImpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springsocial.entity.InvestmentEntity;
import com.example.springsocial.mapper.InvestmentMapper;
import com.example.springsocial.model.Investment;
import com.example.springsocial.repository.InvestmentRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.service.InvestmentService;

@Service
public class InvestmentServiceImpl implements InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private InvestmentMapper investmentMapper;

    @Autowired
    private UserRepository userRepository;

    public List<Investment> getAllInvestments(String userName) {

        List<Investment> investments = new ArrayList<>();
        Long userId = userRepository.findByName(userName).getId();
        List<InvestmentEntity> allInvestments = investmentRepository.findByUserId(userId);
        for (InvestmentEntity investmentEntity : allInvestments) {
            investments.add(investmentMapper.toDto(investmentEntity));
        }
        investments.sort((Investment i1, Investment i2) -> i1.getId() > i2.getId() ? 1 : -1);
        return investments;
    }

    @Override
    public Investment addInvestment(InvestmentEntity investmentEntity) {

        investmentRepository.save(investmentEntity);
        return investmentMapper.toDto(investmentEntity);
    }

   @Override
    public Set<String> getFunds(String userName) {
        Long userId = userRepository.findByName(userName).getId();
        Set<String> funds = investmentRepository.findByUserId(userId).stream().
                map(InvestmentEntity::getFundName).collect(Collectors.toSet());
        return Objects.isNull(funds) ? Collections.emptySet() : funds;
    }
}
