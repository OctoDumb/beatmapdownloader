import React, { Component } from 'react';
import './WindowControl.scss';
import WindowControlButtons from './WindowControlButtons/WindowControlButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default class WindowControl extends Component {
    render() {
        return (
            <div className="window-control">
                <Link className="window-control__settingsBtn" to="/settings">
                    <FontAwesomeIcon icon="cog" />
                </Link>
                <div className="draggable"></div>
                <WindowControlButtons />
            </div>
        )
    }
}