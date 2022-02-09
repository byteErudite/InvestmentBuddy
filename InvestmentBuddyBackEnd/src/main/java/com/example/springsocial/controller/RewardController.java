package com.example.springsocial.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springsocial.model.Reward;
import com.example.springsocial.service.RewardService;

@RestController
@RequestMapping(value ="rewards")
public class RewardController {


    @Autowired
    private RewardService rewardService;

    @GetMapping("/{userName}")
    public ResponseEntity<Reward> getAllRewards(@PathVariable("userName") String userName)
    {
        Reward reward=rewardService.getRewards(userName);

        return ResponseEntity.ok(reward);
    }
}
