import React, { Component } from 'react';
// import { ACCESS_TOKEN } from '../constants/app-config';
import { Redirect } from 'react-router-dom'

const OAuth2RedirectHandler = (props: any) => {
    const getUrlParameter = (name: string) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const render = () => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');

        // if (token) {
        //     localStorage.setItem(ACCESS_TOKEN, token);
        //     return <Redirect to={{
        //         pathname: "/profile",
        //         state: { from: props.location }
        //     }} />;
        // } else {
        //     return <Redirect to={{
        //         pathname: "/login",
        //         state: {
        //             from: props.location,
        //             error: error
        //         }
        //     }} />;
        // }
    }
}

export default OAuth2RedirectHandler;