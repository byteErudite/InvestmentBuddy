import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TransactionHistoryContainerModel } from '../components/widgets/TransactionHistory/TransactionHistoryContainer/TransactionHistoryContainerModel';
import { RewardPointsContainerModel } from '../components/widgets/RewardPointsContainer/RewardPointsContainerModel';


export const SIDE_BAR_OPTIONS = ['Credit Cards', 'Transactions', 'Profile Performance', 'Reward Points'];
export const DEFAULT_SELECTION = [false, false, false, false];

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export const rewardPointsContainerModel: RewardPointsContainerModel = {
    displayName:'vaibhav',
    pointsEarned: '45',
    pointsInvested: '30',
    upcomingMilestone: '60',
    amountLeft: '15'
}

export const transactionHistoryContainerModel: TransactionHistoryContainerModel = {
    username: 'helllo'
}