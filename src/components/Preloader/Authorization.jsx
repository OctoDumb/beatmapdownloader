import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { addUserFriends, addUserId } from '../../redux/actions/userInformationReducer';
import './Preloader.scss';

class Authorization extends Component {
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

        let { avatar_url, id } = await window.APIClient.request('/me');
        window.localStorage.setItem('avatar', avatar_url);

        let friends = (await window.APIClient.request('/friends')).map(f => f.id);

        this.props.addUserId(id);
        this.props.addUserFriends(friends);

        if(loggedIn) {
            this.setState({ redirect: "app" });
        } else {
            window.Config.resetCredentials();
            window.localStorage.setItem('login_error', "Couldn't log in with your account");
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

const mapStateToProps = state => {
    return {}
}

const dispatchStateToProps = dispatch => {
    return {
        addUserId: userId => dispatch(addUserId(userId)),
        addUserFriends: friends => dispatch(addUserFriends(friends)),
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Authorization)