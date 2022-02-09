package com.example.springsocial.serviceImpl;

import static com.example.springsocial.util.Constants.CARD_NUMBER_INVALID;
import static com.example.springsocial.util.Constants.INVESTMENT_BARRIER;
import static com.example.springsocial.util.Constants.LOG_TIME;
import static com.example.springsocial.util.Constants.REWARD_CONVERSION_RATE;
import static com.example.springsocial.util.Constants.SUCCESS;
import static com.example.springsocial.util.Constants.TRANSACTION_FAILED;
import static com.example.springsocial.util.Constants.TRANSACTION_SUCCESSFUL;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springsocial.entity.CardEntity;
import com.example.springsocial.entity.RewardEntity;
import com.example.springsocial.entity.TransactionEntity;
import com.example.springsocial.entity.UserEntity;
import com.example.springsocial.entity.UserScoreEntity;
import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.exception.TransactionFailureException;
import com.example.springsocial.mapper.InvestmentMapper;
import com.example.springsocial.mapper.TransactionMapper;
import com.example.springsocial.model.Investment;
import com.example.springsocial.model.Transaction;
import com.example.springsocial.repository.CardRepository;
import com.example.springsocial.repository.InvestmentRepository;
import com.example.springsocial.repository.RewardRepository;
import com.example.springsocial.repository.TransactionRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.repository.UserScoreRepository;
import com.example.springsocial.service.TransactionService;
import com.example.springsocial.util.FundDetailsUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TransactionServiceimpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private UserScoreRepository scoreRepository;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private InvestmentMapper investmentMapper;

    @Override
    public Transaction addTransaction(Transaction transaction) {

        var cardEntity = cardRepository.findByNumber(transaction.getCardNumber());
        if (Objects.isNull(cardEntity)) {
            throw new BadRequestException(CARD_NUMBER_INVALID);
        }

        int rewardsEarned = (int) (transaction.getAmountPaid() * REWARD_CONVERSION_RATE);
        transaction.setStatus(SUCCESS);
        TransactionEntity savedTransaction = transactionRepository.save(transactionMapper.toEntity(transaction, cardEntity, rewardsEarned));
        if (Objects.isNull(savedTransaction)) {
			throw new TransactionFailureException(TRANSACTION_FAILED);
		}
		log.info(LOG_TIME.format(LocalDateTime.now()) +": "+TRANSACTION_SUCCESSFUL+" : "+savedTransaction.getId());


		//update due ammount in card table
		updateAmountInCard(cardEntity, savedTransaction);

        // update total reward coin column in rewards table
		boolean isTransactionSuccessful = SUCCESS.equalsIgnoreCase(savedTransaction.getStatus());
        if (isTransactionSuccessful) {
           updateRewardsAndInvestments(rewardsEarned, savedTransaction);
        }
        return transactionMapper.toDto(savedTransaction);
    }

    private void updateRewardsAndInvestments(int rewardsEarned, TransactionEntity savedTransaction) {
		long userId = savedTransaction.getCard().getUser().getId();
		RewardEntity reward = rewardRepository.findByUserId(userId);

		var totalRewards = 0;
		var currInvested = 0;
		var currMilestone = 0;

		if (Objects.nonNull(reward)) {
			totalRewards = reward.getTotalPointsEarned();
			currInvested = reward.getTotalPointsInvested();
			currMilestone = reward.getNextMilestone();
		} else {
			reward = new RewardEntity();
			reward.setUserId(userId);
		}

		boolean isRewardInvestible = rewardsEarned + currMilestone >= INVESTMENT_BARRIER;
		if (isRewardInvestible) {
			createInvestmentAndSaveEarnedRewards(rewardsEarned, currMilestone, userId, currInvested, totalRewards, reward);
		} else {
			reward.setTotalPointsEarned(totalRewards + rewardsEarned);
			reward.setNextMilestone(currMilestone + rewardsEarned);
			reward.setTotalPointsInvested(0);
			rewardRepository.save(reward);
		}
	}

	private void createInvestmentAndSaveEarnedRewards(int rewardsEarned, int currMilestone, long userId, int currInvested, int totalRewards, RewardEntity reward) {
		var remainingPointAfterInvest = (rewardsEarned + currMilestone) % INVESTMENT_BARRIER;
		var pointsInvested = (rewardsEarned + currMilestone - remainingPointAfterInvest);
		double moneyEarned = pointsInvested / 2.0;

		var nextMilestone = remainingPointAfterInvest;

		// get risk profile for the user
		UserScoreEntity userScore = scoreRepository.getUserScoreByUserId(userId);

		String fundName = FundDetailsUtil.getFundName(userScore.getRiskProfile());
		double pricePerUnit = FundDetailsUtil.getPrice(fundName);

		double numUnits = (moneyEarned / pricePerUnit);
		log.info(LOG_TIME.format(LocalDateTime.now()) +" : Units earned: {}", numUnits);
		if (numUnits > 0) {
			var investment = new Investment();
			investment.setInvestedDate(new Date());

			investmentRepository.save(investmentMapper.toEntity(investment, userId, fundName, pricePerUnit,
					moneyEarned, numUnits));
		}

		reward.setTotalPointsInvested(currInvested + pointsInvested);
		reward.setNextMilestone(nextMilestone);
		reward.setTotalPointsEarned(totalRewards + rewardsEarned);
		reward.setUserProfile(userScore.getRiskProfile());
		reward.setUserId(userScore.getLoggedInUserId());
		rewardRepository.save(reward);
	}
    private void updateAmountInCard(CardEntity card, TransactionEntity savedTransaction) {
		var ammountDue = card.getAmmountDue() - savedTransaction.getAmountPaid();
		card.setAmmountDue(ammountDue);
		cardRepository.save(card);
	}

    @Override
    public List<Transaction> getAllTransaction(String userName) {

        List<Transaction> transactions = new ArrayList<>();
        UserEntity user = userRepository.findByName(userName);
        List<CardEntity> cards = user.getCards();
        for (CardEntity card : cards) {
            List<TransactionEntity> transactionsByCard = card.getTransactions();
            for (TransactionEntity transactionByCard : transactionsByCard) {
                var transactionDto = transactionMapper.toDto(transactionByCard);
                transactionDto.setBankName(card.getBank());
                transactions.add(transactionDto);
            }
        }

        transactions.sort((Transaction s1, Transaction s2) -> s2.getId().compareTo(s1.getId()));
        return transactions;
    }

}
