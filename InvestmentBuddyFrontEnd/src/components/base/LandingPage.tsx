import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { signup } from '../../util/AppUtil';
import { Redirect, useHistory } from 'react-router';
import finImg from '../images/finImage.png'
import { blue } from '@material-ui/core/colors';
import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(16),
        marginLeft: theme.spacing(50),
        textDecorationColor: "#2f329f",
    },
    button: {
        marginLeft: theme.spacing(132),
    },

    textField: {
        marginTop: theme.spacing(48),
    }
}));

const LandingPage = () => {

    const classes = useStyles();
    return (<div>
        <Typography variant="h6" className={classes.title}>Welcome to Saveasy</Typography>
        <img src={finImg} style={{ backgroundSize: "cover", height: "100vh" }} />

    </div>)
}

export default LandingPage;