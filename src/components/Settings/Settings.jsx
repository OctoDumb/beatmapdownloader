import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Settings.scss'
import { Link } from 'react-router-dom';

export default class Settings extends Component {
    render () {
        return (
            <div className='settings'>
                <Link to="/app">
                    <FontAwesomeIcon className="settings__closeBtn" icon="times" />
                </Link>
                <div className="authorization settings__authorization">
                    <span className="authorization__title">Change your osu! account</span>
                    <div className="settings-profile">
                        <div className="settings__avatar">
                            <img src="https://a.ppy.sh/2?1537409912.jpeg" alt="avatar"/>
                        </div>
                        <div className="settings-inputs">
                            <input 
                                className="authorization__input" 
                                type="text" 
                                /* value={this.state.username} 
                                onChange={v => this.setState({ username: v.target.value })}  */
                                placeholder="Username"
                            />
                            <input 
                                className="authorization__input" 
                                type="password" 
                                /* value={this.state.password} 
                                onChange={v => this.setState({ password: v.target.value })}  */
                                placeholder="Password"
                            />
                            
                        </div>
                    </div>
                    <button 
                        className="authorization__submit" 
                        /* onClick={() => this.setState({ songsPathSelect: true })} */
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
                            /* value={this.state.path}  */
                            placeholder="Songs folder path" 
                            disabled 
                        />
                        <button 
                            className="songspath__browse" 
                            /* onClick={() => this.chooseSongsPath()} */
                        >
                            Change
                        </button>
                    </div>
                    
                    <button className="songspath__submit" /* onClick={() => this.songsSubmit()} */ >Submit</button>
                </div>
            </div>
        )
    }
}