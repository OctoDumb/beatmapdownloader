import React, { Component } from 'react';
import './Login.scss';
import { Redirect }  from 'react-router-dom'

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        songsPathSelect: false,
        path: "",
        redirect: false
    };

    chooseSongsPath() {
        let p = window.electron.remote.dialog.showOpenDialogSync({
            title: "Choose /Songs folder",
            properties: ['openDirectory']
        });
        if(!p) return;

        this.setState({
            path: p[0].replace(/\\/g, '/')
        });
    }

    loginSubmit() {
        this.setState({ songsPathSelect: true });
        if(window.Config.songs_path)
            this.songsSubmit(true);
    }

    
    songsSubmit(ignore) {
        if(!ignore) {
            window.Config.songs_path = this.state.path;
        }
        window.Config.username = this.state.username;
        window.Config.save();
        window.localStorage.setItem('password', this.state.password);
        this.setState({ redirect: true })
    }

    render() {
        if(this.state.redirect)
            return (
                <Redirect to="/auth"/>
            );
        return (
            <div className="login">
                <div className={"authorization " + (this.state.songsPathSelect ? "fade":"")}>
                    <span className="authorization__title">Log in your osu! account</span>
                    <input 
                        className="authorization__input" 
                        type="text" value={this.state.username} 
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
                    <button 
                        className="authorization__submit" 
                        onClick={() => this.setState({ songsPathSelect: true })}
                    >
                        Login
                    </button>
                </div>
                <div className={"songspath " + (!this.state.songsPathSelect ? "fade":"")}>
                    <span className="songspath__title">Choose /Songs folder path</span>
                    <div className="songspath-browse">
                        <input 
                            className="songspath__input" 
                            type="text" value={this.state.path} 
                            placeholder="Songs folder path" 
                            disabled 
                        />
                        <button 
                            className="songspath__browse" 
                            onClick={() => this.chooseSongsPath()}
                        >
                            Browse
                        </button>
                    </div>
                    
                    <button className="songspath__submit" onClick={() => this.songsSubmit()}>Submit</button>
                </div>
            </div>
        )
    }
}