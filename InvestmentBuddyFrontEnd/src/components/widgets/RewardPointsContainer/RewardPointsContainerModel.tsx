export interface RewardPointsContainerModel {
    pointsEarned: String;
    pointsInvested: String;
    upcomingMilestone: String;
    amountLeft: String;
    displayName: String;
}

export interface RewardPointsContainerProps {
    rewardPointsContainerModel: RewardPointsContainerModel
}