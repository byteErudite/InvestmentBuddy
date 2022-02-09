package com.example.springsocial.mapper;

import org.mapstruct.Mapper;

import com.example.springsocial.entity.InvestmentEntity;
import com.example.springsocial.model.Investment;

import java.util.Objects;

@Mapper(componentModel = "spring")
public interface InvestmentMapper {

	default InvestmentEntity toEntity(Investment investment, Long userId, String fundName, Double price, Double money,
			Double units) {
		InvestmentEntity investmentEntity = new InvestmentEntity();

		investmentEntity.setInvestedDate(investment.getInvestedDate());
		investmentEntity.setFundName(fundName);
		investmentEntity.setPricePerUnit(price);
		investmentEntity.setMoneyInvested(money);
		investmentEntity.setUnits(truncate(units, 2));
		investmentEntity.setUserId(userId);
		return investmentEntity;
	}

	private Double truncate(Double value, int decimalpoint)
	{
		if (Objects.isNull(value)) {
			return value;
		}
		value = Math.floor(value * Math.pow(10, decimalpoint));
		return value / Math.pow(10, decimalpoint);
	}

	default Investment toDto(InvestmentEntity investmentEntity) {
		Investment investment = new Investment();

		if (investmentEntity != null) {
			investment.setId(investmentEntity.getId());
			investment.setInvestedDate(investmentEntity.getInvestedDate());
			investment.setFundName(investmentEntity.getFundName());
			investment.setPricePerUnit(investmentEntity.getPricePerUnit());
			investment.setMoneyInvested(investmentEntity.getMoneyInvested());
			investment.setUnits(truncate(investmentEntity.getUnits(), 2));
		}

		return investment;
	}
}
