import React, { Component } from 'react';
import WindowControlButtons from './WindowControlButtons/WindowControlButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
import Settings from '../Settings/Settings';
import './WindowControl.scss';

export default class WindowControl extends Component {
    state = {
        settingsShowed: false
    }

    showSettings() {
        this.setState({ settingsShowed: true })
    }

    closeSettings() {
        this.setState({ settingsShowed: false })
    }

    render() {
        return (
            <div className="window-control">
                {this.state.settingsShowed && createPortal(<Settings closeSettings={this.closeSettings.bind(this)} />, document.getElementById('content'))}
                <FontAwesomeIcon
                    className="window-control__settingsBtn"
                    icon="cog"
                    onClick={() => this.showSettings()}
                />
                <div className="draggable"></div>
                <WindowControlButtons />
            </div>
        )
    }
}