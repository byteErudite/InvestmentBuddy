package com.example.springsocial.controller;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.Investment;
import com.example.springsocial.service.InvestmentService;

@RestController()
@RequestMapping(value = "/investment")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @GetMapping("/all/{userName}")
    public ResponseEntity<?> getAllInvestments(@PathVariable("userName") String userName) {
        List<Investment> allInvestments = investmentService.getAllInvestments(userName);
        return ResponseEntity.ok(allInvestments);
    }

    @GetMapping("/funds/{userName}")
    public ResponseEntity<Set<String>> getFundNames(@PathVariable("userName") String userName) {
        return new ResponseEntity<>(investmentService.getFunds(userName), HttpStatus.OK);
    }
}
