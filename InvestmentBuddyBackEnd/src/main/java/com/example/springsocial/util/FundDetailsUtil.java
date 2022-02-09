package com.example.springsocial.util;

import static com.example.springsocial.util.Constants.DEFAULT_STOCK_PRICE;
import static com.example.springsocial.util.Constants.FACEBOOK_STOCK;
import static com.example.springsocial.util.Constants.FACEBOOK_STOCK_PRICE;
import static com.example.springsocial.util.Constants.HIGH_RISK;
import static com.example.springsocial.util.Constants.IBM_STOCK;
import static com.example.springsocial.util.Constants.IBM_STOCK_PRICE;
import static com.example.springsocial.util.Constants.LOW_RISK;
import static com.example.springsocial.util.Constants.MEDIUM_RISK;
import static com.example.springsocial.util.Constants.MICROSOFT_STOCK;
import static com.example.springsocial.util.Constants.MICROSOFT_STOCK_PRICE;

import javax.validation.constraints.NotNull;

public class FundDetailsUtil {

    public static String getFundName(@NotNull String riskProfile) {
        if (riskProfile.equalsIgnoreCase(LOW_RISK))
            return IBM_STOCK;
        else if (riskProfile.equalsIgnoreCase(MEDIUM_RISK))
            return FACEBOOK_STOCK;
        else if (riskProfile.equalsIgnoreCase(HIGH_RISK))
            return MICROSOFT_STOCK;
        return IBM_STOCK;
    }

    public static Double getPrice(@NotNull String fundName) {
        if (fundName.equalsIgnoreCase(IBM_STOCK))
            return IBM_STOCK_PRICE;
        else if (fundName.equalsIgnoreCase(FACEBOOK_STOCK))
            return FACEBOOK_STOCK_PRICE;
        else if (fundName.equalsIgnoreCase(MICROSOFT_STOCK))
            return MICROSOFT_STOCK_PRICE;
        return DEFAULT_STOCK_PRICE;
    }
}
