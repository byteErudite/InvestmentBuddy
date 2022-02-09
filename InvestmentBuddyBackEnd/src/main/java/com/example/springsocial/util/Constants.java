package com.example.springsocial.util;

import java.time.format.DateTimeFormatter;

public class Constants {

    public static final String CARD_NUMBER_INVALID = "Card number is invalid";
    public static final String TRANSACTION_FAILED = "Transaction failed, please try again";
    public static final String TRANSACTION_SUCCESSFUL = "Transaction saved successfuly for id: ";
    public static final String SUCCESS = "Success";
    public static final String LOW_RISK = "low";
    public static final String MEDIUM_RISK = "medium";
    public static final String HIGH_RISK = "high";
    public static final String IBM_STOCK = "IBM";
    public static final String FACEBOOK_STOCK = "Facebook";
    public static final String MICROSOFT_STOCK = "Microsoft";
    public static final Double IBM_STOCK_PRICE = 2.50;
    public static final Double MICROSOFT_STOCK_PRICE = 9.50;
    public static final Double FACEBOOK_STOCK_PRICE = 5.50;
    public static final Double DEFAULT_STOCK_PRICE = 5.50;
    public static final Integer INVESTMENT_BARRIER = 200;
    public static final Double REWARD_CONVERSION_RATE = 0.2;
    public static final String LOG_TIME_FORMAT = "yyyy/MM/dd HH:mm:ss";
    public static final DateTimeFormatter LOG_TIME = DateTimeFormatter.ofPattern(LOG_TIME_FORMAT);
}
