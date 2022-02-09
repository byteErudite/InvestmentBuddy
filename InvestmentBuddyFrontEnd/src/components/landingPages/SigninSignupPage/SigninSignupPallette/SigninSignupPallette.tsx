import './SigninSignupPallette.css'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { COLORS } from '../../../../constants/NewColorScheme'
import { useState } from 'react'
import { login, signup } from '../../../../utilities/AppUtil'
import { useHistory } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../../../constants/app-config'
import { ScoreModel } from '../../../../constants/Interfaces'
import { USER_SCORE, SERVER_URL, FORWARD_SLASH } from '../../../../constants/NetworkData'
import { on } from 'events'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
const SigninSignupPallette = (props: { mode: string }) => {

    const [isModeSignup, setIsModeSignup] = useState(props.mode === 'signup');
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: '',
    })
    const emailRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$");
    const history = useHistory();
    const REACT_APP_GOOGLE_AUTH_CLIENT_ID = '618076409153-v4oo7n9g977m1gc4m41hibq78u3dgpr7.apps.googleusercontent.com';
    const REACT_APP_CLIENT_SECRET = 'QkwnExaYlPu8E5uLL9zitLm4';
    const onNameChange = (event: any) => {
        setUserName(event.target.value);
    }

    const onEmailChange = (event: any) => {
        setUserEmail(event.target.value);
    }

    const onPasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const onSubmit = () => {

        if (!emailRegex.test(userEmail)) {
            alert("Please provide valid email");
        }
        else if (password.length <= 6) {
            alert("Please provide valid password");
        }
        else if (isModeSignup && userName.length <= 5) {
            alert("Please provide valid username")
        }
        else {
            if (isModeSignup) {
                details.name = userName;
                details.email = userEmail;
                details.password = password;

                const signUpRequest = Object.assign({}, details);



                if (userName !== '' && userEmail !== '' && password !== '') {

                    signup(signUpRequest)
                        .then(response => {
                            history.push("/login");
                            setIsModeSignup(false);
                        }).catch(error => {
                            window.alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
                        });
                }
            }
            else {
                details.email = userEmail;
                details.password = password;
                const loginRequest = Object.assign({}, details);

                if (userEmail !== '' && password !== '') {

                    login(loginRequest)
                        .then(response => {
                            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                            localStorage.setItem("userName", response.userName);
                            setToken(response.accessToken);
                            setUserName(response.userName);
                            hasUserTakenAssessment().then((isOldUser) => {
                                if (isOldUser) {
                                    history.push("/newDashboard");
                                } else {
                                    history.push("/questionnaire");
                                }
                            });
                        }).catch(error => {
                            window.alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
                        });
                }
            }
        }
    }

    const hasUserTakenAssessment = () => {
        const result = fetch(SERVER_URL + FORWARD_SLASH + USER_SCORE + FORWARD_SLASH + localStorage.getItem("userName"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).
            then((resp) => resp.json()).
            then((data) => {
                let scoreValue: ScoreModel = {
                    id: data['id'],
                    overallScore: data['overallScore'],
                    riskProfile: data['riskProfile'],
                    userName: data['userName'],
                    assessmentTaken: data['assessmentTaken']
                }
                return scoreValue === undefined ? false : scoreValue.assessmentTaken;
            });
        return result;
    }


    const signupModel = {
        heading: 'Signup up to SaveEasy',
        subHeading: 'Already a member?',
        subHeadingAction: 'Sign In',
        submitButtonText: 'Create an Account',
        googleButtonText: 'Sign up with Google'
    }

    const signinModel = {
        heading: 'Hey, Welcome back !',
        subHeading: 'Not a member yet?',
        subHeadingAction: 'Sign Up',
        submitButtonText: 'Sign In',
        googleButtonText: 'Sign in with Google'
    }

    
    const loginSuccess = () => {
        history.push('/questionnaire')
    }

    const model = isModeSignup ? signupModel : signinModel

    return (
        <div className="signin-signup-right-main" style={{ paddingTop: isModeSignup ? '45px' : '90px' }}>
            <label className="signin-signup-heading">{model.heading}</label>

            <div className="signin-signup-sub-heading-wrapper">
                <label className="signin-signup-sub-heading-static">{model.subHeading}</label>
                <label className="signin-signup-sub-heading-log-in" style={{ color: COLORS.textWarn }} onClick={() => setIsModeSignup(!isModeSignup)}>{model.subHeadingAction}</label>
            </div>

            {isModeSignup &&
                <div className="signin-signup-field-wrapper">
                    <label className="signin-signup-field-title">Username</label>

                    <div className="signin-signup-field-input-wrapper">
                        <input onChange={onNameChange} className="signin-signup-field-input" placeholder="5+ Characters, 1 number" type="text" required />
                    </div>
                </div>
            }

            <div className="signin-signup-field-wrapper">
                <label className="signin-signup-field-title">E-mail</label>

                <div className="signin-signup-field-input-wrapper">
                    <input onChange={onEmailChange} className="signin-signup-field-input" placeholder="name@mail.com" required />
                    <FontAwesomeIcon className="signin-signup-field-icon" icon={faAt} style={{ color: COLORS.textSecondary }} />
                </div>
            </div>

            <div className="signin-signup-field-wrapper">
                <label className="signin-signup-field-title">Password</label>

                <div className="signin-signup-field-input-wrapper">
                    <input onChange={onPasswordChange} className="signin-signup-field-input" placeholder="6+ Characters, 1 Captial letter" type="password" />
                    <FontAwesomeIcon className="signin-signup-field-icon" icon={faUnlock} style={{ color: COLORS.textSecondary }} />
                </div>
            </div>



            <label onClick={onSubmit} className="signin-signup-submit-button" style={{ backgroundColor: COLORS.orange }}>{model.submitButtonText}</label>

            <GoogleLogin
                        theme='dark'
                        clientId={REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                        buttonText='Sign in with Google'
                        onSuccess={loginSuccess}
                        onFailure={(response: any) => {
                            
                        }}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />

        </div>
    )
}

export default SigninSignupPallette