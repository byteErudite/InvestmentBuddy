package com.example.springsocial.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.TransactionEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.model.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

	default Transaction toDto(TransactionEntity transactionEntity) {

		Transaction transaction = new Transaction();
		transaction.setId(transactionEntity.getId());
		transaction.setAmountPaid(transactionEntity.getAmountPaid());
		transaction.setCardNumber(transactionEntity.getCard().getNumber());
		transaction.setPaymentDate(transactionEntity.getPaymentDate());
		transaction.setRewardsEarned(transactionEntity.getRewardsEarned());
		transaction.setTransactionType(transactionEntity.getTransactionType());
		transaction.setStatus(transactionEntity.getStatus());
		return transaction;

	}

	default TransactionEntity toEntity(Transaction transaction, CardEntity card, int rewardsEarned) {
		TransactionEntity transactionEntity = new TransactionEntity();
		transactionEntity.setAmountPaid(transaction.getAmountPaid());
		transactionEntity.setCard(card);
		transactionEntity.setPaymentDate(transaction.getPaymentDate());
		transactionEntity.setRewardsEarned(rewardsEarned);
		transactionEntity.setTransactionType(transaction.getTransactionType());
		transactionEntity.setStatus(transaction.getStatus());
		return transactionEntity;
	}

	default List<TransactionEntity> toEntities(List<Transaction> transactions, CardEntity card){
		
		List<TransactionEntity> transactionEntities = new ArrayList<>();
		for(Transaction transaction : transactions) {
			transactionEntities.add(toEntity(transaction, card, (transaction.getAmountPaid()*10)/100));
		}
		return transactionEntities;
	}
	
}
