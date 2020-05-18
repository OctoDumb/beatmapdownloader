import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Settings.scss'
import { Link } from 'react-router-dom';

export default class Settings extends Component {
    state = {
        username: "",
        password: "",
        path: "",
        avatarUrl: "",
        redirect: false
    };

    componentDidMount() {
        this.setState({
            path: window.Config.songs_path,
            avatarUrl: window.localStorage.getItem('avatar')
        });
    }

    chooseSongsPath() {
        let p = window.electron.remote.dialog.showOpenDialogSync({
            title: "Choose /Songs folder",
            properties: ['openDirectory']
        });
        if(!p) return;

        window.Config.songs_path = p[0].replace(/\\/g, '/');
        window.Config.save();

        this.setState({ path: window.Config.songs_path });
    }

    changeUserData() {
        window.Config.username = this.state.username;
        window.Config.save();
        window.localStorage.setItem('password', this.state.password);
        this.setState({ redirect: true })
    }

    songsSubmit() {
        window.Config.songs_path = this.state.path;
        window.Config.save();
    }

    render () {
        if (this.state.redirect)
            return (
                <Redirect to="/app" />
            )
        return (
            <div className='settings'>
                <Link to="/app">
                    <FontAwesomeIcon className="settings__closeBtn" icon="times" />
                </Link>
                <div className="authorization settings__authorization">
                    <span className="authorization__title">Change your osu! account</span>
                    <div className="settings-profile">
                        <div className="settings__avatar">
                            <img src={this.state.avatarUrl || "https://osu.ppy.sh/images/layout/avatar-guest.png"} alt="avatar" />
                        </div>
                        <div className="settings-inputs">
                            <input 
                                className="authorization__input" 
                                type="text" 
                                value={this.state.username} 
                                onChange={v => this.setState({ username: v.target.value })} 
                                placeholder="Username"
                            />
                            <input 
                                className="authorization__input" 
                                type="password" 
                                value={this.state.password} 
                                onChange={v => this.setState({ password: v.target.value })} 
                                placeholder="Password"
                            />
                            
                        </div>
                    </div>
                    <button 
                        className="authorization__submit" 
                        onClick={() => this.changeUserData()}
                    >
                        Change
                    </button>
                </div>
                <div className="songspath">
                    <span className="songspath__title">Change /Songs folder path</span>
                    <div className="songspath-browse">
                        <input 
                            className="songspath__input" 
                            type="text" 
                            value={this.state.path} 
                            placeholder="Songs folder path" 
                            disabled 
                        />
                        <button 
                            className="songspath__browse" 
                            onClick={() => this.chooseSongsPath()}
                        >
                            Change
                        </button>
                    </div>
                    <button className="songspath__submit" onClick={() => this.songsSubmit()} >Submit</button>
                </div>
            </div>
        )
    }
}