
import React, { useState, useEffect } from 'react';
import homeImg from '../images/homeImg.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '@material-ui/core';
import SignUp from './SignUp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(132),
    },

    textField: {
        marginTop: theme.spacing(48),
    }
}));

const Home = () => {

    const validateSSN = (ssn: string) => {
        return ssn && /^(?!(000|666|9))(\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4})$/.test(ssn)
            ? true
            : false
    }

    const [ssn, setSSN] = useState("xxx-xxx-xxx");
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const onChange = (event) => {
        setSSN(event.target.value);
        console.log(ssn);
    };

    const onSubmit = (event) => {
        console.log(validateSSN(ssn));
        validateSSN(ssn) ? history.push("/signup") : renderAlert();

    }

    const renderSignUp = () => {

        console.log("abcd");

        return <SignUp></SignUp>;
    }

    const renderAlert = () => {
        console.log("xyz");
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open alert dialog
              </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Invalid SSN"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            OK
                  </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


    return (<div>

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        SaveEasy
          </Typography>

                    <Button href="/login" color="inherit" className={classes.button}>Login</Button>

                </Toolbar>
            </AppBar>
            <Input id="ssnField" placeholder="Enter your SSN" inputProps={{ 'aria-label': 'description' }} onChange={onChange} />
            <Button id="btn" color="inherit" className={classes.button} onClick={onSubmit}>Submit</Button>

        </div>
        <div>
            <img src={homeImg} style={{ backgroundSize: "cover", height: "100vh" }} />
        </div>
    </div>);

}

export default Home;