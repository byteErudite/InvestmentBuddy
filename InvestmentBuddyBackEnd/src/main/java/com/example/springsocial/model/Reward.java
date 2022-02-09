package com.example.springsocial.model;

import lombok.Data;

@Data
public class Reward {


    private Long id;

    private String userName;

    private int totalPointsInvested;
    private int totalPointsEarned;
    private int nextMilestone;
}
