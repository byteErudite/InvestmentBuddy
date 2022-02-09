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
import { homedir } from 'os';
// import { login } from '../../util/AppUtil';
import { Redirect, useHistory } from 'react-router-dom';
// import { ACCESS_TOKEN, GOOGLE_AUTH_URL, REACT_APP_GOOGLE_AUTH_CLIENT_ID } from '../../constants/app-config';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [details, setDetails] = useState({
        email: '',
        password: '',
    })

    const [loginFailed, setLoginFailed] = useState<boolean>();
    const history = useHistory();

    const onEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const loginSuccess = () => {
        console.log("login successful");
    }

    const onSubmit = () => {

        details.email = userEmail;
        details.password = password;

        console.log(userEmail + " " + password);

        const loginRequest = Object.assign({}, details);



        if (userEmail !== '' && password !== '') {

        //     login(loginRequest)
        //         .then(response => {
        //             localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        //             history.push("/welcome");
        //         }).catch(error => {
        //             window.alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
        //         });
        // }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onEmailChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onPasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}
                    >
                        Sign In
          </Button>
                    {/* <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href={GOOGLE_AUTH_URL}
                    >
                        Sign In With Google
          </Button> */}
                    {/* <GoogleLogin
                        // clientId={REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                        buttonText='Sign in with Google'
                        onSuccess={loginSuccess}
                        onFailure={(response: any) => {
                            setLoginFailed(true);
                            console.log(loginFailed);
                        }}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    /> */}
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}}

export default Login;