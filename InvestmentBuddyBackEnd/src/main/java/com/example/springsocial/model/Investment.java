package com.example.springsocial.model;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Investment {

    private long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date investedDate;

    private String fundName;

    private Double pricePerUnit;

    private Double moneyInvested;

    private Double units;
}
