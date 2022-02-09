import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import CreditCard from '../CreditCardDetails/CreditCardsContainer';
import TransactionHistoryContainer from '../TransactionHistory/TransactionHistoryContainer/TransactionHistoryContainer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import RewardPointsContainer from '../RewardPointsContainer/RewardPointsContainer'
import { SIDE_BAR_OPTIONS, DEFAULT_SELECTION, useStyles, rewardPointsContainerModel, transactionHistoryContainerModel } from '../../../constants/DashBoardStaticContent';


const ResponsiveDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selections, SetSelections] = React.useState([true, false, false, false]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const setCurrentSelection = (selectedValue: string) => {
    let currentSelections = [...DEFAULT_SELECTION];
    currentSelections[SIDE_BAR_OPTIONS.indexOf(selectedValue)] = true;
    SetSelections(currentSelections);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {SIDE_BAR_OPTIONS.map((text, index) => (
          <ListItem button key={text} onClick={(e) => setCurrentSelection(e.currentTarget.innerText)}>
            <ListItemIcon>{index % 2 === 0 ? <CreditCardIcon /> : <ReceiptIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Save Easy
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        { }
        
        <Hidden xsDown implementation="css">
          <Drawer classes={{paper: classes.drawerPaper,}}variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          {selections[1] && <TransactionHistoryContainer transactionHistoryContainerModel={transactionHistoryContainerModel}></TransactionHistoryContainer>}
          {selections[0] && <CreditCard />}
          {selections[2] && <RewardPointsContainer rewardPointsContainerModel={rewardPointsContainerModel} />}
        </Typography>
      </main>
    </div>
  );
}


export default ResponsiveDrawer;