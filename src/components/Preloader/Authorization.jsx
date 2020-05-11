import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './Preloader.scss';

export default class Authorization extends Component {
    state = {};

    componentDidMount() {
        this.login();
    }

    async login() {
        let loggedIn;
        if(window.Config.refresh_token)
            loggedIn = await window.APIClient.loginWithRefresh();
        else {
            loggedIn = await window.APIClient.login(window.Config.username, window.localStorage.getItem('password'));
            window.localStorage.removeItem('password');
        }

        if(loggedIn) {
            this.setState({ redirect: "app" });
        } else {
            window.Config.resetCredentials();
            this.setState({ redirect: "login" })
        }
    }

    render() {
        switch(this.state.redirect) {
            case "app": {
                return (
                    <Redirect to="/app" />
                )
            }

            case "login": {
                return (
                    <Redirect to="/login" />
                )
            }

            default: {
                return (
                    <div className="preloader">
                        <div className="container">
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                        </div>
                    </div>
                )
            }
        }
    }
}