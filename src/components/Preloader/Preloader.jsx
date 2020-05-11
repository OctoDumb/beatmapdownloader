import React, { Component } from 'react';
import { Redirect }  from 'react-router-dom'
import './Preloader.scss';

export default class Preloader extends Component {
    state = {};

    componentDidMount() {
        if(!window.Config.refresh_token) {
            this.setState({ redirect: "login" });
        } else 
            this.setState({ redirect: "auth" });
    }

    render() {
        switch(this.state.redirect) {
            case "login": {
                return (
                    <Redirect to="/login" />
                )
            }

            case "auth": {
                return (
                    <Redirect to="/auth" />
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