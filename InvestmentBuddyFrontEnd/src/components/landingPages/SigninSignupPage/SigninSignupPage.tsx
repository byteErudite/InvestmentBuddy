import './SigninSignupPage.css'
import SigninSignupLeftImage from '../../../assets/images/signinSignupPage/signinSignupLeftImage.png'
import SigninSignupPallette from './SigninSignupPallette/SigninSignupPallette'
import { useState } from 'react';
import LogoPurple from '../../../assets/images/logos/logoPurplewhite.png'


const SigninSignupPage = (props: { mode: string }) => {


    return (
        <div className="signin-signup-main">
            <div className="signin-signup-curved">
                <div className="signin-signup-left">
                    <div className="signin-signup-logo-wrapper">
                        <img src={LogoPurple} className="signin-signup-logo"></img>
                        <label className="signin-signup-logo-label">SaveEasy</label>

                    </div>
                    <img className="signin-signup-left-image" src={SigninSignupLeftImage} />

                </div>
                <div className="signin-signup-extra">

                </div>
            </div>

            <div className="signin-signup-right">
                <SigninSignupPallette mode={props.mode} />
            </div>
        </div >
    )
}

export default SigninSignupPage